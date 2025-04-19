// src/app/profil/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { phases } from '@/lib/data/phases'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'

export default function ProfilPage() {
  const { data: session } = useSession()
  const [progressData, setProgressData] = useState<any[]>([])
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [geminiUsage, setGeminiUsage] = useState<number | null>(null)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/progress').then(res => res.json()).then(setProgressData)
      fetch('/api/user').then(res => res.json()).then(setUserData).finally(() => setLoading(false))
      fetch('/api/gemini')
      .then(res => res.ok ? res.json() : { usage: null })
      .then(data => setGeminiUsage(data.usage ?? null))
    }
  }, [session])

  if (loading) return <p className="text-center mt-5">Chargement des données...</p>
  if (!session) return <p className="text-center mt-5">Veuillez vous connecter.</p>

  const totalPhases = phases.length
  const globalProgress = Math.round(
    progressData.reduce((acc, p) => {
      const checked = p.checked.filter(Boolean).length
      const total = p.checked.length
      return acc + checked / total
    }, 0) / totalPhases * 100
  )

  const completedCount = progressData.filter(p => p.checked.every(Boolean)).length

  const getBadgeAndLevel = (score: number) => {
    if (score === 100) return { badge: '🌟 Or', level: 'Maître', color: 'success' }
    if (score >= 75) return { badge: '🥈 Argent', level: 'Avancé', color: 'primary' }
    if (score >= 40) return { badge: '🥉 Bronze', level: 'Intermédiaire', color: 'warning' }
    return { badge: '🧱 Débutant', level: 'Débutant', color: 'secondary' }
  }

  const { badge, level, color } = getBadgeAndLevel(globalProgress)

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="card mb-4 border-0 shadow-sm">
  <div className="card-body">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
      <div>
        <h1 className="fw-bold mb-1 text-wrap text-break">
          👤 Bienvenue, {session?.user?.name || session?.user?.email}
        </h1>
        <p className="text-muted mb-2 text-break">Connecté en tant que : {session?.user?.email}</p>
        {userData?.createdAt && (
          <p className="text-muted small">
            Membre depuis : {format(new Date(userData.createdAt), 'PPP', { locale: fr })}
          </p>
        )}
      </div>
      <div className={`badge bg-${color} fs-6 align-self-start`}>
        {badge} – {level}
      </div>
    </div>
  </div>
</div>
{geminiUsage !== null && (
  <p className="text-muted small mt-2">
    🤖 Utilisation de l’assistant IA aujourd’hui : <strong>{geminiUsage} / 20</strong>
  </p>
)}


      {/* Bouton vers toutes les phases */}
      <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mb-4">
  <button
    className="btn btn-outline-danger w-100 w-sm-auto"
    onClick={() => signOut({ callbackUrl: '/' })}
  >
    Se déconnecter
  </button>
  <Link href="/phases" className="btn btn-primary w-100 w-sm-auto text-center">
    🎯 Voir toutes les phases
  </Link>
</div>


      {/* Progression globale */}
      <div className="card mb-5 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">📊 Progression globale</h5>
          <div className="progress mb-2" style={{ height: '1rem' }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${globalProgress}%` }}
              role="progressbar"
            />
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Score : <strong>{globalProgress} / 100</strong></span>
            <span className="text-muted">Phases terminées : <strong>{completedCount} / {totalPhases}</strong></span>
          </div>
        </div>
      </div>

      {/* Phases individuelles */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">📚 Phases en cours</h4>
          <ul className="list-group">
  {phases.map((phase) => {
    const progress = progressData.find(p => p.phaseId === phase.id)
    const percent = progress
      ? Math.round(progress.checked.filter(Boolean).length / progress.checked.length * 100)
      : 0

    return (
      <li key={phase.id} className="list-group-item">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-2">
          <div>
            <strong>{phase.title}</strong>
            <p className="mb-0 text-muted small">{percent}% complété</p>
          </div>
          <span className={`badge ${percent === 100 ? 'bg-success' : 'bg-secondary'}`}>
            {percent === 100 ? '✅ Terminé' : `${percent}%`}
          </span>
        </div>
        <Link
          href={`/phases/${phase.id}`}
          className="btn btn-outline-primary btn-sm w-100"
        >
          Continuer cette phase →
        </Link>
      </li>
    )
  })}
</ul>

        </div>
      </div>
    </div>
  )
}
