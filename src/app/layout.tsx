
// src/app/layout.tsx
'use client'

import './globals.css'
import SessionWrapper from '@/components/SessionWrapper'
import FloatingAssistant from '@/components/FloatingAssistant'
import { usePathname } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideAssistant = pathname === '/' || pathname.startsWith('/register') || pathname.startsWith('/login')

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          defer
        />
      </head>
      <body style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', margin: 0 }}>
        <SessionWrapper>
          {children}
          {!hideAssistant && <FloatingAssistant />}
          <ToastContainer position="top-center" autoClose={3000} />
        </SessionWrapper>
      </body>
    </html>
  )
}
