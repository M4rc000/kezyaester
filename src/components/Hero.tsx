import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Typewriter, GlowRing, FloatingHearts } from './AnimatedElements'

interface HeroProps {
  onEnter: () => void
  onMusicStart: () => void
}

export default function Hero({ onEnter, onMusicStart }: HeroProps) {
  const [showButton, setShowButton] = useState(false)
  const [hovered, setHovered] = useState(false)
  const musicTriggered = useRef(false)

  const triggerMusic = () => {
    if (musicTriggered.current) return
    musicTriggered.current = true
    onMusicStart()
  }

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 3500)
    return () => clearTimeout(t)
  }, [])

  // Trigger music on first scroll down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        triggerMusic()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="section-base stars-bg" style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh' }}>
      <FloatingHearts />

      {/* Outer decorative rings */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <GlowRing size={500} color="rgba(255, 61, 127, 0.08)" />
        <GlowRing size={350} color="rgba(201, 169, 110, 0.12)" />
      </div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '999px',
            marginBottom: '2.5rem',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--rose-gold-light)',
            border: '1px solid rgba(201, 169, 110, 0.3)',
            background: 'rgba(201, 169, 110, 0.06)',
          }}
        >
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)', animation: 'pulse-glow 2s infinite' }} />
          10 Mei 2026 · Ulang Tahun ke-23
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }}
          className="font-cormorant gradient-text"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 600, lineHeight: 1.1, marginBottom: '1.5rem', fontStyle: 'italic' }}
        >
          Happy Birthday,
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-dancing gradient-text-gold"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', marginBottom: '2rem', lineHeight: 1.2 }}
        >
          Kezya Ester Dwiana
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', marginBottom: '3rem', lineHeight: 1.7, letterSpacing: '0.03em' }}
        >
          <Typewriter
            texts={[
              'Dua tahun, satu cerita yang belum selesai...',
              'Semesta berpihak pada kita, sayang.',
              '23 tahun yang membuat dunia lebih indah.',
              'Happy 2nd Anniversary, Bee x Bubba 🌹',
            ]}
            speed={55}
            delayBetween={2500}
          />
        </motion.p>

        {/* CTA Button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => { triggerMusic(); onEnter() }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="shimmer-btn"
            style={{
              padding: '14px 40px',
              borderRadius: '999px',
              fontSize: '0.95rem',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--rose-gold-light)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <motion.span animate={hovered ? { rotate: [0, 20, -10, 20, 0] } : {}} transition={{ duration: 0.5 }}>
              🎂
            </motion.span>
            Buka Kejutanmu
            <motion.span animate={hovered ? { x: [0, 5, 0] } : {}} transition={{ duration: 0.4 }}>
              ✨
            </motion.span>
          </motion.button>
        )}

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Usap kebawah</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
