"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Zap, Shield, Globe, Award, Truck, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Calidad de competición",
    desc: "Equipamiento aprobado para torneos nacionales e internacionales de roundnet.",
  },
  {
    icon: Truck,
    title: "Envío a todo Chile",
    desc: "Despacho exprés en Santiago y envíos a regiones en 3–5 días hábiles.",
  },
  {
    icon: Shield,
    title: "Garantía de 1 año",
    desc: "Todos nuestros sets incluyen garantía por defectos de fabricación.",
  },
  {
    icon: Zap,
    title: "Setup en 60 segundos",
    desc: "Sistemas de tensión quick-lock para instalar la red en segundos.",
  },
  {
    icon: Globe,
    title: "Comunidad nacional",
    desc: "Conectamos jugadores en 15 ciudades con torneos y grupos locales.",
  },
  {
    icon: HeartHandshake,
    title: "Soporte experto",
    desc: "Nuestro equipo son jugadores activos. Te asesoramos en todo.",
  },
]

export function FeaturesSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      ref={ref}
      className="py-[clamp(5rem,10vw,9rem)]"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">

        <div className="h-px bg-border mb-[clamp(4rem,8vw,7rem)]" aria-hidden="true" />

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.96] tracking-[-0.025em]"
          >
            Por qué elegir
            <br />
            <em className="not-italic text-muted-foreground">Nexus.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] text-muted-foreground leading-[1.75] self-end max-w-md"
          >
            No somos una tienda más. Somos jugadores que construyeron la plataforma
            que siempre quisieron tener.
          </motion.p>
        </div>

        {/* Feature grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
          role="list"
          aria-label="Características de Nexus"
        >
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.li
                key={f.title}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="bg-background p-8 hover:bg-secondary/60 transition-colors duration-300"
              >
                <Icon
                  className="w-5 h-5 text-muted-foreground mb-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-[14px] font-semibold text-foreground mb-2 tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-[1.7]">{f.desc}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
