import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'

const url = process.env.DATABASE_URL?.replace('prisma+postgres://', 'postgresql://')

const prisma = new PrismaClient({
    accelerateUrl: url
})

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@hvu.nl'

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
        where: { role: Role.ADMIN }
    })

    if (existingAdmin) {
        console.log('Admin already exists')
        return
    }

    // Create Admin
    const admin = await prisma.user.create({
        data: {
            email: adminEmail,
            role: Role.ADMIN,
            name: 'Super Admin',
        }
    })

    console.log(`Created admin user: ${admin.email}`)
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
