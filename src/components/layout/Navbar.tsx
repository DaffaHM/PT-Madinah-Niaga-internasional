'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    // Set initial state
    setIsScrolled(window.scrollY > 0)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Produk', href: '#products' },
    { name: 'Pasar Global', href: '#global' },
    { name: 'Sertifikasi', href: '#certifications' },
    { name: 'Kontak', href: '#contact' },
  ]

  return (
    <div className="sticky top-0 z-50 transition-all duration-500 hidden md:block">
      <div className={`max-w-[500px] mx-auto ${isScrolled ? 'px-4 pt-4' : 'px-0 pt-0'}`}>
        <nav className={`transition-all duration-500 ${
          isScrolled 
            ? 'bg-navy-900/90 backdrop-blur-md shadow-lg rounded-2xl' 
            : 'bg-white shadow-none'
        }`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`rounded-full flex items-center justify-center mr-2 lg:mr-3 transition-all duration-500 ${
              isScrolled ? 'bg-gold-500' : 'bg-navy-900'
            } w-10 h-10 lg:w-12 lg:h-12`}>
              <span className={`font-bold transition-colors duration-500 ${
                isScrolled ? 'text-navy-900' : 'text-white'
              } text-lg lg:text-xl`}>GT</span>
            </div>
            <div>
              <h1 className={`font-bold transition-colors duration-500 ${
                isScrolled ? 'text-white' : 'text-navy-900'
              } text-base lg:text-xl`}>
                GLOBAL<span className="text-gold-500">TRADE</span>
              </h1>
              <p className={`text-xs uppercase tracking-wide transition-colors duration-500 hidden sm:block ${
                isScrolled ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Import • Export
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 relative group ${
                  isScrolled 
                    ? 'text-gray-200 hover:text-gold-400' 
                    : 'text-gray-700 hover:text-navy-900'
                }`}
              >
                {item.name}
                {/* Hover underline effect */}
                <span className={`absolute left-0 bottom-[-4px] w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-gold-400' : 'bg-navy-900'
                }`}></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button className={`px-8 py-4 rounded-lg font-semibold transition-all duration-500 inline-flex items-center gap-2 ${
              isScrolled
                ? 'bg-gold-500 text-navy-900 hover:bg-gold-400'
                : 'bg-navy-900 text-white hover:bg-navy-800'
            }`}>
              Hubungi Kami
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden transition-colors duration-500 ${
              isScrolled ? 'text-white' : 'text-navy-900'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className={`py-4 border-t transition-colors duration-500 ${
            isScrolled ? 'border-navy-700 bg-navy-900/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex flex-col space-y-2 px-2">
              {menuItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-all duration-300 px-4 py-3 rounded-lg block ${
                    isScrolled 
                      ? 'text-gray-200 hover:text-gold-400 hover:bg-navy-800' 
                      : 'text-gray-700 hover:text-navy-900 hover:bg-gray-200'
                  }`}
                  style={{
                    animation: isOpen ? `slideDown 0.3s ease-out ${index * 0.05}s both` : 'none'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Contact Button in Mobile Menu */}
              <button 
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-500 inline-flex items-center justify-center gap-2 w-full mt-4 ${
                  isScrolled
                    ? 'bg-gold-500 text-navy-900 hover:bg-gold-400'
                    : 'bg-navy-900 text-white hover:bg-navy-800'
                }`}
                style={{
                  animation: isOpen ? `slideDown 0.3s ease-out ${menuItems.length * 0.05}s both` : 'none'
                }}
                onClick={() => setIsOpen(false)}
              >
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
          </div>
        </nav>
      </div>
    </div>
  )
}