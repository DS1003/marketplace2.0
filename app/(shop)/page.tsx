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
import { getPublicProducts } from "@/lib/actions/public"

export default async function HomePage() {
  const productsRes = await getPublicProducts()
  const products = productsRes.success ? productsRes.data : []

  return (
    <div className="flex flex-col">
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <FeaturedProducts initialProducts={products} />
      <MadeInSenegal />
      <WhyChooseUs />
      <Founders />
      <Testimonials />
      <BecomeSeller />
      <Newsletter />
      <CTASection />
    </div>
  )
}
