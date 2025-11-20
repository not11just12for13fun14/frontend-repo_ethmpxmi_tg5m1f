import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-16" style={{ background: '#FAF9F6' }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl backdrop-blur bg-white/60 border border-white/40 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.04),_inset_-6px_-6px_12px_rgba(255,255,255,0.9)]">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2C3E50' }}>Ready to try Gramin Saathi?</h3>
          <p className="mb-6" style={{ color: '#2C3E50' }}>Ask your first question or explore schemes tailored to your location.</p>
          <a href="#chat" className="inline-block px-6 py-3 rounded-xl text-white font-semibold shadow-lg" style={{ backgroundColor: '#2D5016' }}>Start now</a>
        </motion.div>
      </div>
    </section>
  )
}
