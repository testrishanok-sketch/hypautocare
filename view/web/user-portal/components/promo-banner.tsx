"use client"

import { useEffect, useState } from "react"

export function PromoBanner() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 1)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const promoText = "GET 10% OFF ON YOUR FIRST ORDER! Use code \"WELCOME10\" • "
  const repeatedText = Array(10).fill(promoText).join("")

  return (
    <div className="bg-foreground text-background py-2 overflow-hidden">
      <div
        className="whitespace-nowrap text-sm font-medium"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {repeatedText}
      </div>
    </div>
  )
}
