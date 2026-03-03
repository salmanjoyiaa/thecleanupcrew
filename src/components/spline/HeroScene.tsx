'use client'

import { useEffect, useRef } from 'react'

export default function HeroScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number
        let mouseX = 0
        let mouseY = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const handleMouse = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }
        window.addEventListener('mousemove', handleMouse)

        // Particles
        const particles: Array<{
            x: number; y: number; baseX: number; baseY: number;
            vx: number; vy: number; radius: number; opacity: number;
        }> = []

        for (let i = 0; i < 60; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            particles.push({
                x, y, baseX: x, baseY: y,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1,
            })
        }

        let time = 0

        const animate = () => {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.003

            // Large ambient orbs
            const orbs = [
                { x: 0.25, y: 0.35, r: 200, opacity: 0.04 },
                { x: 0.75, y: 0.65, r: 160, opacity: 0.03 },
                { x: 0.5, y: 0.2, r: 250, opacity: 0.025 },
            ]
            orbs.forEach((orb, i) => {
                const ox = orb.x * canvas.width + Math.sin(time + i * 2) * 50
                const oy = orb.y * canvas.height + Math.cos(time * 0.8 + i * 2) * 40
                const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r)
                grad.addColorStop(0, `rgba(255, 215, 0, ${orb.opacity})`)
                grad.addColorStop(1, 'transparent')
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(ox, oy, orb.r, 0, Math.PI * 2)
                ctx.fill()
            })

            // Update particles
            particles.forEach(p => {
                p.x += p.vx
                p.y += p.vy

                // Gentle mouse interaction
                const dx = mouseX - p.x
                const dy = mouseY - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 200) {
                    p.x -= dx * 0.005
                    p.y -= dy * 0.005
                }

                // Wrap around
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                // Draw particle
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`
                ctx.fill()
            })

            // Connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(255, 215, 0, ${0.06 * (1 - dist / 120)})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            // Central gentle glow pulsing
            const cx = canvas.width / 2
            const cy = canvas.height / 2
            const pulseSize = 150 + Math.sin(time * 2) * 30
            const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseSize)
            centerGlow.addColorStop(0, 'rgba(255, 215, 0, 0.03)')
            centerGlow.addColorStop(0.7, 'rgba(255, 215, 0, 0.01)')
            centerGlow.addColorStop(1, 'transparent')
            ctx.fillStyle = centerGlow
            ctx.beginPath()
            ctx.arc(cx, cy, pulseSize, 0, Math.PI * 2)
            ctx.fill()

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return (
        <div className="absolute inset-0 w-full h-full bg-black">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    )
}
