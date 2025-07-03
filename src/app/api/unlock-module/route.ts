// src/app/api/unlock-module/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 })
  }

  const { phaseId } = await req.json()

  if (!phaseId) {
    return NextResponse.json({ message: 'Phase ID is required' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db()

    // Find the user and update their completedModules array
    await db.collection('users').updateOne(
      { email: session.user.email },
      { $addToSet: { completedModules: phaseId } }, // Add phaseId if not already present
      { upsert: true } // Create user if not exists (though user should exist if authenticated)
    )

    return NextResponse.json({ message: 'Module unlocked successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error unlocking module:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
