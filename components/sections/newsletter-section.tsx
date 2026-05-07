"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function NewsletterSection() {
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [email, setEmail] = useState("")
  const [sent, setSent]   = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail("")
  }

  return (
    <section
      ref={ref}
      className="py-[clamp(5rem,10vw,9rem)] bg-secondary"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10">
        <div className="h-px bg-border mb-[clamp(4rem,8vw,7rem)]" aria-hidden="true" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Copy */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium"
            >
              Newsletter
            </motion.p>
            <motion.h2
              id="newsletter-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.96] tracking-[-0.025em]"
            >
              Mantente al tanto
              <br />
              <em className="not-italic text-muted-foreground">del circuito.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-[15px] text-muted-foreground leading-[1.75] max-w-sm"
            >
              Torneos, nuevos productos, tips de entrenamiento y comunidad — directo
              a tu correo. Sin spam, sin ruido.
            </motion.p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <div className="flex items-center gap-3 p-5 rounded-2xl bg-foreground text-background">
                <span className="text-[13px] font-medium">
                  ¡Listo! Te avisaremos cuando haya novedades.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Suscripción al newsletter">
                <div className="flex gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Correo electrónico
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.cl"
                    required
                    autoComplete="email"
                    className="flex-1 h-12 px-5 rounded-full bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background text-[13px] font-semibold hover:opacity-85 active:scale-[0.97] transition-all duration-200 shrink-0"
                  >
                    Suscribir
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground/60 px-1">
                  Al suscribirte aceptas nuestra política de privacidad.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
