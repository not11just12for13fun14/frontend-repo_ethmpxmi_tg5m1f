import Hero from './components/Hero'
import Features from './components/Features'
import Chat from './components/Chat'
import CTA from './components/CTA'

function App() {
  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg" style={{ background: '#2D5016' }}></div>
            <span className="font-semibold" style={{ color: '#2C3E50' }}>Gramin Saathi</span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm" style={{ color: '#2C3E50' }}>
            <a href="#features">Features</a>
            <a href="#chat">Chat</a>
          </nav>
          <a href="#chat" className="px-4 py-2 rounded-xl text-white font-semibold" style={{ backgroundColor: '#4A90E2' }}>Open App</a>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <Chat />
        <CTA />
      </main>

      <footer className="py-10 text-center text-sm" style={{ color: '#2C3E50' }}>
        Built for rural India • High contrast • Big buttons • Multilingual
      </footer>
    </div>
  )
}

export default App
