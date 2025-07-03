'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaShieldAlt, FaLightbulb, FaAward, FaBookOpen, FaMousePointer, FaCheckCircle, FaQuoteLeft } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <span className="fw-bold fs-4 text-primary">Digital Sentinel</span>
          </Link>
          <div className="ms-auto">
            <Link href="/register" className="btn btn-primary">
              🔑 Accéder à la formation
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="bg-light py-5 py-md-6 text-center animate-fade-in">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <h1 className="display-4 fw-bold mb-3 text-gradient animate-slide-up">
                  🛡️ Devenez le gardien de votre vie numérique
                </h1>
                <p className="lead mb-4 animate-slide-up delay-1">
                  Protégez vos données, votre identité et votre sérénité avec notre parcours de formation interactif.
                </p>
                <div className="d-grid gap-3 col-md-8 mx-auto d-sm-flex justify-content-sm-center animate-slide-up delay-2">
                  <Link href="/register" className="btn btn-primary btn-lg px-4 me-sm-3">
                    🚀 Démarrer la formation (gratuit)
                  </Link>
                  <Link href="/phases" className="btn btn-outline-secondary btn-lg px-4">
                    📚 Explorer les modules
                  </Link>
                </div>
                <div className="mt-4 animate-slide-up delay-3">
                  <Link href="/assistant" className="text-muted text-decoration-none">
                    🤖 Poser une question au Cyber-Assistant
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-5 animate-fade-in delay-4">
              <Image
                src="/digital-learning-illustration.png"
                alt="Illustration de la sécurité numérique"
                width={700}
                height={450}
                className="img-fluid rounded shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-5 py-md-6 bg-white">
          <div className="container">
            <h2 className="text-center fw-bold mb-5 animate-fade-in">Comment ça marche ?</h2>
            <div className="row g-4">
              <div className="col-md-4 animate-slide-up delay-1">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <div className="card-body">
                    <FaBookOpen className="text-primary mb-3" size={48} />
                    <h3 className="fw-bold mb-2">1. Lisez les modules</h3>
                    <p className="text-muted">Des explications claires et concises sur les concepts clés de la cybersécurité.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 animate-slide-up delay-2">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <div className="card-body">
                    <FaMousePointer className="text-success mb-3" size={48} />
                    <h3 className="fw-bold mb-2">2. Appliquez sur vos comptes</h3>
                    <p className="text-muted">Mettez en pratique directement sur vos propres comptes pour un apprentissage actif.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 animate-slide-up delay-3">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <div className="card-body">
                    <FaCheckCircle className="text-info mb-3" size={48} />
                    <h3 className="fw-bold mb-2">3. Validez et progressez</h3>
                    <p className="text-muted">Validez vos acquis avec des quiz et débloquez les modules suivants.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-5 py-md-6 bg-light">
          <div className="container">
            <h2 className="text-center fw-bold mb-5 animate-fade-in">Pourquoi choisir Digital Sentinel ?</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div className="col animate-slide-up delay-1">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex align-items-start">
                    <FaShieldAlt className="text-primary me-3 mt-1" size={32} />
                    <div>
                      <h4 className="fw-bold">Sécurité Renforcée</h4>
                      <p className="text-muted mb-0">Apprenez les meilleures pratiques pour protéger vos données et votre identité en ligne.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col animate-slide-up delay-2">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex align-items-start">
                    <FaLightbulb className="text-success me-3 mt-1" size={32} />
                    <div>
                      <h4 className="fw-bold">Modules Interactifs</h4>
                      <p className="text-muted mb-0">Des exercices pratiques et des quiz pour une compréhension approfondie.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col animate-slide-up delay-3">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex align-items-start">
                    <FaAward className="text-info me-3 mt-1" size={32} />
                    <div>
                      <h4 className="fw-bold">Progression Guidée</h4>
                      <p className="text-muted mb-0">Un parcours clair, module par module, pour maîtriser la cybersécurité.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col animate-slide-up delay-4">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex align-items-start">
                    <FaShieldAlt className="text-primary me-3 mt-1" size={32} />
                    <div>
                      <h4 className="fw-bold">Cyber-Assistant IA</h4>
                      <p className="text-muted mb-0">Obtenez des réponses instantanées à toutes vos questions de sécurité.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col animate-slide-up delay-5">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex align-items-start">
                    <FaLightbulb className="text-success me-3 mt-1" size={32} />
                    <div>
                      <h4 className="fw-bold">Accessible à Tous</h4>
                      <p className="text-muted mb-0">Conçu pour les débutants comme pour ceux qui veulent approfondir leurs connaissances.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col animate-slide-up delay-6">
                <div className="card h-100 border-0 shadow-sm p-3">
                  <div className="card-body d-flex align-items-start">
                    <FaAward className="text-info me-3 mt-1" size={32} />
                    <div>
                      <h4 className="fw-bold">Certifications</h4>
                      <p className="text-muted mb-0">Validez vos compétences et obtenez des badges à partager.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-5 py-md-6 bg-white">
          <div className="container">
            <h2 className="text-center fw-bold mb-5 animate-fade-in">Ce qu'ils disent de nous</h2>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active text-center">
                      <FaQuoteLeft className="text-muted mb-3" size={48} />
                      <p className="lead fst-italic mb-3">
                        "Digital Sentinel a transformé ma façon d'aborder la sécurité en ligne. Les modules sont clairs et les exercices pratiques sont un vrai plus !"
                      </p>
                      <p className="fw-bold mb-0">- Marie D., Utilisatrice</p>
                    </div>
                    <div className="carousel-item text-center">
                      <FaQuoteLeft className="text-muted mb-3" size={48} />
                      <p className="lead fst-italic mb-3">
                        "Grâce à cet outil, j'ai enfin compris comment protéger mes mots de passe et éviter les arnaques. Indispensable !"
                      </p>
                      <p className="fw-bold mb-0">- Jean L., Entrepreneur</p>
                    </div>
                    <div className="carousel-item text-center">
                      <FaQuoteLeft className="text-muted mb-3" size={48} />
                      <p className="lead fst-italic mb-3">
                        "Le Cyber-Assistant est incroyable ! Il répond à toutes mes questions instantanément. Un vrai gain de temps."
                      </p>
                      <p className="fw-bold mb-0">- Sophie P., Étudiante</p>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action Section */}
        <section className="bg-primary text-white py-5 py-md-6 text-center">
          <div className="container">
            <h2 className="display-5 fw-bold mb-3 animate-fade-in">Prêt à sécuriser votre vie numérique ?</h2>
            <p className="lead mb-4 animate-slide-up delay-1">
              Rejoignez des milliers d'utilisateurs et prenez le contrôle de votre sécurité en ligne dès aujourd'hui.
            </p>
            <Link href="/register" className="btn btn-light btn-lg px-5 animate-slide-up delay-2">
              Commencer Gratuitement
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">&copy; 2025 Digital Sentinel – Tous droits réservés</p>
          <div className="d-flex gap-3">
            <Link href="/privacy" className="text-white-50 text-decoration-none">Confidentialité</Link>
            <Link href="/contact" className="text-white-50 text-decoration-none">Contact & Feedback</Link>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations and gradients */}
      <style jsx global>{`
        .text-gradient {
          background: linear-gradient(45deg, #007bff, #28a745);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        .animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.8s forwards;
        }

        .animate-slide-up.delay-1 { animation-delay: 0.2s; }
        .animate-slide-up.delay-2 { animation-delay: 0.4s; }
        .animate-slide-up.delay-3 { animation-delay: 0.6s; }
        .animate-slide-up.delay-4 { animation-delay: 0.8s; }
        .animate-slide-up.delay-5 { animation-delay: 1.0s; }
        .animate-slide-up.delay-6 { animation-delay: 1.2s; }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}