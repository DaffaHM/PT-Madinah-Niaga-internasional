'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Columns stagger entrance
      gsap.fromTo(
        [col1Ref.current, col2Ref.current, col3Ref.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )

      // Gold divider draw
      gsap.fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )

      // Bottom bar fade
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6, delay: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )

      // Commodity tags pop
      gsap.fromTo('.footer-tag',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)', delay: 0.5,
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )
    }, footerRef)

    // Nav link hover nudge
    const links = footerRef.current?.querySelectorAll('.footer-nav-link')
    const cleanups: (() => void)[] = []
    links?.forEach((link) => {
      const el = link as HTMLElement
      const onEnter = () => gsap.to(el, { x: 5, duration: 0.2, ease: 'power2.out' })
      const onLeave = () => gsap.to(el, { x: 0, duration: 0.2, ease: 'power2.out' })
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => {
      ctx.revert()
      cleanups.forEach(fn => fn())
    }
  }, [])
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Products', href: '#products' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-choose-us' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="bg-[#FAF8F3] border-t border-[#EDE8DF]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

          {/* Brand */}
          <div ref={col1Ref} className="md:col-span-5">
            <div className="mb-4">
              <Image
                src="/logo-navv.png"
                alt="PT Madinah Niaga Internasional"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-600 text-[13px] leading-relaxed max-w-xs">
              Your premier gateway for strategic sourcing and seamless logistics between Saudi Arabia and Indonesia.
            </p>

            {/* Info Legal & Kontak */}
            <div className="mt-5 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#C8A46A] text-[11px] font-semibold tracking-wide mt-0.5 shrink-0">Phone</span>
                <a
                  href="tel:+6281249794530"
                  className="text-gray-600 text-[12px] hover:text-[#0F5132] transition-colors duration-200"
                >
                  +62 812 4979 4530
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C8A46A] text-[11px] font-semibold tracking-wide mt-0.5 shrink-0">Email</span>
                <a
                  href="mailto:contact@madinahniagaintl.com"
                  className="text-gray-600 text-[12px] hover:text-[#0F5132] transition-colors duration-200"
                >
                  contact@madinahniagaintl.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C8A46A] text-[11px] font-semibold tracking-wide mt-0.5 shrink-0">NIB</span>
                <span className="text-gray-600 text-[12px]">3003260096559</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C8A46A] text-[11px] font-semibold tracking-wide mt-0.5 shrink-0">SK</span>
                <span className="text-gray-600 text-[12px]">AHU-A000643.AH.01.30.Tahun 2026</span>
              </div>
            </div>

            {/* Divider */}
            <div ref={dividerRef} className="mt-6 w-12 h-[1px] bg-[#C8A46A]/40" />
          </div>

          {/* Navigation */}
          <div ref={col2Ref} className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#C8A46A] font-semibold mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="footer-nav-link inline-block text-gray-600 hover:text-[#0F5132] transition-colors duration-300 text-[13px] cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div ref={col3Ref} className="md:col-span-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#C8A46A] font-semibold mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'Strategic Product Sourcing',
                'Quality Assurance & Compliance',
                'End-to-End Logistics',
                'Custom Sourcing Requests',
              ].map((s) => (
                <li key={s} className="text-gray-600 text-[13px]">{s}</li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#C8A46A] font-semibold mb-4">
                Commodities
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Dates & Spices', 'Industrial', 'Consumer Goods', 'Custom'].map((tag) => (
                  <span
                    key={tag}
                    className="footer-tag text-[11px] text-gray-600 border border-gray-300 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="border-t border-[#EDE8DF]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-[12px]">
            © {new Date().getFullYear()} PT Madinah Niaga Internasional. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
