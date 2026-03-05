'use client'

import { useEffect, useState, useRef, ReactNode } from 'react'

interface ParallaxLayerProps {
    children: ReactNode
    speed?: number     // Positive = moves slower than scroll, negative = opposite
    className?: string
    fadeOut?: boolean   // Fade as user scrolls
}

export function ParallaxLayer({ children, speed = 0.3, className = '', fadeOut = false }: ParallaxLayerProps) {
    const [offset, setOffset] = useState(0)
    const [opacity, setOpacity] = useState(1)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const onChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches)
        }

        mediaQuery.addEventListener('change', onChange)

        return () => {
            mediaQuery.removeEventListener('change', onChange)
        }
    }, [])

    useEffect(() => {
        if (prefersReducedMotion) {
            setOffset(0)
            setOpacity(1)
            return
        }

        let ticking = false

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY
                    const targetOffset = scrollY * speed
                    setOffset((current) => current + (targetOffset - current) * 0.4)
                    if (fadeOut) {
                        const fade = Math.max(0, 1 - scrollY / (window.innerHeight * 0.6))
                        setOpacity(fade)
                    }
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [speed, fadeOut, prefersReducedMotion])

    return (
        <div
            ref={ref}
            className={`parallax-layer ${className}`}
            style={{
                transform: prefersReducedMotion ? 'none' : `translate3d(0, ${offset}px, 0)`,
                opacity: fadeOut ? opacity : 1,
                willChange: prefersReducedMotion ? 'opacity' : 'transform, opacity',
            }}
        >
            {children}
        </div>
    )
}
