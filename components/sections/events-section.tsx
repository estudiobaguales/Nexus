"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, MapPin, Trophy, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Copa Nexus Santiago 2026",
    date: "14 Jun",
    location: "Parque Araucano",
    prize: "$500.000",
    spots: 48,
    tag: "Nacional",
    img: "/images/events.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Circuito Valparaíso",
    date: "28 Jun",
    location: "Playa Reñaca",
    prize: "$200.000",
    spots: 32,
    tag: "Regional",
    img: "/images/events.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Open Concepción",
    date: "12 Jul",
    location: "Laguna Redonda",
    prize: "$150.000",
    spots: 24,
    tag: "Regional",
    img: "/images/events.jpg",
    featured: false,
  },
]

export function EventsSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section
      id="eventos"
      ref={ref}
      className="py-[clamp(5rem,10vw,9rem)] bg-foreground text-background"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-5 font-medium"
            >
              Torneos
            </motion.p>
            <motion.h2
              id="events-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.96] tracking-[-0.025em] text-background"
            >
              Compite.
              <br />
              <em className="not-italic text-background/45">Supérate.</em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            href="#"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-background/50 hover:text-background transition-colors group"
          >
            Ver todos los torneos
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </motion.a>
        </div>

        <div className="h-px bg-background/10 mb-14" aria-hidden="true" />

        {/* Events grid */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {events.map((ev, i) => (
            <motion.li
              key={ev.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="#"
                aria-label={`${ev.title}, ${ev.date}, ${ev.location}`}
                className={[
                  "group flex flex-col h-full rounded-2xl overflow-hidden border border-background/10",
                  "hover:border-background/25 transition-all duration-400",
                  ev.featured ? "md:col-span-1" : "",
                ].join(" ")}
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-background/5">
                  <Image
                    src={ev.img}
                    alt={ev.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] tracking-[0.15em] uppercase bg-background/15 backdrop-blur-sm text-background px-2.5 py-1 rounded-full font-semibold border border-background/15">
                      {ev.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="font-serif text-[1.25rem] leading-none text-background">{ev.date}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-4 p-5 flex-1">
                  <h3 className="text-[15px] font-semibold text-background leading-snug">{ev.title}</h3>

                  <dl className="flex flex-col gap-2 text-[12px] text-background/50">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
                      <dt className="sr-only">Ubicación:</dt><dd>{ev.location}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
                      <dt className="sr-only">Premio:</dt><dd>Premio {ev.prize}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
                      <dt className="sr-only">Cupos:</dt><dd>{ev.spots} cupos</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-4 border-t border-background/10 flex items-center justify-between">
                    <span className="text-[12px] text-background/40">Inscribirse</span>
                    <div className="flex items-center justify-center w-7 h-7 rounded-full border border-background/20 group-hover:border-background/50 group-hover:bg-background/10 transition-all">
                      <ArrowUpRight className="w-3 h-3 text-background/50 group-hover:text-background" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
