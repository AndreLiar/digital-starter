//src/app/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.landing}>
      <header className={styles.header}>
        <div className={styles.logoBlock}>
          <Image
            src="/digital-starter-logo.png"
            alt="Digital Starter Logo"
            width={48}
            height={48}
            priority
          />
          <h1 className={styles.title}>Digital Starter</h1>
        </div>
        <Link href="/register" className={styles.topCta}>
          🔑 Rejoindre la Bêta
        </Link>
      </header>

      <main className={styles.main}>
        <h2 className={styles.hero}>
          🧓 Pour les adultes qui veulent<br />
          <span>maîtriser le numérique simplement</span>
        </h2>
        <p className={styles.subtext}>
          Accompagnement pas à pas + Assistant IA personnalisé  
          <br /><strong>Confiance. Simplicité. Autonomie.</strong>
        </p>

        <div className={styles.ctaButtons}>
          <Link href="/register" className={styles.primaryBtn}>
            🆓 Créer un compte gratuitement
          </Link>
          <Link href="/phases" className={styles.secondaryBtn}>
            📘 Explorer les étapes
          </Link>
          <Link href="/assistant" className={styles.ghostBtn}>
            🤖 Poser une question à l’IA
          </Link>
        </div>

        <div className={styles.communityProof}>
          <p>👥 <strong>+150 testeurs</strong> déjà conquis</p>
          <p>💬 <strong>97% satisfaits</strong> de l’accompagnement IA</p>
        </div>

        <Image
          src="/digital-learning-illustration.png"
          alt="Illustration du parcours digital"
          width={600}
          height={400}
          className={styles.heroImage}
          priority
        />

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <i className="bi bi-check-circle-fill"></i>
            <h3>Pas besoin d’être expert</h3>
            <p>Instructions claires, adaptées à tous niveaux</p>
          </div>
          <div className={styles.featureCard}>
            <i className="bi bi-robot"></i>
            <h3>Assistant IA inclus</h3>
            <p>Posez vos questions, il vous aide 24h/24</p>
          </div>
          <div className={styles.featureCard}>
            <i className="bi bi-person-heart"></i>
            <h3>Fait pour les 40 ans et +</h3>
            <p>Interface lisible, rassurante et intuitive</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Digital Starter – Tous droits réservés</p>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Confidentialité</Link>
          <Link href="/contact">Contact & Feedback</Link>
        </div>
      </footer>
    </div>
  )
}
