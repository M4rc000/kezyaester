import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ConfettiBurst } from './AnimatedElements'

interface CakeSectionProps {
  onBlown: () => void
}

// SVG Birthday Cake
function BirthdayCakeSVG({ candlesLit, onBlow }: { candlesLit: boolean; onBlow: () => void }) {
  const candles = Array.from({ length: 23 }, (_, i) => i)
  const visibleCandles = candles.slice(0, 5) // show 5 representative candles

  return (
    <svg
      viewBox="0 0 320 280"
      width="100%"
      style={{ maxWidth: 340, cursor: 'pointer' }}
      onClick={onBlow}
    >
      {/* Glow backdrop */}
      <defs>
        <radialGradient id="cakeGlow" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="rgba(255, 61, 127, 0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="tierGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a0a20" />
          <stop offset="100%" stopColor="#1a0515" />
        </linearGradient>
        <linearGradient id="tierGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d0d2a" />
          <stop offset="100%" stopColor="#280819" />
        </linearGradient>
        <linearGradient id="frostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(201, 169, 110, 0.9)" />
          <stop offset="100%" stopColor="rgba(201, 169, 110, 0.6)" />
        </linearGradient>
      </defs>

      {/* Glow */}
      <ellipse cx="160" cy="260" rx="130" ry="25" fill="url(#cakeGlow)" />

      {/* Bottom tier */}
      <rect x="40" y="180" width="240" height="70" rx="8" fill="url(#tierGrad1)" />
      <rect x="40" y="180" width="240" height="14" rx="8" fill="url(#frostGrad)" opacity="0.9" />
      <rect x="55" y="196" width="210" height="4" rx="2" fill="rgba(255, 61, 127, 0.5)" />
      {/* Decorations bottom tier */}
      {[80, 120, 160, 200, 240].map((x, i) => (
        <circle key={i} cx={x} cy="230" r="6" fill="rgba(255, 61, 127, 0.6)" />
      ))}
      {[80, 120, 160, 200, 240].map((x, i) => (
        <circle key={i} cx={x} cy="230" r="3" fill="rgba(201, 169, 110, 0.9)" />
      ))}

      {/* Middle tier */}
      <rect x="70" y="110" width="180" height="70" rx="8" fill="url(#tierGrad2)" />
      <rect x="70" y="110" width="180" height="14" rx="8" fill="url(#frostGrad)" opacity="0.85" />
      <rect x="85" y="126" width="150" height="4" rx="2" fill="rgba(255, 61, 127, 0.4)" />
      {/* Heart decoration */}
      <text x="160" y="162" textAnchor="middle" fontSize="22" fill="rgba(255, 61, 127, 0.8)">♥</text>
      <text x="110" y="158" textAnchor="middle" fontSize="14" fill="rgba(201, 169, 110, 0.6)">♦</text>
      <text x="210" y="158" textAnchor="middle" fontSize="14" fill="rgba(201, 169, 110, 0.6)">♦</text>

      {/* Top tier */}
      <rect x="100" y="50" width="120" height="60" rx="8" fill="url(#tierGrad1)" />
      <rect x="100" y="50" width="120" height="14" rx="8" fill="url(#frostGrad)" opacity="0.9" />
      <text x="160" y="90" textAnchor="middle" fontSize="11" fill="rgba(201, 169, 110, 0.8)" fontFamily="Dancing Script, cursive">23</text>

      {/* Candles */}
      {visibleCandles.map((_, i) => {
        const positions = [128, 144, 160, 176, 192]  // centered at x=160 (SVG midpoint)
        const x = positions[i]
        const candleY = 40
        return (
          <g key={i}>
            {/* Candle body */}
            <rect x={x - 3} y={candleY} width="6" height="16" rx="2"
              fill={['#ff6b9d', '#c9a96e', '#a855f7', '#3b82f6', '#22d3ee'][i]}
            />
            {/* Flame */}
            <AnimatePresence>
              {candlesLit && (
                <motion.g
                  key={`flame-${i}`}
                  initial={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {/* Outer flame */}
                  <motion.ellipse
                    cx={x} cy={candleY - 5} rx="4" ry="7"
                    fill="rgba(255, 150, 50, 0.8)"
                    style={{ filter: 'url(#glow)' }}
                    animate={{ scaleX: [1, 0.85, 1.1, 0.9, 1], scaleY: [1, 1.1, 0.9, 1.1, 1], rotate: [-3, 3, -2, 4, -3] }}
                    transition={{ duration: 0.7 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Inner flame */}
                  <motion.ellipse
                    cx={x} cy={candleY - 4} rx="2" ry="4"
                    fill="#fff5cc"
                    animate={{ scaleX: [1, 0.9, 1.1, 0.8, 1] }}
                    transition={{ duration: 0.5 + i * 0.08, repeat: Infinity }}
                  />
                  {/* Glow */}
                  <ellipse cx={x} cy={candleY - 3} rx="8" ry="10"
                    fill="rgba(255, 200, 50, 0.15)" />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        )
      })}

      {/* "23" candle text */}
      {!candlesLit && (
        <text x="160" y="38" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontFamily="Space Grotesk">
          ✓ Sudah ditiup!
        </text>
      )}
    </svg>
  )
}

export default function CakeSection({ onBlown }: CakeSectionProps) {
  const [candlesLit, setCandlesLit] = useState(true)
  const [blown, setBlown] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [puffCount, setPuffCount] = useState(0)

  const handleBlow = () => {
    if (blown) return
    const newCount = puffCount + 1
    setPuffCount(newCount)

    if (newCount >= 2) {
      setCandlesLit(false)
      setBlown(true)
      setShowConfetti(true)
      setTimeout(() => setShowMessage(true), 800)
      setTimeout(() => { setShowConfetti(false); onBlown() }, 3500)
    }
  }

  return (
    <section className="section-base" style={{ position: 'relative', background: 'radial-gradient(ellipse at center, rgba(60, 5, 40, 0.4) 0%, transparent 70%)' }}>
      <ConfettiBurst active={showConfetti} />

      <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.5rem' }}
        >
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(201, 169, 110, 0.7)', display: 'block', marginBottom: '0.75rem'
          }}>
            ── ✦ Ulang Tahun ke-23 ✦ ──
          </span>
          <h2 className="font-cormorant gradient-text" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 600, fontStyle: 'italic' }}>
            Tiup Lilinnya ya, Honey
          </h2>
        </motion.div>

        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          onClick={handleBlow}
          className="cake-container"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
        >
          <BirthdayCakeSVG candlesLit={candlesLit} onBlow={handleBlow} />
        </motion.div>

        {/* Instruction */}
        <AnimatePresence>
          {!blown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 1 }}
              style={{ marginBottom: '1rem' }}
            >
              <motion.p
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)',
                  padding: '10px 20px', borderRadius: '999px',
                  border: '1px solid rgba(201, 169, 110, 0.2)',
                  background: 'rgba(201, 169, 110, 0.05)',
                  display: 'inline-block'
                }}
              >
                {puffCount === 0 ? '👆 Sentuh kue untuk tiup lilin' : '👆 Sekali lagi...'}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post-blow message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="glass"
              style={{ borderRadius: 16, padding: '1.5rem', marginTop: '1rem' }}
            >
              <p className="font-cormorant" style={{ fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--rose-gold-light)', marginBottom: '0.5rem' }}>
                🎉 Make a wish, Kezya!
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                Semoga semua doa dan impianmu terwujud tahun ini...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
