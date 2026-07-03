import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const sectionRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      // Animate Info Column
      tl.fromTo(infoRef.current?.children || [],
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      )

      // Animate Form Card
      tl.fromTo(formCardRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setFormSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 1500)
  }

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="relative w-full pt-12 pb-24 md:pt-16 md:pb-36 bg-zinc-950 border-b border-zinc-900/60 overflow-hidden"
    >
      {/* Grid Pattern matching reference style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.07] pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Info Column */}
          <div ref={infoRef} className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-sm tracking-[0.25em] text-violet-500 font-bold uppercase mb-3 sm:mb-4">
              <span>03</span>
              <span className="text-zinc-800 font-light">//</span>
              <span>COLLABORATION</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] text-white tracking-tighter leading-[0.95] mb-5 sm:mb-6 select-none animate-title">
              LET'S CREATE SOMETHING <span className="text-violet-500">UNIQUE.</span>
            </h2>

            <p className="text-zinc-400 text-xs sm:text-base leading-relaxed font-light mb-6 sm:mb-8 max-w-md">
              Have a campaign, scale plan, or creative project in mind? Drop us a line, and let's discuss how we can build high-performing digital experiences for your brand.
            </p>

            {/* Direct Contact Channels */}
            <div className="flex flex-col gap-4 sm:gap-6">
              
              <a 
                href="mailto:hello@uniquehashtagers.com" 
                className="flex items-center gap-3 sm:gap-4 group w-fit cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Email Us</span>
                  <span className="text-xs sm:text-base text-zinc-200 font-semibold group-hover:text-white transition-colors duration-200">hello@uniquehashtagers.com</span>
                </div>
              </a>

              <a 
                href="tel:+97120000000" 
                className="flex items-center gap-3 sm:gap-4 group w-fit cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-300">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Call Us</span>
                  <span className="text-xs sm:text-base text-zinc-200 font-semibold group-hover:text-white transition-colors duration-200">+971 2 000 0000</span>
                </div>
              </a>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-400">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">Our Studio</span>
                  <span className="text-xs sm:text-base text-zinc-200 font-semibold">Abu Dhabi, United Arab Emirates</span>
                </div>
              </div>

            </div>
          </div>

          {/* Form Card Column */}
          <div className="lg:col-span-7">
            <div 
              ref={formCardRef}
              className="relative w-full rounded-[24px] sm:rounded-[32px] bg-gradient-to-b from-zinc-900/30 to-zinc-950/50 backdrop-blur-xl border border-zinc-900/80 p-5 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-all duration-500"
            >
              {/* iOS-Style Gradient Border Wrapper */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-zinc-800/20 rounded-[24px] sm:rounded-[32px] p-[1px] -z-10 pointer-events-none" />

              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-name" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      id="form-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="bg-zinc-950/60 border border-zinc-850 rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-email" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="form-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@company.com"
                      className="bg-zinc-950/60 border border-zinc-850 rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base"
                    />
                  </div>

                  {/* Company field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-company" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Company Name</label>
                    <input 
                      type="text" 
                      id="form-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Company Ltd"
                      className="bg-zinc-950/60 border border-zinc-850 rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-message" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Project Details</label>
                    <textarea 
                      id="form-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your goals, budget, or timeline..."
                      className="bg-zinc-950/60 border border-zinc-850 rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none focus:border-violet-500/60 focus:ring-4 focus:ring-violet-500/10 transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3 sm:py-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-violet-600/25 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending Request...' : 'Send Message'}
                    {!loading && <Send className="w-4 h-4 text-white" />}
                  </button>

                </form>
              ) : (
                <div className="flex flex-col items-center text-center py-12 select-none animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-extrabold text-3xl text-white tracking-tight mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                    Thank you for reaching out. We have received your project details and a member of our Abu Dhabi team will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-8 px-6 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-300 hover:text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
