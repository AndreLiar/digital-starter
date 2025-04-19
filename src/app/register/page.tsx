// src/app/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/login')
    } else {
      const data = await res.json()
      setError(data.message ?? 'Erreur lors de l\'inscription.')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="bg-white p-4 p-md-5 rounded shadow" style={{ maxWidth: 480, width: '100%' }}>
        
        {/* Logo + Header */}
        <div className="text-center mb-4">
          <Image
            src="/digital-starter-logo.png"
            alt="Digital Starter Logo"
            width={56}
            height={56}
            className="mb-2"
          />
          <h2 className="fw-bold text-primary">Créer un compte</h2>
          <p className="text-muted small">Commence ton aventure digitale avec l'IA</p>
        </div>

        {/* Message d'erreur */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Formulaire */}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nom complet"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
          <button className="btn btn-primary w-100 fw-semibold">🚀 S'inscrire</button>
        </form>

        {/* Redirection */}
        <p className="text-center mt-4 mb-0 text-muted small">
          Déjà un compte ? <Link href="/login" className="text-decoration-none fw-semibold text-primary">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
