// src/app/api/gemini/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import clientPromise from '@/lib/mongodb'
import { callGemini } from '@/lib/gemini'

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
