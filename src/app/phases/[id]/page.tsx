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
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [userAnswers, setUserAnswers] = useState<any>({})
  const [quizResult, setQuizResult] = useState<any | null>(null)

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
        console.error('Erreur API :', err)
      }
    }

    if (updated.every(Boolean)) {
      toast.info('🎉 Checklist terminée ! Prêt pour le quiz ?')
      setCompleted(true) // Mark as completed to show the quiz button
    }
  }

  const startQuiz = async () => {
    if (!phase) return
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase }), // Send the whole phase object
      })

      if (res.ok) {
        const data = await res.json()
        if (data.quiz) {
          setQuizQuestions(data.quiz)
          setShowQuiz(true)
          setQuizResult(null)
          setUserAnswers({})
        } else {
          throw new Error('Format de quiz invalide reçu.')
        }
      } else {
        const errData = await res.json()
        toast.error(`Impossible de générer le quiz : ${errData.error}`)
      }
    } catch (err: any) {
      toast.error(`Erreur de communication : ${err.message}`)
    }
  }

  const handleAnswerChange = (qIndex: number, aIndex: number) => {
    setUserAnswers({ ...userAnswers, [qIndex]: aIndex })
  }

  const submitQuiz = async () => {
    let score = 0
    quizQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) {
        score++
      }
    })

    const total = quizQuestions.length
    const passed = score === total
    setQuizResult({ score, total, passed })

    if (passed) {
      launchConfetti()
      toast.success(`Félicitations ! Vous avez obtenu ${score}/${total}. Module validé !`)
      // Call API to unlock next module
      if (session?.user && phase) { // Add phase check here
        try {
          await fetch('/api/unlock-module', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phaseId: phase.id }),
          })
          toast.success('Module suivant débloqué !')
          router.push('/profil') // Redirect to profile to show unlocked module
        } catch (err) {
          console.error('Erreur lors du déblocage du module:', err)
          toast.error('Erreur lors du déblocage du module suivant.')
        }
      }
    } else {
      toast.error(`Résultat : ${score}/${total}. Vous devez obtenir un score parfait pour valider. Réessayez !`)
    }
  }

  if (status === 'loading' || !phase || checked === null) {
    return <p className="text-center mt-5">Chargement…</p>
  }

  const progress = Math.round(
    (checked.filter(Boolean).length / checked.length) * 100,
  )

  if (showQuiz) {
    return (
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">Quiz de validation : {phase.title}</h2>
        {quizResult ? (
          <div className="text-center">
            <h3>Résultat : {quizResult.score}/{quizResult.total}</h3>
            {quizResult.passed ? (
              <div>
                <p className="text-success">Excellent ! Vous avez validé ce module.</p>
                <Link href="/profil" className="btn btn-primary">Retourner au profil</Link>
              </div>
            ) : (
              <div>
                <p className="text-danger">Vous n'avez pas atteint le score parfait. Révisez le module et réessayez.</p>
                <button onClick={() => setShowQuiz(false)} className="btn btn-secondary me-2">Réviser le module</button>
                <button onClick={startQuiz} className="btn btn-primary">Réessayer le Quiz</button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {quizQuestions.map((q, i) => (
              <div key={i} className="card shadow-sm mb-4">
                <div className="card-body">
                  <p className="fw-semibold">{i + 1}. {q.question}</p>
                  {q.options.map((opt: string, j: number) => (
                    <div key={j} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`q-${i}`}
                        id={`q-${i}-a-${j}`}
                        onChange={() => handleAnswerChange(i, j)}
                      />
                      <label className="form-check-label" htmlFor={`q-${i}-a-${j}`}>{opt}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button onClick={submitQuiz} className="btn btn-success btn-lg">Valider le Quiz</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* En-tête de la phase */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">{phase.title}</h1>
        <p className="text-muted fs-5">
          {phase.duration} – {phase.objectif}
        </p>
      </div>

      {/* Mode d’emploi et Progression */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8">
          <div className="alert alert-info text-center shadow-sm" role="alert">
            <h4 className="alert-heading">📌 Mode d’emploi</h4>
            <p>{phase.modeEmploi}</p>
          </div>
          <div className="mt-4">
            <div className="d-flex justify-content-between mb-1">
              <span className="fw-semibold">Progression</span>
              <span className="fw-bold text-success">{progress}%</span>
            </div>
            <div className="progress" style={{ height: '1.25rem' }}>
              <div
                className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                style={{ width: `${progress}%` }}
                role="progressbar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal : Checklist, Outils, Exemples */}
      <div className="row g-5">
        {/* Colonne de gauche : Checklist */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h4 className="card-title mb-4">📋 Checklist des actions</h4>
              <div className="accordion accordion-flush" id="checklistAccordion">
                {phase.actions.map((action, i) => (
                  <div className="accordion-item" key={i}>
                    <h2 className="accordion-header" id={`heading-${i}`}>
                      <button
                        className="accordion-button collapsed fs-5 fw-semibold" // Keep it collapsed by default
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${i}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${i}`}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input me-3"
                          checked={checked[i]}
                          onChange={() => handleCheck(i)}
                          id={`check-${i}`}
                          style={{ transform: 'scale(1.4)' }}
                          onClick={(e) => e.stopPropagation()} // Prevent accordion from toggling when checking
                        />
                        <label
                          htmlFor={`check-${i}`}
                          className={`form-check-label ${checked[i] ? 'text-muted text-decoration-line-through' : ''}`}
                          onClick={(e) => e.stopPropagation()} // Prevent accordion from toggling
                        >
                          {action.title}
                        </label>
                      </button>
                    </h2>
                    <div
                      id={`collapse-${i}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${i}`}
                      data-bs-parent="#checklistAccordion"
                    >
                      <div className="accordion-body" dangerouslySetInnerHTML={{ __html: action.details }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne de droite : Outils & Exemples */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="card-title mb-3">🧰 Outils recommandés</h5>
              <p className="card-text">{phase.outils.join(', ')}</p>
            </div>
          </div>

          {phase.exemples && (
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="card-title mb-3">💡 Exemples concrets</h5>
                <ul className="list-unstyled">
                  {phase.exemples.map((ex, idx) => (
                    <li key={idx} className="mb-2">
                      ✅ {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zone de validation du quiz */}
      {completed && (
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 text-center">
            <div className="card bg-light p-4 rounded-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Prêt à valider vos connaissances ?</h5>
                <p className="lead">Passez le quiz pour débloquer le module suivant.</p>
                <button onClick={startQuiz} className="btn btn-primary btn-lg">Démarrer le Quiz</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résultat attendu et Retour */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <div className="text-center bg-light p-4 rounded-4 shadow-sm">
            <h5 className="mb-2">🎯 Résultat attendu</h5>
            <p className="lead">{phase.resultat}</p>
          </div>
          <div className="text-center mt-4">
            <Link href="/profil" className="btn btn-outline-primary btn-lg">
              ← Retour au profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
