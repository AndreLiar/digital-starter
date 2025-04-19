// src/app/api/user/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import clientPromise from '@/lib/mongodb'
import { authOptions } from '@/lib/authOptions'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const client = await clientPromise
  const db = client.db()
  const user = await db.collection('users').findOne({ 
    email: session.user.email 
  }, {
    projection: { 
      email: 1,
      name: 1,
      createdAt: 1,
      _id: 0
    }
  })

  return NextResponse.json(user)
}