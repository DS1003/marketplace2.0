import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { renderToStream } from "@react-pdf/renderer";
import { InvoicePDF } from "@/components/pdf/invoice-pdf";
import fs from "fs";
import path from "path";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { 
            product: {
              include: { shop: true }
            }
          }
        },
        user: true,
      }
    });

    if (!order) {
      return new NextResponse("Commande introuvable", { status: 404 });
    }

    // Security check: Only the buyer or an ADMIN/SUPER_ADMIN can download the invoice
    if (order.userId !== session.user.id && session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return new NextResponse("Interdit", { status: 403 });
    }

    const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = order.items.length > 0 ? 2500 : 0;
    const tax = Math.round(subtotal * 0.05);

    const invoiceItems = order.items.map((item: any) => ({
      name: `${item.product.name} (Vendeur: ${item.product.shop?.name || 'Inconnu'})`,
      quantity: item.quantity,
      price: item.price
    }));

    // Read logo file
    let logoDataUri = "";
    try {
      const logoPath = path.join(process.cwd(), "public/images/logo.png");
      if (fs.existsSync(logoPath)) {
         const logoBase64 = fs.readFileSync(logoPath, "base64");
         logoDataUri = `data:image/png;base64,${logoBase64}`;
      }
    } catch (e) {
      console.error("Erreur lecture logo:", e);
    }

    // React-pdf renderToStream
    const stream = await renderToStream(
      <InvoicePDF 
        orderId={order.id}
        date={order.createdAt.toLocaleDateString("fr-FR")}
        customerName={order.user.name || "Client"}
        customerAddress={order.shippingAddress || "Adresse non fournie"}
        customerCity={order.city || "Dakar"}
        customerPhone={order.phone || "Non fourni"}
        items={invoiceItems}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={order.total}
        logoDataUri={logoDataUri}
      />
    );

    // Provide the stream as a PDF response
    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="facture-moomel-${order.id.slice(-6)}.pdf"`,
      },
    });

  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
