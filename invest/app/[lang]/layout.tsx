import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'
import Footer from '@/components/Footer'
import { Providers } from '@/app/providers'
import ThemeDebug from '@/components/TheneDebug'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WealthWise | Smart Investment Platform',
  description: 'Grow your wealth with intelligent investment plans',
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>  // Added Promise type
}) {
  // Await the params to get the actual value
  const { lang } = await params
   
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Providers lang={lang}>
          <Navigation />
          <ThemeDebug />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}