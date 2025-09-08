import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type DraggableCardProps = {
  children: ReactNode
  className?: string
}

export default function DraggableCard({ children, className }: DraggableCardProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 400, damping: 28, mass: 0.6 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotate = useTransform([xSpring, ySpring], ([latestX, latestY]) => {
    const maxTilt = 10
    const clampedX = Math.max(-150, Math.min(150, latestX))
    const clampedY = Math.max(-150, Math.min(150, latestY))
    const rotX = (-clampedY / 150) * maxTilt
    const rotY = (clampedX / 150) * maxTilt
    return `${rotX}deg ${rotY}deg`
  })

  return (
    <div ref={constraintsRef} style={{ position: 'relative' }}>
      <motion.div
        className={className}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        style={{ x: xSpring, y: ySpring, rotateX: 0, rotateY: 0, rotate: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onDrag={(_, info) => {
          x.set(info.offset.x)
          y.set(info.offset.y)
        }}
        onDragEnd={() => {
          x.set(0)
          y.set(0)
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}


