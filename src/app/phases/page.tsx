//src/app/phases/page.tsx
'use client'

import { phases } from '@/lib/data/phases'
import PhaseCard from '@/components/PhaseCard'
import Image from 'next/image'

export default function PhasesPage() {
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

        {/* Grille de phases */}
        <div className="row g-4">
          {phases.map(phase => (
            <div key={phase.id} className="col-sm-12 col-md-6 col-lg-4 d-flex">
              <PhaseCard phase={phase} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

