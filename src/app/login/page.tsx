// src/app/login/page.tsx
// src/app/login/page.tsx
import { Suspense } from 'react'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-5">Chargement...</div>}>
      <LoginForm />
    </Suspense>
  )
}
