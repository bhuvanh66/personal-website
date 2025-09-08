import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type FluidBackgroundProps = {
  className?: string
}

export default function FluidBackground({ className }: FluidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const uniformsRef = useRef<any>(null)

  useEffect(() => {
    const container = containerRef.current!
    const width = container.clientWidth
    const height = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x0b0b0c, 1)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    cameraRef.current = camera

    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorA: { value: new THREE.Color('#60a5fa') },
      uColorB: { value: new THREE.Color('#f472b6') },
    }
    uniformsRef.current = uniforms

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec3 uColorA;
        uniform vec3 uColorB;

        float noise(vec2 p){
          return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
        }
        float smoothNoise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = vUv;
          vec2 p = (uv - 0.5) * vec2(uResolution.x/uResolution.y, 1.0);
          float t = uTime * 0.15;
          float n = smoothNoise(p*2.0 + t) * 0.6 + smoothNoise(p*4.0 - t*0.7) * 0.4;
          float distMouse = distance(uv, uMouse);
          float ripple = 0.12 / (distMouse * 18.0 + 1.0);
          float mixVal = clamp(n + ripple, 0.0, 1.0);
          vec3 color = mix(uColorA, uColorB, mixVal);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.uResolution.value.set(w, h)
    }
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height
      uniforms.uMouse.value.set(x, y)
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)

    let rafId = 0
    const tick = (t: number) => {
      uniforms.uTime.value = t * 0.001
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(rafId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className={className} style={{ position: 'absolute', inset: 0, zIndex: -1 }} />
}


