//src/app/phases/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { phases } from '@/lib/data/phases'
import PhaseCard from '@/components/PhaseCard'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function PhasesPage() {
  const { data: session, status } = useSession()
  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  useEffect(() => {
    const fetchCompletedModules = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const res = await fetch('/api/user') // Assuming this endpoint returns user data including completedModules
          if (res.ok) {
            const data = await res.json()
            setCompletedModules(data.user?.completedModules || [])
          }
        } catch (error) {
          console.error('Error fetching completed modules:', error)
        }
      }
    }
    fetchCompletedModules()
  }, [session, status])

  const totalPages = Math.ceil(phases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPhases = phases.slice(startIndex, startIndex + itemsPerPage)

  const getIsLocked = (phaseId: string) => {
    const phaseIndex = phases.findIndex(p => p.id === phaseId)
    const isCurrentPhaseCompleted = completedModules.includes(phaseId); // Check if current phase is completed

    if (isCurrentPhaseCompleted) {
      return false; // A completed phase should never be locked
    }

    if (phaseIndex === 0) {
      return false; // First module is always unlocked
    }

    const previousPhaseId = phases[phaseIndex - 1]?.id
    const isPreviousPhaseCompleted = completedModules.includes(previousPhaseId);

    return !isPreviousPhaseCompleted; // Lock if previous is not completed
  }

  return (
    <section className="bg-light py-5">
      <div className="container">
        {/* Hero section */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-gradient mb-2">Digital Sentinel</h1>
          <p className="lead text-muted">Parcours Digital Starter</p>
          <p className="text-muted">Explorez les phases une à une et progressez à votre rythme.</p>
        </div>

        {/* Grid of phases */}
        <div className="row g-4">
          {paginatedPhases.map(phase => (
            <div key={phase.id} className="col-sm-12 col-md-6 col-lg-4 d-flex">
              <PhaseCard phase={phase} isLocked={getIsLocked(phase.id)} />
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-between align-items-center mt-5">
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            ← Précédent
          </button>

          <span className="fw-semibold">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Suivant →
          </button>
        </div>
      </div>
    </section>
  )
}
