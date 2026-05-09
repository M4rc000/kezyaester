import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypewriterProps {
  texts: string[]
  className?: string
  speed?: number
  delayBetween?: number
}

export function Typewriter({ texts, className = '', speed = 60, delayBetween = 2000 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const current = texts[textIndex]

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), delayBetween)
      return
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setTextIndex((i) => (i + 1) % texts.length)
      return
    }

    const delay = isDeleting ? speed / 2 : speed
    timeoutRef.current = setTimeout(() => {
      setDisplayed(isDeleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1))
    }, delay)

    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, textIndex, texts, speed, delayBetween])

  return (
    <span className={className}>
      {displayed}
      <span className="typewriter-cursor" />
    </span>
  )
}

// ─── Confetti Burst ──────────────────────────────────────────
export function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = Array.from({ length: 50 }, (_, i) => i)
  const colors = ['#c9a96e', '#ff3d7f', '#ffffff', '#ff85b3', '#f5c842', '#a855f7']

  if (!active) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
      {pieces.map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: '30%',
            left: `${Math.random() * 100}%`,
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            background: colors[Math.floor(Math.random() * colors.length)],
          }}
          initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: [0, -120 - Math.random() * 200, window.innerHeight],
            x: [(Math.random() - 0.5) * 400],
            opacity: [1, 1, 0],
            rotate: Math.random() * 720 - 360,
          }}
          transition={{ duration: Math.random() * 2 + 1.5, ease: 'easeOut', delay: Math.random() * 0.3 }}
        />
      ))}
    </div>
  )
}

// ─── Section Wrapper with reveal animation ───────────────────
export function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Floating Hearts ─────────────────────────────────────────
export function FloatingHearts() {
  const hearts = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {hearts.map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            bottom: 0,
            fontSize: `${Math.random() * 16 + 12}px`,
            opacity: 0,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.6, 0],
            rotate: [0, Math.random() * 60 - 30],
          }}
          transition={{
            duration: Math.random() * 4 + 5,
            delay: i * 1.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: 'easeOut',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

// ─── Glow Ring ───────────────────────────────────────────────
export function GlowRing({ size = 300, color = 'rgba(201, 169, 110, 0.15)' }: { size?: number; color?: string }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid ${color}`,
        position: 'absolute',
        pointerEvents: 'none',
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// ─── AnimatePresence re-export ───────────────────────────────
export { AnimatePresence }
