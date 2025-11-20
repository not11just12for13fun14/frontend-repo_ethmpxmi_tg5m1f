import { useEffect, useMemo, useRef, useState } from 'react'
import { Send, Mic, Globe2, MapPin, Loader2, Volume2 } from 'lucide-react'

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
]

export default function Chat() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [language, setLanguage] = useState('en')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [offline, setOffline] = useState(!navigator.onLine)
  const sessionIdRef = useRef(localStorage.getItem('gs_session') || crypto.randomUUID())

  useEffect(() => {
    localStorage.setItem('gs_session', sessionIdRef.current)
    const handleOnline = () => setOffline(false)
    const handleOffline = () => setOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const location = useMemo(() => ({ state: state || undefined, district: district || undefined }), [state, district])

  const ask = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')

    const userMsg = { role: 'user', text }
    setMessages((m) => [...m, userMsg])
    setLoading(true)

    try {
      const res = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionIdRef.current, message: text, language, location }),
      })
      const data = await res.json()
      const assistantMsg = { role: 'assistant', text: data.reply, sources: data.sources, confidence: data.confidence }
      setMessages((m) => {
        const nm = [...m, assistantMsg]
        // cache last 50 Q&A
        localStorage.setItem('gs_cache', JSON.stringify(nm.slice(-100)))
        return nm
      })
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: 'Unable to reach server. Showing last cached answers if any.' }])
      const cached = localStorage.getItem('gs_cache')
      if (cached) {
        setMessages(JSON.parse(cached))
      }
    } finally {
      setLoading(false)
    }
  }

  const tts = async (text) => {
    try {
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'te' ? 'te-IN' : language === 'mr' ? 'mr-IN' : language === 'kn' ? 'kn-IN' : 'en-IN'
      speechSynthesis.speak(utter)
    } catch {}
  }

  return (
    <section id="chat" className="min-h-[70vh] bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <Globe2 size={18} color="#2C3E50" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-2 rounded-xl border bg-white" style={{ color: '#2C3E50' }}>
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={18} color="#2C3E50" />
            <input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="px-3 py-2 rounded-xl border bg-white w-28" />
            <input placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} className="px-3 py-2 rounded-xl border bg-white w-28" />
            {offline && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: '#FFEDCC', color: '#8B5E00' }}>Offline</span>}
          </div>
        </div>

        <div className="h-[50vh] overflow-y-auto rounded-2xl p-4 border bg-white/70 backdrop-blur">
          {messages.length === 0 && (
            <div className="text-center text-sm" style={{ color: '#2C3E50' }}>Ask anything about schemes, agriculture, health, education...</div>
          )}
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={`inline-block px-4 py-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-[#4A90E2] text-white' : 'bg-white border'}`} style={{ color: m.role === 'user' ? 'white' : '#2C3E50' }}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {m.sources && (
                    <div className="mt-2 text-xs opacity-80">
                      <div>Sources:</div>
                      {m.sources.map((s, si) => (
                        <div key={si}>• {s.title} {s.source ? `(${s.source})` : ''}</div>
                      ))}
                      <div>Confidence: {(m.confidence * 100).toFixed(0)}%</div>
                    </div>
                  )}
                </div>
                {m.role === 'assistant' && (
                  <button onClick={() => tts(m.text)} className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full border bg-white text-xs" style={{ color: '#2C3E50' }}>
                    <Volume2 size={14} /> Listen
                  </button>
                )}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-sm" style={{ color: '#2C3E50' }}><Loader2 className="animate-spin" size={16} /> Thinking...</div>}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." className="flex-1 px-4 py-3 rounded-2xl border bg-white" />
          <button onClick={ask} className="px-5 py-3 rounded-2xl text-white font-semibold" style={{ backgroundColor: '#2D5016' }}>
            <Send size={18} />
          </button>
          <button className="px-4 py-3 rounded-2xl border bg-white" title="Voice (browser)" style={{ color: '#2C3E50' }}>
            <Mic size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
