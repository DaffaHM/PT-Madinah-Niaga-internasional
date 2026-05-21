'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Header entrance on mount
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Process', href: '#how-it-works' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const handleContactClick = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true)
      // Animate menu items in
      setTimeout(() => {
        if (menuItemsRef.current) {
          const items = menuItemsRef.current.querySelectorAll('.mobile-menu-item')
          gsap.fromTo(items,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
          )
        }
      }, 10)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled && !isMobile ? 'pt-4 px-4' : ''}`}
        suppressHydrationWarning
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled && !isMobile
              ? 'bg-[#1B5E4F] shadow-lg rounded-2xl'
              : 'bg-white'
          } ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}
          suppressHydrationWarning
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="flex items-center cursor-pointer"
                >
                  <Image
                    src={mounted && isScrolled && !isMobile ? '/logo-nav-scrol.png' : '/logo-navv.png'}
                    alt="PT Madinah Niaga Internasional"
                    width={280}
                    height={56}
                    className={`transition-all duration-300 ${
                      mounted && isScrolled && !isMobile ? 'h-10 w-auto' : 'h-12 w-auto md:h-11'
                    }`}
                  />
                </a>
              </div>

              {/* Navigation Menu - Desktop */}
              <nav className="hidden md:flex space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-2 text-base font-medium transition-colors duration-200 relative group cursor-pointer ${
                      isScrolled && !isMobile
                        ? 'text-white hover:text-[#CDB696]'
                        : 'text-gray-800 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CDB696] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </nav>

              {/* Contact Button - Desktop */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={handleContactClick}
                  className="px-6 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm bg-[#CDB696] hover:bg-[#B8A082] text-white"
                >
                  Contact Us
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className={`md:hidden focus:outline-none transition-colors duration-300 ${
                  isScrolled && !isMobile ? 'text-white' : 'text-gray-700'
                }`}
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Overlay */}
      <div
        className={`fixed inset-0 top-20 z-40 md:hidden pointer-events-none transition-all duration-300 ${
          isOpen ? 'pointer-events-auto' : ''
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative transition-all duration-500 ease-out transform bg-white ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-2 px-4 py-4" ref={menuItemsRef}>
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="mobile-menu-item px-4 py-3 rounded-lg font-medium transition-all duration-300 block text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
              >
                {item.name}
              </a>
            ))}

            {/* Contact Button in Mobile Menu */}
            <button
              onClick={handleContactClick}
              className="mobile-menu-item px-4 py-3 rounded-lg font-medium transition-all duration-300 block text-center w-full mt-2 bg-[#CDB696] text-white hover:bg-[#B8A082]"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

    </>
  )
}
