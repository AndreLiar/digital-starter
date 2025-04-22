//src/app/phases/page.tsx
'use client'

import { useState } from 'react'
import { phases } from '@/lib/data/phases'
import PhaseCard from '@/components/PhaseCard'
import Image from 'next/image'

export default function PhasesPage() {
  const itemsPerPage = 6
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(phases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPhases = phases.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="bg-light py-5">
      <div className="container">
        {/* Hero section */}
        <div className="text-center mb-5">
          <Image
            src="/digital-starter-logo.png"
            alt="Logo Digital Starter"
            width={48}
            height={48}
            className="mb-2"
          />
          <h1 className="display-5 fw-bold text-gradient">Parcours Digital Starter</h1>
          <p className="text-muted">Explorez les phases une à une et progressez à votre rythme.</p>
        </div>

        {/* Grid of phases */}
        <div className="row g-4">
          {paginatedPhases.map(phase => (
            <div key={phase.id} className="col-sm-12 col-md-6 col-lg-4 d-flex">
              <PhaseCard phase={phase} />
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
