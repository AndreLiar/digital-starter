//src/app/contact/page.tsx
'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    }
  }

  return (
    <div className="py-5 px-3 px-md-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="mx-auto" style={{ maxWidth: '700px' }}>
        <h1 className="mb-4 fw-bold display-5 text-primary">📬 Contact & Feedback</h1>

        {success && (
          <div className="alert alert-success" role="alert">
            ✅ Merci pour votre message ! Nous vous répondrons bientôt.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Nom</label>
            <input
              className="form-control"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-medium">Message</label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Votre message ou retour"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 fw-bold">📤 Envoyer</button>
        </form>
      </div>
    </div>
  )
}
