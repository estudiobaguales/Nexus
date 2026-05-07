"use client"

import { useState, useMemo, useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react"
import type { Product } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const fallbackProducts: Product[] = [
  {
    id: "1", title: "Nexus Pro Set", description: "Set de competencia oficial con red reforzada y tension ajustable.", handle: "nexus-pro-set", availableForSale: true, productType: "Sets", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/product-net.jpg", altText: "Nexus Pro Set" } }] },
    priceRange: { minVariantPrice: { amount: "89990", currencyCode: "CLP" } },
    variants: [{ id: "v1", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "89990", currencyCode: "CLP" } }],
  },
  {
    id: "2", title: "Pack de Pelotas x3", description: "Pelotas oficiales de alta visibilidad aprobadas para torneos.", handle: "pack-pelotas", availableForSale: true, productType: "Accesorios", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/product-ball.jpg", altText: "Pack de Pelotas" } }] },
    priceRange: { minVariantPrice: { amount: "12990", currencyCode: "CLP" } },
    variants: [{ id: "v2", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "12990", currencyCode: "CLP" } }],
  },
  {
    id: "3", title: "Nexus Tournament", description: "Grado torneo con estructura reforzada y funda premium incluida.", handle: "nexus-tournament", availableForSale: true, productType: "Sets", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/product-pro.jpg", altText: "Nexus Tournament" } }] },
    priceRange: { minVariantPrice: { amount: "149990", currencyCode: "CLP" } },
    variants: [{ id: "v3", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "149990", currencyCode: "CLP" } }],
  },
  {
    id: "4", title: "Bolso de Transporte", description: "Funda premium con correa ajustable y bolsillos internos.", handle: "bolso-transporte", availableForSale: true, productType: "Accesorios", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/about.jpg", altText: "Bolso" } }] },
    priceRange: { minVariantPrice: { amount: "24990", currencyCode: "CLP" } },
    variants: [{ id: "v4", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "24990", currencyCode: "CLP" } }],
  },
  {
    id: "5", title: "Nexus Starter Kit", description: "Todo lo que necesitas para empezar: set, pelotas y bolso.", handle: "nexus-starter", availableForSale: true, productType: "Sets", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/courses.jpg", altText: "Starter Kit" } }] },
    priceRange: { minVariantPrice: { amount: "64990", currencyCode: "CLP" } },
    variants: [{ id: "v5", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "64990", currencyCode: "CLP" } }],
  },
  {
    id: "6", title: "Red de Repuesto", description: "Red oficial de reemplazo compatible con todos los sets Nexus.", handle: "red-repuesto", availableForSale: true, productType: "Accesorios", descriptionHtml: "", options: [],
    images: { edges: [{ node: { url: "/images/events.jpg", altText: "Red de Repuesto" } }] },
    priceRange: { minVariantPrice: { amount: "19990", currencyCode: "CLP" } },
    variants: [{ id: "v6", title: "Default Title", availableForSale: true, selectedOptions: [], price: { amount: "19990", currencyCode: "CLP" } }],
  },
] as unknown as Product[]

type SortOption = "featured" | "price-asc" | "price-desc" | "name"

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()
  const image = product.images.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary mb-4">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent"
        />
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-x-0 bottom-0 p-4 flex gap-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (product.variants.length > 0) addItem(product.variants[0], product)
            }}
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-background text-foreground text-[12px] font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
            Agregar
          </button>
          <Link
            href={`/productos/${product.handle}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-background/20 backdrop-blur-sm border border-background/30 text-background hover:bg-background/30 transition-colors"
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-[0.1em] uppercase bg-background/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full font-medium">
            {product.productType || "Producto"}
          </span>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-1 mt-0.5">{product.description}</p>
        </div>
        <span className="text-[14px] font-semibold text-foreground whitespace-nowrap tabular-nums">
          ${price.toLocaleString("es-CL")}
        </span>
      </div>
    </motion.div>
  )
}

function ProductsContent({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>("Todos")
  const [sort, setSort] = useState<SortOption>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  const displayProducts = products.length > 0 ? products : fallbackProducts

  const categories = useMemo(() => {
    const types = new Set(displayProducts.map((p) => p.productType || "Otro"))
    return ["Todos", ...Array.from(types)]
  }, [displayProducts])

  const filtered = useMemo(() => {
    let result = category === "Todos"
      ? displayProducts
      : displayProducts.filter((p) => (p.productType || "Otro") === category)

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount))
        break
      case "price-desc":
        result = [...result].sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount))
        break
      case "name":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
    }
    return result
  }, [displayProducts, category, sort])

  const sortLabels: Record<SortOption, string> = {
    featured: "Destacados",
    "price-asc": "Menor precio",
    "price-desc": "Mayor precio",
    name: "A - Z",
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero banner */}
        <section className="relative py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Tienda</p>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
                Equipamiento profesional.
              </h1>
              <p className="mt-3 text-[15px] text-muted-foreground max-w-lg">
                Desde sets de competencia hasta accesorios, todo lo que necesitas para jugar al mas alto nivel.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters + Products */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
              <div className="flex items-center gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 h-9 px-4 rounded-full text-[12px] font-medium transition-all duration-300 ${
                      category === cat
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 h-9 px-4 rounded-full border border-border text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {sortLabels[sort]}
                    <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} strokeWidth={1.5} />
                  </button>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-background border border-border rounded-xl shadow-xl shadow-foreground/5 p-1.5 z-20"
                    >
                      {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => { setSort(key); setShowFilters(false) }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors ${
                            sort === key ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {sortLabels[key]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="hidden md:flex items-center gap-1 border border-border rounded-full p-0.5">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${layout === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="Vista cuadricula"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${layout === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                    aria-label="Vista lista"
                  >
                    <LayoutList className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {category !== "Todos" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="text-[11px] text-muted-foreground">Filtros activos:</span>
                <button
                  onClick={() => setCategory("Todos")}
                  className="flex items-center gap-1.5 h-7 px-3 rounded-full bg-foreground/[0.06] text-[11px] text-foreground font-medium hover:bg-foreground/[0.1] transition-colors"
                >
                  {category}
                  <X className="w-3 h-3" strokeWidth={2} />
                </button>
              </motion.div>
            )}

            {/* Results count */}
            <p className="text-[12px] text-muted-foreground mb-8">
              {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
            </p>

            {/* Products grid */}
            <div className={`grid gap-6 lg:gap-8 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}>
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <p className="text-[15px] text-muted-foreground">No se encontraron productos en esta categoria.</p>
                <button
                  onClick={() => setCategory("Todos")}
                  className="h-10 px-6 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-80 transition-opacity"
                >
                  Ver todos
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function ProductsPageClient({ products }: { products: Product[] }) {
  return (
    <CartProvider>
      <ProductsContent products={products} />
    </CartProvider>
  )
}
