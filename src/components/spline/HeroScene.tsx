'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const scrollRef = useRef(0)
    const [reducedMotion, setReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)

        const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
        mediaQuery.addEventListener('change', onChange)

        return () => mediaQuery.removeEventListener('change', onChange)
    }, [])

    useEffect(() => {
        if (reducedMotion) {
            return
        }

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number
        let width = 0
        let height = 0
        let dpr = 1
        let pointerX = 0
        let pointerY = 0

        type Particle = {
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            alpha: number
        }

        const particles: Particle[] = []

        const createParticles = () => {
            particles.length = 0
            const count = Math.min(90, Math.max(45, Math.floor(width / 24)))
            for (let i = 0; i < count; i += 1) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.18,
                    vy: (Math.random() - 0.5) * 0.18,
                    radius: Math.random() * 2.2 + 0.5,
                    alpha: Math.random() * 0.35 + 0.08,
                })
            }
        }

        const resize = () => {
            dpr = window.devicePixelRatio || 1
            width = window.innerWidth
            height = window.innerHeight

            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            createParticles()
        }

        const onPointerMove = (event: MouseEvent) => {
            pointerX = event.clientX
            pointerY = event.clientY
        }

        const onTouchMove = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                pointerX = event.touches[0].clientX
                pointerY = event.touches[0].clientY
            }
        }

        const onScroll = () => {
            scrollRef.current = window.scrollY
        }

        resize()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', onPointerMove, { passive: true })
        window.addEventListener('touchmove', onTouchMove, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })

        let time = 0

        const drawAurora = (t: number) => {
            const bandA = ctx.createLinearGradient(0, 0, width, height)
            bandA.addColorStop(0, 'rgba(255, 215, 0, 0.12)')
            bandA.addColorStop(0.5, 'rgba(173, 255, 219, 0.1)')
            bandA.addColorStop(1, 'rgba(255, 255, 255, 0)')

            const waveY = Math.sin(t * 0.65) * 60
            ctx.save()
            ctx.translate(0, waveY)
            ctx.fillStyle = bandA
            ctx.beginPath()
            ctx.moveTo(-60, height * 0.18)
            ctx.bezierCurveTo(width * 0.2, height * 0.05, width * 0.5, height * 0.35, width + 60, height * 0.14)
            ctx.lineTo(width + 60, height * 0.45)
            ctx.bezierCurveTo(width * 0.55, height * 0.58, width * 0.25, height * 0.25, -60, height * 0.5)
            ctx.closePath()
            ctx.fill()
            ctx.restore()

            const bandB = ctx.createLinearGradient(width, 0, 0, height)
            bandB.addColorStop(0, 'rgba(255, 204, 0, 0.11)')
            bandB.addColorStop(0.6, 'rgba(0, 212, 255, 0.08)')
            bandB.addColorStop(1, 'rgba(255, 255, 255, 0)')

            const drift = Math.cos(t * 0.45) * 45
            ctx.save()
            ctx.translate(0, drift)
            ctx.fillStyle = bandB
            ctx.beginPath()
            ctx.moveTo(-80, height * 0.52)
            ctx.bezierCurveTo(width * 0.28, height * 0.35, width * 0.62, height * 0.72, width + 80, height * 0.5)
            ctx.lineTo(width + 80, height * 0.82)
            ctx.bezierCurveTo(width * 0.7, height * 0.93, width * 0.3, height * 0.55, -80, height * 0.88)
            ctx.closePath()
            ctx.fill()
            ctx.restore()
        }

        const animate = () => {
            time += 0.008
            const scrollShift = Math.min(scrollRef.current * 0.2, 180)

            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = '#F8F6F0'
            ctx.fillRect(0, 0, width, height)

            drawAurora(time)

            const spotlight = ctx.createRadialGradient(
                width * 0.5 + (pointerX - width * 0.5) * 0.05,
                height * 0.45 + (pointerY - height * 0.45) * 0.05 - scrollShift,
                0,
                width * 0.5,
                height * 0.45,
                Math.max(width, height) * 0.7
            )
            spotlight.addColorStop(0, 'rgba(255, 255, 255, 0.45)')
            spotlight.addColorStop(1, 'rgba(248, 246, 240, 0)')
            ctx.fillStyle = spotlight
            ctx.fillRect(0, 0, width, height)

            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i]
                p.x += p.vx
                p.y += p.vy

                if (p.x < -20) p.x = width + 20
                if (p.x > width + 20) p.x = -20
                if (p.y < -20) p.y = height + 20
                if (p.y > height + 20) p.y = -20

                const py = p.y - scrollShift * 0.35
                const dx = pointerX - p.x
                const dy = pointerY - py
                const dist = Math.hypot(dx, dy)
                const glowBoost = dist < 180 ? (1 - dist / 180) * 0.4 : 0

                ctx.beginPath()
                ctx.arc(p.x, py, p.radius + glowBoost, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 199, 0, ${p.alpha + glowBoost * 0.4})`
                ctx.fill()
            }

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onPointerMove)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('scroll', onScroll)
        }
    }, [reducedMotion])

    return (
        <div className="absolute inset-0 h-full w-full bg-[#F8F6F0]">
            {!reducedMotion && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,215,0,0.12),transparent_55%)]" />
        </div>
    )
}
