'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface InteractiveButtonProps {
    children: ReactNode
    onClick?: () => void
    href?: string
    className?: string
    variant?: 'primary' | 'secondary' | 'outline'
}

export function MagicButton({ children, onClick, className = '', variant = 'primary' }: InteractiveButtonProps) {
    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all overflow-hidden group"

    const variants = {
        primary: "bg-[#FFD700] text-[#0A1628] hover:bg-[#FFC107] shadow-[0_0_20px_rgba(0,212,255,0.3)]",
        secondary: "bg-white text-[#0A1628] hover:bg-gray-100",
        outline: "bg-transparent text-[#FFD700] border-2 border-[#FFD700] hover:bg-[#FFD700]/10"
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {/* Shine effect */}
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="absolute top-0 right-0 w-8 h-full bg-white/30 skew-x-[45deg] -translate-x-[250%] group-hover:animate-shine"></span>

            <span className="relative flex items-center gap-2">
                {children}
            </span>
        </motion.button>
    )
}
