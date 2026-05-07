"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowUpRight } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"

const FALLBACK_PRODUCTS = [
  {
    id: "1", title: "Nexus Pro Set", description: "Set de competencia oficial. Red reforzada, patas de acero y tensión ajustable.", handle: "nexus-pro-set", availableForSale: true, productType: "Sets", options: [],
    images: { edges: [{ node: { url: "/images/product-net.jpg", altText: "Nexus Pro Set" } }] },
    priceRange: { minVariantPrice: { amount: "89990", currencyCode: "CLP" } },
    variants: [{ id: "v1", title: "Default", availableForSale: true, selectedOptions: [], price: { amount: "89990", currencyCode: "CLP" } }],
  },
  {
    id: "2", title: "Pack Pelotas ×3", description: "Pelotas oficiales de alta visibilidad. Aprobadas para torneos nacionales.", handle: "pack-pelotas", availableForSale: true, productType: "Accesorios", options: [],
    images: { edges: [{ node: { url: "/images/product-ball.jpg", altText: "Pack de Pelotas" } }] },
    priceRange: { minVariantPrice: { amount: "12990", currencyCode: "CLP" } },
    variants: [{ id: "v2", title: "Default", availableForSale: true, selectedOptions: [], price: { amount: "12990", currencyCode: "CLP" } }],
  },
  {
    id: "3", title: "Nexus Tournament", description: "Grado torneo con estructura de titanio reforzado y funda premium incluida.", handle: "nexus-tournament", availableForSale: true, productType: "Sets", options: [],
    images: { edges: [{ node: { url: "/images/product-pro.jpg", altText: "Nexus Tournament" } }] },
    priceRange: { minVariantPrice: { amount: "149990", currencyCode: "CLP" } },
    variants: [{ id: "v3", title: "Default", availableForSale: true, selectedOptions: [], price: { amount: "149990", currencyCode: "CLP" } }],
  },
] as unknown as Product[]

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [hover, setHover] = useState(false)
  const { addItem }       = useCart()
  const img   = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer"
    >
      {/* Image wrapper */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-5">
        {img && (
          <Image
            src={img.url}
            alt={img.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay on hover */}
        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent"
          aria-hidden="true"
        />

        {/* Hover actions */}
        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-x-0 bottom-0 p-4 flex gap-2"
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              if (product.variants[0]) addItem(product.variants[0], product)
            }}
            aria-label={`Agregar ${product.title} al carrito`}
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-white text-black text-[12px] font-semibold hover:bg-white/90 active:scale-[0.97] transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
            Agregar
          </button>
          <Link
            href={`/productos/${product.handle}`}
            aria-label={`Ver detalles de ${product.title}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 text-white hover:bg-white/35 transition-colors"
          >
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>

        {/* Badge */}
        {product.productType && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] tracking-[0.1em] uppercase bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full font-medium">
              {product.productType}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em] truncate">
            {product.title}
          </h3>
          <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>
        <span className="text-[14px] font-semibold text-foreground tabular-nums whitespace-nowrap shrink-0">
          ${price.toLocaleString("es-CL")}
        </span>
      </div>
    </motion.article>
  )
}

export function ProductsSection({ products = [] }: { products?: Product[] }) {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const items  = products.length > 0 ? products.slice(0, 3) : FALLBACK_PRODUCTS

  return (
    <section
      id="productos"
      ref={ref}
      className="py-[clamp(5rem,10vw,9rem)]"
      aria-labelledby="products-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4 font-medium"
            >
              Equipamiento
            </motion.p>
            <motion.h2
              id="products-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.96] tracking-[-0.025em]"
            >
              Todo lo que
              <br />
              <em className="not-italic text-muted-foreground">necesitas.</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              Ver todos los productos
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Ruled divider */}
        <div className="h-px bg-border mb-14" aria-hidden="true" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
