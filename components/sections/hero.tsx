"use client"

import { motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"

const stats = [
  { value: "5K+",  label: "Jugadores" },
  { value: "15",   label: "Ciudades" },
  { value: "120+", label: "Torneos" },
]

export function Hero() {
  const ref   = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY  = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] flex flex-col justify-end overflow-hidden"
      aria-label="Sección principal"
    >
      {/* ── Parallax background ── */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-[-10%] z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/hero-main.jpg"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient: dark bottom, slight top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        {/* Subtle vignette sides */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,black/30_100%)]" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full mx-auto max-w-[1280px] px-5 lg:px-10 pb-16 md:pb-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">

          {/* Left */}
          <div className="flex flex-col gap-6 max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 4.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-medium"
            >
              El deporte que mueve a Chile
            </motion.p>

            {/* Heading — DM Serif Display */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 4.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(3rem,9vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-white text-balance"
            >
              Juega.{" "}
              <em className="not-italic text-white/55">Compite.</em>
              <br />
              Conecta.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 4.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15px] md:text-[16px] text-white/55 leading-[1.65] max-w-[440px]"
            >
              Equipamiento profesional, cursos y torneos de roundnet.
              Únete a la comunidad deportiva más innovadora de Latinoamérica.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 5.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-black text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              >
                Ver productos
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
              <a
                href="#cursos"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-white/25 text-white text-[13px] font-medium hover:bg-white/10 transition-colors duration-300"
              >
                Explorar cursos
              </a>
            </motion.div>
          </div>

          {/* Stats — desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 5.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-5 pb-1"
            aria-label="Estadísticas"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 5.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-end"
              >
                <span className="font-serif text-[2rem] leading-none text-white tracking-[-0.02em] tabular-nums">
                  {s.value}
                </span>
                <span className="text-[10px] text-white/35 tracking-[0.12em] uppercase mt-0.5">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/30" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  )
}
