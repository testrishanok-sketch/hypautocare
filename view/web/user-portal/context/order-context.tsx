"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  shippingCost: number
  grandTotal: number
  status: "confirmed" | "processing" | "shipped" | "delivered"
  createdAt: string
  estimatedDelivery: string
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt" | "estimatedDelivery" | "status">) => string
  getOrder: (id: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("HYPE-orders")
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch {
        setOrders([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("HYPE-orders", JSON.stringify(orders))
    }
  }, [orders, isLoaded])

  const addOrder = (orderData: Omit<Order, "id" | "createdAt" | "estimatedDelivery" | "status">) => {
    const id = `HYPE-${Date.now().toString(36).toUpperCase()}`
    const createdAt = new Date().toISOString()
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()

    const newOrder: Order = {
      ...orderData,
      id,
      createdAt,
      estimatedDelivery,
      status: "confirmed",
    }

    setOrders((prev) => [newOrder, ...prev])
    return id
  }

  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id)
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
