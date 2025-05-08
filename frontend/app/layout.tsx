import type { Metadata } from 'next'
import './globals.css'
import { CartVisibilityProvider } from '@/components/cart-bar'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CartVisibilityProvider>
          {children}
        </CartVisibilityProvider>
      </body>
    </html>
  )
}
