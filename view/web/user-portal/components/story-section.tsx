"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stories = [
  {
    title: "HOW IT ALL STARTED",
    content:
      "At HYPE, we treat cars like family. Growing up, we watched our parents wash the car with pride and care. Finding affordable, quality car care products was tough since cheap ones didn't work, and good ones were too expensive. That's why we created HYPE: the quality solution that does not break the bank.",
  },
  {
    title: "THAT'S WHEN WE DECIDED",
    content:
      "To make a change. We started HYPE with a big dream and little savings, packing orders by hand in a small room. Early on, sales were slow—just 2–5 orders a day—but each one felt like progress. Through hard work and support from family and friends, our small brand grew into something far beyond what we ever imagined.",
  },
  {
    title: "HOW'S IT GOING",
    content:
      "Today, HYPE is proudly made in India, known for top-quality products in both the Indian and global car care markets. Our products now serve everything from family cars to exotic supercars worldwide. This journey took hard work, sacrifice, and faith, but every moment was worth it. Thank you for being part of our story.",
  },
]

export function StorySection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length)
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }

  return (
    <section id="story" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {stories[activeIndex].title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {stories[activeIndex].content}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous story</span>
            </Button>
            <div className="flex gap-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? "bg-foreground" : "bg-foreground/30"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next story</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {activeIndex + 1} / {stories.length}
          </p>
        </div>
      </div>
    </section>
  )
}
