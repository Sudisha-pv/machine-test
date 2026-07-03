import { useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import wireframeImg from '../assets/wireframe_bg.png'

gsap.registerPlugin(ScrollTrigger)

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })

      // Animate Heading
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' }
      )

      // Animate buttons
      tl.fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full pt-20 pb-12 md:pt-32 md:pb-16 bg-zinc-950 border-b border-zinc-900/60 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >
      {/* Violet/Indigo glowing 3D wireframe mesh background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.22] pointer-events-none z-0"
        style={{ backgroundImage: `url(${wireframeImg})` }}
      />
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-zinc-950 pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
        
        {/* Banner Title */}
        <h2 
          ref={titleRef}
          className="font-display font-black text-5xl sm:text-7xl md:text-[6.5rem] leading-[0.9] tracking-tighter text-white mb-10 max-w-4xl select-none"
          style={{ opacity: 0 }}
        >
          LET'S BUILD <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent">
            SOMETHING THAT
          </span> <br />
          GETS NOTICED.
        </h2>

        {/* Action Buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center"
          style={{ opacity: 0 }}
        >
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/971500000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-100 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.97]"
          >
            {/* Custom SVG WhatsApp Logo */}
            <svg 
              className="w-4 h-4 fill-emerald-500" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83 0-2.628-1.02-5.101-2.871-6.958C16.612 1.97 14.138.95 11.519.95c-5.44 0-9.866 4.415-9.87 9.832-.001 1.698.449 3.355 1.303 4.806L1.999 21.6l6.232-1.635zM16.745 13.68c-.327-.164-1.938-.957-2.224-1.08-.288-.108-.496-.164-.706.147-.21.315-.815 1.025-.999 1.237-.183.21-.366.239-.693.076-.328-.162-1.38-.507-2.63-1.62-.972-.865-1.628-1.934-1.819-2.261-.19-.328-.02-.505.143-.668.148-.146.328-.383.493-.574.164-.19.219-.328.328-.546.11-.218.055-.41-.027-.574-.082-.164-.706-1.702-.967-2.33-.255-.612-.513-.53-.706-.54-.183-.01-.393-.01-.603-.01-.21 0-.55.08-.838.397-.288.318-1.1.107-1.1 2.693 0 2.585 1.88 5.087 2.14 5.443.26.356 3.7 5.65 8.96 7.92 1.25.54 2.23.86 2.99 1.1.13.04.28.03.44.03.44-.06 1.94-.79 2.21-1.56.28-.76.28-1.42.19-1.56-.08-.14-.3-.22-.63-.38z" />
            </svg>
            WHATSAPP US
          </a>

          {/* Call Now Button */}
          <a 
            href="tel:+97120000000" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-100 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.97]"
          >
            <Phone className="w-4 h-4 text-violet-500" />
            CALL NOW
          </a>
        </div>

      </div>
    </section>
  )
}
