export default function Footer() {
  return (
    <footer className="relative w-full bg-zinc-950 border-t border-zinc-900/80 pt-20 pb-10 select-none">
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Main Grid Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-3 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-md flex items-center justify-center">
                <span className="font-display font-black text-white text-base leading-none">#</span>
              </div>
              <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white">
                UNIQUE<span className="text-violet-500">#</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-light">
              Elite media and marketing agency in Abu Dhabi, serving government and corporate sectors.
            </p>
          </div>

          {/* Agency Services */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest mb-6">
              Agency Services
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">Social Media Management</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">Content Production</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">Paid Ads Strategy</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">Corporate Branding</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">Event Coverage</a>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-medium text-zinc-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#home" className="hover:text-white transition-colors duration-200">Portfolio</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors duration-200">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h4 className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest mb-6">
              Our Location
            </h4>
            <div className="flex flex-col gap-4 text-sm font-light text-zinc-400">
              <div className="flex items-center gap-2 text-white font-bold tracking-tight">
                {/* MapPin Custom SVG */}
                <svg className="w-4 h-4 text-violet-500 shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                THE LANDMARK
              </div>
              <p className="leading-relaxed">
                Office 19, 116 Khadim Bin Butti<br />
                Al Hamed St, Al Hisn<br />
                Abu Dhabi, UAE
              </p>
            </div>
          </div>

          {/* Connect */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 flex flex-col gap-6">
            <div>
              <h4 className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest mb-6">
                Connect
              </h4>
              <div className="flex items-center gap-4 text-zinc-400">
                {/* Instagram Custom SVG */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-105" aria-label="Instagram">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                
                {/* TikTok Custom SVG */}
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-105" aria-label="TikTok">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.89-.52-4.08-1.39-.12-.08-.2-.17-.37-.17v6.2c0 2.27-.47 4.67-2.14 6.22-1.78 1.66-4.44 2.19-6.79 1.69-2.73-.58-5-2.89-5.38-5.69-.47-3.48 1.53-7.23 4.88-8.29.6-.2 1.22-.3 1.85-.31v4.02c-.39.02-.79.08-1.17.21-1.45.48-2.39 2.1-2.02 3.61.32 1.34 1.64 2.37 3.03 2.18 1.45-.19 2.45-1.51 2.38-2.95-.02-1.89-.01-3.78-.01-5.67v-13.4z"/>
                  </svg>
                </a>

                {/* Twitter / X Custom SVG */}
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-105" aria-label="Twitter X">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>

                {/* Facebook Custom SVG */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-105" aria-label="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                  </svg>
                </a>

                {/* Snapchat Custom SVG */}
                <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all hover:scale-105" aria-label="Snapchat">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2c-3.9 0-7 3.1-7 7a1 1 0 00.1.4C5 9.7 5 10 5.2 10.3c.3.5.7.9 1.1 1.2-.1.5-.1.9-.1 1.4 0 2.2 1.8 4.1 4 4.3v1c-.7.2-1.3.5-1.8.9-.3.3-.6.6-.8 1-.3.5-.2 1.1.2 1.5.5.5 1.1.7 1.8.8.7 0 1.3-.2 1.8-.5a3.4 3.4 0 001.4-1.4c.1-.2.2-.4.4-.5.3.3.7.5 1.1.5h1.1c.4 0 .8-.2 1.1-.5.2.1.3.3.4.5.4.6.9 1.1 1.4 1.4.5.3 1.1.5 1.8.5.7-.1 1.3-.3 1.8-.8.4-.4.5-1 .2-1.5-.2-.4-.5-.7-.8-1-.5-.4-1.1-.7-1.8-.9v-1c2.2-.2 4-2.1 4-4.3 0-.5 0-.9-.1-1.4.4-.3.8-.7 1.1-1.2.2-.3.2-.6.3-.9a1 1 0 00.1-.4c0-3.9-3.1-7-7-7zm.1 1.5c2.9 0 5.3 2.3 5.4 5.2.1.7-.1 1.4-.6 1.9-.3.3-.8.6-1.3.7v1.1c0 1.5-1.1 2.8-2.6 3-1.6.2-3.1-.9-3.3-2.5V11.3c-.5-.1-1-.4-1.3-.7-.5-.5-.7-1.2-.6-1.9.1-2.9 2.5-5.2 5.4-5.2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-zinc-900/60 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>
            © 2026 UNIQUE HASHTAGERS ABU DHABI. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
