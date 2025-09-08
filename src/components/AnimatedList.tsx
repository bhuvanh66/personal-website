import { motion } from 'framer-motion'

type AnimatedListProps = {
  items: string[]
  delay?: number
}

export default function AnimatedList({ items, delay = 0 }: AnimatedListProps) {
  return (
    <ul style={{ margin: '8px 0 0 1rem', padding: 0 }}>
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.4, 
            delay: delay + (i * 0.08),
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ 
            margin: '4px 0', 
            opacity: 0.9,
            listStyle: 'disc'
          }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  )
}
