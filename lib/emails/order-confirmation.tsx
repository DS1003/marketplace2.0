import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Img,
  Row,
  Column,
  Link,
} from "@react-email/components"
import * as React from "react"

export interface OrderItemEmailProps {
  name: string
  quantity: number
  price: number
  image?: string
  shopName?: string
}

export interface OrderConfirmationEmailProps {
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
  trackingUrl?: string
}

export const OrderConfirmationEmail = ({
  customerName = "Client Privilégié",
  orderId = "ORD-8F92A15B",
  orderDate = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  paymentMethod = "CASH",
  paymentStatus = "UNPAID",
  shippingAddress = "Corniche Ouest, Villa 104",
  city = "Dakar",
  phone = "+221 77 123 45 67",
  items = [
    {
      name: "Beurre de Karité Brut Bio 500g",
      quantity: 2,
      price: 6500,
      shopName: "Maison Baobab",
      image: "https://images.unsplash.com/photo-1608248597262-838d1a1d9539?w=300",
    },
    {
      name: "Huile de Baobab Pure Pressée à Froid",
      quantity: 1,
      price: 12000,
      shopName: "Artisans du Sine",
      image: "https://images.unsplash.com/photo-1608248597262-838d1a1d9539?w=300",
    },
  ],
  subtotal = 25000,
  shippingFee = 2500,
  taxFee = 1250,
  total = 28750,
  trackingUrl = "https://moomel.sn/account",
}: OrderConfirmationEmailProps) => {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount).replace("XOF", "FCFA")
  }

  const shortOrderId = orderId.length > 8 ? orderId.slice(-8).toUpperCase() : orderId.toUpperCase()
  const isPaid = paymentStatus === "PAID"
  const methodLabel = paymentMethod === "CASH" ? "Paiement à la livraison" : "PayDunya (Carte / Mobile Money)"

  return (
    <Html>
      <Head />
      <Preview>Récapitulatif de votre commande Moomel #{shortOrderId} - {formatMoney(total)}</Preview>
      <Body style={main}>
        {/* Outer background wrapper */}
        <Container style={container}>
          
          {/* HEADER / BRANDING BANNER */}
          <Section style={headerSection}>
            <Row>
              <Column align="center">
                <div style={logoBadge}>M O O M E L</div>
                <Text style={brandSubtitle}>ARTISANAT & RITUELS D'AFRIQUE</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={decorativeHr} />

          {/* HERO SECTION */}
          <Section style={heroSection}>
            <div style={badgeContainer}>
              <span style={heroBadge}>✓ COMMANDE CONFIRMÉE</span>
            </div>
            <Heading style={h1}>Merci pour votre commande !</Heading>
            <Text style={heroText}>
              Bonjour <strong>{customerName}</strong>,<br />
              Nous avons bien enregistré votre commande <strong>#{shortOrderId}</strong>. Nos artisans d'art et créateurs ont été notifiés et préparent vos produits avec le plus grand soin.
            </Text>
          </Section>

          {/* ORDER INFO CARDS GRID */}
          <Section style={infoGridSection}>
            <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
              <tr>
                {/* ORDER DETAILS BOX */}
                <td width="50%" style={{ verticalAlign: "top", paddingRight: "8px" }}>
                  <div style={infoCard}>
                    <Text style={cardHeaderTitle}>📦 Informations Commande</Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Nº Commande:</span> <strong>#{shortOrderId}</strong>
                    </Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Date:</span> {orderDate}
                    </Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Paiement:</span> {methodLabel}
                    </Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Statut:</span>{" "}
                      <span style={isPaid ? paidBadge : unpaidBadge}>
                        {isPaid ? "PAYÉ" : "À RÉGLER À LA LIVRAISON"}
                      </span>
                    </Text>
                  </div>
                </td>

                {/* SHIPPING DETAILS BOX */}
                <td width="50%" style={{ verticalAlign: "top", paddingLeft: "8px" }}>
                  <div style={infoCard}>
                    <Text style={cardHeaderTitle}>📍 Livraison</Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Destinataire:</span> <strong>{customerName}</strong>
                    </Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Adresse:</span> {shippingAddress}
                    </Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Ville:</span> {city}
                    </Text>
                    <Text style={infoItem}>
                      <span style={infoLabel}>Téléphone:</span> {phone}
                    </Text>
                  </div>
                </td>
              </tr>
            </table>
          </Section>

          {/* ITEMS SUMMARY TABLE */}
          <Section style={tableSection}>
            <Text style={sectionTitle}>🛒 Détail des Articles Commander ({items.length})</Text>
            
            <table width="100%" cellPadding="0" cellSpacing="0" style={itemsTable}>
              <thead>
                <tr style={tableHeaderRow}>
                  <th align="left" style={thStyle}>Produit & Artisan</th>
                  <th align="center" style={thStyle}>Qté</th>
                  <th align="right" style={thStyle}>Prix Unitaire</th>
                  <th align="right" style={thStyle}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} style={tableRowStyle}>
                    <td style={tdStyle}>
                      <table cellPadding="0" cellSpacing="0">
                        <tr>
                          {item.image && (
                            <td style={{ paddingRight: "12px" }}>
                              <Img
                                src={item.image}
                                width="48"
                                height="48"
                                alt={item.name}
                                style={productImage}
                              />
                            </td>
                          )}
                          <td>
                            <Text style={productName}>{item.name}</Text>
                            {item.shopName && (
                              <span style={shopTag}>✨ {item.shopName}</span>
                            )}
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td align="center" style={tdStyle}>
                      <span style={qtyBadge}>x{item.quantity}</span>
                    </td>
                    <td align="right" style={tdStyle}>
                      <Text style={priceText}>{formatMoney(item.price)}</Text>
                    </td>
                    <td align="right" style={tdStyle}>
                      <Text style={totalPriceText}>{formatMoney(item.price * item.quantity)}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {/* FINANCIAL BREAKDOWN */}
          <Section style={breakdownSection}>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td align="right">
                  <table width="260" cellPadding="0" cellSpacing="0" style={{ marginLeft: "auto" }}>
                    <tr>
                      <td style={summaryLabelCell}>Sous-total articles:</td>
                      <td align="right" style={summaryValueCell}>{formatMoney(subtotal)}</td>
                    </tr>
                    <tr>
                      <td style={summaryLabelCell}>Frais de livraison:</td>
                      <td align="right" style={summaryValueCell}>{formatMoney(shippingFee)}</td>
                    </tr>
                    <tr>
                      <td style={summaryLabelCell}>Taxes & Frais service:</td>
                      <td align="right" style={summaryValueCell}>{formatMoney(taxFee)}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Hr style={{ borderColor: "#E8E2D9", margin: "8px 0" }} />
                      </td>
                    </tr>
                    <tr style={totalRow}>
                      <td style={totalLabelCell}>Total Général:</td>
                      <td align="right" style={totalValueCell}>{formatMoney(total)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </Section>

          {/* ACTION BUTTON */}
          <Section style={ctaSection}>
            <Row>
              <Column align="center">
                <Link href={trackingUrl} style={ctaButton}>
                  Suivre ma commande en direct →
                </Link>
              </Column>
            </Row>
          </Section>

          {/* REASSURANCE NOTE */}
          <Section style={reassuranceSection}>
            <Text style={reassuranceText}>
              🌿 <strong>Engagement Éthique Moomel</strong> : Votre achat soutient directement l'autonomie des artisans et coopératives locales en Afrique de l'Ouest.
            </Text>
            <Text style={supportText}>
              Besoin d'aide ou d'une modification ? Notre conciergerie est à votre écoute à <Link href="mailto:support@moomel.sn" style={linkStyle}>support@moomel.sn</Link> ou via votre espace client.
            </Text>
          </Section>

          <Hr style={decorativeHr} />

          {/* FOOTER */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Moomel Marketplace • Rituels d'Artisanat Africain Premium<br />
              Dakar, Sénégal • <Link href="https://moomel.sn" style={footerLink}>www.moomel.sn</Link>
            </Text>
            <Text style={copyrightText}>
              © {new Date().getFullYear()} Moomel Inc. Tous droits réservés.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// STYLES OBJECT FOR HIGH COMPATIBILITY ACROSS EMAIL CLIENTS (GMAIL, OUTLOOK, APPLE MAIL)

const main = {
  backgroundColor: "#F4F0EA",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "30px 10px",
}

const container = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  border: "1px solid #E8E2D9",
  boxShadow: "0 10px 30px rgba(45, 36, 30, 0.06)",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden" as const,
  padding: "0",
}

const headerSection = {
  backgroundColor: "#2D241E",
  padding: "28px 20px 24px 20px",
  textAlign: "center" as const,
}

const logoBadge = {
  fontSize: "24px",
  fontWeight: 900,
  letterSpacing: "6px",
  color: "#FDFBF7",
  fontFamily: '"Times New Roman", Georgia, serif',
  display: "inline-block",
}

const brandSubtitle = {
  color: "#C85A32",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "3px",
  margin: "6px 0 0 0",
}

const decorativeHr = {
  borderColor: "#E8E2D9",
  margin: "0",
}

const heroSection = {
  padding: "32px 32px 20px 32px",
  textAlign: "left" as const,
}

const badgeContainer = {
  marginBottom: "12px",
}

const heroBadge = {
  backgroundColor: "#F5EBE6",
  color: "#C85A32",
  fontSize: "11px",
  fontWeight: 800,
  letterSpacing: "1px",
  padding: "6px 12px",
  borderRadius: "20px",
  display: "inline-block",
}

const h1 = {
  color: "#2D241E",
  fontSize: "22px",
  fontWeight: 800,
  margin: "12px 0 8px 0",
  lineHeight: "28px",
}

const heroText = {
  color: "#5C524A",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
}

const infoGridSection = {
  padding: "0 32px 20px 32px",
}

const infoCard = {
  backgroundColor: "#FAF8F5",
  borderRadius: "12px",
  border: "1px solid #EFEAE3",
  padding: "16px",
}

const cardHeaderTitle = {
  fontSize: "13px",
  fontWeight: 800,
  color: "#2D241E",
  margin: "0 0 10px 0",
}

const infoItem = {
  fontSize: "12px",
  color: "#4A403A",
  lineHeight: "18px",
  margin: "4px 0",
}

const infoLabel = {
  color: "#8C8077",
}

const paidBadge = {
  backgroundColor: "#DCFCE7",
  color: "#166534",
  fontSize: "10px",
  fontWeight: 800,
  padding: "2px 8px",
  borderRadius: "10px",
  display: "inline-block",
}

const unpaidBadge = {
  backgroundColor: "#FEF3C7",
  color: "#92400E",
  fontSize: "10px",
  fontWeight: 800,
  padding: "2px 8px",
  borderRadius: "10px",
  display: "inline-block",
}

const tableSection = {
  padding: "10px 32px 20px 32px",
}

const sectionTitle = {
  fontSize: "14px",
  fontWeight: 800,
  color: "#2D241E",
  margin: "0 0 14px 0",
  letterSpacing: "-0.2px",
}

const itemsTable = {
  borderCollapse: "collapse" as const,
  width: "100%",
}

const tableHeaderRow = {
  borderBottom: "2px solid #2D241E",
}

const thStyle = {
  fontSize: "11px",
  fontWeight: 700,
  color: "#8C8077",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  paddingBottom: "8px",
}

const tableRowStyle = {
  borderBottom: "1px solid #EFEAE3",
}

const tdStyle = {
  padding: "12px 0",
  verticalAlign: "middle",
}

const productImage = {
  borderRadius: "8px",
  objectFit: "cover" as const,
  border: "1px solid #E8E2D9",
}

const productName = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#2D241E",
  margin: "0",
  lineHeight: "16px",
}

const shopTag = {
  fontSize: "10px",
  fontWeight: 600,
  color: "#C85A32",
  display: "inline-block",
  marginTop: "2px",
}

const qtyBadge = {
  backgroundColor: "#F4F0EA",
  color: "#2D241E",
  fontSize: "11px",
  fontWeight: 700,
  padding: "4px 8px",
  borderRadius: "6px",
}

const priceText = {
  fontSize: "12px",
  color: "#5C524A",
  margin: "0",
}

const totalPriceText = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#2D241E",
  margin: "0",
}

const breakdownSection = {
  padding: "10px 32px 24px 32px",
}

const summaryLabelCell = {
  fontSize: "12px",
  color: "#8C8077",
  padding: "4px 0",
}

const summaryValueCell = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#2D241E",
  padding: "4px 0",
}

const totalRow = {
  marginTop: "6px",
}

const totalLabelCell = {
  fontSize: "14px",
  fontWeight: 900,
  color: "#2D241E",
  paddingTop: "6px",
}

const totalValueCell = {
  fontSize: "18px",
  fontWeight: 900,
  color: "#C85A32",
  paddingTop: "6px",
}

const ctaSection = {
  padding: "10px 32px 28px 32px",
  textAlign: "center" as const,
}

const ctaButton = {
  backgroundColor: "#2D241E",
  color: "#FDFBF7",
  fontSize: "13px",
  fontWeight: 800,
  letterSpacing: "0.5px",
  padding: "14px 28px",
  borderRadius: "30px",
  textDecoration: "none",
  display: "inline-block",
  boxShadow: "0 6px 16px rgba(45, 36, 30, 0.15)",
}

const reassuranceSection = {
  backgroundColor: "#FAF8F5",
  padding: "20px 32px",
  borderTop: "1px solid #EFEAE3",
  borderBottom: "1px solid #EFEAE3",
}

const reassuranceText = {
  fontSize: "12px",
  color: "#4A403A",
  lineHeight: "18px",
  margin: "0 0 8px 0",
}

const supportText = {
  fontSize: "11px",
  color: "#8C8077",
  lineHeight: "16px",
  margin: "0",
}

const linkStyle = {
  color: "#C85A32",
  fontWeight: 700,
  textDecoration: "underline",
}

const footerSection = {
  padding: "24px 32px",
  textAlign: "center" as const,
  backgroundColor: "#FFFFFF",
}

const footerText = {
  fontSize: "11px",
  color: "#8C8077",
  lineHeight: "16px",
  margin: "0 0 6px 0",
}

const footerLink = {
  color: "#2D241E",
  fontWeight: 700,
  textDecoration: "none",
}

const copyrightText = {
  fontSize: "10px",
  color: "#B3A8A0",
  margin: "0",
}
