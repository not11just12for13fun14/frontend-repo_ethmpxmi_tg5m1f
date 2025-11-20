import { motion } from 'framer-motion'
import { Bot, MapPin, Mic, MessageSquareText, Database, FileText, ShieldCheck, Languages } from 'lucide-react'

export default function Features() {
  const items = [
    { icon: Bot, title: 'Verified QA (RAG)', desc: 'Natural language answers with sources and confidence.' },
    { icon: Languages, title: 'Multilingual', desc: 'English, हिंदी, ಕನ್ನಡ, தமிழ், తెలుగు, मराठी.' },
    { icon: MapPin, title: 'Location-aware', desc: 'State, district, village filtering with GPS option.' },
    { icon: MessageSquareText, title: 'WhatsApp & SMS', desc: 'Use the same assistant over Twilio.' },
    { icon: Mic, title: 'Voice', desc: 'Speech input and local language speech output.' },
    { icon: FileText, title: 'Docs', desc: 'Upload PDFs for summaries and Q&A.' },
    { icon: Database, title: 'Offline PWA', desc: 'Works offline; caches recent Q&As and schemes.' },
    { icon: ShieldCheck, title: 'Complaints', desc: 'File and track service complaints with photos.' },
  ]

  return (
    <section id="features" className="py-16 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={{ color: '#2C3E50' }}>Core features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl backdrop-blur bg-white/60 border border-white/40 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.04),_inset_-6px_-6px_12px_rgba(255,255,255,0.9)]">
              <it.icon className="w-6 h-6 mb-3" color="#2D5016" />
              <h3 className="font-semibold mb-1" style={{ color: '#2C3E50' }}>{it.title}</h3>
              <p className="text-sm" style={{ color: '#2C3E50' }}>{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
