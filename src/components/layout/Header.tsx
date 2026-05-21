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
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Header entrance
    gsap.fromTo(headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('scroll', handleScroll, { passive: true })
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
    closeMenu()
    setTimeout(() => {
      const element = document.getElementById(href.replace('#', ''))
      if (element) element.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const handleContactClick = () => {
    closeMenu()
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const openMenu = () => {
    setIsOpen(true)
    // Backdrop fade in
    gsap.to(backdropRef.current, { opacity: 1, duration: 0.2, ease: 'none' })
    // Panel slide down
    gsap.fromTo(menuPanelRef.current,
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
    )
    // Menu items stagger
    const items = menuItemsRef.current?.querySelectorAll('.mobile-menu-item')
    if (items) {
      gsap.fromTo(items,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: 'power2.out', delay: 0.1 }
      )
    }
  }

  const closeMenu = () => {
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'none' })
    gsap.to(menuPanelRef.current, {
      y: -8, opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => setIsOpen(false)
    })
  }

  const toggleMenu = () => {
    if (!isOpen) openMenu()
    else closeMenu()
  }

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 ${isScrolled && !isMobile ? 'pt-4 px-4' : ''}`}
        style={{ transition: 'padding 0.3s ease' }}
        suppressHydrationWarning
      >
        <div
          className={`${
            isScrolled && !isMobile
              ? 'bg-[#1B5E4F] shadow-lg rounded-2xl'
              : 'bg-white shadow-sm'
          }`}
          style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease' }}
          suppressHydrationWarning
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex justify-between items-center h-20">

              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center cursor-pointer">
                  <Image
                    src={mounted && isScrolled && !isMobile ? '/logo-nav-scrol.png' : '/logo-navv.png'}
                    alt="PT Madinah Niaga Internasional"
                    width={280}
                    height={56}
                    className={`h-12 w-auto md:h-11`}
                    style={{ transition: 'height 0.3s ease' }}
                  />
                </a>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-2 text-base font-medium relative group cursor-pointer ${
                      isScrolled && !isMobile ? 'text-white hover:text-[#CDB696]' : 'text-gray-800 hover:text-gray-900'
                    }`}
                    style={{ transition: 'color 0.2s ease' }}
                  >
                    {item.name}
                    <span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#CDB696] group-hover:w-full"
                      style={{ transition: 'width 0.3s ease' }}
                    />
                  </a>
                ))}
              </nav>

              {/* Desktop Contact Button */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={handleContactClick}
                  className="px-6 py-2.5 rounded-md text-sm font-medium shadow-sm bg-[#CDB696] hover:bg-[#B8A082] text-white"
                  style={{ transition: 'background-color 0.2s ease' }}
                >
                  Contact Us
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden focus:outline-none text-gray-700 p-1"
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden">
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-black/20"
            style={{ opacity: 0 }}
            onClick={closeMenu}
          />

          {/* Panel */}
          <div
            ref={menuPanelRef}
            className="relative bg-white shadow-lg"
            style={{ opacity: 0 }}
          >
            <div ref={menuItemsRef} className="flex flex-col space-y-1 px-4 py-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="mobile-menu-item px-4 py-3 rounded-lg font-medium block text-gray-700 hover:text-gray-900 hover:bg-gray-100 cursor-pointer active:bg-gray-200"
                  style={{ transition: 'background-color 0.15s ease' }}
                >
                  {item.name}
                </a>
              ))}

              <button
                onClick={handleContactClick}
                className="mobile-menu-item px-4 py-3 rounded-lg font-medium text-center w-full mt-1 bg-[#CDB696] text-white active:bg-[#B8A082]"
                style={{ transition: 'background-color 0.15s ease' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
