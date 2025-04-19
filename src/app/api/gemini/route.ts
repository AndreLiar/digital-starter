// src/app/api/gemini/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ answer: "🔒 Authentification requise." }, { status: 401 })
  }

  const { messages } = await req.json()

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ answer: "❌ Format invalide." }, { status: 400 })
  }
  

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ answer: "⚠️ Clé API Gemini manquante." }, { status: 500 })
  }

  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  console.log(`🧠 Gemini call:`, {
    ip,
    user: session.user.email,
    time: new Date().toISOString(),
  })

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection('users').findOne({ email: session.user.email })

  const today = new Date().toISOString().split('T')[0]
  const usage = user?.usage?.gemini || {}
  const todayCount = usage[today] || 0

  if (todayCount >= 20) {
    return NextResponse.json({ answer: "🛑 Quota quotidien atteint (20 requêtes)." }, { status: 429 })
  }

  await db.collection('users').updateOne(
    { email: session.user.email },
    {
      $set: { [`usage.gemini.${today}`]: todayCount + 1 }
    }
  )

  const formatted = messages.map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }))

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: formatted }),
    })

    const json = await res.json()
    const answer = json?.candidates?.[0]?.content?.parts?.[0]?.text || "❌ Je n’ai pas compris. Peux-tu reformuler ?"

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('❌ Erreur Gemini:', error)
    return NextResponse.json({ answer: "❌ Erreur de l’assistant. Réessaie plus tard." }, { status: 500 })
  }
}

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
