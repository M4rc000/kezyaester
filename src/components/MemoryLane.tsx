import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { id: 1,  url: '/memories/1.jpg',  caption: 'Momen pertama kita',          date: 'Feb 2024' },
  { id: 2,  url: '/memories/2.jpg',  caption: 'Berdua terasa sempurna',       date: 'Apr 2024' },
  { id: 3,  url: '/memories/3.jpg',  caption: 'Senyummu segalanya',           date: 'Mei 2024' },
  { id: 4,  url: '/memories/4.jpg',  caption: 'Hari-hari yang indah',         date: 'Jun 2024' },
  { id: 5,  url: '/memories/5.jpg',  caption: 'Petualangan bersama',          date: 'Jul 2024' },
  { id: 6,  url: '/memories/6.jpg',  caption: 'Canda tawa kita',              date: 'Agus 2024' },
  { id: 7,  url: '/memories/7.jpg',  caption: 'Momen tak terlupakan',         date: 'Sep 2024' },
  { id: 8,  url: '/memories/8.jpg',  caption: 'Di sampingmu terasa rumah',    date: 'Okt 2024' },
  { id: 9,  url: '/memories/9.jpg',  caption: 'Dua jiwa, satu hati',          date: 'Nov 2024' },
  { id: 10, url: '/memories/10.jpg', caption: 'Kenangan manis kita',          date: 'Des 2024' },
  { id: 11, url: '/memories/11.jpg', caption: 'Selalu ada untukmu',           date: 'Jan 2025' },
  { id: 12, url: '/memories/12.jpg', caption: 'Bahagia itu sederhana',        date: 'Feb 2025' },
  { id: 13, url: '/memories/13.jpg', caption: 'Bxsea bersama kamu',           date: 'Apr 2025' },
  { id: 14, url: '/memories/14.jpg', caption: 'Menikmati setiap melodi bersamamu', date: 'Apr 2026' },
  { id: 15, url: '/memories/15.jpg', caption: 'Merayakan hari istimewamu 🌹',  date: 'Mei 2026' },
]

function PhotoCard({ photo, index, onClick }: { photo: typeof photos[0]; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const isLarge = index === 0 || index === 3

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="photo-card"
      style={{
        aspectRatio: isLarge ? '3/4' : '3/4',
        gridRow: isLarge ? 'span 1' : 'span 1',
        cursor: 'pointer',
        background: 'rgba(201, 169, 110, 0.05)',
        border: '1px solid rgba(201, 169, 110, 0.15)',
      }}
    >
      <img
        src={photo.url}
        alt={photo.caption}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to top, rgba(2,2,9,0.85) 0%, transparent 50%)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}
        className="photo-overlay"
      >
        <p style={{ fontSize: '0.8rem', color: 'var(--rose-gold-light)', fontWeight: 500 }}>{photo.caption}</p>
      </div>


    </motion.div>
  )
}

export default function MemoryLane() {
  const [selected, setSelected] = useState<typeof photos[0] | null>(null)

  return (
    <section className="section-base" style={{ padding: '5rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201, 169, 110, 0.7)', display: 'block', marginBottom: '0.75rem' }}>
            ── ✦ Memory Lane ✦ ──
          </span>
          <h2 className="font-cormorant gradient-text" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 600, fontStyle: 'italic' }}>
            Kenangan Kita Bersama
          </h2>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: 400, margin: '1rem auto 0' }}>
            Setiap foto menyimpan cerita yang akan selalu kita ingat
          </p>
        </motion.div>

        {/* Photo Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {photos.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} onClick={() => setSelected(photo)} />
          ))}
        </div>

      </div>

      {/* Lightbox - rendered at body level to avoid z-index stacking issues */}
      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 9999, // Super high z-index
                background: 'rgba(2,2,9,0.92)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: 480,
                  width: '100%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid rgba(201, 169, 110, 0.3)',
                  boxShadow: '0 0 60px rgba(255, 61, 127, 0.2)',
                }}
              >
                <img src={selected.url} alt={selected.caption} style={{ width: '100%', display: 'block', maxHeight: '70vh', objectFit: 'contain', background: '#000' }} />
                <div className="glass" style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(201, 169, 110, 0.2)' }}>
                  <p style={{ fontSize: '1.1rem', color: 'var(--rose-gold-light)', fontWeight: 500 }}>{selected.caption}</p>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      marginTop: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                      background: 'none', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '999px', padding: '6px 16px', cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    Tutup ✕
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .photo-card:hover .photo-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  )
}
