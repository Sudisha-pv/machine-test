import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import bannerImg from '../assets/banner.png'

interface HeroProps {
  onStartProject: () => void
}

export default function Hero({ onStartProject }: HeroProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current) return

    const chars = headingRef.current.querySelectorAll('.char')
    
    const tl = gsap.timeline()

    tl.fromTo(chars,
      { opacity: 0, y: 80, skewY: 8 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 0.2,
        onComplete: () => {
          gsap.set(chars, { clearProps: 'transform,skewY' })
        }
      }
    )

    tl.fromTo(paragraphRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
      },
      "-=0.8"
    )
  }, [])
  return (
    <section id="home" className="relative overflow-hidden min-h-[70vh] md:min-h-[calc(100vh-80px)] flex items-center justify-center">

      {/* Banner image as background with low opacity (15%) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 z-0 pointer-events-none"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />

      {/* Clean dark color overlay to ensure text contrast and legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/40 to-zinc-950/90 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-14 md:py-32 flex flex-col items-center text-center">
        {/* Giant Title matching banner text */}
        <h1 
          ref={headingRef}
          className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] tracking-tighter leading-[0.9] mb-10 text-white select-none"
        >
          <span className="inline-block">
            {"UNIQUE".split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block hover:-translate-y-3 hover:scale-105 hover:text-violet-400 cursor-default"
                style={{ opacity: 0, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease' }}
              >
                {char}
              </span>
            ))}
          </span>
          <br />
          <span className="inline-block text-violet-500">
            {"#MEDIA".split("").map((char, index) => (
              <span
                key={index}
                className="char inline-block hover:-translate-y-3 hover:scale-105 hover:text-white cursor-default"
                style={{ opacity: 0, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease' }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        {/* Agency description matching banner text */}
        <p 
          ref={paragraphRef}
          className="text-zinc-400 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mb-14 font-light"
          style={{ opacity: 0 }}
        >
          <strong className="text-white font-semibold">UNIQUE HASHTAGERS</strong> is a full-service creative and execution agency in Abu Dhabi helping brands grow through <span className="text-zinc-200 border-b border-zinc-700 pb-0.5">content</span>, <span className="text-zinc-200 border-b border-zinc-700 pb-0.5">campaigns</span>, and <span className="text-white">real-world experiences</span>.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            Let's Collaborate
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </button>
          <a
            href="#work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-200 font-semibold text-sm sm:text-base tracking-wide transition-all hover:-translate-y-0.5"
          >
            View Portfolio
          </a>
        </div>


      </div>
    </section>
  )
}
