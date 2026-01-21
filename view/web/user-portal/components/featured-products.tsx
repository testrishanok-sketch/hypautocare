"use client"

import React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"

const products = [
  {
    id: "car-duster",
    name: "HYPE ZIP ZAP Car Duster",
    subtitle: "with Ceramic Wax infused fibres",
    image: "/images/product-duster.jpg",
    price: 889,
    originalPrice: 1290,
    href: "/products/car-duster",
  },
  {
    id: "microfibre-towel",
    name: "HYPE Coral Fleece Microfibre Towel",
    subtitle: "550 GSM",
    image: "/images/product-towel.jpg",
    price: 419,
    originalPrice: null,
    href: "/products/microfibre-towel",
  },
  {
    id: "car-perfume",
    name: "HYPE Aqua",
    subtitle: "Refreshing Car Perfume",
    image: "/images/product-perfume.jpg",
    price: 790,
    originalPrice: 1899,
    href: "/products/car-perfume",
  },
  {
    id: "tyre-trim-restorer",
    name: "HYPE Tyre & Trim Restorer",
    subtitle: "Spray Coating",
    image: "/images/product-tyre-spray.jpg",
    price: 679,
    originalPrice: 1290,
    href: "/products/tyre-trim-restorer",
  },
]

export function FeaturedProducts() {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
  }

  return (
    <section id="featured" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link key={product.name} href={product.href}>
              <Card className="group overflow-hidden border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-500 text-white">
                        Sale
                      </Badge>
                    )}
                    {/* Quick Add to Cart */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute bottom-3 right-3 w-10 h-10 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-foreground hover:text-background"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary/80 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-bold">Rs. {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button size="lg" variant="outline" className="bg-transparent">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
