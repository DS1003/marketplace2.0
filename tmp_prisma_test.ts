import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const p = new PrismaClient({ adapter })

console.log(Object.keys(p).filter(k => typeof (p as any)[k] === 'object' && !k.startsWith('_')));
process.exit(0);
