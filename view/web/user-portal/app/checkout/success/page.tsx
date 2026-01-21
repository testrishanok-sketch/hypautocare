"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Package, Truck, MapPin, Mail, Phone, ArrowRight, Copy, Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useOrders } from "@/context/order-context"
import Loading from "./loading"

export default function CheckoutSuccessPage() {
  const [copied, setCopied] = useState(false)
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || ""
  const { getOrder } = useOrders()
  const order = getOrder(orderId)

  const estimatedDelivery = order 
    ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <PromoBanner />
      <Header />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon & Message */}
          <div className="text-center mb-10">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-50" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm mb-8">
            {/* Order ID */}
            <div className="bg-foreground text-background p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm opacity-80 mb-1">Order Number</p>
                  <p className="font-bold text-xl">{orderId}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={copyOrderId}
                  className="w-fit bg-background text-foreground hover:bg-background/90"
                >
                  {copied ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Copy className="w-4 h-4" />
                      Copy Order ID
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="p-5 md:p-6">
              <h3 className="font-semibold mb-5">Order Status</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-green-500 via-foreground to-muted" />
                
                <div className="space-y-6">
                  {/* Step 1 - Confirmed */}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-green-600">Order Confirmed</p>
                      <p className="text-sm text-muted-foreground">Your order has been placed successfully</p>
                    </div>
                  </div>

                  {/* Step 2 - Processing */}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Package className="w-4 h-4 text-background" />
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold">Processing</p>
                      <p className="text-sm text-muted-foreground">We're preparing your order for shipment</p>
                    </div>
                  </div>

                  {/* Step 3 - Shipped */}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-muted border-2 border-border flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-muted-foreground">Shipped</p>
                      <p className="text-sm text-muted-foreground">Your order will be shipped soon</p>
                    </div>
                  </div>

                  {/* Step 4 - Delivered */}
                  <div className="flex gap-4">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-muted border-2 border-border flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-muted-foreground">Delivered</p>
                      <p className="text-sm text-muted-foreground">Estimated: {estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {order && (
              <div className="p-5 md:p-6 border-t border-border bg-muted/30">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>Rs. {order.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={order.shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                      {order.shippingCost === 0 ? "FREE" : `Rs. ${order.shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border font-bold text-base">
                    <span>Total Paid</span>
                    <span>Rs. {order.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* What's Next */}
          <div className="bg-background rounded-xl border border-border p-5 md:p-6 mb-8 shadow-sm">
            <h3 className="font-semibold mb-5">What happens next?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an order confirmation email with your receipt shortly.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Shipping Updates</p>
                  <p className="text-sm text-muted-foreground">
                    We'll send you shipping updates via email and SMS once your order is dispatched.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium">Need Help?</p>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team at support@HYPE.in or call +91 98765 43210
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/orders">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                <ShoppingBag className="w-4 h-4 mr-2" />
                View My Orders
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Social Share */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">Share your purchase with friends</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-foreground hover:text-background transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-foreground hover:text-background transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-foreground hover:text-background transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="sr-only">Share on WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
