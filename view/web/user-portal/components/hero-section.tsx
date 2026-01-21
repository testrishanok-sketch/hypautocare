import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden">
      <Image
        src="/images/hero-banner.jpg"
        alt="Premium car care"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
              Premium Car Care Products
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Crafted with pride, made in India. Give your car the care it deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
                <Link href="#featured">Shop All</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10 bg-transparent">
                <Link href="#collections">View Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
