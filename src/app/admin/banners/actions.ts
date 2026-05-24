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

export async function addBanner(formData: FormData) {
  await checkAuth()

  const pageSection = formData.get("pageSection") as string
  const link = formData.get("link") as string
  const image = formData.get("image") as File | null

  if (!image || image.size === 0) {
    throw new Error("Image is required")
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Create unique filename
  const safeName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
  const filename = `${Date.now()}-banner-${safeName}`
  const filepath = path.join(process.cwd(), "public", "uploads", filename)
  
  await writeFile(filepath, buffer)
  const imageUrl = `/uploads/${filename}`

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
}

export async function updateBanner(id: number, formData: FormData) {
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
    const safeName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${Date.now()}-banner-${safeName}`
    const filepath = path.join(process.cwd(), "public", "uploads", filename)
    await writeFile(filepath, buffer)
    dataToUpdate.imageUrl = `/uploads/${filename}`
  }

  await prisma.banner.update({
    where: { id },
    data: dataToUpdate,
  })

  revalidatePath("/")
  revalidatePath("/admin/banners")
}

export async function toggleBanner(id: number, isActive: boolean) {
  await checkAuth()
  
  await prisma.banner.update({
    where: { id },
    data: { isActive },
  })

  revalidatePath("/")
  revalidatePath("/admin/banners")
}

export async function deleteBanner(id: number) {
  await checkAuth()
  
  await prisma.banner.delete({
    where: { id },
  })

  revalidatePath("/")
  revalidatePath("/admin/banners")
}
