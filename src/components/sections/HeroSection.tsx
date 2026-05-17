'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Tunggu sampai client-side render selesai
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Set initial state untuk semua elemen (hide dulu)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.card-animate')
        gsap.set(cards, { 
          opacity: 0, 
          y: 100,
          scale: 0.8,
          rotateY: -15
        })
      }

      // Set initial state untuk text elements
      gsap.set([
        headlineRef.current,
        subheadlineRef.current,
        descriptionRef.current,
        buttonRef.current,
        scrollIndicatorRef.current
      ], { 
        opacity: 0,
        y: 30
      })

      // Timeline untuk animasi entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Animasi cards dengan stagger effect (desktop only) - MUNCUL DULUAN
      if (!isMobile && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.card-animate')

        tl.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          stagger: {
            each: 0.1,
            from: 'center'
          }
        }, 0) // Mulai dari 0
      }

      // Animasi text content - MUNCUL SETELAH CARDS
      if (headlineRef.current) {
        tl.to(headlineRef.current, {
          opacity: 1,
          y: 0,
          duration: 1
        }, isMobile ? 0.2 : 1.2) // Desktop: mulai setelah cards (1.2)
      }

      if (subheadlineRef.current) {
        tl.to(subheadlineRef.current, {
          opacity: 1,
          y: 0,
          duration: 1
        }, isMobile ? 0.4 : 1.4)
      }

      if (descriptionRef.current) {
        tl.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1
        }, isMobile ? 0.8 : 1.8)
      }

      if (buttonRef.current) {
        tl.to(buttonRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8
        }, isMobile ? 1 : 2)
      }

      if (scrollIndicatorRef.current && isMobile) {
        tl.to(scrollIndicatorRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, 1.2)

        // Floating animation untuk scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 1.2
        })
      }

      // PARALLAX EFFECT DIHAPUS - cards tetap di posisi awal
    }, heroRef)

    return () => ctx.revert()
  }, [isClient, isMobile]) // Hapus isClient dari dependency

  return (
    <section ref={heroRef} className={`relative py-12 md:py-16 overflow-hidden ${isMobile ? 'bg-cover bg-center' : 'bg-white'}`} style={isMobile ? { backgroundImage: 'url(/bg-mb.png)' } : {}}>
      <style jsx>{`
        @media (max-width: 767px) {
          section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 58, 138, 0.4) 100%);
            z-index: 1;
          }
        }
        
        /* Hide elements initially untuk prevent FOUC */
        .hero-content > * {
          opacity: 0;
        }
        
        .card-animate {
          opacity: 0;
        }
      `}</style>
      <div className="container mx-auto px-4 relative z-10">
        {/* Image Cards Container - Larger & More Prominent - Hidden on Mobile */}
        {/* Reserve space untuk cards agar text tidak naik */}
        <div className={`relative w-full max-w-[1400px] mx-auto mb-4 ${isMobile ? 'h-0' : 'h-[380px]'}`}>
          {isClient && !isMobile && (
            <div ref={cardsRef} className="absolute inset-0">
              {/* Card 4 - Ka'bah/Makkah (PUSAT/CENTER) */}
              <div className="card-animate absolute left-1/2 -translate-x-1/2 top-[110px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg z-10">
                <Image
                  src="/card4.png"
                  alt="Kaaba Makkah"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 3 - Kapal/Cargo (kiri dari card 4) - 15px gap dari tepi kiri card 4 */}
              <div className="card-animate absolute right-[calc(50%+72.5px+15px)] top-[20px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image
                  src="/card3.png"
                  alt="Cargo Ship"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 2 - Gedung/Tower (kiri dari card 3) - 15px gap */}
              <div className="card-animate absolute right-[calc(50%+72.5px+15px+145px+15px)] top-[95px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image
                  src="/card2.png"
                  alt="Tower Building"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 1 - Bendera Saudi (paling kiri) - 15px gap dari card 2 */}
              <div className="card-animate absolute right-[calc(50%+72.5px+15px+145px+15px+145px+15px)] top-[160px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image
                  src="/card1.png"
                  alt="Saudi Arabia Flag"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 5 - Container Ship (kanan dari card 4) - 15px gap dari tepi kanan card 4 */}
              <div className="card-animate absolute left-[calc(50%+72.5px+15px)] top-[20px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image
                  src="/card5.png"
                  alt="Container Ship"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 6 - Masjid/Area Saudi (kanan dari card 5) - 15px gap */}
              <div className="card-animate absolute left-[calc(50%+72.5px+15px+145px+15px)] top-[95px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image
                  src="/card6.png"
                  alt="Masjid Nabawi"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 7 - Handshake Bisnis (paling kanan) - 15px gap dari card 6 */}
              <div className="card-animate absolute left-[calc(50%+72.5px+15px+145px+15px+145px+15px)] top-[160px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image
                  src="/card7.png"
                  alt="Business Handshake"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Section - Compact & Premium */}
        <div className="hero-content max-w-4xl mx-auto pt-8 md:pt-4 md:text-center text-left">
          {/* Headlines - Balanced Size with Tight Line Height */}
          <h1 ref={headlineRef} className="text-[32px] md:text-[40px] font-serif font-normal leading-[0.95] mb-1 text-white md:text-gray-900">
            Bridging Markets
          </h1>
          <h2 ref={subheadlineRef} className="text-[32px] md:text-[40px] font-serif font-normal leading-[0.95] mb-5 text-white md:text-gray-900" style={{ color: '#B8956A' }}>
            Connecting Nations
          </h2>

          {/* Subheadline */}
          <p ref={descriptionRef} className="text-white md:text-gray-500 text-[14px] md:text-[16px] mb-8 max-w-[200px] md:max-w-3xl md:mx-auto leading-relaxed">
            PT Madinah Niaga Internasional is your premier gateway for strategic sourcing and seamless logistics between Saudi Arabia and Indonesia. We find the goods, handle the regulations, and deliver excellence directly to your door.
          </p>

          {/* CTA Button */}
          <button 
            ref={buttonRef}
            type="button" 
            className="btn-custom-hover md:flex md:justify-center md:gap-2 md:items-center md:mx-auto md:text-lg md:bg-gray-50 md:backdrop-blur-md md:font-medium md:isolation-auto md:before:absolute md:before:w-full md:before:transition-all md:before:duration-700 md:before:hover:w-full md:before:-left-full md:before:hover:left-0 md:before:rounded-full md:hover:text-gray-50 md:before:-z-10 md:before:aspect-square md:before:hover:scale-150 md:before:hover:duration-700 md:relative md:z-10 md:px-4 md:py-2 md:overflow-hidden md:border md:border-gray-900 md:rounded-full md:group flex justify-start gap-2 items-center text-base bg-white text-gray-900 font-medium px-6 py-3 rounded-full border-0 hover:bg-gray-100 transition-all duration-300"
          >
            Get a Free Consultation
          </button>

          {/* Scroll to explore - Mobile only */}
          <div ref={scrollIndicatorRef} className="md:hidden mt-12 flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
            <p className="text-white text-sm">Scroll to explore</p>
          </div>
        </div>


      </div>
    </section>
  )
}
