import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MicroStatsGrid() {
  const viewsRef = useRef<HTMLSpanElement>(null)
  const reachRef = useRef<HTMLSpanElement>(null)
  const brandsRef = useRef<HTMLSpanElement>(null)
  const spendRef = useRef<HTMLSpanElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // 1. Views Counter (0 -> 10)
      const viewsObj = { val: 0 }
      gsap.to(viewsObj, {
        val: 10,
        duration: 2.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: viewsRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (viewsRef.current) {
            viewsRef.current.textContent = Math.floor(viewsObj.val).toString()
          }
        }
      })

      // 2. Audience Reach Counter (0 -> 2)
      const reachObj = { val: 0 }
      gsap.to(reachObj, {
        val: 2,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: reachRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (reachRef.current) {
            reachRef.current.textContent = Math.floor(reachObj.val).toString()
          }
        }
      })

      // 3. Brands Scaled Counter (0 -> 15)
      const brandsObj = { val: 0 }
      gsap.to(brandsObj, {
        val: 15,
        duration: 2.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: brandsRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (brandsRef.current) {
            brandsRef.current.textContent = Math.floor(brandsObj.val).toString()
          }
        }
      })

      // 4. Managed Ad Spend Counter (0 -> 800)
      const spendObj = { val: 0 }
      gsap.to(spendObj, {
        val: 800,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: spendRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (spendRef.current) {
            spendRef.current.textContent = Math.floor(spendObj.val).toString()
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-8 md:py-16 bg-zinc-950 border-y border-zinc-900/60 overflow-hidden"
    >
      {/* Background Radial Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,16,24,0.25)_0%,rgba(9,9,11,1)_100%)] pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Container (2 columns on mobile, 4 columns on desktop) */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 md:gap-8 w-full max-w-6xl mx-auto px-6">
        
        {/* Views Across Campaigns */}
        <div className="flex flex-col border-l-2 border-violet-500 pl-4 sm:pl-6 md:pl-8 py-1 transition-all duration-300 hover:border-violet-400 group">
          <h4 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-violet-500 tracking-tighter leading-none mb-2 select-none">
            <span ref={viewsRef}>0</span>M+
          </h4>
          <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-2 group-hover:text-white transition-colors duration-300">
            views across campaigns
          </p>
          <span className="text-zinc-600 text-xs font-mono tracking-tight">
            Platform Analytics
          </span>
        </div>

        {/* UAE Audience Reach */}
        <div className="flex flex-col border-l-2 border-indigo-500 pl-4 sm:pl-6 md:pl-8 py-1 transition-all duration-300 hover:border-indigo-400 group">
          <h4 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-indigo-500 tracking-tighter leading-none mb-2 select-none">
            <span ref={reachRef}>0</span>M+
          </h4>
          <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-2 group-hover:text-white transition-colors duration-300">
            UAE audience reach
          </p>
          <span className="text-zinc-600 text-xs font-mono tracking-tight">
            Active Demographics
          </span>
        </div>

        {/* Brands Scaled */}
        <div className="flex flex-col border-l-2 border-fuchsia-500 pl-4 sm:pl-6 md:pl-8 py-1 transition-all duration-300 hover:border-fuchsia-400 group">
          <h4 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-fuchsia-500 tracking-tighter leading-none mb-2 select-none">
            <span ref={brandsRef}>0</span>+
          </h4>
          <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-2 group-hover:text-white transition-colors duration-300">
            brands scaled
          </p>
          <span className="text-zinc-600 text-xs font-mono tracking-tight">
            Creative & Execution
          </span>
        </div>

        {/* Managed Ad Spend */}
        <div className="flex flex-col border-l-2 border-violet-500 pl-4 sm:pl-6 md:pl-8 py-1 transition-all duration-300 hover:border-violet-400 group">
          <h4 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-violet-500 tracking-tighter leading-none mb-2 select-none">
            <span className="text-violet-400 text-xl sm:text-2xl mr-1 leading-none">AED</span>
            <span ref={spendRef}>0</span>K+
          </h4>
          <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-2 group-hover:text-white transition-colors duration-300">
            managed ad spend
          </p>
          <span className="text-zinc-600 text-xs font-mono tracking-tight">
            Meta & Google Ads
          </span>
        </div>

      </div>
    </section>
  )
}
