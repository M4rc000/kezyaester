import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Time since relationship started (approx May 10, 2024)
  const relationshipStart = new Date('2024-04-11T00:00:00')
  const diff = time.getTime() - relationshipStart.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
      padding: '5rem 1.5rem 3rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(201, 169, 110, 0.1)',
    }}>
      {/* Love counter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass"
        style={{
          maxWidth: 560,
          margin: '0 auto 3rem',
          borderRadius: 20,
          padding: '2rem',
        }}
      >
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201, 169, 110, 0.6)', marginBottom: '1rem' }}>
          Sudah bersama selama
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.75rem, 3vw, 2rem)', flexWrap: 'wrap' }}>
          {[
            { value: days, label: 'Hari' },
            { value: hours, label: 'Jam' },
            { value: minutes, label: 'Menit' },
            { value: seconds, label: 'Detik' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', minWidth: 60 }}>
              <motion.div
                key={value}
                initial={{ y: -5, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                className="gradient-text"
                style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 700, lineHeight: 1, fontFamily: 'Space Grotesk' }}
              >
                {String(value).padStart(2, '0')}
              </motion.div>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
          dan terus bertambah setiap detiknya...
        </p>
      </motion.div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p className="font-dancing gradient-text-gold" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '0.5rem' }}>
          Bee x Bubba
        </p>
        <p className="font-cormorant" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', marginBottom: '2rem' }}>
          forever & always 🌹
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          {'♥ ♦ ✦ ♦ ♥'.split(' ').map((char, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              style={{ color: i === 2 ? 'var(--rose-gold)' : 'var(--neon-pink)', fontSize: i === 2 ? '1rem' : '0.6rem' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
          Made with 💗 · 10 Mei 2026
        </p>
      </motion.div>
    </footer>
  )
}
