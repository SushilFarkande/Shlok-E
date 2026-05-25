import { PrismaClient } from "@prisma/client"
import path from "path"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const isProduction = process.env.NODE_ENV === "production"
const dbPath = isProduction 
  ? `file:${path.join(process.cwd(), "prisma", "dev.db")}`
  : undefined // Fallback to schema/env value

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: dbPath ? { db: { url: dbPath } } : undefined
})

if (!isProduction) globalForPrisma.prisma = prisma
