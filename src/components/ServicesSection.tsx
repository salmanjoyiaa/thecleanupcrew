import Image from "next/image";

const services = [
    {
        num: "01",
        title: "Windows Cleaning",
        description:
            "Professional window cleaning for crystal-clear views. We handle all types of windows, from residential to high-rise commercial buildings.",
        icon: "/images/cleaning.png",
    },
    {
        num: "02",
        title: "Commercial Window Cleaning",
        description:
            "Specialized commercial window cleaning services tailored for offices, storefronts, and large commercial properties.",
        icon: "/images/cleaning-1.png",
    },
    {
        num: "03",
        title: "Eavestrough Cleaning",
        description:
            "Keep your eavestroughs flowing freely with our thorough cleaning service. Prevent water damage and protect your property.",
        icon: "/images/bucket.png",
    },
    {
        num: "04",
        title: "Washroom Cleaning",
        description:
            "Deep cleaning and sanitization of washrooms and restrooms for homes and commercial establishments.",
        icon: "/images/cleaning-products.png",
    },
    {
        num: "05",
        title: "Carpet Cleaning",
        description:
            "Advanced carpet cleaning that removes deep-seated dirt, stains, and allergens. Revitalize your carpets today.",
        icon: "/images/cleaning-service.png",
    },
    {
        num: "06",
        title: "Water Tank Cleaning",
        description:
            "Professional water tank cleaning and sanitation services to ensure safe, clean water for your home or business.",
        icon: "/images/customer-feedback.png",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="section-padding bg-light-bg">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <span
                        className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block"
                        style={{ fontFamily: "var(--font-roboto)" }}
                    >
                        Our Services
                    </span>
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                        We&apos;re Offered Popular Cleaning Services
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.num}
                            className="group bg-white rounded-lg p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100 hover:border-primary/20 hover:-translate-y-1"
                        >
                            {/* Number Badge */}
                            <span
                                className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-primary/10 transition-colors duration-300"
                                style={{ fontFamily: "var(--font-roboto-slab)" }}
                            >
                                {service.num}
                            </span>

                            {/* Icon */}
                            <div className="relative z-10 mb-5">
                                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                    <Image
                                        src={service.icon}
                                        alt={service.title}
                                        width={40}
                                        height={40}
                                        className="w-8 h-8 object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <h3
                                className="text-xl font-bold mb-3 relative z-10 group-hover:text-primary transition-colors duration-300"
                                style={{ fontFamily: "var(--font-roboto-slab)" }}
                            >
                                {service.title}
                            </h3>
                            <p className="text-text text-sm leading-relaxed relative z-10">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
