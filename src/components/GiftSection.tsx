import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG Gift Box
function GiftSVG({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="gift-box"
      whileTap={{ scale: 0.95 }}
      style={{ cursor: 'pointer', display: 'inline-block' }}
    >
      <svg viewBox="0 0 200 220" width="240" height="264">
        <defs>
          <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d0d2a" />
            <stop offset="50%" stopColor="#1a0515" />
            <stop offset="100%" stopColor="#2d0820" />
          </linearGradient>
          <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a1030" />
            <stop offset="100%" stopColor="#2a0820" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a96e" />
            <stop offset="50%" stopColor="#f5e6c8" />
            <stop offset="100%" stopColor="#c9a96e" />
          </linearGradient>
          <filter id="giftGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="shineGrad" cx="30%" cy="30%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Glow aura */}
        <ellipse cx="100" cy="210" rx="70" ry="12" fill="rgba(201, 169, 110, 0.2)" />

        {/* Box body */}
        <AnimatePresence>
          {!isOpen && (
            <motion.g key="closed" exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
              {/* Box */}
              <rect x="20" y="90" width="160" height="120" rx="6" fill="url(#boxGrad)" filter="url(#giftGlow)" />
              <rect x="20" y="90" width="160" height="120" rx="6" fill="url(#shineGrad)" />
              {/* Box ribbon vertical */}
              <rect x="90" y="90" width="20" height="120" fill="url(#ribbonGrad)" opacity="0.85" />
              {/* Box ribbon horizontal */}
              <rect x="20" y="150" width="160" height="16" fill="url(#ribbonGrad)" opacity="0.85" />

              {/* Lid */}
              <rect x="10" y="70" width="180" height="25" rx="5" fill="url(#lidGrad)" filter="url(#giftGlow)" />
              <rect x="10" y="70" width="180" height="25" rx="5" fill="url(#shineGrad)" />
              {/* Lid ribbon */}
              <rect x="87" y="70" width="26" height="25" fill="url(#ribbonGrad)" opacity="0.85" />

              {/* Bow */}
              <path d="M100 70 Q75 40 60 50 Q65 65 100 70" fill="url(#ribbonGrad)" opacity="0.9" />
              <path d="M100 70 Q125 40 140 50 Q135 65 100 70" fill="url(#ribbonGrad)" opacity="0.9" />
              <path d="M100 70 Q75 55 70 45 Q82 43 100 70" fill="rgba(245, 230, 200, 0.6)" />
              <path d="M100 70 Q125 55 130 45 Q118 43 100 70" fill="rgba(245, 230, 200, 0.6)" />
              {/* Bow center */}
              <circle cx="100" cy="70" r="8" fill="url(#ribbonGrad)" />
              <circle cx="100" cy="70" r="4" fill="#f5e6c8" />

              {/* Stars on box */}
              <text x="55" y="145" fontSize="14" fill="rgba(201, 169, 110, 0.5)">✦</text>
              <text x="140" y="145" fontSize="14" fill="rgba(201, 169, 110, 0.5)">✦</text>
              <text x="55" y="185" fontSize="10" fill="rgba(255, 61, 127, 0.4)">♥</text>
              <text x="145" y="185" fontSize="10" fill="rgba(255, 61, 127, 0.4)">♥</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Open state */}
        <AnimatePresence>
          {isOpen && (
            <motion.g
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              {/* Box bottom */}
              <rect x="20" y="120" width="160" height="90" rx="6" fill="url(#boxGrad)" />
              {/* Lid open/tilted */}
              <motion.g
                initial={{ rotate: 0, y: 0 }}
                animate={{ rotate: -45, y: -30, x: -30 }}
                style={{ transformOrigin: '10px 90px' }}
              >
                <rect x="10" y="70" width="180" height="25" rx="5" fill="url(#lidGrad)" />
                <rect x="87" y="70" width="26" height="25" fill="url(#ribbonGrad)" opacity="0.85" />
              </motion.g>

              {/* Sparkles burst out */}
              {['✦', '♥', '✨', '🌹', '💎'].map((emoji, i) => (
                <motion.text
                  key={i}
                  x={100 + Math.cos((i / 5) * Math.PI * 2) * 60}
                  y={100 + Math.sin((i / 5) * Math.PI * 2) * 50}
                  fontSize="18"
                  textAnchor="middle"
                  initial={{ x: 100, y: 110, opacity: 0, scale: 0 }}
                  animate={{
                    x: 100 + Math.cos((i / 5) * Math.PI * 2) * 70,
                    y: 90 + Math.sin((i / 5) * Math.PI * 2) * 60,
                    opacity: [0, 1, 0.8],
                    scale: [0, 1.2, 1],
                  }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  {emoji}
                </motion.text>
              ))}

              {/* Glowing heart inside */}
              <motion.text
                x="100" y="180"
                fontSize="40"
                textAnchor="middle"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
              >
                🌹
              </motion.text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </motion.div>
  )
}

export default function GiftSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const messages = [
    '"Kamu adalah hadiah terindah yang pernah diberikan semesta kepadaku."',
    '"Dua tahun bersamamu terasa seperti mimpi yang tidak ingin aku akhiri."',
    '"Setiap hari bersamamu adalah petualangan yang membuatku jatuh cinta lagi."',
  ]

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setTimeout(() => setMessage(randomMsg), 500)
    }
  }

  const handleReset = () => {
    setIsOpen(false)
    setMessage('')
  }

  return (
    <section className="section-base" style={{ position: 'relative' }}>
      <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '2rem' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201, 169, 110, 0.7)', display: 'block', marginBottom: '0.75rem' }}>
            ── ✦ A Surprise For You ✦ ──
          </span>
          <h2 className="font-cormorant gradient-text" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 600, fontStyle: 'italic' }}>
            {isOpen ? 'Dengan Segenap Cinta' : 'Ada Hadiah Untukmu'}
          </h2>
        </motion.div>

        {/* Gift */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          <motion.div
            animate={!isOpen ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <GiftSVG isOpen={isOpen} onClick={handleOpen} />
          </motion.div>

          {!isOpen && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}
            >
              👆 Tap untuk membuka hadiah
            </motion.p>
          )}

          {/* Message Card */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="glass"
                style={{ borderRadius: 16, padding: '1.5rem 2rem', maxWidth: 400, cursor: 'pointer' }}
                onClick={handleReset}
              >
                <p className="font-cormorant" style={{
                  fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.6,
                  color: 'var(--rose-gold-light)',
                  marginBottom: '1rem'
                }}>
                  {message}
                </p>
                <div style={{ borderTop: '1px solid rgba(201, 169, 110, 0.2)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-dancing" style={{ color: 'var(--neon-pink)', fontSize: '1rem' }}>Bee x Bubba 🌹</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={handleReset}>↩ Buka lagi</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
