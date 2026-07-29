import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#2D241E',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
  },
  headerRight: {
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    color: '#2D241E',
    fontWeight: 'bold',
  },
  invoiceInfo: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  col: {
    width: '45%',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D241E',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
  },
  table: {
    width: '100%',
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 8,
  },
  col1: { width: '50%' },
  col2: { width: '15%', textAlign: 'center' },
  col3: { width: '15%', textAlign: 'right' },
  col4: { width: '20%', textAlign: 'right' },
  th: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2D241E',
  },
  td: {
    fontSize: 10,
    color: '#333',
  },
  totals: {
    width: '40%',
    alignSelf: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 10,
    color: '#666',
  },
  totalValue: {
    fontSize: 10,
    color: '#333',
    textAlign: 'right',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2D241E',
  },
  grandTotalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D241E',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#999',
  }
});

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface InvoicePDFProps {
  orderId: string;
  date: string;
  customerName: string;
  customerAddress: string;
  customerCity: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  logoDataUri?: string;
}

export const InvoicePDF = ({
  orderId,
  date,
  customerName,
  customerAddress,
  customerCity,
  customerPhone,
  items,
  subtotal,
  shipping,
  tax,
  total,
  logoDataUri
}: InvoicePDFProps) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            {logoDataUri ? (
               <Image src={logoDataUri} style={{ width: 120, height: 40, marginBottom: 10, objectFit: 'contain' }} />
            ) : (
               <Text style={styles.title}>MOOMEL</Text>
            )}
            <Text style={styles.invoiceInfo}>Moomel Artisanat Sénégalais</Text>
            <Text style={styles.invoiceInfo}>contact@moomel.sn</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>FACTURE</Text>
            <Text style={styles.invoiceInfo}>N° CMD-{orderId.slice(-6).toUpperCase()}</Text>
            <Text style={styles.invoiceInfo}>Date: {date}</Text>
          </View>
        </View>

        {/* Addresses */}
        <View style={styles.section}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>FACTURÉ À :</Text>
            <Text style={styles.text}>{customerName}</Text>
            <Text style={styles.text}>{customerAddress}</Text>
            <Text style={styles.text}>{customerCity}</Text>
            <Text style={styles.text}>{customerPhone}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>ÉMIS PAR :</Text>
            <Text style={styles.text}>Moomel SN</Text>
            <Text style={styles.text}>Plateau, Dakar</Text>
            <Text style={styles.text}>Sénégal</Text>
            <Text style={styles.text}>NINEA: 000000000</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.col1}><Text style={styles.th}>DESCRIPTION</Text></View>
            <View style={styles.col2}><Text style={styles.th}>QTÉ</Text></View>
            <View style={styles.col3}><Text style={styles.th}>P.U</Text></View>
            <View style={styles.col4}><Text style={styles.th}>MONTANT</Text></View>
          </View>
          
          {items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.col1}><Text style={styles.td}>{item.name}</Text></View>
              <View style={styles.col2}><Text style={styles.td}>{item.quantity}</Text></View>
              <View style={styles.col3}><Text style={styles.td}>{formatPrice(item.price)}</Text></View>
              <View style={styles.col4}><Text style={styles.td}>{formatPrice(item.price * item.quantity)}</Text></View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total:</Text>
            <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Livraison:</Text>
            <Text style={styles.totalValue}>{formatPrice(shipping)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Taxes (5%):</Text>
            <Text style={styles.totalValue}>{formatPrice(tax)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalText}>TOTAL:</Text>
            <Text style={styles.grandTotalText}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Merci de votre confiance. Pour toute question concernant cette facture, veuillez contacter contact@moomel.sn.</Text>
          <Text style={styles.footerText}>Moomel - La marketplace de l'artisanat africain d'exception.</Text>
        </View>
      </Page>
    </Document>
  );
};
