import Image from "next/image"
import { Button } from "@/components/ui/button"

export function MadeInIndia() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/story-image.jpg"
              alt="Made in India"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              CRAFTED WITH PRIDE, MADE IN INDIA
            </h2>
            <p className="text-background/80 text-lg leading-relaxed">
              Here at HYPE, every product is crafted with care and engineered 
              right here in India to deliver unmatched quality and performance 
              for your vehicle, redefining car care excellence worldwide.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-background text-background hover:bg-background hover:text-foreground bg-transparent"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
