import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CollectionsSection } from "@/components/collections-section"
import { FeaturedProducts } from "@/components/featured-products"
import { MadeInIndia } from "@/components/made-in-india"
import { StorySection } from "@/components/story-section"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <PromoBanner />
      <Header />
      <HeroSection />
      <CollectionsSection />
      <FeaturedProducts />
      <MadeInIndia />
      <StorySection />
      <BlogSection />
      <Footer />
    </main>
  )
}
