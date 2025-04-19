//src/app/api/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json({ message: 'Tous les champs sont requis.' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection('users')

  const existing = await users.findOne({ email })
  if (existing) {
    return NextResponse.json({ message: 'Utilisateur déjà existant.' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await users.insertOne({
    email,
    password: hashedPassword,
    name,
    createdAt: new Date(),
    usage: {
      gemini: {}  // 💡 Prêt pour suivre les quotas
    }
  })

  return NextResponse.json({ message: 'Compte créé avec succès.' })
}
