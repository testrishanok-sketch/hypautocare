"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Minus, Plus, Star, Truck, Shield, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"

const product = {
  name: "HYPE Tyre & Trim Restorer Spray Coating",
  subtitle: "Unlock Code Black",
  price: 679,
  originalPrice: 1290,
  rating: 4.8,
  reviews: 234,
  images: [
    "/images/product-tyre-spray.jpg",
    "/images/tyre-spray-2.jpg",
    "/images/tyre-spray-3.jpg",
    "/images/tyre-spray-4.jpg",
  ],
  description: `Introducing India's first DIY Tyre & Trim Nano Polymer Coating from HYPE. Unlike ordinary polishes, "Unlock Code Black" delivers a protective nano polymer layer that restores and guards your vehicle's tyres and trims against cracking, fading, and environmental damage.`,
  features: [
    "Long-lasting protection up to 2 months",
    "Hydrophobic & dust-repellent formula",
    "Non-greasy, non-sticky finish",
    "Convenient aerosol spray application",
    "Restores faded tyres & trims",
    "UV protection against sun damage",
  ],
  specifications: [
    { label: "Volume", value: "250ml" },
    { label: "Coverage", value: "Up to 8 tyres" },
    { label: "Duration", value: "2 months protection" },
    { label: "Finish", value: "Satin Black" },
    { label: "Application", value: "Spray & Wipe" },
  ],
  howToUse: [
    "Clean the tyre or trim surface thoroughly",
    "Shake the can well before use",
    "Spray evenly from 15-20cm distance",
    "Allow to dry for 5-10 minutes",
    "Buff with microfiber cloth for best results",
  ],
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const router = useRouter()

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    addToCart(
      {
        id: "tyre-trim-restorer",
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
      },
      quantity
    )
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <main className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/" className="hover:text-foreground transition-colors">
            Car Exterior
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-500 text-white">
                {discount}% OFF
              </Badge>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.subtitle}
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                Rs. {product.price.toLocaleString()}.00
              </span>
              <span className="text-lg text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString()}.00
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                Save Rs. {(product.originalPrice - product.price).toLocaleString()}
              </Badge>
            </div>

            {/* EMI Option */}
            <p className="text-sm text-muted-foreground">
              Or 3 interest free payments of <span className="font-semibold text-foreground">Rs. {Math.round(product.price / 3)}</span>
            </p>

            <p className="text-sm text-muted-foreground">
              Taxes included. <Link href="/" className="underline hover:text-foreground">Shipping</Link> calculated at checkout.
            </p>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 h-12 text-base font-semibold" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 h-12 text-base font-semibold border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground">Free Shipping<br />Over Rs. 499</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground">100% Secure<br />Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground">Easy Returns<br />& Refunds</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 space-y-12">
          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div>
            <h2 className="text-xl font-bold mb-6">How to Use</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {product.howToUse.map((step, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-3 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Preview */}
          <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Customer Reviews</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating} out of 5</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>
              <Button variant="outline">Write a Review</Button>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-4">
              {[
                {
                  name: "Rahul M.",
                  date: "2 weeks ago",
                  rating: 5,
                  comment: "Amazing product! My tyres look brand new. The coating lasted for over 2 months even in heavy rain.",
                },
                {
                  name: "Priya S.",
                  date: "1 month ago",
                  rating: 5,
                  comment: "Easy to apply and gives a great matte finish. Much better than the greasy tyre polishes I used before.",
                },
                {
                  name: "Amit K.",
                  date: "1 month ago",
                  rating: 4,
                  comment: "Good product, works well on plastic trims too. Slightly expensive but worth it for the protection.",
                },
              ].map((review, index) => (
                <div key={index} className="bg-background rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-medium">{review.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="link" className="text-foreground">
                View All {product.reviews} Reviews
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
