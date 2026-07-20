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
      const orderId = custom_data.order_id;
      if (orderId) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            paymentStatus: "PAID",
            status: "PAID",
          },
        });
        console.log(`Order ${orderId} marked as PAID via PayDunya`);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("PayDunya Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
