"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function checkAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function addBanner(formData: FormData) {
  try {
    await checkAuth()

    const pageSection = formData.get("pageSection") as string
    const link = formData.get("link") as string
    const image = formData.get("image") as File | null

    if (!image || image.size === 0) {
      throw new Error("Image is required")
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = image.type || 'image/jpeg'
    const imageUrl = `data:${mimeType};base64,${base64}`

    await prisma.banner.create({
      data: {
        pageSection,
        link: link || null,
        imageUrl,
        isActive: true,
      },
    })

    revalidatePath("/")
    revalidatePath("/admin/banners")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to add banner:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function updateBanner(id: number, formData: FormData) {
  try {
    await checkAuth()

    const pageSection = formData.get("pageSection") as string
    const link = formData.get("link") as string
    const image = formData.get("image") as File | null

    const dataToUpdate: any = {
      pageSection,
      link: link || null,
    }

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = image.type || 'image/jpeg'
      dataToUpdate.imageUrl = `data:${mimeType};base64,${base64}`
    }

    await prisma.banner.update({
      where: { id },
      data: dataToUpdate,
    })

    revalidatePath("/")
    revalidatePath("/admin/banners")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update banner:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function toggleBanner(id: number, isActive: boolean) {
  try {
    await checkAuth()
    
    await prisma.banner.update({
      where: { id },
      data: { isActive },
    })

    revalidatePath("/")
    revalidatePath("/admin/banners")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to toggle banner:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function deleteBanner(id: number) {
  try {
    await checkAuth()
    
    await prisma.banner.delete({
      where: { id },
    })

    revalidatePath("/")
    revalidatePath("/admin/banners")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to delete banner:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}
