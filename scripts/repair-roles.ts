import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const shopOwners = await prisma.shop.findMany({
    select: { ownerId: true }
  })
  
  const ownerIds = shopOwners.map(s => s.ownerId)
  
  const result = await prisma.user.updateMany({
    where: {
      id: { in: ownerIds },
      role: "CUSTOMER"
    },
    data: { role: "SELLER" }
  })
  
  console.log(`Updated ${result.count} users to SELLER role.`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
