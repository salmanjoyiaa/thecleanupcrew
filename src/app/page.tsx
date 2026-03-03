import HeroScene from '@/components/spline/HeroScene'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ArrowRight, Droplets, Building2, Waves, Sparkles, Star, Shield, Leaf, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* HERO — Full-screen, bold, KingKong-inspired */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10 pointer-events-none" />

        <div className="relative z-20 container mx-auto px-4 min-h-screen flex flex-col justify-center items-center text-center pt-24">
          <RevealOnScroll delay={0.2}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-[#FFD700]/20 backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#FFD700] animate-pulse"></span>
              <span className="text-sm font-semibold text-[#FFD700] uppercase tracking-widest">Canada's #1 Rated</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight text-white mb-6 leading-[1.05]">
              We Make Your Property
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] animate-gradient-text">
                Absolutely Spotless.
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
              Professional window cleaning, eavestrough maintenance, and commercial exteriors for Canadian homeowners and businesses. Eco-friendly. Fully insured. Satisfaction guaranteed.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/quote" className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#FFD700] hover:bg-white text-black font-bold rounded-full transition-all hover:scale-105 animate-pulse-glow uppercase tracking-wider text-sm">
                Get Your Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-10 py-5 text-white/70 font-semibold hover:text-white transition-colors rounded-full border border-white/10 hover:border-white/30 uppercase tracking-wider text-sm">
                Our Services
              </Link>
            </div>
          </RevealOnScroll>

          {/* Trust bar */}
          <RevealOnScroll delay={1.0}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#22C55E]" />
                <span>WSIB Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#22C55E]" />
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFD700]" />
                <span>4.9★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
                <span>100% Guaranteed</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* STATS — Bold numbers, pure black */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-black border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-heading text-4xl md:text-6xl font-bold text-white mb-2">15K<span className="text-[#FFD700]">+</span></h3>
              <p className="text-sm text-white/40 uppercase tracking-widest">Windows Cleaned</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-6xl font-bold text-white mb-2">4.9<span className="text-[#FFD700]">★</span></h3>
              <p className="text-sm text-white/40 uppercase tracking-widest">Google Rating</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-6xl font-bold text-white mb-2">500<span className="text-[#FFD700]">+</span></h3>
              <p className="text-sm text-white/40 uppercase tracking-widest">Happy Clients</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-6xl font-bold text-white mb-2">8<span className="text-[#22C55E]">+</span></h3>
              <p className="text-sm text-white/40 uppercase tracking-widest">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SERVICES — Bento Grid, pure black cards */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-black relative overflow-hidden" id="services">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD700]/3 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-[#FFD700] text-sm font-semibold uppercase tracking-widest mb-4">What We Do</p>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">Services That<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFC107]">Speak For Themselves</span></h2>
              <p className="text-white/40 text-lg">Premium exterior care for Canadian homes and businesses.</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Window Cleaning */}
            <RevealOnScroll delay={0.1} className="lg:col-span-2 group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-[url('/images/window-hero.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"></div>
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <div className="w-14 h-14 rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                  <Droplets className="w-7 h-7 text-[#FFD700] group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">Window Cleaning</h3>
                <p className="text-white/50 mb-5 max-w-md">Pure-water technology for streak-free, crystal-clear windows. Safe for all heights up to 5 stories.</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-white">From <span className="text-[#FFD700]">$6.50</span>/pane</span>
                  <Link href="/services/window-cleaning" className="text-[#FFD700] hover:text-white font-semibold flex items-center gap-1 text-sm uppercase tracking-wider">Learn More <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </div>
            </RevealOnScroll>

            {/* Commercial */}
            <RevealOnScroll delay={0.2} className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/5 p-8 flex flex-col hover:border-[#FFD700]/30 transition-all duration-500 min-h-[400px]">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-[#FFD700]/10 transition-all">
                <Building2 className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">Commercial Cleaning</h3>
              <p className="text-sm text-white/40 mb-6 flex-grow">Storefronts, offices, and mid-rise buildings. Flexible scheduling for Canadian businesses.</p>
              <span className="font-bold text-white mb-4">Custom Quote</span>
              <Link href="/services/commercial-cleaning" className="mt-auto inline-flex w-fit items-center text-sm font-semibold text-[#FFD700] hover:text-white transition-colors uppercase tracking-wider">
                View Packages
              </Link>
            </RevealOnScroll>

            {/* Eavestrough */}
            <RevealOnScroll delay={0.3} className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/5 p-8 flex flex-col hover:border-[#FFD700]/30 transition-all duration-500 min-h-[400px]">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-[#FFD700]/10 transition-all">
                <Waves className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">Eavestrough Cleaning</h3>
              <p className="text-sm text-white/40 mb-6 flex-grow">Protect your foundation from Canada&apos;s harsh weather. Full debris removal and downspout flushing.</p>
              <span className="font-bold text-white mb-4">From <span className="text-[#FFD700]">$149</span></span>
              <Link href="/services/eavestrough-cleaning" className="mt-auto inline-flex w-fit items-center text-sm font-semibold text-[#FFD700] hover:text-white transition-colors uppercase tracking-wider">
                View Details
              </Link>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS — 3-step process */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-black relative">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="text-[#FFD700] text-sm font-semibold uppercase tracking-widest mb-4">How It Works</p>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">Sparkling Clean<br />In <span className="text-[#FFD700]">3 Easy Steps</span></h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <RevealOnScroll delay={0.1}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center group-hover:border-[#FFD700]/30 group-hover:glow-cyan transition-all duration-500">
                  <span className="text-3xl font-heading font-bold text-[#FFD700]">01</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">Get Your Free Quote</h3>
                <p className="text-white/40 text-sm">Use our instant online calculator or call us. No obligation, no hidden fees.</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center group-hover:border-[#FFD700]/30 group-hover:glow-cyan transition-all duration-500">
                  <span className="text-3xl font-heading font-bold text-[#FFD700]">02</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">We Do The Work</h3>
                <p className="text-white/40 text-sm">Our WSIB-certified crew arrives on time with pure-water eco-tech. Sit back and relax.</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center group-hover:border-[#FFD700]/30 group-hover:glow-cyan transition-all duration-500">
                  <span className="text-3xl font-heading font-bold text-[#FFD700]">03</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">Enjoy Crystal Clear</h3>
                <p className="text-white/40 text-sm">Love the results or we&apos;ll re-clean for free. 48-hour satisfaction guarantee.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS — Social proof like KingKong */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#FFD700] text-sm font-semibold uppercase tracking-widest mb-4">Don't Take Our Word For It</p>
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">What Our <span className="text-[#FFD700]">Canadian</span><br />Customers Say</h2>
              <div className="flex items-center justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#FFD700] fill-[#FFD700]" />
                ))}
                <span className="ml-3 text-white/50 text-sm">4.9 out of 5 from 200+ reviews</span>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Sarah M.', location: 'Toronto, ON', text: "Absolutely incredible service. They cleaned every single window in our 3-story home and left them spotless. The pure-water system is amazing — no soap residue, no streaks. Will definitely book again!", rating: 5 },
              { name: 'James K.', location: 'Mississauga, ON', text: "We use The Clean Up Crew for our office building quarterly. They're always on time, professional, and the results are consistently excellent. Best commercial cleaners we've ever hired.", rating: 5 },
              { name: 'Linda P.', location: 'Vancouver, BC', text: "Our eavestroughs were completely clogged after fall. These guys cleared everything, flushed the downspouts, and even sent us before/after photos. Top-notch service at a fair price.", rating: 5 },
            ].map((review, i) => (
              <RevealOnScroll key={i} delay={i * 0.15}>
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 h-full flex flex-col hover:border-[#FFD700]/20 transition-all duration-500">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed flex-grow mb-6">&quot;{review.text}&quot;</p>
                  <div className="border-t border-white/5 pt-4">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-white/30 text-xs">{review.location}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* CTA — Call to action, phone-focused */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Ready For A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFC107]">Brighter</span> View?
            </h2>
            <p className="text-white/40 text-xl max-w-2xl mx-auto mb-12">Get an instant estimate in seconds. No hidden fees, no commitment. Just crystal clear pricing for crystal clear results.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 px-12 py-6 bg-[#FFD700] text-black hover:bg-white font-bold rounded-full transition-all hover:scale-105 animate-pulse-glow uppercase tracking-wider text-sm">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:440985298" className="inline-flex items-center justify-center gap-2 px-12 py-6 border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-semibold rounded-full transition-all uppercase tracking-wider text-sm">
                Or Call +440-98-5298
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  )
}
