// src/components/LoginForm.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const err = searchParams.get('error')
    if (err) {
      setError('❌ Identifiants invalides. Veuillez réessayer.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.ok && !res.error) {
      router.push('/profil')
    } else {
      setError('❌ Identifiants invalides. Veuillez réessayer.')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="bg-white p-4 p-md-5 rounded shadow" style={{ maxWidth: 480, width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Digital Sentinel</h2>
          <p className="text-muted small">Accédez à votre espace personnel</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100 fw-semibold">🔐 Se connecter</button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted small">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-decoration-none fw-semibold text-primary">
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
