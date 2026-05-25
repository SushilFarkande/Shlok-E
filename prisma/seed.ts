import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { products, services } from '../src/lib/data'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create an admin user (password: admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminEmail = 'admin@shlokenterprises.com'
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  })
  console.log(`Created admin user with email: ${admin.email}`)

  // Seed Products
  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.description,
        image: p.image,
      },
    })
    console.log(`Created product: ${product.name}`)
  }

  // Seed Services
  for (const s of services) {
    const service = await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
      },
    })
    console.log(`Created service: ${service.title}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
