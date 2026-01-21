"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, ChevronRight, MapPin, Calendar, CreditCard, Truck, CheckCircle2, Clock, Box, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PromoBanner } from "@/components/promo-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useOrders, type Order } from "@/context/order-context"

const statusConfig = {
  confirmed: {
    label: "Order Confirmed",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    icon: CheckCircle2,
  },
  processing: {
    label: "Processing",
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
    icon: Clock,
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
    icon: Package,
  },
}

function OrderCard({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const status = statusConfig[order.status]
  const StatusIcon = status.icon
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Order Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Box className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold">{order.id}</h3>
                <Badge className={`${status.color} border-0 font-medium`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(order.createdAt)} at {formatTime(order.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="font-bold text-lg">Rs. {order.grandTotal.toLocaleString()}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-4 md:p-6 bg-muted/30">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {order.items.slice(0, 4).map((item, index) => (
            <div key={item.id} className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted border border-border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              {item.quantity > 1 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center font-medium">
                  {item.quantity}
                </span>
              )}
              {index === 3 && order.items.length > 4 && (
                <div className="absolute inset-0 bg-foreground/70 rounded-lg flex items-center justify-center">
                  <span className="text-background text-sm font-bold">+{order.items.length - 4}</span>
                </div>
              )}
            </div>
          ))}
          <div className="flex-shrink-0 text-sm text-muted-foreground pl-2">
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Order Items */}
          <div className="p-4 md:p-6 border-b border-border">
            <h4 className="font-semibold mb-4">Order Items</h4>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted border border-border flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 p-4 md:p-6">
            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-semibold">Shipping Address</h4>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-sm">
                <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p className="text-muted-foreground mt-1">
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                  India
                </p>
              </div>
            </div>

            {/* Payment & Delivery */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <h4 className="font-semibold">Payment Method</h4>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p className="capitalize">{order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <h4 className="font-semibold">Estimated Delivery</h4>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p>{formatDate(order.estimatedDelivery)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {order.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={order.shippingCost === 0 ? "text-green-600" : ""}>
                    {order.shippingCost === 0 ? "FREE" : `Rs. ${order.shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border font-semibold">
                  <span>Total</span>
                  <span>Rs. {order.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 md:p-6 bg-muted/30 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1 bg-transparent">
                Track Order
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Download Invoice
              </Button>
              <Button className="flex-1">
                Buy Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrdersPage() {
  const { orders } = useOrders()

  return (
    <main className="min-h-screen bg-muted/30">
      <PromoBanner />
      <Header />

      {/* Page Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
              <p className="text-muted-foreground">{orders.length} {orders.length === 1 ? "order" : "orders"} placed</p>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <div className="bg-background rounded-xl border border-border p-12 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link href="/">
              <Button size="lg" className="px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
