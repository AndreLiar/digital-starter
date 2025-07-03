//src/app/assistant/page.tsx
'use client'

import { useEffect, useState, useRef } from 'react'
import { marked } from 'marked'
import { phases } from '@/lib/data/phases'

type Message = { role: 'user' | 'assistant'; content: string }

export default function AssistantPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [typing, setTyping] = useState('')
  const [currentPhase, setCurrentPhase] = useState<any | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Effet initial pour définir un message de bienvenue
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content:
          "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider ?",
      },
    ])

    const savedPhaseId = localStorage.getItem('current-phase-id')
    if (savedPhaseId) {
      const phase = phases.find(p => p.id === savedPhaseId)
      setCurrentPhase(phase ?? null)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', content: input }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setTyping('')

    // 🔁 Contexte dynamique selon la phase
    const context = currentPhase?.objectif ?? 'formation numérique'
    const contextMsg: Message = {
      role: 'user',
      content: `Contexte : ${context}. L'utilisateur demande : ${input}`,
    }

    const res = await fetch('/api/gemini', {
      method: 'POST',
      body: JSON.stringify({ messages: [...updatedMessages, contextMsg] }),
    })

    const data = await res.json()
    const answer = data.answer
    simulateTyping(answer, (fullMsg) => {
      const aiMsg: Message = { role: 'assistant', content: fullMsg }
      const finalMessages = [...updatedMessages, aiMsg]
      setMessages(finalMessages)
      setTyping('')
      setLoading(false)
    })
  }

  const simulateTyping = (text: string, callback: (result: string) => void) => {
    let i = 0
    setTyping('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setTyping(prev => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
        callback(text)
      }
    }, 15)
  }

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <h1 className="fw-bold mb-4">Assistant IA 🤖</h1>

      {currentPhase && (
        <div className="alert alert-info mb-3">
          💡 Contexte actif : <strong>{currentPhase.title}</strong> – <em>{currentPhase.objectif}</em>
        </div>
      )}

      <div className="mb-4">
        <textarea
          className="form-control"
          rows={3}
          placeholder="Posez votre question ici..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="d-flex gap-2 mt-3">
          <button onClick={sendMessage} className="btn btn-primary" disabled={loading}>
            Envoyer
          </button>
          <button onClick={clearMessages} className="btn btn-outline-secondary" disabled={loading}>
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-4 p-3" style={{ minHeight: '200px' }}>
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3`}>
            <div className={`fw-semibold ${msg.role === 'user' ? 'text-primary' : 'text-success'}`}>
              {msg.role === 'user' ? 'Vous' : 'Assistant'}
            </div>
            <div
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }}
            />
          </div>
        ))}

        {typing && (
          <div className="mb-3 text-success">
            <div className="fw-semibold">Assistant</div>
            <pre className="mt-1">{typing}</pre>
          </div>
        )}

        {loading && !typing && (
          <div className="text-muted mt-3">⏳ L'Assistant réfléchit...</div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
