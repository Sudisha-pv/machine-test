import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import background images
import socialImg from '../assets/service_social.png'
import contentImg from '../assets/service_content.png'
import adsImg from '../assets/service_ads.png'
import brandingImg from '../assets/service_branding.png'
import eventsImg from '../assets/service_events.png'

gsap.registerPlugin(ScrollTrigger)

const SERVICES_DATA = [
  { id: '01', title: 'SOCIAL', image: socialImg, accent: 'hover:border-violet-500/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.22)]' },
  { id: '02', title: 'CONTENT', image: contentImg, accent: 'hover:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.22)]' },
  { id: '03', title: 'PAID ADS', image: adsImg, accent: 'hover:border-fuchsia-500/50 hover:shadow-[0_20px_40px_rgba(217,70,239,0.22)]' },
  { id: '04', title: 'BRANDING', image: brandingImg, accent: 'hover:border-violet-500/50 hover:shadow-[0_20px_40px_rgba(139,92,246,0.22)]' },
  { id: '05', title: 'EVENTS', image: eventsImg, accent: 'hover:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.22)]' },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(2) // Start centered on index 2 (PAID ADS)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselTrackRef = useRef<HTMLDivElement>(null)

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

      // Animate section header
      tl.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      // Fade & scale in the carousel viewport
      tl.fromTo(carouselTrackRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SERVICES_DATA.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SERVICES_DATA.length - 1 ? 0 : prev + 1))
  }

  const getCardStyles = (index: number) => {
    const total = SERVICES_DATA.length
    let offset = index - activeIndex

    // Adjust for circular wrapping
    if (offset < -2) offset += total
    if (offset > 2) offset -= total

    if (offset === 0) {
      // Center (Active focused card)
      return {
        transform: 'translate(-50%, -50%) scale(1.15)',
        zIndex: 30,
        opacity: 1,
        pointerEvents: 'auto' as const,
      }
    } else if (offset === -1) {
      // Left sibling card
      return {
        transform: 'translate(-155%, -50%) scale(0.86)',
        zIndex: 20,
        opacity: 0.45,
        pointerEvents: 'auto' as const,
      }
    } else if (offset === 1) {
      // Right sibling card
      return {
        transform: 'translate(55%, -50%) scale(0.86)',
        zIndex: 20,
        opacity: 0.45,
        pointerEvents: 'auto' as const,
      }
    } else if (offset === -2) {
      // Out of view left
      return {
        transform: 'translate(-250%, -50%) scale(0.7)',
        zIndex: 10,
        opacity: 0,
        pointerEvents: 'none' as const,
      }
    } else if (offset === 2) {
      // Out of view right
      return {
        transform: 'translate(150%, -50%) scale(0.7)',
        zIndex: 10,
        opacity: 0,
        pointerEvents: 'none' as const,
      }
    }

    return {
      transform: 'translate(-50%, -50%) scale(0.5)',
      zIndex: 0,
      opacity: 0,
      pointerEvents: 'none' as const,
    }
  }

  return (
    <section 
      id="services"
      ref={sectionRef} 
      className="relative w-full pt-12 pb-24 md:pt-16 md:pb-36 bg-zinc-950 border-b border-zinc-900/60 overflow-hidden"
    >
      {/* Background Radial Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,16,24,0.2)_0%,rgba(9,9,11,1)_100%)] pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col mb-16 select-none" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-violet-500 font-bold uppercase mb-4">
            <span>02</span>
            <span className="text-zinc-800 font-light">//</span>
            <span>EXPERTISE</span>
          </div>
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tighter leading-none">
            WHAT WE DO.
          </h2>
        </div>

        {/* Focus Coverflow Carousel Viewport Wrapper */}
        <div 
          ref={carouselTrackRef}
          className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] flex items-center justify-center select-none"
          style={{ opacity: 0 }}
        >
          {/* Left Arrow button floating inside track */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-md text-white border border-zinc-800/80 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 z-40"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Stack Track */}
          <div className="relative w-full h-full max-w-4xl overflow-visible">
            {SERVICES_DATA.map((service, index) => {
              const cardStyles = getCardStyles(index)
              const isActive = index === activeIndex
              
              return (
                <div 
                  key={service.id}
                  onClick={() => !isActive && setActiveIndex(index)}
                  style={cardStyles}
                  className={`absolute left-1/2 top-1/2 w-[65vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] max-w-[280px] sm:max-w-[320px] aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-[36px] sm:rounded-[40px] overflow-hidden bg-zinc-900 border border-zinc-850 shadow-2xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-500 ease-in-out select-none cursor-pointer ${
                    isActive ? `border-zinc-800 ${service.accent} hover:scale-[1.18]` : 'border-zinc-900/80 opacity-40 grayscale-[20%]'
                  }`}
                >
                  {/* Background Image overlay */}
                  <img 
                    src={service.image} 
                    alt={`${service.title} Background Visual`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none z-0 ${
                      isActive ? 'opacity-100 group-hover:scale-105' : 'opacity-65'
                    }`}
                  />
                  {/* Black Gradient Vignette for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent transition-opacity duration-500 z-0 pointer-events-none ${
                    isActive ? 'opacity-75 group-hover:opacity-85' : 'opacity-85'
                  }`} />

                  {/* Number tag */}
                  <span className="font-mono text-zinc-600 text-sm tracking-widest font-bold z-10">
                    {service.id}
                  </span>

                  {/* Service Title */}
                  <h3 className={`font-display font-black text-2xl sm:text-3xl tracking-tight leading-none transition-colors duration-300 z-10 ${
                    isActive ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-500'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Ambient Bottom Corner Glow */}
                  <div className={`absolute -bottom-12 -right-12 w-28 h-28 bg-violet-600/5 rounded-full blur-xl transition-all duration-500 pointer-events-none ${
                    isActive ? 'group-hover:bg-violet-600/15 group-hover:scale-110' : ''
                  }`} />
                </div>
              )
            })}
          </div>

          {/* Right Arrow button floating inside track */}
          <button 
            onClick={handleNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-md text-white border border-zinc-800/80 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 z-40"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Page Slide Indicator Dots */}
        <div className="flex justify-center gap-2.5 mt-8 select-none">
          {SERVICES_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-8 bg-violet-500' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
