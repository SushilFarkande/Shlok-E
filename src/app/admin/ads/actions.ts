"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import path from "path"
import { auth } from "@/auth"

async function checkAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function addAd(formData: FormData) {
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
  
  // Create unique filename
  const safeName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
  const filename = `${Date.now()}-ad-${safeName}`
  const filepath = path.join(process.cwd(), "public", "uploads", filename)  
  await writeFile(filepath, buffer)
  const imageUrl = `/uploads/${filename}`

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
}

export async function updateAd(id: number, formData: FormData) {
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
    const safeName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${Date.now()}-ad-${safeName}`
    const filepath = path.join(process.cwd(), "public", "uploads", filename)
    await writeFile(filepath, buffer)
    dataToUpdate.imageUrl = `/uploads/${filename}`
  }

  await prisma.ad.update({
    where: { id },
    data: dataToUpdate,
  })

  revalidatePath("/")
  revalidatePath("/admin/ads")
}

export async function toggleAd(id: number, isActive: boolean) {
  await checkAuth()
  
  await prisma.ad.update({
    where: { id },
    data: { isActive },
  })

  revalidatePath("/")
  revalidatePath("/admin/ads")
}

export async function deleteAd(id: number) {
  await checkAuth()
  
  await prisma.ad.delete({
    where: { id },
  })

  revalidatePath("/")
  revalidatePath("/admin/ads")
}
