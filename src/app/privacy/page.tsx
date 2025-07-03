// src/app/privacy/page.tsx
'use client'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 p-md-5 rounded-4">
        <h1 className="mb-4 fw-bold display-5 text-primary text-center">🔐 Politique de Confidentialité</h1>
        <p className="lead text-center mb-5">
          Chez <strong>Digital Sentinel</strong>, nous nous engageons à protéger votre vie privée et vos données personnelles.
          Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
        </p>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">1. Informations que nous collectons</h2>
          <p>Nous collectons les informations suivantes pour vous fournir nos services et améliorer votre expérience :</p>
          <ul>
            <li><strong>Informations de compte :</strong> Nom, adresse e-mail, mot de passe (chiffré) lors de l'inscription.</li>
            <li><strong>Données de progression :</strong> Votre avancement dans les modules, les actions cochées, les résultats des quiz.</li>
            <li><strong>Données d'utilisation de l'IA :</strong> Nombre de requêtes effectuées à l'assistant IA.</li>
            <li><strong>Informations techniques :</strong> Adresse IP, type de navigateur, système d'exploitation (collectées automatiquement pour des raisons de sécurité et d'analyse d'erreurs).</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">2. Comment nous utilisons vos informations</h2>
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul>
            <li>Fournir et personnaliser votre accès aux modules de formation et à l'assistant IA.</li>
            <li>Suivre votre progression et vous aider à atteindre vos objectifs d'apprentissage.</li>
            <li>Améliorer nos services, comprendre les tendances d'utilisation et corriger les bugs.</li>
            <li>Assurer la sécurité de notre plateforme et prévenir les abus.</li>
            <li>Communiquer avec vous concernant votre compte ou des mises à jour importantes (si nécessaire).</li>
          </ul>
          <p><strong>Nous ne vendons, ne louons et ne partageons jamais vos données personnelles à des tiers à des fins commerciales.</strong></p>
        </section>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">3. Partage des informations</h2>
          <p>Nous ne partageons vos informations que dans les cas suivants :</p>
          <ul>
            <li><strong>Fournisseurs de services :</strong> Avec des services tiers qui nous aident à opérer notre plateforme (hébergement, base de données). Ces tiers sont contractuellement tenus de protéger vos données.</li>
            <li><strong>Obligations légales :</strong> Si la loi l'exige ou en réponse à une procédure judiciaire valide.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">4. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles robustes pour protéger vos données contre l'accès non autorisé, la modification, la divulgation ou la destruction. Cela inclut le chiffrement des mots de passe, l'utilisation de connexions sécurisées (HTTPS) et le stockage dans une base de données MongoDB chiffrée.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">5. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> Obtenir une copie des données que nous détenons sur vous.</li>
            <li><strong>Droit de rectification :</strong> Demander la correction de données inexactes ou incomplètes.</li>
            <li><strong>Droit à l'effacement ("droit à l'oubli") :</strong> Demander la suppression de vos données personnelles.</li>
            <li><strong>Droit à la limitation du traitement :</strong> Demander la limitation de l'utilisation de vos données.</li>
            <li><strong>Droit à la portabilité des données :</strong> Recevoir vos données dans un format structuré et couramment utilisé.</li>
            <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données dans certaines circonstances.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">6. Conservation des données</h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour vous fournir nos services et pour respecter nos obligations légales. Si vous demandez la suppression de votre compte, vos données seront supprimées dans un délai raisonnable, sauf si une conservation est requise par la loi.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="fw-bold text-secondary mb-3">7. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des dernières informations sur nos pratiques en matière de confidentialité.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="fw-bold text-secondary mb-3">8. Nous contacter</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, veuillez nous contacter via notre{' '}
            <Link href="/contact" className="text-decoration-underline text-primary fw-semibold">formulaire de contact</Link>.
          </p>
        </section>

        <div className="text-center">
          <Link href="/" className="btn btn-outline-primary btn-lg">
            ⬅ Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  )
}