"use server"

import { auth } from "@/auth"

const PAYTECH_API_URL = "https://paytech.sn/api/payment/request-payment"

export async function initiatePaytechPayment(orderId: string, amount: number) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Unauthorized" }
    }

    // Paytech requires the ipn_url to be HTTPS.
    // In local development, you should use a tunnel like ngrok and set NEXT_PUBLIC_BASE_URL or a dedicated PAYTECH_IPN_URL
    const baseUrl = process.env.PAYTECH_IPN_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"
    
    // Ensure the IPN URL is HTTPS for Paytech as it is a requirement
    const ipnUrl = baseUrl.startsWith('http://localhost') 
      ? 'https://dummy-webhook.moomel.com/api/webhook/paytech' // Placeholder if not tunneling
      : `${baseUrl}/api/webhook/paytech`;

    const payload = {
      item_name: `Commande Moomel #${orderId.slice(-6)}`,
      item_price: amount,
      currency: "XOF",
      ref_command: orderId,
      command_name: `Paiement de la commande Moomel #${orderId.slice(-6)}`,
      env: process.env.PAYTECH_ENV || "test",
      success_url: `${process.env.NEXTAUTH_URL}/checkout?step=3&orderId=${orderId}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout?error=PAYMENT_CANCELLED`,
      ipn_url: ipnUrl,
      custom_field: JSON.stringify({ userId: session.user.id }),
      api_key: process.env.PAYTECH_API_KEY,
      api_secret: process.env.PAYTECH_API_SECRET,
    }

    const response = await fetch(PAYTECH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "API_KEY": process.env.PAYTECH_API_KEY as string,
        "API_SECRET": process.env.PAYTECH_API_SECRET as string,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.success === 1) {
      return { success: true, redirect_url: data.redirect_url }
    } else {
      console.error("Paytech Error:", data)
      return { success: false, error: data.error?.[0] || "Payment initiation failed" }
    }
  } catch (error) {
    console.error("Paytech integration error:", error)
    return { success: false, error: "Internal server error" }
  }
}
