import { motion } from 'framer-motion'

interface NavDotsProps {
  sections: string[]
  activeIndex: number
  onNavigate: (index: number) => void
}

export default function NavDots({ sections, activeIndex, onNavigate }: NavDotsProps) {
  return (
    <div className="nav-dots-container" style={{
      position: 'fixed',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 100,
    }}>
      {sections.map((section, i) => (
        <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* Tooltip */}
          <motion.div
            initial={false}
            animate={{ opacity: activeIndex === i ? 1 : 0, x: activeIndex === i ? 0 : 10 }}
            style={{
              position: 'absolute',
              right: '24px',
              background: 'rgba(2,2,9,0.9)',
              border: '1px solid rgba(201, 169, 110, 0.2)',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '0.65rem',
              color: 'var(--rose-gold-light)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              letterSpacing: '0.05em',
            }}
          >
            {section}
          </motion.div>

          <button
            onClick={() => onNavigate(i)}
            className={`nav-dot ${activeIndex === i ? 'active' : ''}`}
            title={section}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          />
        </div>
      ))}
    </div>
  )
}
