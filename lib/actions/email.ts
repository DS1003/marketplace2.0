"use server"

import { Resend } from "resend"
import { OrderConfirmationEmail } from "../emails/order-confirmation"
import { ShopApprovedEmail } from "../emails/shop-approved"

// In a real scenario, the API key should be in process.env.RESEND_API_KEY
// For demo purposes, we define a dummy key if not present. Resend throws if key is empty.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendOrderConfirmationEmail(to: string, customerName: string, orderId: string, total: number) {
  try {
    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating email sending.")
      return { success: true }
    }

    const data = await resend.emails.send({
      from: "Moomel <commandes@moomel.sn>",
      to,
      subject: `Confirmation de commande Moomel #${orderId.slice(-6).toUpperCase()}`,
      react: OrderConfirmationEmail({ customerName, orderId, total }),
    })

    return { success: true, data }
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendShopApprovedEmail(to: string, sellerName: string, shopName: string) {
  try {
    if (!resend) {
      console.warn("RESEND_API_KEY is not set. Simulating email sending.")
      return { success: true }
    }

    const data = await resend.emails.send({
      from: "Moomel Artisans <artisans@moomel.sn>",
      to,
      subject: "Félicitations, votre boutique est approuvée !",
      react: ShopApprovedEmail({ sellerName, shopName }),
    })

    return { success: true, data }
  } catch (error) {
    console.error("Error sending shop approval email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
