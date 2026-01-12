import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Hack for Prisma 7 local proxy compatibility: Force TCP protocol
const connectionString = process.env.DATABASE_URL?.replace('prisma+postgres://', 'postgresql://');
console.log("DEBUG: Connection String is:", connectionString); // Debugging "base" error

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
