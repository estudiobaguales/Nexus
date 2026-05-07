"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, ArrowUpRight } from "lucide-react"
import { CartProvider } from "@/components/cart/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const categories = ["Todos", "Guias", "Torneos", "Comunidad", "Producto", "Tips"]

const posts = [
  {
    id: 1,
    title: "Como elegir tu primer set de roundnet",
    excerpt: "Una guia completa para principiantes que quieren entrar al mundo del roundnet con el equipo correcto.",
    category: "Guias",
    image: "/images/blog-1.jpg",
    date: "28 Abr 2026",
    readTime: "5 min",
    featured: true,
    slug: "como-elegir-primer-set",
  },
  {
    id: 2,
    title: "5 ejercicios para mejorar tu spike",
    excerpt: "Rutina de entrenamiento disenada por nuestros coaches para llevar tu spike al siguiente nivel.",
    category: "Tips",
    image: "/images/blog-2.jpg",
    date: "22 Abr 2026",
    readTime: "4 min",
    featured: false,
    slug: "ejercicios-mejorar-spike",
  },
  {
    id: 3,
    title: "Guia de armado rapido: 30 segundos",
    excerpt: "Aprende a armar tu set en menos de 30 segundos con estos tips de nuestros jugadores profesionales.",
    category: "Guias",
    image: "/images/blog-3.jpg",
    date: "18 Abr 2026",
    readTime: "3 min",
    featured: false,
    slug: "guia-armado-rapido",
  },
  {
    id: 4,
    title: "Resultados del Nexus Open 2025",
    excerpt: "Resumen completo del torneo mas grande del ano con mas de 64 equipos participantes.",
    category: "Torneos",
    image: "/images/events.jpg",
    date: "10 Abr 2026",
    readTime: "6 min",
    featured: false,
    slug: "resultados-nexus-open",
  },
  {
    id: 5,
    title: "La comunidad Nexus en numeros",
    excerpt: "De 10 jugadores a 5.000: la historia de como el roundnet se expandio por todo Chile.",
    category: "Comunidad",
    image: "/images/about.jpg",
    date: "5 Abr 2026",
    readTime: "7 min",
    featured: false,
    slug: "comunidad-nexus-numeros",
  },
  {
    id: 6,
    title: "Nuevo set Nexus Tournament: review completo",
    excerpt: "Probamos el nuevo set de grado torneo durante 3 meses. Aca nuestras impresiones honestas.",
    category: "Producto",
    image: "/images/product-pro.jpg",
    date: "1 Abr 2026",
    readTime: "8 min",
    featured: false,
    slug: "review-nexus-tournament",
  },
]

function FeaturedPost({ post }: { post: (typeof posts)[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] tracking-[0.1em] uppercase bg-accent text-accent-foreground px-3 py-1.5 rounded-full font-semibold">
              Destacado
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] tracking-[0.1em] uppercase text-accent font-medium">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[12px] text-muted-foreground">{post.date}</span>
          </div>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.1] group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-md">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.readTime}
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5 text-[12px] text-foreground font-medium">
              Leer articulo <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function PostCard({ post, index }: { post: (typeof posts)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary mb-5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] tracking-[0.1em] uppercase text-accent font-medium">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-[11px] text-muted-foreground">{post.date}</span>
        </div>
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>
        <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-[11px] text-muted-foreground">
          <Clock className="w-3 h-3" strokeWidth={1.5} />
          {post.readTime}
        </div>
      </Link>
    </motion.article>
  )
}

function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  const filtered = activeCategory === "Todos"
    ? rest
    : rest.filter((p) => p.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Blog</p>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.04em] text-foreground leading-[1.05]">
                Noticias y guias.
              </h1>
              <p className="mt-3 text-[15px] text-muted-foreground max-w-lg">
                Tips, torneos, lanzamientos y todo lo que pasa en la comunidad Nexus.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured article */}
        {featured && (
          <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
              <FeaturedPost post={featured} />
            </div>
          </section>
        )}

        {/* Category filter + articles grid */}
        <section className="pb-20 lg:pb-28">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="flex items-center gap-2 overflow-x-auto mb-12 pb-6 border-b border-border">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 h-9 px-4 rounded-full text-[12px] font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-20 gap-3 text-center">
                <p className="text-[15px] text-muted-foreground">No hay articulos en esta categoria aun.</p>
                <button
                  onClick={() => setActiveCategory("Todos")}
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

export function BlogPageClient() {
  return (
    <CartProvider>
      <BlogContent />
    </CartProvider>
  )
}
