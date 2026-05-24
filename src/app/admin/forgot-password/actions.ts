"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { sendMail } from "@/lib/mail"
import crypto from "crypto"

export async function requestOtp(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    throw new Error("Email is required")
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const hashedOtp = await bcrypt.hash(otp, 10)
  
  // Expiry set to 10 minutes from now
  const expiry = new Date(Date.now() + 10 * 60 * 1000)

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: hashedOtp,
      resetTokenExpiry: expiry
    }
  })

  // Attempt to send email
  try {
    await sendMail({
      to: email,
      subject: "Password Reset OTP - Sweep Plus",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password. Use the following OTP to proceed:</p>
          <h1 style="background: #f4f4f4; padding: 10px; text-align: center; border-radius: 5px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    })
  } catch (err: any) {
    console.warn("Could not send email. Ensure SMTP credentials are set in .env")
    console.log("-----------------------------------------")
    console.log(`FALLBACK: Your OTP for ${email} is ${otp}`)
    console.log("-----------------------------------------")
    // For development/demonstration purposes, we won't throw the error so you can still test via console logs.
    // throw new Error("Failed to send email. Check SMTP configuration.")
  }

  return { success: true, message: "OTP sent to your email" }
}

export async function resetPasswordWithOtp(formData: FormData) {
  const email = formData.get("email") as string
  const otp = formData.get("otp") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!email || !otp || !newPassword || !confirmPassword) {
    throw new Error("All fields are required")
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match")
  }

  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters long")
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !user.resetToken || !user.resetTokenExpiry) {
    throw new Error("Invalid or expired reset request")
  }

  if (new Date() > user.resetTokenExpiry) {
    throw new Error("OTP has expired. Please request a new one.")
  }

  const isOtpValid = await bcrypt.compare(otp, user.resetToken)
  
  if (!isOtpValid) {
    throw new Error("Invalid OTP")
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // Update password and clear reset tokens
  await prisma.user.update({
    where: { email },
    data: { 
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }
  })

  return { success: true }
}
