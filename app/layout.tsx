import type { Metadata, Viewport } from "next"
import { DM_Sans, DM_Serif_Display, DM_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://tusitio.cl"),
  title: {
    default: "Nexus | Deporte. Comunidad. Movimiento.",
    template: "%s | Nexus Chile",
  },
  description:
    "Equipamiento profesional de roundnet, cursos con instructores certificados, torneos y la comunidad deportiva más innovadora de Latinoamérica.",
  keywords: [
    "roundnet chile",
    "spikeball chile",
    "equipamiento roundnet",
    "torneos roundnet",
    "cursos roundnet santiago",
    "deporte alternativo chile",
    "nexus roundnet",
  ],
  authors: [{ name: "Nexus Chile" }],
  creator: "Nexus Chile",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://tusitio.cl",
    siteName: "Nexus Chile",
    title: "Nexus | Deporte. Comunidad. Movimiento.",
    description:
      "Equipamiento profesional de roundnet, cursos, torneos y la comunidad más innovadora de Latinoamérica.",
    images: [
      {
        url: "/images/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "Nexus Chile — Roundnet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus | Deporte. Comunidad. Movimiento.",
    description: "Equipamiento profesional de roundnet y comunidad deportiva en Chile.",
    images: ["/images/hero-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://tusitio.cl",
  },
}

export const viewport: Viewport = {
  themeColor: "#f7f7f6",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es-CL"
      className={`${dmSans.variable} ${dmSerif.variable} ${dmMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
