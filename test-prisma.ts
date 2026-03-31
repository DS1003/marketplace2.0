import prisma from "./lib/prisma"

async function main() {
  try {
    console.log("Checking Prisma Models...")
    console.log("User:", typeof prisma.user)
    console.log("Shop:", typeof prisma.shop)
    console.log("Notification:", typeof (prisma as any).notification)
    
    const count = await (prisma as any).notification.count()
    console.log("Notification count:", count)
  } catch (err) {
    console.error("Error:", err)
  }
}

main()
