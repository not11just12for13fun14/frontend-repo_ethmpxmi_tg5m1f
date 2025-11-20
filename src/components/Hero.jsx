import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#FAF9F6]">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-extrabold leading-tight"
          style={{ color: '#2C3E50' }}
        >
          <span className="block">Gramin Saathi</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2D5016] via-[#FF9933] to-[#4A90E2]">
            ग्रामीण साथी • ಗ್ರಾಮೀಣ ಸಾಥಿ • கிராமின் ஸாதி
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto"
          style={{ color: '#2C3E50' }}
        >
          A premium rural-assistant chatbot for trusted answers, schemes, and services — simple, multilingual, and reliable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#chat" className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg" style={{ backgroundColor: '#2D5016' }}>Start Chat</a>
          <a href="#features" className="px-6 py-3 rounded-xl font-semibold shadow-lg" style={{ backgroundColor: '#FF9933', color: '#2C3E50' }}>See Features</a>
        </motion.div>
      </div>
    </section>
  )
}
