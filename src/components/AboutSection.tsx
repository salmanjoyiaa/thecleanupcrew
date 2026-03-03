import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
    return (
        <section id="about" className="section-padding bg-white">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src="/images/about-cleaning.jpg"
                                alt="Professional cleaning service"
                                width={570}
                                height={570}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Badge overlay */}
                        <div className="absolute -bottom-6 -right-6 md:bottom-6 md:right-6 bg-primary text-white rounded-lg p-4 shadow-xl">
                            <div className="text-center">
                                <span
                                    className="text-3xl font-bold block"
                                    style={{ fontFamily: "var(--font-rubik)" }}
                                >
                                    15+
                                </span>
                                <span className="text-xs uppercase tracking-wider">
                                    Years Experience
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div>
                        <span
                            className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block"
                            style={{ fontFamily: "var(--font-roboto)" }}
                        >
                            About Company
                        </span>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-roboto-slab)" }}
                        >
                            We&apos;re Specialized In Window &amp; Eavestrough Cleaning
                        </h2>
                        <p className="text-text leading-relaxed mb-4">
                            The Cleanup Crew excels in delivering top-tier cleaning solutions
                            designed to meet your every need. Our professional team is dedicated
                            to ensuring your spaces sparkle, from crystal-clear windows to
                            pristine eavestroughs.
                        </p>
                        <p className="text-text leading-relaxed mb-8">
                            With years of expertise and a commitment to customer satisfaction, we
                            use industry-leading techniques and eco-friendly products to provide
                            exceptional results every time. Trust us to handle the cleaning
                            so you can enjoy the clean.
                        </p>

                        {/* Feature list */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                "Window Cleaning",
                                "Eavestrough Cleaning",
                                "Commercial Service",
                                "Residential Service",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-primary shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-sm font-medium text-dark">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/#contactus"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-semibold px-8 py-3.5 rounded transition-all duration-300 text-sm uppercase tracking-wider hover:shadow-lg"
                            style={{ fontFamily: "var(--font-roboto)" }}
                        >
                            Contact Us
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
