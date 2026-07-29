import { NextResponse } from "next/server";
import { createHash } from "crypto";
import prisma from "@/lib/prisma";
import qs from "qs";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const parsedBody = qs.parse(rawBody);

    // PayDunya sends the payload under the 'data' key
    const data = parsedBody.data as any;

    if (!data) {
      console.error("No 'data' found in webhook payload");
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const { status, hash, custom_data, invoice } = data;

    // 1. Verify Hash
    const masterKey = process.env.PAYDUNYA_MASTER_KEY;
    if (!masterKey) {
      console.error("PAYDUNYA_MASTER_KEY not found in environment variables");
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const calculatedHash = createHash("sha512").update(masterKey).digest("hex");

    if (hash !== calculatedHash) {
      console.error("Invalid PayDunya Hash received");
      return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
    }

    // 2. Process payment status
    if (status === "completed") {
      const orderId = custom_data?.order_id;
      if (!orderId) {
        console.error("No order_id in custom_data");
        return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
      }

      // 3. Verify order exists and amount matches
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  shop: true
                }
              }
            }
          }
        }
      });

      if (!order) {
        console.error(`Order ${orderId} not found`);
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      // Verify the paid amount matches the order total (allow 1 FCFA tolerance for rounding)
      const paidAmount = Number(invoice?.total_amount || 0);
      if (Math.abs(order.total - paidAmount) > 1) {
        console.error(`Amount mismatch: order=${order.total}, paid=${paidAmount}`);
        return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
      }

      // Prevent double-processing
      if (order.paymentStatus === "PAID") {
        console.log(`Order ${orderId} already marked as PAID, skipping`);
        return NextResponse.json({ success: true, message: "Already processed" }, { status: 200 });
      }

      // 4. Update order status and credit seller wallets in a transaction
      await prisma.$transaction(async (tx) => {
        // Mark order as paid
        await tx.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: "PAID",
            status: "PAID",
          },
        });

        // Calculate revenue per seller and credit their wallets
        const sellerRevenue = new Map<string, number>();
        for (const item of order.items) {
          const sellerId = item.product.shop.ownerId;
          const itemTotal = item.price * item.quantity;
          sellerRevenue.set(sellerId, (sellerRevenue.get(sellerId) || 0) + itemTotal);
        }

        for (const [sellerId, revenue] of sellerRevenue.entries()) {
          await tx.wallet.upsert({
            where: { userId: sellerId },
            create: {
              userId: sellerId,
              balance: revenue,
            },
            update: {
              balance: { increment: revenue },
            },
          });

          // Notify seller of payment received
          await (tx as any).notification.create({
            data: {
              userId: sellerId,
              title: "Paiement Reçu !",
              message: `Un paiement de ${revenue} FCFA a été crédité sur votre portefeuille pour la commande #${orderId.slice(-6).toUpperCase()}.`,
              type: "SUCCESS",
            },
          });
        }
      });

      console.log(`Order ${orderId} marked as PAID, seller wallets credited`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("PayDunya Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
