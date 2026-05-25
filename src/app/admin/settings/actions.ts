"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"
import { sendMail } from "@/lib/mail"

export async function requestSettingsOtp() {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    throw new Error("Unauthorized")
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

  // Send email
  try {
    await sendMail({
      to: email,
      subject: "Change Password OTP - Sweep Plus Admin",
      text: `Your OTP for changing your admin password is: ${otp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Security Verification</h2>
          <p>You have requested to change your admin password. Use the following OTP to proceed:</p>
          <h1 style="background: #f4f4f4; padding: 10px; text-align: center; border-radius: 5px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes. If you did not request this, please secure your account.</p>
        </div>
      `
    })
  } catch (err: any) {
    console.error("Failed to send settings OTP email:", err)
    throw new Error("Failed to send OTP email. Please check your SMTP configuration.")
  }

  return { success: true }
}

export async function updatePasswordWithOtp(formData: FormData) {
  const session = await auth()
  const email = session?.user?.email

  if (!email) {
    throw new Error("Unauthorized")
  }

  const otp = formData.get("otp") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!otp || !newPassword || !confirmPassword) {
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
