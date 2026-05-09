import { motion } from 'framer-motion'

const milestones = [
  {
    emoji: '☕',
    title: 'Kencan Pertama',
    desc: 'Pertama kali kita berjalan berdua di bawah terang sinar bulan dan bintang — dan aku tahu, ini bukan sekadar kebetulan.',
    date: '7 Feb 2024',
  },
  {
    emoji: '🌹',
    title: 'Hari Jadian Kita',
    desc: 'Saat semesta akhirnya mengizinkan kita untuk saling menjadi milik satu sama lain. Hari paling berani yang pernah kita ambil.',
    date: '11 April 2024',
  },
  {
    emoji: '💑',
    title: 'Anniversary Pertama',
    desc: 'Satu tahun penuh cinta, tawa, dan cerita — kita rayakan dengan melangkah bersama ke Bxsea. Momen yang tak akan terlupakan.',
    date: '11 April 2025',
  },
  {
    emoji: '🎸',
    title: 'Anniversary Kedua',
    desc: 'Dua tahun yang indah, dirayakan dengan suara merdu konser Timur All Star yang menggema — bersama kamu, semuanya terasa lebih hidup.',
    date: '11 April 2026',
  },
  {
    emoji: '🎂',
    title: 'Ulang Tahun ke-23',
    desc: 'Hari ini bukan hanya perayaan usiamu — ini juga perayaan tentang kita, tentang dua tahun yang luar biasa bersama.',
    date: '10 Mei 2026',
  },
]

export default function Timeline() {
  return (
    <section className="section-base" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201, 169, 110, 0.7)', display: 'block', marginBottom: '0.75rem' }}>
            ── ✦ Our Journey ✦ ──
          </span>
          <h2 className="font-cormorant gradient-text" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 600, fontStyle: 'italic' }}>
            Perjalanan Dua Tahun Kita
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(201, 169, 110, 0.3) 10%, rgba(201, 169, 110, 0.3) 90%, transparent)',
          }} />

          {milestones.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  marginBottom: '2.5rem',
                  position: 'relative',
                }}
              >
                {/* Card */}
                <div
                  className="glass"
                  style={{
                    width: 'calc(50% - 28px)',
                    borderRadius: 16,
                    padding: '1.25rem',
                    position: 'relative',
                    [isLeft ? 'marginRight' : 'marginLeft']: '28px',
                  }}
                >
                  {/* Connector dot */}
                  <div style={{
                    position: 'absolute',
                    [isLeft ? 'right' : 'left']: '-36px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--rose-gold)',
                    boxShadow: '0 0 12px var(--glow-gold)',
                    zIndex: 5,
                  }} />

                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.emoji}</div>
                  <p style={{ fontSize: '0.65rem', color: 'var(--rose-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.date}</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '0.35rem' }}>{item.title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
