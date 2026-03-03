"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
    { label: "Project Completed", value: 480, icon: "📋" },
    { label: "Satisfied Customers", value: 362, icon: "😊" },
    { label: "Awards Winnings", value: 162, icon: "🏆" },
    { label: "House Clean", value: 596, icon: "🏠" },
];

const galleryImages = [
    { src: "/images/gallery-1.jpg", alt: "Professional cleaning service" },
    { src: "/images/gallery-2.jpg", alt: "Counter cleaning" },
    { src: "/images/gallery-3.jpg", alt: "Kitchen cleaning" },
    { src: "/images/gallery-4.webp", alt: "Window cleaning team" },
    { src: "/images/gallery-5.webp", alt: "Equipment and tools" },
    { src: "/images/gallery-6.webp", alt: "Cleaning in progress" },
];

function Counter({ value, label }: { value: number; label: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const steps = 60;
                    const increment = value / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="text-center">
            <span
                className="text-4xl md:text-5xl font-bold text-white block mb-2"
                style={{ fontFamily: "var(--font-rubik)" }}
            >
                {count}+
            </span>
            <span className="text-white/80 text-sm uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}

export default function StatsGallerySection() {
    return (
        <>
            {/* Stats Bar */}
            <section className="bg-dark py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark" />
                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <Counter key={stat.label} value={stat.value} label={stat.label} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-14">
                        <span
                            className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block"
                            style={{ fontFamily: "var(--font-roboto)" }}
                        >
                            Our Gallery
                        </span>
                        <h2
                            className="text-3xl md:text-4xl font-bold"
                            style={{ fontFamily: "var(--font-roboto-slab)" }}
                        >
                            Recent Cleaning Projects
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
