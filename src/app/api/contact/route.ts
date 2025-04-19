// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    const client = await clientPromise
    const db = client.db()

    await db.collection('contacts').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: 'Message enregistré avec succès' })
  } catch (error) {
    console.error('Erreur Contact API:', error)
    return NextResponse.json({ message: 'Erreur lors de l’envoi' }, { status: 500 })
  }
}
