export default function ProcessSection() {
    const steps = [
        {
            num: "01",
            title: "Request Your Service",
            description:
                "Contact us through our form or phone to schedule your cleaning service. We'll discuss your needs and provide a free estimate.",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
        },
        {
            num: "02",
            title: "Meet with Our Experts",
            description:
                "Our professional team arrives on schedule, fully equipped with industry-leading tools and eco-friendly cleaning products.",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            ),
        },
        {
            num: "03",
            title: "Enjoy Your Clean House",
            description:
                "Sit back and enjoy your sparkling clean space. We guarantee your satisfaction with every service we provide.",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="section-padding bg-light-bg">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span
                        className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block"
                        style={{ fontFamily: "var(--font-roboto)" }}
                    >
                        How It Works
                    </span>
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                        Experienced And Respectful Team
                    </h2>
                    <p className="text-text mt-4 max-w-2xl mx-auto">
                        All of our professional window cleaning teams are hired for attitude
                        and trained for skill. We will answer any questions you may have about
                        the work in a friendly and respectful manner.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={step.num} className="text-center group">
                            {/* Circle Icon */}
                            <div className="relative inline-flex mb-6">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                    {step.icon}
                                </div>
                                <span
                                    className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-dark rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ fontFamily: "var(--font-rubik)" }}
                                >
                                    {step.num}
                                </span>
                            </div>

                            {/* Connector line (hidden for last) */}
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[55%] w-[40%] h-[2px] bg-primary/20 -z-10" />
                            )}

                            <h3
                                className="text-xl font-bold mb-3"
                                style={{ fontFamily: "var(--font-roboto-slab)" }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-text text-sm leading-relaxed max-w-sm mx-auto">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
