// src/app/error/page.tsx
export default function ErrorPage() {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold text-danger mb-3">❌ Erreur</h1>
        <p className="text-muted">Une erreur est survenue lors de la connexion ou de la navigation.</p>
        <a href="/login" className="btn btn-outline-primary mt-3">Retour à la connexion</a>
      </div>
    )
  }
  