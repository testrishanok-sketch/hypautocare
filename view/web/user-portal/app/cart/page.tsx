"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

  const shippingThreshold = 499
  const freeShipping = totalPrice >= shippingThreshold
  const amountForFreeShipping = shippingThreshold - totalPrice

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <PromoBanner />
        <Header />
        
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    )
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
          <span className="text-foreground">Shopping Cart</span>
        </nav>
      </div>

      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart ({totalItems} items)</h1>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={clearCart}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        {/* Free Shipping Progress */}
        {!freeShipping && (
          <div className="bg-muted/50 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">
                Add <span className="font-semibold text-foreground">Rs. {amountForFreeShipping.toLocaleString()}</span> more to get <span className="font-semibold text-green-600">FREE shipping!</span>
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all duration-300"
                style={{ width: `${Math.min((totalPrice / shippingThreshold) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {freeShipping && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-700">You've unlocked FREE shipping!</p>
              <p className="text-sm text-green-600">Your order qualifies for free delivery.</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-4 md:p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link href={`/products/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          {item.subtitle}
                        </p>
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-semibold text-foreground hover:underline line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="font-bold text-foreground">
                        Rs. {item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Quantity & Subtotal */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mt-4">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Coupon Code</label>
                <div className="flex gap-2">
                  <Input placeholder="Enter code" className="flex-1" />
                  <Button variant="outline" className="bg-transparent">Apply</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Use FLAT10 for 10% off
                </p>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={freeShipping ? "text-green-600 font-medium" : ""}>
                    {freeShipping ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span>-</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 border-b border-border">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">Rs. {totalPrice.toLocaleString()}</span>
              </div>

              {/* EMI Option */}
              <p className="text-sm text-muted-foreground py-4">
                Or 3 interest free payments of <span className="font-semibold text-foreground">Rs. {Math.round(totalPrice / 3).toLocaleString()}</span>
              </p>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button size="lg" className="w-full h-12 text-base font-semibold mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  Fast Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
