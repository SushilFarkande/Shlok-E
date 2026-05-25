import { PrismaClient } from "@prisma/client"
import path from "path"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Construction of absolute path for SQLite on Vercel
const isProduction = process.env.NODE_ENV === "production"
const dbUrl = isProduction 
  ? `file:${path.join(process.cwd(), "prisma", "dev.db")}`
  : undefined

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: dbUrl ? {
    db: {
      url: dbUrl
    }
  } : undefined
})

if (!isProduction) globalForPrisma.prisma = prisma
