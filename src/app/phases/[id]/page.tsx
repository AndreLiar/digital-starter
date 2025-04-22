//src/app/phases/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { phases } from '@/lib/data/phases'
import { launchConfetti } from '@/lib/confetti'
import { toast } from 'react-toastify'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css'

export default function PhaseDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const phase = phases.find(p => p.id === id)

  const [checked, setChecked] = useState<boolean[] | null>(null)
  const [completed, setCompleted] = useState(false)

  // 🔐 Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/register') // 👈 Redirect to register page
    }
  }, [status, router])

  useEffect(() => {
    if (phase) localStorage.setItem('current-phase-id', phase.id)
  }, [phase])

  useEffect(() => {
    const syncProgress = async () => {
      if (!phase) return

      try {
        const res = await fetch(`/api/progress?phaseId=${phase.id}`)
        if (res.ok) {
          const data = await res.json()
          if (data?.checked) {
            setChecked(data.checked)
            localStorage.setItem(`phase-${phase.id}`, JSON.stringify(data.checked))
            return
          }
        }
      } catch {
        console.warn('API indisponible ; on passe en localStorage.')
      }

      const saved = localStorage.getItem(`phase-${phase.id}`)
      const parsed: boolean[] = saved
        ? JSON.parse(saved)
        : Array(phase.actions.length).fill(false)

      if (parsed.length !== phase.actions.length) {
        const resized = Array(phase.actions.length)
          .fill(false)
          .map((_, i) => parsed[i] ?? false)
        setChecked(resized)
        localStorage.setItem(`phase-${phase.id}`, JSON.stringify(resized))
      } else {
        setChecked(parsed)
      }
    }
    syncProgress()
  }, [phase])

  const handleCheck = async (i: number) => {
    if (!phase || !checked) return

    const updated = [...checked]
    updated[i] = !updated[i]
    setChecked(updated)
    localStorage.setItem(`phase-${phase.id}`, JSON.stringify(updated))

    if (session?.user) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phaseId: phase.id, checked: updated }),
        })
      } catch (err) {
        console.error('Erreur API :', err)
      }
    }

    if (updated.every(Boolean) && !completed) {
      setCompleted(true)
      launchConfetti()
      toast.success('🎉 Phase complétée à 100 % ! Bravo !')
    }
  }

  if (status === 'loading' || !phase || checked === null) {
    return <p className="text-center mt-5">Chargement…</p>
  }

  const progress = Math.round(
    (checked.filter(Boolean).length / checked.length) * 100,
  )

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2">{phase.title}</h1>
      <p className="text-muted">
        {phase.duration} – {phase.objectif}
      </p>

      {/* Mode d’emploi spécifique à la phase */}
      <div className="alert alert-info mt-3 mb-4" role="alert">
        <strong>📌 Mode d’emploi :</strong>
        <br />
        {phase.modeEmploi}
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Progression : {progress}%
        </label>
        <div className="progress" style={{ height: '1rem' }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
            role="progressbar"
          />
        </div>
      </div>

      {/* Checklist des actions */}
      <div className="card p-4 border-0 shadow-sm rounded-4 mb-5">
        <h4 className="mb-3">📋 Checklist</h4>
        <ul className="list-group list-group-flush">
          {phase.actions.map((action, i) => (
            <li
              key={i}
              className="list-group-item d-flex align-items-center"
            >
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={checked[i]}
                onChange={() => handleCheck(i)}
                id={`check-${i}`}
              />
              <label
                htmlFor={`check-${i}`}
                className="form-check-label"
              >
                {action}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Outils */}
      <div className="mb-4">
        <h5 className="mb-2">🧰 Outils recommandés</h5>
        <p>{phase.outils.join(', ')}</p>
      </div>

      {/* Exemples concrets */}
      {phase.exemples && (
        <div className="mb-4">
          <h5 className="mb-2">💡 Exemples</h5>
          <ul>
            {phase.exemples.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Résultat attendu */}
      <div>
        <h5 className="mb-2">🎯 Résultat attendu</h5>
        <p>{phase.resultat}</p>
      </div>

      {/* Retour au profil */}
      <div className="text-center mt-5">
        <Link href="/profil" className="btn btn-outline-primary">
          ← Retour au profil
        </Link>
      </div>
    </div>
  )
}
