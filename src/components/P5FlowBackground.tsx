import { useEffect, useRef } from 'react'
import p5 from 'p5'

type P5FlowBackgroundProps = {
  className?: string
}

export default function P5FlowBackground({ className }: P5FlowBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5Ref = useRef<p5 | null>(null)

  useEffect(() => {
    const sketch = (s: p5) => {
      let zoff = 0
      let inc = 0.02
      let scl = 20
      let cols: number, rows: number
      let flowfield: p5.Vector[] = []

      s.setup = () => {
        const w = containerRef.current!.clientWidth
        const h = containerRef.current!.clientHeight
        s.createCanvas(w, h).parent(containerRef.current!)
        cols = Math.floor(w / scl)
        rows = Math.floor(h / scl)
        flowfield = new Array(cols * rows)
        s.noiseDetail(4, 0.5)
        s.clear()
      }

      s.windowResized = () => {
        const w = containerRef.current!.clientWidth
        const h = containerRef.current!.clientHeight
        s.resizeCanvas(w, h)
        cols = Math.floor(w / scl)
        rows = Math.floor(h / scl)
        flowfield = new Array(cols * rows)
      }

      s.draw = () => {
        s.clear()
        s.blendMode(s.ADD)
        s.stroke(140, 200, 255, 60)
        s.strokeWeight(1.2)
        let yoff = 0
        for (let y = 0; y < rows; y++) {
          let xoff = 0
          for (let x = 0; x < cols; x++) {
            const index = x + y * cols
            const angle = s.noise(xoff, yoff, zoff) * s.TWO_PI * 2
            const v = p5.Vector.fromAngle(angle)
            v.setMag(1)
            flowfield[index] = v
            xoff += inc
            s.push()
            s.translate(x * scl, y * scl)
            s.rotate(v.heading())
            s.line(0, 0, scl * 0.8, 0)
            s.pop()
          }
          yoff += inc
        }
        zoff += 0.005
        s.blendMode(s.BLEND)
      }
    }

    p5Ref.current = new p5(sketch)
    return () => {
      p5Ref.current?.remove()
      p5Ref.current = null
    }
  }, [])

  return <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0, zIndex: -1 }} />
}


