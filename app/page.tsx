import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustBar } from "@/components/trust-bar"
import { FeaturedCategories } from "@/components/featured-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { MadeInSenegal } from "@/components/made-in-senegal"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Founders } from "@/components/founders"
import { Testimonials } from "@/components/testimonials"
import { BecomeSeller } from "@/components/become-seller"
import { Newsletter } from "@/components/newsletter"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <FeaturedProducts />
      <MadeInSenegal />
      <WhyChooseUs />
      <Founders />
      <Testimonials />
      <BecomeSeller />
      <Newsletter />
      <CTASection />
      <Footer />
    </main>
  )
}
