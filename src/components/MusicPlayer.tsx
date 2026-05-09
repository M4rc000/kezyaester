import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Audio sources ───────────────────────────────────────────
// Primary: local file from /public/music.mp3 (your own track)
const MUSIC_URL = '/music.mp3'
// Fallback: used only if local file fails to load
const FALLBACK_URL = 'https://cdn.pixabay.com/audio/2022/10/18/audio_c5b2ae7e7b.mp3'

interface MusicPlayerProps {
  shouldPlay: boolean
}

// Animated waveform bars
function Waveform({ active }: { active: boolean }) {
  const bars = [4, 7, 5, 9, 6, 8, 4, 7, 5]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 16 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          style={{
            width: 2,
            borderRadius: 2,
            background: 'linear-gradient(to top, #c9a96e, #ff3d7f)',
          }}
          animate={active
            ? { height: [h * 0.5, h, h * 0.3, h * 0.8, h * 0.5] }
            : { height: 3 }
          }
          transition={{
            duration: 0.6 + i * 0.07,
            repeat: active ? Infinity : 0,
            ease: 'easeInOut',
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  )
}

export default function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showVolume, setShowVolume] = useState(false)
  const [songTitle] = useState('Those Eyes — New West')
  const startedRef = useRef(false)

  // Init audio element once
  useEffect(() => {
    const audio = new Audio(MUSIC_URL)
    audio.loop = true
    audio.volume = volume
    // No crossOrigin needed — local /public files don't require CORS
    audio.onerror = () => {
      // If local file missing, fall back to online source
      if (audio.src !== FALLBACK_URL) {
        audio.src = FALLBACK_URL
        audio.load()
      }
    }
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const startMusic = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    setIsVisible(true)

    // Fade in audio
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.play().then(() => {
      setIsPlaying(true)
      let vol = 0
      const fadeIn = setInterval(() => {
        vol = Math.min(vol + 0.02, volume)
        audio.volume = vol
        if (vol >= volume) clearInterval(fadeIn)
      }, 80)
    }).catch(() => {
      // Autoplay blocked — show player, user can click to play
      setIsPlaying(false)
    })
  }, [volume])

  // Trigger when shouldPlay becomes true
  useEffect(() => {
    if (shouldPlay) startMusic()
  }, [shouldPlay, startMusic])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true))
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -80, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
          }}
        >
          {/* Volume slider */}
          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'rgba(2,2,9,0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(201,169,110,0.25)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.8)' }}>🔈</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={volume}
                  onChange={handleVolume}
                  style={{
                    width: 80,
                    accentColor: '#ff3d7f',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: '0.7rem', color: 'rgba(201,169,110,0.8)' }}>🔊</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main player pill */}
          <motion.div
            style={{
              background: 'rgba(6, 2, 15, 0.88)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${isPlaying ? 'rgba(255,61,127,0.4)' : 'rgba(201,169,110,0.2)'}`,
              borderRadius: 999,
              padding: '8px 16px 8px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: isPlaying
                ? '0 0 20px rgba(255,61,127,0.2), 0 4px 24px rgba(0,0,0,0.5)'
                : '0 4px 24px rgba(0,0,0,0.4)',
              cursor: 'default',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            }}
          >
            {/* Play/pause button */}
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: isPlaying
                  ? 'linear-gradient(135deg, #c9a96e, #ff3d7f)'
                  : 'rgba(201,169,110,0.15)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                flexShrink: 0,
                transition: 'background 0.3s ease',
                boxShadow: isPlaying ? '0 0 12px rgba(255,61,127,0.5)' : 'none',
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </motion.button>

            {/* Song info + waveform */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,255,255,0.85)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 120,
                }}>
                  {songTitle}
                </span>
              </div>
              <Waveform active={isPlaying} />
            </div>

            {/* Volume toggle */}
            <motion.button
              onClick={() => setShowVolume(v => !v)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem',
                opacity: 0.5,
                padding: '2px 4px',
                color: '#fff',
                transition: 'opacity 0.2s',
                flexShrink: 0,
              }}
              whileHover={{ opacity: 1 }}
            >
              🎵
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
