"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Shield, Truck, CreditCard, Wallet, Building2, ChevronDown, ChevronUp, Lock, BadgeCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useOrders } from "@/context/order-context"

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  })

  const shippingCost = totalPrice >= 499 ? 0 : 49
  const grandTotal = totalPrice + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    const orderId = addOrder({
      items: items,
      totalPrice: totalPrice,
      shippingCost: shippingCost,
      grandTotal: grandTotal,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: paymentMethod,
    })

    clearCart()
    router.push(`/checkout/success?orderId=${orderId}`)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <PromoBanner />
        <Header />
        
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
            <p className="text-muted-foreground mb-8">
              Your cart is empty. Add some products before proceeding to checkout.
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
    <main className="min-h-screen bg-muted/30">
      <PromoBanner />
      <Header />

      {/* Progress Bar */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Cart</span>
            <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180" />
            <span className="font-semibold text-foreground">Checkout</span>
            <ChevronLeft className="w-4 h-4 text-muted-foreground rotate-180" />
            <span className="text-muted-foreground">Success</span>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="w-full flex items-center justify-between bg-background p-4 rounded-xl border border-border shadow-sm"
          >
            <span className="font-medium">
              {showOrderSummary ? "Hide" : "Show"} order summary ({totalItems} items)
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold">Rs. {grandTotal.toLocaleString()}</span>
              {showOrderSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>
          
          {showOrderSummary && (
            <div className="bg-background p-4 rounded-b-xl border border-t-0 border-border shadow-sm -mt-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3 border-b border-border last:border-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                  <p className="text-sm font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Information */}
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">1</div>
                <h2 className="text-lg font-bold">Contact Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Checkbox id="updates" className="border-muted-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                  <Label htmlFor="updates" className="text-sm font-normal text-muted-foreground cursor-pointer">
                    Email me with news and offers
                  </Label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">2</div>
                <h2 className="text-lg font-bold">Shipping Address</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="House no, Street name" 
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                  />
                </div>
                <div>
                  <Label htmlFor="apartment" className="text-sm font-medium">Apartment, suite, etc. (optional)</Label>
                  <Input 
                    id="apartment" 
                    placeholder="Apartment, suite, etc." 
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Mumbai" 
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium">State</Label>
                    <Input 
                      id="state" 
                      placeholder="Maharashtra" 
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pincode" className="text-sm font-medium">PIN Code</Label>
                    <Input 
                      id="pincode" 
                      placeholder="400001" 
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="mt-2 h-12 bg-muted/50 border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                    <Input id="country" value="India" disabled className="mt-2 h-12 bg-muted border-muted-foreground/10 rounded-lg text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Checkbox id="saveAddress" defaultChecked className="border-muted-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground" />
                  <Label htmlFor="saveAddress" className="text-sm font-normal text-muted-foreground cursor-pointer">
                    Save this address for future orders
                  </Label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">3</div>
                <h2 className="text-lg font-bold">Payment Method</h2>
              </div>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <label
                  htmlFor="card"
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "card" 
                      ? "border-foreground bg-foreground/5 shadow-sm" 
                      : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30"
                  }`}
                >
                  <RadioGroupItem value="card" id="card" className="border-muted-foreground/30 text-foreground" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Credit / Debit Card</p>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                  </div>
                </label>

                <label
                  htmlFor="upi"
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "upi" 
                      ? "border-foreground bg-foreground/5 shadow-sm" 
                      : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30"
                  }`}
                >
                  <RadioGroupItem value="upi" id="upi" className="border-muted-foreground/30 text-foreground" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">UPI</p>
                    <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                  </div>
                </label>

                <label
                  htmlFor="netbanking"
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "netbanking" 
                      ? "border-foreground bg-foreground/5 shadow-sm" 
                      : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30"
                  }`}
                >
                  <RadioGroupItem value="netbanking" id="netbanking" className="border-muted-foreground/30 text-foreground" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Net Banking</p>
                    <p className="text-sm text-muted-foreground">All major banks supported</p>
                  </div>
                </label>

                <label
                  htmlFor="cod"
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === "cod" 
                      ? "border-foreground bg-foreground/5 shadow-sm" 
                      : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30"
                  }`}
                >
                  <RadioGroupItem value="cod" id="cod" className="border-muted-foreground/30 text-foreground" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay when you receive</p>
                  </div>
                </label>
              </RadioGroup>

              {/* Card Details (shown when card is selected) */}
              {paymentMethod === "card" && (
                <div className="mt-5 p-5 bg-muted/50 rounded-xl border border-muted-foreground/10 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2 h-12 bg-background border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-2 h-12 bg-background border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
                      <Input id="cvv" type="password" placeholder="***" className="mt-2 h-12 bg-background border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-sm font-medium">Name on Card</Label>
                    <Input id="cardName" placeholder="JOHN DOE" className="mt-2 h-12 bg-background border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" />
                  </div>
                </div>
              )}

              {/* UPI ID (shown when UPI is selected) */}
              {paymentMethod === "upi" && (
                <div className="mt-5 p-5 bg-muted/50 rounded-xl border border-muted-foreground/10">
                  <Label htmlFor="upiId" className="text-sm font-medium">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@upi" className="mt-2 h-12 bg-background border-muted-foreground/20 focus:border-foreground focus:ring-foreground/20 rounded-lg" />
                </div>
              )}
            </div>

            {/* Place Order Button (Mobile) */}
            <div className="lg:hidden">
              <Button
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Place Order - Rs. {grandTotal.toLocaleString()}
                  </span>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

            {/* Back to Cart */}
            <div className="pb-4">
              <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Return to cart
              </Link>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold mb-5">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 pb-5 border-b border-border max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </div>
                    <p className="text-sm font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="py-5 border-b border-border">
                <div className="flex gap-2">
                  <Input placeholder="Coupon code" className="flex-1 h-11 bg-muted/50 border-muted-foreground/20 rounded-lg" />
                  <Button variant="outline" className="bg-transparent h-11 px-5 rounded-lg border-muted-foreground/30 hover:border-foreground">Apply</Button>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 py-5 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-semibold" : "font-medium"}>
                    {shippingCost === 0 ? "FREE" : `Rs. ${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (included)</span>
                  <span className="font-medium">Rs. 0</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between py-5 border-b border-border">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">Rs. {grandTotal.toLocaleString()}</span>
              </div>

              {/* Place Order Button */}
              <div className="pt-5">
                <Button
                  size="lg"
                  className="w-full h-14 text-base font-semibold rounded-xl"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Place Order
                    </span>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  By placing this order, you agree to our Terms & Privacy Policy
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-5 mt-5 border-t border-border">
                <div className="flex flex-col items-center text-center gap-1">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <BadgeCheck className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">100% Genuine</span>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="mt-5 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">Estimated Delivery</p>
                    <p className="text-xs text-green-600 dark:text-green-500">3-5 business days</p>
                  </div>
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
