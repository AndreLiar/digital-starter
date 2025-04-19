// src/app/api/progress/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import clientPromise from '@/lib/mongodb'

// GET: Récupérer la progression de l'utilisateur
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection('users').findOne({ email: session.user.email })

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
  }

  const progress = await db
    .collection('progress')
    .find({ userId: user._id.toString() })
    .toArray()

  return NextResponse.json(progress)
}

// POST: Enregistrer la progression utilisateur
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { phaseId, checked } = body // ✅ attendu : phaseId = '1', checked = [true, false, ...]

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection('users').findOne({ email: session.user.email })

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
  }

  await db.collection('progress').updateOne(
    { userId: user._id.toString(), phaseId },
    { $set: { checked, updatedAt: new Date() } },
    { upsert: true }
  )

  return NextResponse.json({ success: true })
}
