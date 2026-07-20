"use server"

export async function initiatePaydunyaPayment(orderId: string, amount: number) {
  try {
    const isTest = process.env.PAYDUNYA_MODE !== "live";
    const endpoint = isTest 
      ? "https://app.paydunya.com/sandbox-api/v1/checkout-invoice/create"
      : "https://app.paydunya.com/api/v1/checkout-invoice/create";

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const payload = {
      invoice: {
        total_amount: amount,
        description: `Commande #${orderId} sur Moomel`,
        items: {
          item_0: {
            name: `Commande #${orderId}`,
            quantity: 1,
            unit_price: amount,
            total_price: amount,
            description: "Paiement de votre commande Moomel"
          }
        }
      },
      store: {
        name: "Moomel",
        tagline: "L'artisanat du futur",
        phone: "221770000000",
        postal_address: "Dakar, Sénégal",
        website_url: baseUrl,
        logo_url: `${baseUrl}/images/logo.png`
      },
      actions: {
        cancel_url: `${baseUrl}/checkout?step=1&cancel=true`,
        return_url: `${baseUrl}/checkout?step=3&orderId=${orderId}`,
        callback_url: `${baseUrl}/api/webhook/paydunya`
      },
      custom_data: {
        order_id: orderId
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY || "",
        "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY || "",
        "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN || ""
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.response_code === "00") {
      return {
        success: true,
        redirect_url: data.response_text // In PAR, response_text is the redirect URL
      };
    } else {
      console.error("PayDunya API Error Details:", data);
      return {
        success: false,
        error: data.response_text || "Erreur lors de l'initiation du paiement"
      };
    }
  } catch (error) {
    console.error("PayDunya Integration Error:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'initiation du paiement. Veuillez réessayer."
    };
  }
}
