"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function checkAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function addAd(formData: FormData) {
  try {
    await checkAuth()

    const title = formData.get("title") as string
    const placement = formData.get("placement") as string
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

    await prisma.ad.create({
      data: {
        title,
        placement,
        link: link || null,
        imageUrl,
        isActive: true,
      },
    })

    revalidatePath("/")
    revalidatePath("/admin/ads")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to add ad:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function updateAd(id: number, formData: FormData) {
  try {
    await checkAuth()

    const title = formData.get("title") as string
    const placement = formData.get("placement") as string
    const link = formData.get("link") as string
    const image = formData.get("image") as File | null

    const dataToUpdate: any = {
      title,
      placement,
      link: link || null,
    }

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = image.type || 'image/jpeg'
      dataToUpdate.imageUrl = `data:${mimeType};base64,${base64}`
    }

    await prisma.ad.update({
      where: { id },
      data: dataToUpdate,
    })

    revalidatePath("/")
    revalidatePath("/admin/ads")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update ad:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function toggleAd(id: number, isActive: boolean) {
  try {
    await checkAuth()
    
    await prisma.ad.update({
      where: { id },
      data: { isActive },
    })

    revalidatePath("/")
    revalidatePath("/admin/ads")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to toggle ad:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function deleteAd(id: number) {
  try {
    await checkAuth()
    
    await prisma.ad.delete({
      where: { id },
    })

    revalidatePath("/")
    revalidatePath("/admin/ads")
    return { success: true }
  } catch (error: any) {
    console.error("Failed to delete ad:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}
