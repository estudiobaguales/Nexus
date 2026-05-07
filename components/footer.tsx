"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const links = {
  Tienda: [
    { label: "Sets completos",   href: "/productos" },
    { label: "Pelotas",          href: "/productos" },
    { label: "Accesorios",       href: "/productos" },
    { label: "Ofertas",          href: "/productos" },
  ],
  Comunidad: [
    { label: "Torneos",  href: "#eventos" },
    { label: "Cursos",   href: "#cursos" },
    { label: "Blog",     href: "/blog" },
    { label: "Rankings", href: "#" },
  ],
  Empresa: [
    { label: "Nosotros",              href: "#nosotros" },
    { label: "Contacto",              href: "#" },
    { label: "Trabaja con nosotros",  href: "#" },
    { label: "Prensa",                href: "#" },
  ],
  Legal: [
    { label: "Privacidad",     href: "#" },
    { label: "Términos",       href: "#" },
    { label: "Envíos",         href: "#" },
    { label: "Devoluciones",   href: "#" },
  ],
}

const socials = [
  { label: "Instagram", href: "#", abbr: "IG" },
  { label: "TikTok",    href: "#", abbr: "TK" },
  { label: "YouTube",   href: "#", abbr: "YT" },
]

export function Footer() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <footer
      ref={ref}
      className="bg-foreground text-background"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-20 pb-16 border-b border-background/10"
        >
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] leading-[0.96] tracking-[-0.025em] text-background text-balance">
            ¿Listo para jugar?
          </h2>
          <a
            href="/productos"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-background text-foreground text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200 shrink-0"
          >
            Comprar ahora
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </motion.div>

        {/* ── Links + brand grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-16">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="Nexus Chile — Inicio">
              <span className="font-serif text-[1.25rem] text-background italic">Nexus</span>
            </Link>
            <p className="mt-4 text-[12px] text-background/35 leading-relaxed max-w-[200px]">
              El deporte que mueve a Chile. Equipamiento, comunidad y competencia desde 2019.
            </p>
            <nav aria-label="Redes sociales" className="flex gap-2 mt-6">
              {socials.map((s) => (
                <a
                  key={s.abbr}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-background/15 text-[10px] font-semibold text-background/40 hover:text-background hover:border-background/35 hover:bg-background/8 transition-all duration-300"
                >
                  {s.abbr}
                </a>
              ))}
            </nav>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([cat, items]) => (
            <nav key={cat} aria-label={cat}>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-background/30 mb-5 font-medium">
                {cat}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-background/45 hover:text-background transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-background/10">
          <p className="text-[11px] text-background/25">
            © 2026 Nexus Chile. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-background/20">
            Diseñado y desarrollado en Chile.
          </p>
        </div>
      </div>
    </footer>
  )
}
