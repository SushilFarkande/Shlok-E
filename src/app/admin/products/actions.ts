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

export async function addProduct(formData: FormData) {
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
    
    // Create unique filename
    const safeName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${Date.now()}-${safeName}`
    const filepath = path.join(process.cwd(), "public", "uploads", filename)
    
    await writeFile(filepath, buffer)
    imageUrl = `/uploads/${filename}`
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
}

export async function updateProduct(id: number, formData: FormData) {
  await checkAuth()

  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const price = formData.get("price") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as File | null

  console.log("UPDATE PRODUCT CALLED for ID:", id)
  console.log("IMAGE RECIEVED:", image)
  if (image) {
    console.log("IMAGE SIZE:", image.size, "NAME:", image.name)
  }

  const dataToUpdate: any = {
    name,
    category,
    price,
    description,
  }

  if (image && image.size > 0 && image.name && image.name !== 'undefined') {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create unique filename
    const safeName = image.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${Date.now()}-${safeName}`
    const filepath = path.join(process.cwd(), "public", "uploads", filename)
    
    await writeFile(filepath, buffer)
    dataToUpdate.image = `/uploads/${filename}`
  }

  await prisma.product.update({
    where: { id },
    data: dataToUpdate,
  })

  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin/products")
}

export async function deleteProduct(id: number) {
  await checkAuth()
  
  await prisma.product.delete({
    where: { id },
  })

  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin/products")
}
