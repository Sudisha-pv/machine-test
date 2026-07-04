import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import logoImg from '../assets/UHE-white.png'

interface NavbarProps {
  onStartProject: () => void
}

export default function Navbar({ onStartProject }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center pointer-events-none px-4 md:px-6 pt-3 md:pt-0">
      {/* Notch/Cylinder Navbar Container */}
      <div className="pointer-events-auto relative w-full md:max-w-5xl h-16 md:h-20 flex items-center justify-between px-6 md:px-8 bg-white/95 backdrop-blur-md md:bg-white rounded-full md:rounded-t-none md:rounded-b-[24px] border border-zinc-200/80 md:border-x md:border-b md:border-t-0 md:border-zinc-200/50 shadow-md md:shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
        
        {/* Left notch curve for desktop */}
        <div className="hidden md:block absolute top-0 right-full w-5 h-5 text-white">
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M 0 0 H 20 V 20 Q 20 0 0 0 Z" />
          </svg>
        </div>

        {/* Right notch curve for desktop */}
        <div className="hidden md:block absolute top-0 left-full w-5 h-5 text-white">
          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
            <path d="M 20 0 H 0 V 20 Q 0 0 20 0 Z" />
          </svg>
        </div>

        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 cursor-pointer group">
          <img 
            src={logoImg} 
            alt="Unique Hashtagers Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 invert" 
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-base font-semibold text-zinc-600">
          <a href="#home" className="hover:text-zinc-950 transition-colors duration-200">Home</a>
          <a href="#about" className="hover:text-zinc-950 transition-colors duration-200">About Us</a>
          <a href="#services" className="hover:text-zinc-950 transition-colors duration-200">Services</a>
          <a href="#contact" className="hover:text-zinc-950 transition-colors duration-200">Contact Us</a>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onStartProject}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Start a Project
          </button>
        </div>

        {/* Mobile Menu Toggle button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-950 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-[24px] px-6 py-6 flex flex-col gap-5 shadow-xl z-40 transition-all duration-300">
            <nav className="flex flex-col gap-5 text-base font-semibold text-zinc-600">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-zinc-950 transition-colors">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-zinc-950 transition-colors">About Us</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-zinc-950 transition-colors">Services</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-zinc-950 transition-colors">Contact Us</a>
            </nav>
            <div className="h-px bg-zinc-100" />
            <button 
              onClick={() => { setMobileMenuOpen(false); onStartProject(); }}
              className="w-full inline-flex items-center justify-center py-3.5 rounded-full bg-zinc-950 text-white font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-zinc-800 transition-colors"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 ml-1.5 text-white" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

