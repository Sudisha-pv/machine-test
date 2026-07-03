import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MicroStatsGrid from './components/MicroStatsGrid'
import About from './components/About'
import Services from './components/Services'
import CtaBanner from './components/CtaBanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export default function App() {
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onStartProject={() => setShowContactModal(true)} />

      {/* Hero Section */}
      <Hero onStartProject={() => setShowContactModal(true)} />

      {/* Micro Stats Grid */}
      <MicroStatsGrid />

      {/* About Us Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Call To Action Banner */}
      <CtaBanner />

      {/* Contact Us Section */}
      <Contact />

      {/* Main Footer */}
      <Footer />

      {/* Project Contact Modal Popup */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  )
}
