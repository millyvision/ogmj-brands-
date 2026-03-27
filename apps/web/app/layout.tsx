import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'OGMJ BRANDS — Intelligent Business OS',
  description: 'The most powerful all-in-one platform for entrepreneurs, creators, agencies, and service businesses to launch, run, and scale their entire operation from one intelligent dashboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
