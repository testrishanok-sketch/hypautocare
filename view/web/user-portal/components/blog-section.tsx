import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const blogPosts = [
  {
    title: "How to do car care at home",
    excerpt:
      "Why wait in line at a detailing shop when you can give your car the VIP treatment right in your driveway? With the right tools and a solid game plan...",
    image: "/images/car-exterior.jpg",
    href: "#",
  },
  {
    title: "What Are Car Care Products?",
    excerpt:
      "Owning a car is more than just driving—it's about keeping that beauty in top condition. With the right car care products, like HYPE's premium lineup, you can protect, restore, and...",
    image: "/images/kits-combos.jpg",
    href: "#",
    comments: 2,
  },
]

export function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Blog Posts
        </h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.title} href={post.href}>
              <Card className="group overflow-hidden h-full">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary/80 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  {post.comments && (
                    <p className="text-xs text-muted-foreground mt-3">
                      {post.comments} comments
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
