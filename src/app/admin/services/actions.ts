"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function checkAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function addService(formData: FormData) {
  try {
    await checkAuth()

    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const icon = formData.get("icon") as string

    await prisma.service.create({
      data: {
        id: id || title.toLowerCase().replace(/\s+/g, '-'),
        title,
        description,
        icon,
      },
    })

    revalidatePath("/")
    revalidatePath("/services")
    revalidatePath("/admin/services")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to add service:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function updateService(id: string, formData: FormData) {
  try {
    await checkAuth()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const icon = formData.get("icon") as string

    await prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        icon,
      },
    })

    revalidatePath("/")
    revalidatePath("/services")
    revalidatePath("/admin/services")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update service:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function deleteService(id: string) {
  try {
    await checkAuth()
    
    await prisma.service.delete({
      where: { id },
    })

    revalidatePath("/")
    revalidatePath("/services")
    revalidatePath("/admin/services")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to delete service:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}
