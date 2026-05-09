import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleField from './components/ParticleField'
import NavDots from './components/NavDots'
import Hero from './components/Hero'
import CakeSection from './components/CakeSection'
import GiftSection from './components/GiftSection'
import MemoryLane from './components/MemoryLane'
import LoveLetter from './components/LoveLetter'
import Timeline from './components/Timeline'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

const SECTIONS = ['Welcome', 'Kue', 'Hadiah', 'Kenangan', 'Perjalanan', 'Surat']

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(onComplete, 600)
      }
      setProgress(p)
    }, 60)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--deep-space)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="font-dancing gradient-text-gold" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>
          Kezya 🌹
        </p>
      </motion.div>

      <div style={{ width: 200, position: 'relative' }}>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
          <motion.div
            style={{
              height: '100%',
              borderRadius: 2,
              background: 'linear-gradient(to right, var(--rose-gold), var(--neon-pink))',
              width: `${progress}%`,
              boxShadow: '0 0 12px var(--neon-pink)',
            }}
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          Preparing your surprise...
        </p>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const [cakeBlown, setCakeBlown] = useState(false)
  const [musicActive, setMusicActive] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return
        const top = ref.offsetTop - window.innerHeight / 2
        const bottom = top + ref.offsetHeight
        if (scrollY >= top && scrollY < bottom) {
          setActiveSection(i)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleHeroEnter = () => {
    setTimeout(() => navigateTo(1), 100)
  }

  const handleCakeBlown = () => {
    setCakeBlown(true)
    setTimeout(() => navigateTo(2), 500)
  }

  return (
    <div style={{ background: 'var(--deep-space)', minHeight: '100vh' }}>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <ParticleField />

      {!loading && (
        <NavDots
          sections={SECTIONS}
          activeIndex={activeSection}
          onNavigate={navigateTo}
        />
      )}

      <div ref={(el) => { sectionRefs.current[0] = el }}>
        <Hero onEnter={handleHeroEnter} onMusicStart={() => setMusicActive(true)} />
      </div>

      <div ref={(el) => { sectionRefs.current[1] = el }}>
        <CakeSection onBlown={handleCakeBlown} />
      </div>

      <div ref={(el) => { sectionRefs.current[2] = el }}>
        <GiftSection />
      </div>

      <div ref={(el) => { sectionRefs.current[3] = el }}>
        <MemoryLane />
      </div>

      <div ref={(el) => { sectionRefs.current[4] = el }}>
        <Timeline />
      </div>

      <div ref={(el) => { sectionRefs.current[5] = el }}>
        <LoveLetter />
      </div>

      <Footer />

      {/* Global music player — appears after first user interaction */}
      <MusicPlayer shouldPlay={musicActive} />
    </div>
  )
}
