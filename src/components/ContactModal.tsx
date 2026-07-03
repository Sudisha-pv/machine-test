import { useState, useEffect, useRef } from 'react'
import { X, Send, CheckCircle } from 'lucide-react'
import gsap from 'gsap'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  
  const overlayRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && overlayRef.current && cardRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.2)', delay: 0.05 }
      )
    }
  }, [isOpen])

  const handleClose = () => {
    if (overlayRef.current && cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.25,
        ease: 'power2.in'
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: onClose
      })
    } else {
      onClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        handleClose()
        setFormData({ name: '', email: '', message: '' })
      }, 2500)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md"
    >
      {/* Premium 1px Gradient Border Card Wrapper */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-lg bg-gradient-to-br from-violet-500/40 via-indigo-500/20 to-zinc-800/40 p-[1px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Main Card Container */}
        <div className="w-full bg-zinc-950/95 backdrop-blur-xl rounded-[23px] p-8 md:p-10 text-zinc-100">
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-zinc-800/60 hover:border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors cursor-pointer hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-5">
              <div className="w-20 h-20 rounded-full bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-display font-bold text-3xl text-white tracking-tight">Message Sent!</h3>
              <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                Our creative strategy team in Abu Dhabi will review your message and contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-display font-bold text-3xl text-white mb-2 tracking-tight">
                Let's Create <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Results</span>
              </h3>
              <p className="text-zinc-400 text-sm mb-8">
                Fill in your details below and kickstart your media campaign.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/20 text-white text-sm outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/20 text-white text-sm outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Message / Brief</label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your brand goals..."
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/20 text-white text-sm outline-none transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm uppercase tracking-wider hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2.5 mt-3 shadow-[0_4px_25px_rgba(139,92,246,0.3)]"
                >
                  Send Brief
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
