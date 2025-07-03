// src/app/contact/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaPaperPlane } from 'react-icons/fa'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        setSuccess(true)
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const data = await res.json()
        setError(data.message || "Une erreur est survenue lors de l'envoi.")
      }
    } catch (err) {
      setError("Impossible de se connecter au serveur. Veuillez vérifier votre connexion.")
    }
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="mb-3 fw-bold display-5 text-primary">📬 Contactez-nous</h1>
        <p className="lead text-muted">
          Nous sommes là pour vous aider ! N'hésitez pas à nous envoyer un message.
        </p>
      </div>

      {/* Centred Form */}
      <div className="d-flex justify-content-center">
        <div className="card shadow-sm p-4 p-md-5 rounded-4" style={{ maxWidth: '700px', width: '100%' }}>
          <h2 className="fw-bold mb-4 text-secondary text-center">Envoyez-nous un message</h2>

          {success && (
            <div className="alert alert-success fade show" role="alert">
              ✅ Merci pour votre message ! Nous vous répondrons bientôt.
            </div>
          )}
          {error && (
            <div className="alert alert-danger fade show" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-medium">Nom</label>
              <input
                className="form-control form-control-lg"
                type="text"
                id="name"
                placeholder="Votre nom complet"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">Email</label>
              <input
                className="form-control form-control-lg"
                type="email"
                id="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label fw-medium">Message</label>
              <textarea
                className="form-control form-control-lg"
                id="message"
                rows={6}
                placeholder="Votre message ou retour..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary btn-lg w-100 fw-bold" type="submit">
              <FaPaperPlane className="me-2" /> Envoyer le message
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link href="/" className="btn btn-outline-primary btn-lg">
          ⬅ Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}
