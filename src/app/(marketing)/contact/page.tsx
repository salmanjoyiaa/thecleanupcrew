import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="bg-black min-h-screen pt-32 pb-24">
            {/* Background glow elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700]/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <RevealOnScroll>
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6">Contact London's Best</h1>
                        <p className="text-white/40 text-lg">Ready for premier window cleaning and exterior care in London? Whether it's a luxury residence or a commercial block, our team is ready to assist you.</p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        <RevealOnScroll delay={0.1}>
                            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex items-start gap-6 hover:border-[#FFD700]/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-white mb-2">Call Us</h3>
                                    <p className="text-white/40 text-sm mb-4">Fastest way to reach us for general inquiries.</p>
                                    <a href="tel:440985298" className="text-xl font-accent font-bold text-white hover:text-[#FFD700] transition-colors">+440-98-5298</a>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex items-start gap-6 hover:border-[#FFD700]/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-[#FFD700]" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-white mb-2">Email Us</h3>
                                    <p className="text-white/40 text-sm mb-4">We aim to reply within 24 hours.</p>
                                    <a href="mailto:info@thecleanupcrew.ca" className="text-lg font-medium text-white hover:text-[#FFD700] transition-colors break-all">info@thecleanupcrew.ca</a>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.3}>
                            <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 flex flex-col gap-6 hover:border-[#FFD700]/30 transition-colors">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-[#FFD700]" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-xl text-white mb-2">Headquarters</h3>
                                        <p className="text-white/40 text-sm leading-relaxed">FVJR+J2Q, London<br />United Kingdom</p>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-white/10"></div>

                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                        <Clock className="w-6 h-6 text-white/40" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-lg text-white mb-2">Business Hours</h3>
                                        <p className="text-white/40 text-sm leading-relaxed">Monday - Saturday<br />8:00 AM – 7:45 PM</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Contact Form */}
                    <RevealOnScroll delay={0.4} className="lg:col-span-3">
                        <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 h-full">
                            <h2 className="font-heading text-3xl font-bold text-white mb-2">Send a Message</h2>
                            <p className="text-white/40 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/40">First Name</label>
                                        <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all" placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/40">Last Name</label>
                                        <input type="text" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/40">Email Address</label>
                                        <input type="email" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all" placeholder="jane@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/40">Phone Number</label>
                                        <input type="tel" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all" placeholder="(555) 123-4567" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/40">Service of Interest</label>
                                    <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all">
                                        <option value="" disabled selected>Select a service...</option>
                                        <option value="residential">Residential Window Cleaning</option>
                                        <option value="commercial">Commercial Window Cleaning</option>
                                        <option value="eavestrough">Eavestrough Cleaning</option>
                                        <option value="carpet">Carpet Cleaning</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/40">Message</label>
                                    <textarea rows={5} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none" placeholder="Tell us about your property and what you need help with..."></textarea>
                                </div>

                                <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFC107] text-[#0A1628] px-8 py-4 rounded-xl font-bold transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] group mt-8">
                                    Send Message
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </div>
    )
}
