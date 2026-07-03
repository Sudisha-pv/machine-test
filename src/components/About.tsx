import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutImg from '../assets/about_agency.png'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const subTitleRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

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

      tl.fromTo(subTitleRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      )

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power4.out' },
        '-=0.6'
      )

      tl.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.7'
      )

      tl.fromTo(imageWrapperRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="relative w-full pt-24 pb-12 md:pt-36 md:pb-16 bg-zinc-950 border-b border-zinc-900/60 overflow-hidden"
    >
      {/* Grid Pattern matching reference image style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#09090b_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 2-Column Responsive Layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        
        {/* Left: Text Content (7 cols on desktop) */}
        <div className="flex flex-col md:col-span-7">
          {/* Category Indicator */}
          <div 
            ref={subTitleRef}
            className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-violet-500 font-bold uppercase mb-6 select-none"
            style={{ opacity: 0 }}
          >
            <span>01</span>
            <span className="text-zinc-800 font-light">//</span>
            <span>IDENTITY</span>
          </div>

          {/* Big Heading */}
          <h2 
            ref={titleRef}
            className="font-display font-black text-6xl sm:text-7xl md:text-8xl text-white tracking-tighter leading-none mb-8 select-none"
            style={{ opacity: 0 }}
          >
            WHO<br />WE ARE.
          </h2>

          {/* Paragraph */}
          <p 
            ref={textRef}
            className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed font-light"
            style={{ opacity: 0 }}
          >
            Unique Hashtagers is a full-service media and marketing agency based in Abu Dhabi helping brands communicate, grow, and stand out through strategic creativity and strong execution. We work with corporate brands, government entities, and events that require professional content, consistent presence, and reliable delivery.
          </p>
        </div>

        {/* Right: Premium Image (5 cols on desktop) */}
        <div 
          ref={imageWrapperRef} 
          className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900/40 border border-zinc-800/80 shadow-2xl group md:col-span-5"
          style={{ opacity: 0 }}
        >
          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 z-10 pointer-events-none" />
          <img 
            src={aboutImg} 
            alt="Unique Hashtagers Media Studio" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

      </div>
    </section>
  )
}
