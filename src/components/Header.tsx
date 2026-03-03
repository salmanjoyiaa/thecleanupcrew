'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, PhoneCall } from 'lucide-react'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/images/logo.png"
                        alt="The Clean Up Crew - Canada's Premium Cleaning Service"
                        width={200}
                        height={60}
                        className="h-12 w-auto drop-shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all group-hover:drop-shadow-[0_0_30px_rgba(0,212,255,0.5)]"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex flex-1 justify-center items-center space-x-10">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/')
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative text-sm font-semibold uppercase tracking-widest transition-colors py-2 ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFD700] to-[#FFC107] rounded-full"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex items-center gap-5">
                    <a href="tel:440985298" className="flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                            <PhoneCall className="w-3.5 h-3.5 text-[#FFD700]" />
                        </div>
                        +440-98-5298
                    </a>
                    <Link href="/quote">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#FFD700] hover:bg-white text-black font-bold text-sm px-7 py-3 rounded-full animate-pulse-glow transition-all uppercase tracking-wider"
                        >
                            Get Free Quote
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-black border-b border-white/5 shadow-2xl lg:hidden"
                    >
                        <div className="p-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-lg font-semibold uppercase tracking-wider ${pathname === link.href ? 'text-[#FFD700]' : 'text-white/70'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                                <a href="tel:440985298" className="flex items-center justify-center gap-2 text-white bg-white/5 py-3 rounded-xl">
                                    <PhoneCall className="w-5 h-5 text-[#FFD700]" />
                                    +440-98-5298
                                </a>
                                <Link href="/quote" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="w-full text-center bg-[#FFD700] text-black font-bold py-3 rounded-xl uppercase tracking-wider">
                                        Get Free Quote
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
