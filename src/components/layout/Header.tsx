'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    // Detect mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial state
    handleResize()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Commodities', href: '/commodities' },
    { name: 'Process', href: '/process' },
  ]

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled && !isMobile ? 'pt-4 px-4' : ''}`} suppressHydrationWarning>
        <div className={`transition-all duration-300 ${isScrolled && !isMobile ? 'bg-[#1B5E4F] shadow-lg rounded-2xl' : 'bg-white'} ${isScrolled ? 'shadow-md' : 'shadow-sm'}`} suppressHydrationWarning>
          <div className={`${isScrolled && !isMobile ? 'max-w-7xl mx-auto px-4 sm:px-8 lg:px-16' : 'max-w-7xl mx-auto px-4 sm:px-8 lg:px-16'}`}>
            <div className="flex justify-between items-center h-20">
              {/* Logo - Responsive */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <Image
                    src={mounted && isScrolled && !isMobile ? '/logo-nav-scrol.png' : '/logo-navv.png'}
                    alt="PT Madinah Niaga Internasional"
                    width={280}
                    height={56}
                    className={`transition-all duration-300 ${mounted && isScrolled && !isMobile ? 'h-10 w-auto' : 'h-12 w-auto md:h-11'}`}
                  />
                </Link>
              </div>

              {/* Navigation Menu - Desktop */}
              <nav className="hidden md:flex space-x-8">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-base font-medium transition-colors duration-200 relative group ${isScrolled && !isMobile ? 'text-white hover:text-[#CDB696]' : 'text-gray-800 hover:text-gray-900'}`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled && !isMobile ? 'bg-[#CDB696]' : 'bg-[#CDB696]'}`}></span>
                  </Link>
                ))}
              </nav>

              {/* Contact Button - Desktop */}
              <div className="hidden md:flex items-center">
                <Link 
                  href="/contact"
                  className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm bg-[#CDB696] hover:bg-[#B8A082] text-white"
                >
                  Contact
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className={`md:hidden focus:outline-none transition-colors duration-300 ${isScrolled && !isMobile ? 'text-white' : 'text-gray-700'}`}
                aria-label="Toggle menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Overlay */}
      <div className={`fixed inset-0 top-20 z-40 md:hidden pointer-events-none transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : ''
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`relative transition-all duration-500 ease-out transform bg-white ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="flex flex-col space-y-2 px-4 py-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 block text-gray-700 hover:text-gray-900 hover:bg-gray-200`}
                style={{
                  animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Contact Button in Mobile Menu */}
            <Link
              href="/contact"
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 block text-center w-full mt-2 bg-[#CDB696] text-white hover:bg-[#B8A082]`}
              style={{
                animation: isOpen ? `slideIn 0.3s ease-out ${menuItems.length * 0.05}s both` : 'none'
              }}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}