import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const poemParagraphs = [
  {
    text: 'Dua tahun berlalu,',
    emphasis: false,
  },
  {
    text: 'dan semesta masih saja berpihak pada kita.',
    emphasis: true,
  },
  {
    text: 'Di antara miliaran bintang dan probabilitas waktu,',
    emphasis: false,
  },
  {
    text: 'aku bersyukur menemukanmu.',
    emphasis: true,
  },
  {
    text: 'Teruslah bersinar, teruslah menjadi',
    emphasis: false,
  },
  {
    text: 'alasan di balik setiap senyumanku.',
    emphasis: true,
  },
  {
    text: 'Ini bukan sekadar perayaan usiamu,',
    emphasis: false,
  },
  {
    text: 'tapi perayaan tentang kita.',
    emphasis: true,
  },
]

function AnimatedLine({ text, emphasis, delay, isVisible }: {
  text: string
  emphasis: boolean
  delay: number
  isVisible: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: emphasis ? 20 : -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      style={{ overflow: 'hidden', marginBottom: emphasis ? '0.8rem' : '0.2rem' }}
    >
      <span
        className={emphasis ? 'font-cormorant gradient-text' : 'font-cormorant'}
        style={{
          fontSize: emphasis ? 'clamp(1.3rem, 4vw, 1.8rem)' : 'clamp(1rem, 3vw, 1.35rem)',
          fontStyle: 'italic',
          color: emphasis ? undefined : 'rgba(255,255,255,0.55)',
          lineHeight: 1.4,
          display: 'block',
          fontWeight: emphasis ? 600 : 300,
          textAlign: 'center',
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

export default function LoveLetter() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-base" style={{ position: 'relative', padding: '6rem 1.5rem' }}>
      {/* Background decorative elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '-10%',
          width: '50vw', height: '50vw', maxWidth: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 61, 127, 0.06) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-10%',
          width: '50vw', height: '50vw', maxWidth: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.06) 0%, transparent 70%)',
        }} />
        {/* Decorative lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05 }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <path d="M0 300 Q200 100 400 300 T800 300" stroke="#c9a96e" strokeWidth="1" fill="none" />
          <path d="M0 350 Q200 150 400 350 T800 350" stroke="#ff3d7f" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div ref={ref} style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201, 169, 110, 0.7)', display: 'block', marginBottom: '0.75rem' }}>
            ── ✦ Surat Untuk Kamu ✦ ──
          </span>
          <h2 className="font-cormorant gradient-text" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 600, fontStyle: 'italic' }}>
            Selamat Ulang Tahun ke-23,
          </h2>
          <h3 className="font-dancing gradient-text-gold" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', marginTop: '0.5rem' }}>
            Kezya Ester Dwiana
          </h3>
        </motion.div>

        {/* Letter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass"
          style={{
            borderRadius: 24,
            padding: 'clamp(2rem, 6vw, 3.5rem)',
            position: 'relative',
            marginBottom: '2rem',
          }}
        >
          {/* Decorative corner roses */}
          <div style={{ position: 'absolute', top: 16, left: 20, fontSize: '1.2rem', opacity: 0.4 }}>🌹</div>
          <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '1.2rem', opacity: 0.4 }}>🌹</div>
          <div style={{ position: 'absolute', bottom: 16, left: 20, fontSize: '1.2rem', opacity: 0.3 }}>✦</div>
          <div style={{ position: 'absolute', bottom: 16, right: 20, fontSize: '1.2rem', opacity: 0.3 }}>✦</div>

          {/* Poem lines */}
          <div style={{ margin: '0 auto', maxWidth: 480 }}>
            {poemParagraphs.map((line, i) => (
              <AnimatedLine
                key={i}
                text={line.text}
                emphasis={line.emphasis}
                delay={i * 0.15}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              height: 1,
              background: 'linear-gradient(to right, transparent, rgba(201, 169, 110, 0.4), transparent)',
              margin: '2rem auto',
              maxWidth: 200,
            }}
          />

          {/* Sign off */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            style={{ textAlign: 'center' }}
          >
            <p className="font-dancing animate-heartbeat" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', color: 'var(--neon-pink)', display: 'inline-block' }}>
              Bee x Bubba
            </p>
            <p className="font-cormorant" style={{ fontSize: '0.95rem', color: 'rgba(201, 169, 110, 0.6)', marginTop: '0.25rem', fontStyle: 'italic' }}>
              forever & always 🌹
            </p>
          </motion.div>
        </motion.div>

        {/* Anniversary badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="glass"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            borderRadius: 999,
            border: '1px solid rgba(255, 61, 127, 0.3)',
            background: 'rgba(255, 61, 127, 0.05)',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>💑</span>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>Happy</p>
            <p style={{ fontSize: '1rem', color: 'var(--rose-gold-light)', fontWeight: 600 }}>2nd Anniversary</p>
          </div>
          <span style={{ fontSize: '1.5rem' }}>💑</span>
        </motion.div>
      </div>
    </section>
  )
}
