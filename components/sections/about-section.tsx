"use client"

import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const stats = [
  { value: 5000, suffix: "+", label: "Jugadores activos" },
  { value: 120,  suffix: "+", label: "Torneos realizados" },
  { value: 15,   suffix: "",  label: "Ciudades" },
]

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let start: number
    const duration = 1800
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setN(Math.round(ease * value))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [run, value])
  return <>{n.toLocaleString("es-CL")}{suffix}</>
}

export function AboutSection() {
  const ref    = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY   = useTransform(scrollYProgress, [0, 1], [50, -50])
  const textY  = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative py-[clamp(5rem,10vw,9rem)] overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-border" aria-hidden="true" />

      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* ── Copy side ── */}
          <motion.div style={{ y: textY }} className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                Nuestra historia
              </p>
              <h2
                id="about-heading"
                className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[0.96] tracking-[-0.025em] text-foreground"
              >
                Construyendo
                <br />
                <em className="not-italic text-muted-foreground">comunidad.</em>
              </h2>
              <div className="mt-6 space-y-4 text-[15px] text-muted-foreground leading-[1.75] max-w-md">
                <p>
                  Desde 2019 trabajamos para traer un deporte accesible, divertido
                  y competitivo a Chile. No solo vendemos equipamiento: organizamos
                  torneos, formamos jugadores y conectamos personas.
                </p>
                <p>
                  Hoy somos la comunidad de roundnet más grande de Latinoamérica,
                  con presencia en 15 ciudades y miles de jugadores que comparten
                  la misma pasión.
                </p>
              </div>
            </motion.div>

            {/* Stats grid */}
            <dl className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col p-4 rounded-xl bg-secondary"
                >
                  <dt className="text-[11px] text-muted-foreground order-2 mt-1">{s.label}</dt>
                  <dd className="font-serif text-[1.75rem] leading-none tracking-[-0.02em] text-foreground tabular-nums order-1">
                    <Counter value={s.value} suffix={s.suffix} run={isInView} />
                  </dd>
                </motion.div>
              ))}
            </dl>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link
                href="#"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-foreground text-background text-[13px] font-semibold hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              >
                Únete a Nexus
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-full border border-border text-foreground text-[13px] font-medium hover:border-foreground/40 hover:bg-foreground/[0.03] transition-all duration-300"
              >
                Conocer más
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Image side ── */}
          <motion.div
            style={{ y: imgY }}
            className="order-1 lg:order-2 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary"
            >
              <Image
                src="/images/about.jpg"
                alt="Jugador de roundnet en acción"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle bottom overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/25 to-transparent" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, x: 8 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-5 -left-4 hidden lg:block"
              aria-hidden="true"
            >
              <div className="bg-background rounded-xl px-6 py-4 shadow-xl shadow-black/8 border border-border">
                <p className="font-serif text-[2rem] leading-none text-foreground tracking-[-0.02em]">2019</p>
                <p className="text-[11px] text-muted-foreground mt-1.5 tracking-[0.05em]">Fundada en Santiago</p>
              </div>
            </motion.div>

            {/* Corner accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-border/50 hidden lg:block" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
