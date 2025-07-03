import { NextResponse } from 'next/server'
import { callGemini } from '../gemini/route'

export async function POST(req: Request) {
  const { phase } = await req.json()

  if (!phase) {
    return NextResponse.json({ error: 'Phase content is missing' }, { status: 400 })
  }

  // Construire le contexte pour l'IA
  const context = `
    Module: ${phase.title}
    Objectif: ${phase.objectif}
    Actions clés:
    ${phase.actions.map((a: any) => `- ${a.title}: ${a.details.replace(/<[^>]*>/g, ' ')}`).join('\n')}
    Exemples: ${phase.exemples.join(', ')}
  `

  const prompt = `
    Basé sur le contenu du module de formation suivant, génère un quiz de 3 questions à choix multiples (QCM).
    Le quiz doit valider la compréhension des concepts clés présentés.
    Réponds UNIQUEMENT avec un objet JSON valide, sans aucun autre texte avant ou après.
    Le format doit être : { "quiz": [ { "question": "...", "options": ["...", "...", "..."], "correctAnswer": index_de_la_bonne_réponse } ] }

    Voici le contenu du module :
    ${context}
  `

  try {
    const quizJsonString = await callGemini([{ role: 'user', content: prompt }], 'json')
    const quizObject = JSON.parse(quizJsonString)

    return NextResponse.json(quizObject)

  } catch (error: any) {
    console.error('Erreur lors de la génération du quiz:', error)
    return NextResponse.json({ error: `Impossible de générer le quiz: ${error.message}` }, { status: 500 })
  }
}
