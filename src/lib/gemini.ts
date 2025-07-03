import { NextResponse } from 'next/server'

// Fonction modulaire pour appeler l'API Gemini
export async function callGemini(messages: any[], format: 'json' | 'text' = 'text') {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Clé API Gemini manquante.')
  }

  const formatted = messages.map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }))

  const body: any = { contents: formatted }
  if (format === 'json') {
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
