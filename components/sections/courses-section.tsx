"use client"

import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, Calendar, MapPin, Clock } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Fundamentos",
    level: "Principiante",
    schedule: "Sábados 10:00",
    location: "Parque Bicentenario",
    duration: "4 semanas",
    price: "$15.000",
    tag: "bg-secondary text-foreground",
  },
  {
    id: 2,
    title: "Técnica y Estrategia",
    level: "Intermedio",
    schedule: "Mié & Vie 18:00",
    location: "Parque Araucano",
    duration: "6 semanas",
    price: "$25.000",
    tag: "bg-secondary text-foreground",
  },
  {
    id: 3,
    title: "Competitivo Elite",
    level: "Avanzado",
    schedule: "Mar & Jue 17:00",
    location: "Estadio Nacional",
    duration: "8 semanas",
    price: "$35.000",
    tag: "bg-foreground text-background",
  },
]

export function CoursesSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY   = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      id="cursos"
      ref={ref}
      className="py-[clamp(5rem,10vw,9rem)] overflow-hidden"
      aria-labelledby="courses-heading"
    >
      {/* Top rule */}
      <div className="h-px bg-border" aria-hidden="true" />

      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 pt-[clamp(5rem,10vw,9rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <motion.div style={{ y: imgY }} className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
              <Image
                src="/images/courses.jpg"
                alt="Instructor enseñando roundnet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Float card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-5 inset-x-5"
              >
                <div className="bg-background/95 backdrop-blur-xl rounded-xl p-5 shadow-xl shadow-black/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      Inscripciones abiertas
                    </p>
                  </div>
                  <p className="text-[15px] font-semibold text-foreground">Próximo curso: 15 de Junio</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">Parque Bicentenario, Santiago</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 mt-4 h-9 px-5 rounded-full bg-foreground text-background text-[12px] font-semibold hover:opacity-85 transition-opacity"
                  >
                    Reservar cupo
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Content ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                Academia
              </p>
              <h2
                id="courses-heading"
                className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.96] tracking-[-0.025em]"
              >
                Aprende con
                <br />
                <em className="not-italic text-muted-foreground">los mejores.</em>
              </h2>
              <p className="mt-5 text-[15px] text-muted-foreground leading-[1.75] max-w-md">
                Instructores certificados, grupos reducidos y un método progresivo
                diseñado para cada nivel. Del primer saque al torneo nacional.
              </p>
            </motion.div>

            {/* Course list */}
            <ul className="mt-10 flex flex-col gap-3" role="list">
              {courses.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href="#"
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border hover:border-foreground/20 hover:shadow-sm bg-card transition-all duration-400"
                    aria-label={`Curso ${c.title}, nivel ${c.level}, ${c.price}`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <span className={`shrink-0 text-[9px] tracking-[0.12em] uppercase font-semibold px-2.5 py-1.5 rounded-lg ${c.tag}`}>
                        {c.level}
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold text-foreground">{c.title}</p>
                        <dl className="flex flex-wrap gap-3 mt-1.5 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
                            <dt className="sr-only">Horario:</dt><dd>{c.schedule}</dd>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
                            <dt className="sr-only">Ubicación:</dt><dd>{c.location}</dd>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
                            <dt className="sr-only">Duración:</dt><dd>{c.duration}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-semibold text-foreground tabular-nums">{c.price}</span>
                      <div className="flex items-center justify-center w-9 h-9 rounded-full border border-border group-hover:border-foreground/30 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </div>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
