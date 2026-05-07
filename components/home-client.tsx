"use client"

import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { ProductsSection } from "@/components/sections/products-section"
import { CoursesSection } from "@/components/sections/courses-section"
import { EventsSection } from "@/components/sections/events-section"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturesSection } from "@/components/sections/features"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import type { Product } from "@/lib/shopify/types"

interface Props {
  products: Product[]
}

export function HomeClient({ products }: Props) {
  return (
    <CartProvider>
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:flex focus:items-center focus:h-10 focus:px-4 focus:rounded-full focus:bg-foreground focus:text-background focus:text-sm focus:font-medium"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <ProductsSection products={products} />
        <FeaturesSection />
        <CoursesSection />
        <EventsSection />
        <AboutSection />
        <NewsletterSection />
      </main>

      <Footer />
    </CartProvider>
  )
}
