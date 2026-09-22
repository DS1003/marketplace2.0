"use server"

import { Resend } from "resend"
import { OrderConfirmationEmail, OrderItemEmailProps } from "../emails/order-confirmation"
import { ShopApprovedEmail } from "../emails/shop-approved"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export interface SendOrderEmailInput {
  to: string
  customerName: string
  orderId: string
  orderDate?: string
  paymentMethod: string
  paymentStatus: string
  shippingAddress: string
  city: string
  phone: string
  items: OrderItemEmailProps[]
  subtotal: number
  shippingFee: number
  taxFee: number
  total: number
}

export async function sendOrderConfirmationEmail(params: SendOrderEmailInput) {
  try {
    const { to, customerName, orderId, total } = params
    const shortId = orderId.length > 8 ? orderId.slice(-8).toUpperCase() : orderId.toUpperCase()

    if (!to) {
      console.warn("No recipient email provided for order confirmation:", orderId)
      return { success: false, error: "Recipient email is missing" }
    }

    if (!resend) {
      console.warn(`[SIMULATION EMAIL] RESEND_API_KEY is missing. Email would be sent to: ${to} for Order #${shortId}`)
      return { success: true, simulated: true }
    }

    const data = await resend.emails.send({
      from: "Moomel <commandes@moomel.sn>",
      to: [to],
      subject: `✨ Confirmation de commande Moomel #${shortId}`,
      react: OrderConfirmationEmail({
        ...params,
        trackingUrl: `${process.env.NEXTAUTH_URL || "https://moomel.sn"}/account`,
      }),
    })

    console.log("Order confirmation email sent successfully via Resend:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

export async function sendShopApprovedEmail(to: string, sellerName: string, shopName: string) {
  try {
    if (!to) return { success: false, error: "No recipient email" }

    if (!resend) {
      console.warn(`[SIMULATION EMAIL] RESEND_API_KEY is missing. Shop approval email would be sent to: ${to}`)
      return { success: true, simulated: true }
    }

    const data = await resend.emails.send({
      from: "Moomel Artisans <artisans@moomel.sn>",
      to: [to],
      subject: "🎉 Félicitations, votre boutique Moomel est approuvée !",
      react: ShopApprovedEmail({ sellerName, shopName }),
    })

    return { success: true, data }
  } catch (error) {
    console.error("Error sending shop approval email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
