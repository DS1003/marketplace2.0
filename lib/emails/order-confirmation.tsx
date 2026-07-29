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
} from "@react-email/components"
import * as React from "react"

interface OrderConfirmationEmailProps {
  customerName: string
  orderId: string
  total: number
}

export const OrderConfirmationEmail = ({
  customerName,
  orderId,
  total,
}: OrderConfirmationEmailProps) => {
  const formattedTotal = new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(total)

  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre commande Moomel #{orderId.slice(-6).toUpperCase()}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Merci pour votre commande !</Heading>
          <Text style={text}>Bonjour {customerName},</Text>
          <Text style={text}>
            Nous avons bien reçu votre commande <strong>#{orderId.slice(-6).toUpperCase()}</strong>.
            Nos artisans partenaires commencent déjà à préparer vos rituels avec le plus grand soin.
          </Text>
          
          <Section style={section}>
            <Text style={text}>
              <strong>Montant Total :</strong> {formattedTotal}
            </Text>
          </Section>

          <Text style={text}>
            Vous recevrez un nouvel e-mail dès que votre commande sera expédiée.
          </Text>
          
          <Hr style={hr} />
          <Text style={footer}>
            L'équipe Moomel - Rituels d'Afrique
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#FDFBF7",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "8px",
  boxShadow: "0 5px 10px rgba(20,50,70,.2)",
  marginTop: "20px",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "40px",
}

const h1 = {
  color: "#2D241E",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
}

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
}

const section = {
  backgroundColor: "#f4f4f4",
  padding: "10px 20px",
  borderRadius: "4px",
  margin: "20px 0",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
}
