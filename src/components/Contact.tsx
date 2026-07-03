import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning'
  message: string
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false
  })

  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4500)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

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

  const validateField = (name: string, value: string) => {
    let errorMsg = ''
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMsg = 'Name is required'
        } else if (value.trim().length < 2) {
          errorMsg = 'Name must be at least 2 characters'
        } else if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) {
          errorMsg = 'Name contains invalid characters'
        }
        break
      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email address is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = 'Please enter a valid email address'
        }
        break
      case 'phone':
        if (!value.trim()) {
          errorMsg = 'Phone number is required'
        } else {
          const digitCount = value.replace(/\D/g, '').length
          if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(value)) {
            errorMsg = 'Please enter a valid phone number'
          } else if (digitCount < 7) {
            errorMsg = 'Phone number must be at least 7 digits'
          }
        }
        break
      case 'subject':
        if (!value.trim()) {
          errorMsg = 'Subject is required'
        } else if (value.trim().length < 3) {
          errorMsg = 'Subject must be at least 3 characters'
        }
        break
      case 'message':
        if (!value.trim()) {
          errorMsg = 'Message details are required'
        } else if (value.trim().length < 10) {
          errorMsg = 'Message must be at least 10 characters'
        }
        break
      default:
        break
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }))
    return errorMsg
  }

  const validateAll = () => {
    const nameErr = validateField('name', formData.name)
    const emailErr = validateField('email', formData.email)
    const phoneErr = validateField('phone', formData.phone)
    const subjectErr = validateField('subject', formData.subject)
    const messageErr = validateField('message', formData.message)

    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    })

    return !nameErr && !emailErr && !phoneErr && !subjectErr && !messageErr
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isValid = validateAll()
    if (!isValid) {
      showToast('Please correct the validation errors in the form.', 'error')
      return
    }

    setLoading(true)

    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL
      if (!scriptUrl) {
        // Preview Mode Simulator: Let the user test the loading spinner, success toast, and reset logic immediately
        showToast('Google Sheets URL not set. Simulating submission (Preview Mode)...', 'warning')
        
        await new Promise((resolve) => setTimeout(resolve, 1500))
        
        showToast('Your message has been sent successfully (Simulated)!', 'success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTouched({ name: false, email: false, phone: false, subject: false, message: false })
        setErrors({ name: '', email: '', phone: '', subject: '', message: '' })
        setLoading(false)
        return
      }

      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      })

      let success = false
      if (response.ok) {
        const result = await response.json()
        if (result.result === 'success') {
          success = true
        } else {
          throw new Error(result.error || 'Server error occurred during submission.')
        }
      } else {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`)
      }

      if (success) {
        showToast('Your message has been sent successfully!', 'success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTouched({ name: false, email: false, phone: false, subject: false, message: false })
        setErrors({ name: '', email: '', phone: '', subject: '', message: '' })
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      
      // CORS fallback: Try again using no-cors mode, which is required by some Google Apps Script deployments
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL
      if (scriptUrl && (err instanceof TypeError || err.message?.includes('Failed to fetch') || err.message?.includes('HTTP Error 0'))) {
        try {
          await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })

          // Since response is opaque (status 0) under no-cors, we assume success as the browser sent the payload
          showToast('Your message has been sent successfully!', 'success')
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
          setTouched({ name: false, email: false, phone: false, subject: false, message: false })
          setErrors({ name: '', email: '', phone: '', subject: '', message: '' })
          setLoading(false)
          return
        } catch (fallbackErr: any) {
          showToast(`Network error: ${fallbackErr.message || 'Could not connect to submission server.'}`, 'error')
        }
      } else {
        showToast(`Submission failed: ${err.message || 'Unknown error occurred.'}`, 'error')
      }
    } finally {
      setLoading(false)
    }
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

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
                
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-name" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      id="form-name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (touched.name) validateField('name', e.target.value)
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, name: true })
                        validateField('name', formData.name)
                      }}
                      placeholder="e.g. John Doe"
                      className={`bg-zinc-950/60 border ${
                        touched.name && errors.name 
                          ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/10' 
                          : 'border-zinc-850 focus:border-violet-500/60 focus:ring-violet-500/10'
                      } rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base`}
                    />
                    {touched.name && errors.name && (
                      <span className="text-xs text-rose-500 font-mono mt-1 animate-fade-in">{errors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-email" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="form-email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (touched.email) validateField('email', e.target.value)
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, email: true })
                        validateField('email', formData.email)
                      }}
                      placeholder="e.g. john@company.com"
                      className={`bg-zinc-950/60 border ${
                        touched.email && errors.email 
                          ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/10' 
                          : 'border-zinc-850 focus:border-violet-500/60 focus:ring-violet-500/10'
                      } rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base`}
                    />
                    {touched.email && errors.email && (
                      <span className="text-xs text-rose-500 font-mono mt-1 animate-fade-in">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Phone field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-phone" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="tel" 
                      id="form-phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        if (touched.phone) validateField('phone', e.target.value)
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, phone: true })
                        validateField('phone', formData.phone)
                      }}
                      placeholder="e.g. +971 50 123 4567"
                      className={`bg-zinc-950/60 border ${
                        touched.phone && errors.phone 
                          ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/10' 
                          : 'border-zinc-850 focus:border-violet-500/60 focus:ring-violet-500/10'
                      } rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base`}
                    />
                    {touched.phone && errors.phone && (
                      <span className="text-xs text-rose-500 font-mono mt-1 animate-fade-in">{errors.phone}</span>
                    )}
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <label htmlFor="form-subject" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Subject</label>
                    <input 
                      type="text" 
                      id="form-subject"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value })
                        if (touched.subject) validateField('subject', e.target.value)
                      }}
                      onBlur={() => {
                        setTouched({ ...touched, subject: true })
                        validateField('subject', formData.subject)
                      }}
                      placeholder="e.g. Project Inquiry"
                      className={`bg-zinc-950/60 border ${
                        touched.subject && errors.subject 
                          ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/10' 
                          : 'border-zinc-850 focus:border-violet-500/60 focus:ring-violet-500/10'
                      } rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base`}
                    />
                    {touched.subject && errors.subject && (
                      <span className="text-xs text-rose-500 font-mono mt-1 animate-fade-in">{errors.subject}</span>
                    )}
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <label htmlFor="form-message" className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">Project Details / Message</label>
                  <textarea 
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (touched.message) validateField('message', e.target.value)
                    }}
                    onBlur={() => {
                      setTouched({ ...touched, message: true })
                      validateField('message', formData.message)
                    }}
                    placeholder="Describe your goals, budget, or timeline..."
                    className={`bg-zinc-950/60 border ${
                      touched.message && errors.message 
                        ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/10' 
                        : 'border-zinc-850 focus:border-violet-500/60 focus:ring-violet-500/10'
                    } rounded-xl sm:rounded-2xl py-2.5 px-3.5 sm:py-4 sm:px-5 text-zinc-100 placeholder-zinc-750 outline-none transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] text-xs sm:text-base`}
                  />
                  {touched.message && errors.message && (
                    <span className="text-xs text-rose-500 font-mono mt-1 animate-fade-in">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 sm:py-4.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-violet-600/25 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Floating Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[calc(100%-3rem)] sm:w-80 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border ${
              toast.type === 'success'
                ? 'border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.15)] text-emerald-400'
                : toast.type === 'error'
                ? 'border-rose-500/30 shadow-[0_8px_32px_rgba(244,63,94,0.15)] text-rose-400'
                : 'border-amber-500/30 shadow-[0_8px_32px_rgba(245,158,11,0.15)] text-amber-400'
            } animate-slide-in`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-zinc-100 leading-tight">
                {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Warning'}
              </p>
              <p className="text-xs text-zinc-400 mt-1 leading-normal">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors cursor-pointer shrink-0"
              aria-label="Close Toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
