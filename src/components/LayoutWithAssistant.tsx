'use client'

import { usePathname } from 'next/navigation'
import FloatingAssistant from '@/components/FloatingAssistant'

export default function LayoutWithAssistant({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const excludedPaths = ['/', '/register', '/login']
  const showAssistant = !excludedPaths.includes(pathname)

  return (
    <>
      {children}
      {showAssistant && <FloatingAssistant />}
    </>
  )
}
