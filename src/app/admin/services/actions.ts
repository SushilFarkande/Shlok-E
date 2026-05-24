"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

async function checkAuth() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function addService(formData: FormData) {
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
}

export async function updateService(id: string, formData: FormData) {
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
}

export async function deleteService(id: string) {
  await checkAuth()
  
  await prisma.service.delete({
    where: { id },
  })

  revalidatePath("/")
  revalidatePath("/services")
  revalidatePath("/admin/services")
}
