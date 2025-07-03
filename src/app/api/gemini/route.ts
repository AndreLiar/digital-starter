// src/app/api/gemini/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import clientPromise from '@/lib/mongodb'

// Fonction modulaire pour appeler l'API Gemini
async function callGemini(messages: any[], format: 'json' | 'text' = 'text') {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Clé API Gemini manquante.')
  }

  const formatted = messages.map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }))

  const body = { contents: formatted }
  if (format === 'json') {
    // @ts-ignore
    body.generationConfig = {
      response_mime_type: 'application/json',
    }
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error('Erreur API Gemini:', errorText)
    throw new Error(`Erreur de l'API Gemini: ${res.statusText}`)
  }

  const json = await res.json()
  return json?.candidates?.[0]?.content?.parts?.[0]?.text
}

// Route pour l'assistant conversationnel
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ answer: '🔒 Authentification requise.' }, { status: 401 })
  }

  const { messages } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ answer: '❌ Format invalide.' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  console.log(`🧠 Gemini call (chat):`, { ip, user: session.user.email })

  try {
    const client = await clientPromise
    const db = client.db()
    const user = await db.collection('users').findOne({ email: session.user.email })
    const today = new Date().toISOString().split('T')[0]
    const todayCount = user?.usage?.gemini?.[today] || 0

    if (todayCount >= 50) { // Increased limit
      return NextResponse.json({ answer: '🛑 Quota quotidien atteint (50 requêtes).' }, { status: 429 })
    }

    await db.collection('users').updateOne(
      { email: session.user.email },
      { $inc: { [`usage.gemini.${today}`]: 1 } },
    )

    const answer = await callGemini(messages)
    return NextResponse.json({ answer: answer || '❌ Je n’ai pas compris. Peux-tu reformuler ?' })

  } catch (error: any) {
    console.error('❌ Erreur Gemini:', error)
    return NextResponse.json({ answer: `❌ ${error.message}` }, { status: 500 })
  }
}

// Exporter la fonction pour la réutiliser dans d'autres routes
export { callGemini }

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ usage: 0 }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection('users').findOne({ email: session.user.email })

  const today = new Date().toISOString().split('T')[0]
  const usage = user?.usage?.gemini?.[today] || 0

  return NextResponse.json({ usage })
}
