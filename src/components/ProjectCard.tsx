import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SkillPill from './SkillPill'

type ProjectCardProps = {
  title: string
  summary: string
  details: string[]
  githubUrl?: string
  skills: string[]
  imageUrl?: string
}

export default function ProjectCard({ title, summary, details, githubUrl, skills, imageUrl }: ProjectCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Project Image */}
        {imageUrl && (
          <div style={{ flexShrink: 0 }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              <img 
                src={imageUrl}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'filter 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1) saturate(1.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1) saturate(1)'
                }}
              />
            </motion.div>
          </div>
        )}
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <p style={{ margin: '6px 0 0 0', opacity: 0.9 }}>{summary}</p>
          </div>
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.95 }}
          aria-label={open ? 'Hide details' : 'Show details'}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            padding: '8px 12px',
            borderRadius: 8,
            color: 'inherit',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ display: 'inline-block', width: 20, height: 20 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.span>
        </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ margin: '12px 0 0 1rem' }}>
              {details.map((d, i) => (
                <li key={i} style={{ margin: '6px 0', opacity: 0.9 }}>{d}</li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ 
                    textDecoration: 'underline',
                    color: '#8bdaff',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  Check it out
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
        {skills.map((s) => (
          <SkillPill key={s} label={s} />
        ))}
      </div>
    </div>
  )
}


