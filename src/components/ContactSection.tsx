"use client";

import { useState, FormEvent } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const contactCards = [
        {
            title: "Tell Us",
            lines: ["+12) 586 898 257", "+12) 968 094 845"],
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
            ),
        },
        {
            title: "Drop Mail",
            lines: ["info@thecleanupcrew.ca"],
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
        },
        {
            title: "Location",
            lines: ["FVJR+J2Q", "London, United Kingdom"],
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            ),
        },
    ];

    return (
        <section id="contactus" className="section-padding bg-light-bg">
            <div className="container-custom">
                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {contactCards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4 border border-gray-100 hover:border-primary/20"
                        >
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white shrink-0">
                                {card.icon}
                            </div>
                            <div>
                                <h3
                                    className="font-bold text-lg mb-1"
                                    style={{ fontFamily: "var(--font-roboto-slab)" }}
                                >
                                    {card.title}
                                </h3>
                                {card.lines.map((line, i) => (
                                    <p key={i} className="text-text text-sm">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form + Map Row */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <span
                            className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block"
                            style={{ fontFamily: "var(--font-roboto)" }}
                        >
                            Contact Us
                        </span>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-8"
                            style={{ fontFamily: "var(--font-roboto-slab)" }}
                        >
                            Request A Window Cleaning Quote
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subject: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                />
                            </div>
                            <textarea
                                placeholder="Your message here..."
                                rows={5}
                                required
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            />

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="bg-primary hover:bg-secondary text-white font-semibold px-8 py-3.5 rounded transition-all duration-300 text-sm uppercase tracking-wider hover:shadow-lg disabled:opacity-60"
                                style={{ fontFamily: "var(--font-roboto)" }}
                            >
                                {status === "sending"
                                    ? "Sending..."
                                    : status === "success"
                                        ? "✓ Message Sent!"
                                        : status === "error"
                                            ? "Error - Try Again"
                                            : "Send a Message"}
                            </button>
                        </form>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-lg overflow-hidden shadow-lg h-[400px] lg:h-auto">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7119263355!2d-0.381773!3d51.528308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "400px" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
