//src/app/phases/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { phases } from '@/lib/data/phases'
import { launchConfetti } from '@/lib/confetti'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function PhaseDetailPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const phase = phases.find(p => p.id === id)
  const [checked, setChecked] = useState<boolean[] | null>(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (phase) {
      localStorage.setItem('current-phase-id', phase.id)
    }
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
      } catch (e) {
        console.warn("Fallback to localStorage.")
      }

      const saved = localStorage.getItem(`phase-${phase.id}`)
      const parsed = saved ? JSON.parse(saved) : Array(phase.actions.length).fill(false)
      setChecked(parsed)
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
          body: JSON.stringify({
            phaseId: phase.id,
            checked: updated
          }),
        })
      } catch (error) {
        console.error("Erreur update:", error)
      }
    }

    // ✅ Celebrate if 100%
    if (updated.every(Boolean) && !completed) {
      setCompleted(true)
      launchConfetti()
      toast.success("🎉 Phase complétée à 100% ! Bravo !")
    }
  }

  if (!phase || checked === null) return <p className="text-center mt-5">Chargement...</p>

  const progress = Math.round((checked.filter(Boolean).length / checked.length) * 100)

  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-2">{phase.title}</h1>
      <p className="text-muted mb-4">{phase.duration} – {phase.objectif}</p>

      <div className="mb-4">
        <label className="form-label fw-semibold">Progression : {progress}%</label>
        <div className="progress" style={{ height: '1rem' }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
            role="progressbar"
          />
        </div>
      </div>

      <div className="card p-4 border-0 shadow-sm rounded-4 mb-5">
        <h4 className="mb-3">📋 Checklist</h4>
        <ul className="list-group list-group-flush">
          {phase.actions.map((action, i) => (
            <li key={i} className="list-group-item d-flex align-items-center">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={checked[i]}
                onChange={() => handleCheck(i)}
                id={`check-${i}`}
              />
              <label htmlFor={`check-${i}`} className="form-check-label">{action}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h5 className="mb-2">🧰 Outils recommandés</h5>
        <p>{phase.outils.join(', ')}</p>
      </div>

      <div>
        <h5 className="mb-2">🎯 Résultat attendu</h5>
        <p>{phase.resultat}</p>
      </div>
    </div>
  )
}
