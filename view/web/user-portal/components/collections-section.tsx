import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    name: "Car Interior",
    image: "/images/car-interior.jpg",
    href: "#",
  },
  {
    name: "Car Exterior",
    image: "/images/car-exterior.jpg",
    href: "#",
  },
  {
    name: "Microfiber Cloths",
    image: "/images/microfiber.jpg",
    href: "#",
  },
  {
    name: "Kits & Combos",
    image: "/images/kits-combos.jpg",
    href: "#",
  },
  {
    name: "Premium Car Perfumes",
    image: "/images/car-perfume.jpg",
    href: "#",
    subtitle: "Shift the Gears and Smell the Fierce!",
  },
]

export function CollectionsSection() {
  return (
    <section id="collections" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          COLLECTIONS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-muted"
            >
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm md:text-base">
                  {collection.name}
                </h3>
                {collection.subtitle && (
                  <p className="text-white/70 text-xs mt-1">{collection.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
