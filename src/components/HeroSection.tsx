import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-[600px] md:min-h-[700px] flex items-center"
            style={{ marginTop: "96px" }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.webp"
                    alt="Professional window cleaning"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-dark/60" />
            </div>

            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="max-w-2xl text-white">
                    <span
                        className="inline-block text-xs md:text-sm font-semibold tracking-[3px] uppercase mb-4 text-accent"
                        style={{ fontFamily: "var(--font-roboto)" }}
                    >
                        BEST CLEANING SERVICE
                    </span>
                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
                        style={{ fontFamily: "var(--font-roboto-slab)", color: "white" }}
                    >
                        Trusted window cleaning from Sparkle Clean.
                    </h1>
                    <Link
                        href="/#contactus"
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white font-semibold px-8 py-4 rounded transition-all duration-300 text-sm tracking-wider uppercase hover:shadow-lg hover:translate-y-[-2px]"
                        style={{ fontFamily: "var(--font-roboto)" }}
                    >
                        Get Free Estimate
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Decorative bottom wave */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                    <path d="M0 30L48 25C96 20 192 10 288 8.3C384 6.7 480 13.3 576 18.3C672 23.3 768 26.7 864 25C960 23.3 1056 16.7 1152 13.3C1248 10 1344 10 1392 10L1440 10V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0V30Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}
