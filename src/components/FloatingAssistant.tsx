// src/components/FloatingAssistant.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { marked } from 'marked'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [typing, setTyping] = useState('')
  const [showHint, setShowHint] = useState(true)
  const ref = useRef<HTMLDivElement | null>(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    const currentPhaseId = localStorage.getItem('current-phase-id')
    const currentContext = currentPhaseId ? `phase ${currentPhaseId}` : 'formation numérique'

    const userMsg: Message = { role: 'user', content: input }
    const updated = [...messages, userMsg]
    const saved = localStorage.getItem('assistant:popup')
    if (saved) {
      const parsed = JSON.parse(saved) as Message[]
      setMessages(parsed)
    }
    setInput('')
    setTyping('')

    const res = await fetch('/api/gemini', {
      method: 'POST',
      body: JSON.stringify({
        messages: updated,
        context: currentContext
      })
    })

    const data = await res.json()
    simulateTyping(data.answer)
  }

  const simulateTyping = (text: string) => {
    let i = 0
    setTyping('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setTyping(prev => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
        const aiMsg: Message = { role: 'assistant', content: text }
        const finalMessages = [...messages, aiMsg]
        setMessages(finalMessages)
        localStorage.setItem('assistant:popup', JSON.stringify(finalMessages))
        setTyping('')
      }
    }, 15)
  }

  useEffect(() => {
    const saved = localStorage.getItem('assistant:popup')
    if (saved) setMessages(JSON.parse(saved) as Message[])
  }, [])

  useEffect(() => {
    if (open) setShowHint(false)
  }, [open])

  return (
    <>
      {/* Floating Icon & Hint */}
      <div
        className="position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 1050 }}
      >
        {showHint && (
          <div className="bg-white text-dark p-2 rounded shadow-sm mb-2 text-nowrap">
            💡 Besoin d’un coup de main ?
          </div>
        )}
        <div
          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow pulse-icon"
          style={{ width: 60, height: 60, cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        >
          🤖
        </div>
      </div>

      {/* Chat Popup */}
      {open && (
        <div className="position-fixed bottom-0 end-0 m-4 p-3 rounded-4 shadow bg-white"
             style={{ width: 360, height: 500, zIndex: 1060 }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Assistant IA 🤖</strong>
            <button className="btn-close" onClick={() => setOpen(false)} />
          </div>

          <div className="overflow-auto mb-2" style={{ height: 320 }}>
            {messages.length === 0 && (
              <div className="text-muted small mb-2">
                Salut 👋 Je suis là si tu veux un coup de main sur cette phase.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className="mb-2">
                <div className={`fw-bold ${msg.role === 'user' ? 'text-primary' : 'text-success'}`}>
                  {msg.role === 'user' ? 'Moi' : 'Assistant'}
                </div>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }} />
              </div>
            ))}
            {typing && <pre className="text-success">{typing}</pre>}
          </div>

          <textarea
            className="form-control mb-2"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Demande de l'aide ici..."
          />
          <button className="btn btn-primary w-100" onClick={sendMessage}>
            Envoyer
          </button>
        </div>
      )}

      {/* CSS animation */}
      <style jsx>{`
        .pulse-icon {
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.6);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(13, 110, 253, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
          }
        }
      `}</style>
    </>
  )
}
