"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Scale, ScrollText, Clock, FileText, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
    return (SectionWrapper(
        <div className="min-h-screen bg-[#FDFBF7]">
            <Header />

            <main className="pt-32 pb-20">
                {/* Header / Hero */}
                <section className="relative overflow-hidden py-24 px-6 mb-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-primary/5 rounded-full blur-[120px] -z-10" />
                    <div className="max-w-5xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white shadow-xl shadow-black/5 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10"
                        >
                            <ShieldCheck className="w-4 h-4" /> Centre de Confiance Moomel
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-6xl md:text-8xl font-bold italic text-[#2D241E] leading-[1.1] tracking-tight"
                        >
                            Conditions <span className="text-primary not-italic">Générales</span> de Vente
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                            Dernière mise à jour : <span className="text-primary font-bold">10 Mars 2026</span>.
                            <br />Ce document régit les relations contractuelles entre Moomel, ses vendeurs et ses clients.
                        </motion.p>
                    </div>
                </section>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                        {/* Sticky Sidebar Navigation */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-32 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.4em] px-4">Sections</p>
                                    <nav className="space-y-1">
                                        {sections.map((section) => (
                                            <a
                                                key={section.id}
                                                href={`#${section.id}`}
                                                className="block px-6 py-4 rounded-2xl transition-all font-bold text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary group flex items-center justify-between"
                                            >
                                                <span className="flex items-center gap-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                                                    {section.title}
                                                </span>
                                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="p-10 bg-[#2D241E] rounded-[3rem] text-white space-y-6 relative overflow-hidden group shadow-2xl shadow-black/20">
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                                    <Scale className="w-10 h-10 text-primary" />
                                    <div className="space-y-2 relative">
                                        <h4 className="font-bold text-xl leading-tight italic">Assistance <span className="text-primary not-italic">Juridique</span></h4>
                                        <p className="text-white/50 text-xs font-medium leading-relaxed">Une question sur un article ? Notre équipe vous répond sous 24h.</p>
                                    </div>
                                    <a href="mailto:support@moomel.sn" className="block w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl text-center text-primary font-black text-[10px] uppercase tracking-widest transition-all">Support Legale</a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Text Content */}
                        <div className="lg:col-span-3 space-y-24">
                            {sections.map((section, index) => (SectionItem(section, index)))}

                            {/* Final Footer Sign-off Inside Content */}
                            <motion.section
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pt-12 border-t border-border/50"
                            >
                                <div className="p-16 bg-white rounded-[4rem] shadow-2xl shadow-black/5 border-2 border-primary/5 text-center space-y-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8">
                                        <ScrollText className="w-24 h-24 text-primary/5 -rotate-12" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-[#2D241E] italic">Engagement <span className="text-primary not-italic">Moomel</span></h3>
                                    <p className="text-muted-foreground text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                                        "En utilisant notre plateforme, vous contribuez à un écosystème éthique qui valorise le savoir-faire africain.
                                        Ces conditions protègent votre passion et votre confiance."
                                    </p>
                                    <div className="flex justify-center gap-4 pt-4">
                                        <div className="px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Équité</div>
                                        <div className="px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Sécurité</div>
                                        <div className="px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Qualité</div>
                                    </div>
                                </div>
                            </motion.section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    ))
}

function SectionWrapper(children: any) {
    return children
}

function SectionItem(section: any, index: number) {
    return (
        <motion.section
            key={section.title}
            id={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="scroll-mt-32 space-y-8 group"
        >
            <div className="flex items-center gap-6">
                <span className="text-[6rem] font-black text-primary/5 leading-none select-none group-hover:text-primary/10 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-4xl font-bold text-[#2D241E] tracking-tight">{section.title}</h2>
            </div>
            <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-black/5 border border-border/40 text-[#4A3D36] text-xl leading-relaxed font-medium space-y-8 transition-all hover:shadow-primary/5 hover:border-primary/10">
                {section.content}
            </div>
        </motion.section>
    )
}

const sections = [
    {
        id: "objet",
        title: "Objet",
        content: (
            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                Les présentes Conditions Générales de Vente (CGV) définissent les modalités et conditions dans lesquelles
                <span className="text-primary font-bold"> Moomel</span> (ci-après “la Marketplace”) permet aux utilisateurs (vendeurs et acheteurs) d’utiliser ses services
                pour acheter et vendre des produits cosmétiques naturels.
            </p>
        )
    },
    {
        id: "parties",
        title: "Définition des parties",
        content: (
            <ul className="space-y-6">
                <li className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold italic">M</div>
                    <p><strong>La Marketplace :</strong> Plateforme technologique facilitant les transactions sécurisées entre vendeurs et acheteurs.</p>
                </li>
                <li className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold italic">V</div>
                    <p><strong>Le vendeur :</strong> Toute personne ou entité inscrite et autorisée à commercialiser ses produits sur la Marketplace après approbation de son profil.</p>
                </li>
                <li className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold italic">A</div>
                    <p><strong>L’acheteur :</strong> Le client final agissant en tant que consommateur pour ses besoins personnels, disposant de la capacité juridique de contracter.</p>
                </li>
            </ul>
        )
    },
    {
        id: "produits",
        title: "Produits et services",
        content: (
            <div className="space-y-6">
                <p>La marketplace propose exclusivement des produits cosmétiques naturels, conformes aux lois en vigueur et aux critères de qualité définis par Moomel.</p>
                <div className="p-8 bg-[#FDFBF7] rounded-[2rem] border-l-4 border-primary italic text-lg">
                    "En cas de rupture de stock, l'indisponibilité est mentionnée directement sur la fiche produit."
                </div>
                <p>La sélection et l’achat d’un produit relèvent de la responsabilité exclusive du client. Nous conseillons de lire attentivement la liste des ingrédients.</p>
            </div>
        )
    },
    {
        id: "prix",
        title: "Prix et Livraison",
        content: (
            <div className="space-y-6">
                <div className="flex gap-4 flex-wrap">
                    <div className="px-6 py-3 bg-primary/5 rounded-2xl border border-primary/10 font-black text-primary">$ USD</div>
                    <div className="px-6 py-3 bg-primary/5 rounded-2xl border border-primary/10 font-black text-primary">€ EUR</div>
                    <div className="px-6 py-3 bg-primary/5 rounded-2xl border border-primary/10 font-black text-primary">FCFA</div>
                </div>
                <p>Les prix sont fixés par les vendeurs. La marketplace applique une commission de pourcentage incluse dans le prix final payé par l’acheteur.</p>
                <p className="font-bold underline decoration-primary decoration-4 underline-offset-8">Les frais de livraison sont calculés automatiquement et affichés avant la validation du panier.</p>
            </div>
        )
    },
    {
        id: "paiement",
        title: "Paiement",
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-[2rem] bg-[#F8F9FA] border border-border/50 space-y-4">
                        <FileText className="w-8 h-8 text-primary" />
                        <h4 className="font-bold">Cartes Bancaires</h4>
                        <p className="text-sm">Visa, Mastercard, AMEX.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-[#F8F9FA] border border-border/50 space-y-4">
                        <div className="font-bold italic text-blue-600 text-2xl">Paypal</div>
                        <h4 className="font-bold">E-Wallet</h4>
                        <p className="text-sm">Sécurisé & Rapide.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/20 space-y-4">
                        <Clock className="w-8 h-8 text-primary" />
                        <h4 className="font-bold">À la livraison</h4>
                        <p className="text-sm">Dakar & Environs uniquement.</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground italic">En cas de défaut de paiement à la livraison, la vente sera résiliée de plein droit et les produits devront être restitués.</p>
            </div>
        )
    },
    {
        id: "livraison",
        title: "Suivi & Réception",
        content: (
            <div className="space-y-6">
                <p>La livraison s'effectue à l'adresse indiquée. Les vendeurs sont responsables de l'expédition (sauf exception Moomel Fulfilled).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h5 className="font-black text-[10px] uppercase tracking-widest text-primary">Suivi Colis</h5>
                        <p className="text-lg">Un numéro de suivi est envoyé par email dès l'expédition.</p>
                    </div>
                    <div className="space-y-2">
                        <h5 className="font-black text-[10px] uppercase tracking-widest text-primary">Vérification</h5>
                        <p className="text-lg">Vérifiez vos produits à la prise de possession. Si endommagé, refusez-le !</p>
                    </div>
                </div>
                <p className="p-6 bg-[#2D241E] text-white rounded-[2rem] text-base leading-relaxed">
                    <strong>Solution Litige :</strong> En cas de retard ou perte, le vendeur doit trouver une solution. Moomel intervient comme médiateur si nécessaire.
                </p>
            </div>
        )
    },
    {
        id: "retractation",
        title: "Retours",
        content: (
            <div className="space-y-6">
                <p>Tout retour doit faire l’objet d’un accord formel entre le vendeur et l'acquéreur via l'interface Moomel.</p>
                <div className="p-10 bg-red-500 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-red-500/20">
                    <ShieldCheck className="w-12 h-12" />
                    <h4 className="text-2xl font-bold italic">Protection de l'hygiène</h4>
                    <p className="text-white/80 font-medium">
                        Pour des raisons de santé publique et d'hygiène, les produits cosmétiques scellés ne peuvent en aucun cas être retournés s'ils ont été descellés ou ouverts par le client après la livraison.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "responsabilite",
        title: "Responsabilité",
        content: (
            <p>
                Moomel agit en qualité d'intermédiaire. Nous mettons tout en œuvre pour garantir le sérieux des vendeurs, mais nous ne saurions être tenus responsables des litiges relatifs à la livraison ou à la qualité intrinsèque des produits des vendeurs tiers.
            </p>
        )
    },
    {
        id: "données",
        title: "Confidentialité",
        content: (
            <p>
                Nous protégeons vos données. Toutes les informations collectées lors de vos achats sont traitées selon les normes de sécurité les plus strictes et conformément à notre Politique de Confidentialité.
            </p>
        )
    },
    {
        id: "modification",
        title: "Évolution",
        content: (
            <p>
                Moomel se réserve le droit de modifier ces CGV. Les nouvelles versions s'appliquent dès leur publication pour toute nouvelle commande.
            </p>
        )
    }
]
