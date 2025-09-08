import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AccordionItemProps = {
  title: string
  subtitle?: string
  bullets: string[]
  defaultOpen?: boolean
}

export function AccordionItem({ title, subtitle, bullets, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const regionId = useId()

  return (
    <div className="accordion-item">
      <button
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <div className="accordion-title">{title}</div>
          {subtitle && <div className="accordion-subtitle">{subtitle}</div>}
        </div>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ display: 'inline-block', width: 20, height: 20 }}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={regionId}
            className="accordion-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


