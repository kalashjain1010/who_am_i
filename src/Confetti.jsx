import { useEffect, useRef } from 'react'

const COLORS = ['#8b5cf6','#f59e0b','#22d3ee','#10b981','#ef4444','#f97316','#ec4899']

export default function Confetti({ active }) {
  const canvasRef = useRef(null)
  const animIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // When deactivated, cancel animation and wipe the canvas immediately
    if (!active) {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 150,
      w: 5 + Math.random() * 8,
      h: 7 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * 360,
      rs: (Math.random() - 0.5) * 9,
      dy: 2.5 + Math.random() * 4,
      dx: (Math.random() - 0.5) * 2,
      a: 1,
    }))

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = 0
      pieces.forEach(p => {
        p.y += p.dy; p.x += p.dx; p.rot += p.rs
        if (p.y > canvas.height) p.a -= 0.04
        if (p.a > 0) {
          alive++
          ctx.save()
          ctx.globalAlpha = p.a
          ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
          ctx.rotate(p.rot * Math.PI / 180)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
          ctx.restore()
        }
      })
      if (alive > 0) animIdRef.current = requestAnimationFrame(animate)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    animate()

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 200, pointerEvents: 'none' }}
    />
  )
}
