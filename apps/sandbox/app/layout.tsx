import type { Metadata } from 'next'
import { Poppins, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'CRE Sandbox',
  description: 'Sandbox para testar os primitivos do @cre/ui-kit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${sourceSans3.variable}`}>
      <body className="font-body bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  )
}
