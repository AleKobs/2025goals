import type { Metadata } from 'next'
import { Poppins, Lora } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'Metas 2025',
  description: 'Defina e acompanhe suas metas para 2025',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${lora.variable}`}>{children}</body>
    </html>
  )
}

