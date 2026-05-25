"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function updatePassword(formData: FormData) {
  const session = await auth()
  if (!session?.user?.email) throw new Error("Unauthorized")

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required")
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match")
  }

  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters long")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
  
  if (!isPasswordValid) {
    throw new Error("Incorrect current password")
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  })

  return { success: true }
}
