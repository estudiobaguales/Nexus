"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

const navLinks = [
  { href: "/productos", label: "Tienda" },
  { href: "#cursos",   label: "Cursos" },
  { href: "#eventos",  label: "Eventos" },
  { href: "/blog",     label: "Blog" },
  { href: "#nosotros", label: "Nosotros" },
]

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [hidden, setHidden]         = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const { totalQuantity, openCart } = useCart()
  const { scrollY }                 = useScroll()
  const [lastY, setLastY]           = useState(0)

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40)
    if (y > 120) {
      setHidden(y > lastY && y - lastY > 6)
    } else {
      setHidden(false)
    }
    setLastY(y)
  })

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
          scrolled
            ? "bg-background/85 backdrop-blur-2xl border-b border-border/60"
            : "bg-transparent",
        ].join(" ")}
        role="banner"
      >
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
          <div className="flex h-[60px] items-center justify-between gap-8">

            {/* ── Logo ── */}
            <Link
              href="/"
              aria-label="Nexus Chile — Inicio"
              className="flex items-center gap-3 group shrink-0"
            >
              {/* Placeholder logo box — swap with <Image> when logo arrives */}
              <div
                aria-hidden="true"
                className={[
                  "relative w-8 h-8 rounded-md border flex items-center justify-center",
                  "transition-all duration-300",
                  scrolled
                    ? "bg-foreground border-foreground"
                    : "bg-background/15 border-background/30 backdrop-blur-sm",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-serif text-[13px] italic leading-none",
                    scrolled ? "text-background" : "text-background",
                  ].join(" ")}
                >
                  N
                </span>
              </div>
              <span
                className={[
                  "hidden sm:block text-[15px] font-semibold tracking-[-0.03em] transition-colors duration-300",
                  scrolled ? "text-foreground" : "text-background",
                ].join(" ")}
              >
                Nexus
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav
              aria-label="Navegación principal"
              className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative px-4 py-2 text-[13px] rounded-lg transition-colors duration-300",
                    scrolled
                      ? "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                      : "text-background/70 hover:text-background hover:bg-background/[0.08]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-1">
              {/* Cart */}
              <button
                onClick={openCart}
                aria-label={`Carrito, ${totalQuantity} producto${totalQuantity !== 1 ? "s" : ""}`}
                className={[
                  "relative flex items-center justify-center w-9 h-9 rounded-full",
                  "transition-all duration-300",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                    : "text-background/70 hover:text-background hover:bg-background/[0.08]",
                ].join(" ")}
              >
                <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={1.5} />
                <AnimatePresence>
                  {totalQuantity > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background"
                    >
                      {totalQuantity > 9 ? "9+" : totalQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <div className={["hidden md:block w-px h-4 mx-2 transition-colors duration-300", scrolled ? "bg-border" : "bg-background/20"].join(" ")} aria-hidden="true" />

              {/* CTA */}
              <Link
                href="/productos"
                className={[
                  "hidden md:inline-flex items-center gap-1.5 h-8 px-4 rounded-full text-[12px] font-semibold",
                  "transition-all duration-300",
                  scrolled
                    ? "bg-foreground text-background hover:opacity-80"
                    : "bg-background text-foreground hover:opacity-90",
                ].join(" ")}
              >
                Comprar
                <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={[
                  "flex lg:hidden items-center justify-center w-9 h-9 rounded-full",
                  "transition-all duration-300",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                    : "text-background/70 hover:text-background hover:bg-background/[0.08]",
                ].join(" ")}
              >
                {menuOpen ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Menu className="w-4 h-4" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 top-[60px] z-40 bg-background flex flex-col"
          >
            {/* Rule */}
            <div className="h-px bg-border" aria-hidden="true" />

            <nav className="flex flex-col px-6 pt-10 gap-1 flex-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className="group flex items-end justify-between py-5 border-b border-border/50"
                  >
                    <span className="font-serif text-[2.5rem] leading-none tracking-[-0.02em] text-foreground">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground mb-1 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 pb-10"
              >
                <Link
                  href="/productos"
                  onClick={close}
                  className="flex items-center justify-center w-full h-14 rounded-2xl bg-foreground text-background text-[15px] font-semibold hover:opacity-90 transition-opacity"
                >
                  Comprar ahora
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  )
}
