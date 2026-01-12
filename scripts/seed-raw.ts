import { Client } from 'pg'
import 'dotenv/config'
import { randomUUID } from 'crypto'

async function main() {
    const connectionString = process.env.DATABASE_URL?.replace('prisma+postgres://', 'postgresql://')

    if (!connectionString) {
        console.error("No DATABASE_URL")
        process.exit(1)
    }

    const client = new Client({ connectionString })
    await client.connect()

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@hvu.nl'

    // Check exist (table name User is typically "User" in prisma default mapping, needs quotes)
    const res = await client.query('SELECT id FROM "User" WHERE role = $1', ['ADMIN'])
    if (res.rows.length > 0) {
        console.log("Admin exists")
    } else {
        const id = randomUUID()
        // We cast 'ADMIN' to Role enum just in case, or let PG handle it.
        // Prisma Enums are created as Types in PG usually.

        await client.query(`
            INSERT INTO "User" (id, email, role, name, "updatedAt")
            VALUES ($1, $2, 'ADMIN', 'Super Admin', NOW())
        `, [id, adminEmail])
        console.log(`Admin created: ${adminEmail}`)
    }

    await client.end()
}

main().catch(console.error)
