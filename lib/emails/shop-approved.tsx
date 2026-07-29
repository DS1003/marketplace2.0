import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Text,
  Button,
} from "@react-email/components"
import * as React from "react"

interface ShopApprovedEmailProps {
  sellerName: string
  shopName: string
}

export const ShopApprovedEmail = ({
  sellerName,
  shopName,
}: ShopApprovedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Félicitations, votre boutique {shopName} est approuvée !</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bienvenue sur Moomel !</Heading>
          <Text style={text}>Bonjour {sellerName},</Text>
          <Text style={text}>
            Excellente nouvelle ! Votre boutique artisanale <strong>{shopName}</strong> a été examinée et approuvée par notre équipe.
          </Text>
          <Text style={text}>
            Vous pouvez dès maintenant commencer à ajouter vos produits, paramétrer vos informations et vendre vos créations au monde entier.
          </Text>
          
          <Button href="https://moomel.sn/seller" style={button}>
            Accéder au Dashboard
          </Button>
          
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

const button = {
  backgroundColor: "#2D241E",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  margin: "20px auto",
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
