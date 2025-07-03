//src/app/components/PhaseCard.tsx
import Link from 'next/link'
import { Phase } from '@/lib/data/phases'
import { FaRocket, FaLock } from 'react-icons/fa'

type Props = {
  phase: Phase
  isLocked: boolean
}

export default function PhaseCard({ phase, isLocked }: Props) {
  return (
    <div className={`card h-100 border-0 shadow-sm rounded-4 phase-card transition ${isLocked ? 'locked-card' : ''}`}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        {/* Titre + infos */}
        <div>
          <div className="d-flex align-items-center gap-2 mb-2 text-primary">
            {isLocked ? <FaLock className="text-muted" /> : <FaRocket />}
            <h5 className="fw-bold mb-0">{phase.title}</h5>
          </div>
          <p className="text-muted small mb-1">⏱ {phase.duration}</p>
          <p className="text-muted small">{phase.objectif}</p>
        </div>

        {/* CTA */}
        {isLocked ? (
          <button className="btn btn-secondary w-100 mt-3" disabled>
            <FaLock className="me-2" /> Verrouillé
          </button>
        ) : (
          <Link
            href={`/phases/${phase.id}`}
            className="btn btn-outline-primary w-100 mt-3"
          >
            🚀 Commencer cette phase
          </Link>
        )}
      </div>
    </div>
  )
}

