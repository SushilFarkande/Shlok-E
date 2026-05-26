"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function checkAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function addProduct(formData: FormData) {
  try {
    await checkAuth()

    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as File | null

    let imageUrl = ""

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = image.type || 'image/jpeg'
      imageUrl = `data:${mimeType};base64,${base64}`
    }

    await prisma.product.create({
      data: {
        name,
        category,
        price,
        description,
        image: imageUrl,
      },
    })

    // Revalidate public pages so changes appear instantly
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin/products")
    
    return { success: true }
  } catch (error: any) {
    console.error("Failed to add product:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    await checkAuth()

    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const price = formData.get("price") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as File | null

    const dataToUpdate: any = {
      name,
      category,
      price,
      description,
    }

    if (image && image.size > 0 && image.name && image.name !== 'undefined') {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString('base64')
      const mimeType = image.type || 'image/jpeg'
      dataToUpdate.image = `data:${mimeType};base64,${base64}`
    }

    await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    })

    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin/products")
    
    return { success: true }
  } catch (error: any) {
    console.error("Failed to update product:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}

export async function deleteProduct(id: number) {
  try {
    await checkAuth()
    
    await prisma.product.delete({
      where: { id },
    })

    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin/products")
    
    return { success: true }
  } catch (error: any) {
    console.error("Failed to delete product:", error)
    return { success: false, error: error.message || "Failed to connect to the database." }
  }
}
