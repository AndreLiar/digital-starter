// src/app/privacy/page.tsx
'use client'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="py-5 px-3 px-md-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="mx-auto" style={{ maxWidth: '900px' }}>
        <h1 className="mb-4 fw-bold display-5 text-primary">🔐 Politique de confidentialité</h1>
        <p className="mb-4 fs-5">
          Chez <strong>Digital Starter</strong>, votre vie privée est une priorité. Nous ne vendons, ne louons et ne partageons
          jamais vos données personnelles.
        </p>
        <ul className="list-unstyled fs-5 mb-4">
          <li className="mb-3">✅ Vos données (email, progression, feedback) sont utilisées uniquement pour personnaliser votre expérience.</li>
          <li className="mb-3">✅ Elles sont stockées en toute sécurité dans une base MongoDB chiffrée.</li>
          <li className="mb-3">✅ Vous pouvez demander la suppression de vos données à tout moment.</li>
        </ul>
        <p className="fs-5">
          Pour toute question ou demande de suppression de données, contactez-nous via notre{' '}
          <Link href="/contact" className="text-decoration-underline text-primary">formulaire de contact</Link>.
        </p>

        <div className="mt-5">
          <Link href="/" className="btn btn-outline-primary">
            ⬅ Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
