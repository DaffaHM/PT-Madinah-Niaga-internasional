'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  // isClient false saat SSR — semua conditional render harus tunggu ini true
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bg1Ref = useRef<HTMLDivElement>(null)
  const bg2Ref = useRef<HTMLDivElement>(null)

  const mobileBackgrounds = ['/bg-mb.png', '/bg-mb-kurma.png']

  // Satu useEffect untuk set isClient + isMobile — mencegah hydration mismatch
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    setIsClient(true)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Background slideshow mobile
  useEffect(() => {
    if (!isClient || !isMobile) return

    if (bg1Ref.current && bg2Ref.current) {
      gsap.set(bg1Ref.current, { opacity: 1 })
      gsap.set(bg2Ref.current, { opacity: 0 })
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % mobileBackgrounds.length
      if (bg1Ref.current && bg2Ref.current) {
        if (currentIndex === 1) {
          gsap.to(bg1Ref.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
          gsap.to(bg2Ref.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' })
        } else {
          gsap.to(bg1Ref.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' })
          gsap.to(bg2Ref.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isClient, isMobile])

  // GSAP animations
  useEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.card-animate')
        gsap.set(cards, { opacity: 0, y: 100, scale: 0.8, rotateY: -15 })
      }

      gsap.set(
        [
          headlineRef.current,
          subheadlineRef.current,
          descriptionRef.current,
          scrollIndicatorRef.current,
        ].filter(Boolean),
        { opacity: 0, y: 30 }
      )

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (!isMobile && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.card-animate')
        tl.to(cards, {
          opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 1.2,
          stagger: { each: 0.1, from: 'center' },
        }, 0)
      }

      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 1 }, isMobile ? 0.2 : 1.2)
      tl.to(subheadlineRef.current, { opacity: 1, y: 0, duration: 1 }, isMobile ? 0.4 : 1.4)
      tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 1 }, isMobile ? 0.8 : 1.8)

      if (scrollIndicatorRef.current && isMobile) {
        tl.to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.2)
        gsap.to(scrollIndicatorRef.current, {
          y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut', delay: 1.2,
        })
      }

      // Card hover (desktop only)
      if (!isMobile && cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.card-animate')
        cards.forEach((card) => {
          const el = card as HTMLElement
          el.addEventListener('mouseenter', () =>
            gsap.to(el, { y: -10, scale: 1.04, boxShadow: '0 20px 40px rgba(0,0,0,0.18)', duration: 0.35, ease: 'power2.out' })
          )
          el.addEventListener('mouseleave', () =>
            gsap.to(el, { y: 0, scale: 1, boxShadow: '0 4px 16px rgba(0,0,0,0.10)', duration: 0.45, ease: 'power3.out' })
          )
        })
      }

      // Button hover GSAP
      if (buttonRef.current) {
        const btn = buttonRef.current
        btn.addEventListener('mouseenter', () =>
          gsap.to(btn, { scale: 1.05, duration: 0.2, ease: 'power2.out' })
        )
        btn.addEventListener('mouseleave', () =>
          gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' })
        )
        btn.addEventListener('mousedown', () =>
          gsap.to(btn, { scale: 0.97, duration: 0.1, ease: 'power2.out' })
        )
        btn.addEventListener('mouseup', () =>
          gsap.to(btn, { scale: 1.05, duration: 0.1, ease: 'power2.out' })
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [isClient, isMobile])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative py-12 md:py-16 overflow-hidden bg-white"
    >
      {/* Mobile background — hanya render setelah isClient untuk hindari hydration mismatch */}
      {isClient && isMobile && (
        <>
          <div
            ref={bg1Ref}
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${mobileBackgrounds[0]})` }}
          />
          <div
            ref={bg2Ref}
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${mobileBackgrounds[1]})` }}
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,58,138,0.4) 100%)' }}
          />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Cards area — hanya desktop, hanya setelah client mount */}
        <div className="relative w-full max-w-[1400px] mx-auto mb-4 h-0 md:h-[380px]">
          {isClient && !isMobile && (
            <div ref={cardsRef} className="absolute inset-0">
              <div className="card-animate absolute left-1/2 -translate-x-1/2 top-[110px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg z-10">
                <Image src="/card4.png" alt="Kaaba Makkah — PT Madinah Niaga Internasional" fill sizes="145px" priority className="object-cover" />
              </div>
              <div className="card-animate absolute right-[calc(50%+72.5px+15px)] top-[20px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image src="/card3.png" alt="Kapal kargo logistik internasional" fill sizes="145px" priority className="object-cover" />
              </div>
              <div className="card-animate absolute right-[calc(50%+72.5px+15px+145px+15px)] top-[95px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image src="/card2.png" alt="Gedung bisnis Arab Saudi" fill sizes="145px" className="object-cover" />
              </div>
              <div className="card-animate absolute right-[calc(50%+72.5px+15px+145px+15px+145px+15px)] top-[160px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image src="/card1.png" alt="Bendera Arab Saudi" fill sizes="145px" priority className="object-cover" />
              </div>
              <div className="card-animate absolute left-[calc(50%+72.5px+15px)] top-[20px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image src="/card5.png" alt="Container ship pengiriman internasional" fill sizes="145px" priority className="object-cover" />
              </div>
              <div className="card-animate absolute left-[calc(50%+72.5px+15px+145px+15px)] top-[95px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image src="/card6.png" alt="Masjid Nabawi Madinah" fill sizes="145px" className="object-cover" />
              </div>
              <div className="card-animate absolute left-[calc(50%+72.5px+15px+145px+15px+145px+15px)] top-[160px] w-[145px] h-[185px] rounded-[18px] overflow-hidden shadow-lg">
                <Image src="/card7.png" alt="Kerjasama bisnis internasional" fill sizes="145px" className="object-cover" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto pt-8 md:pt-4 md:text-center text-left">
          <h1
            ref={headlineRef}
            className="text-[32px] md:text-[40px] font-serif font-normal leading-[0.95] mb-1 text-white md:text-gray-900"
            style={{ opacity: 0 }}
          >
            Bridging Markets
          </h1>
          <p
            ref={subheadlineRef}
            className="text-[32px] md:text-[40px] font-serif font-normal leading-[0.95] mb-5"
            style={{ color: '#B8956A', opacity: 0 }}
          >
            Connecting Nations
          </p>

          <p
            ref={descriptionRef}
            className="text-white md:text-gray-500 text-[14px] md:text-[16px] mb-8 max-w-[200px] md:max-w-3xl md:mx-auto leading-relaxed"
            style={{ opacity: 0 }}
          >
            <strong className="font-semibold">PT Madinah Niaga Internasional</strong> is your premier gateway for strategic sourcing and seamless logistics between Saudi Arabia and Indonesia. We find the goods, handle the regulations, and deliver excellence directly to your door.
          </p>

          <button
            ref={buttonRef}
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-custom-hover md:flex md:justify-center md:gap-2 md:items-center md:mx-auto md:text-lg md:bg-gray-50 md:backdrop-blur-md md:font-medium md:isolation-auto md:before:absolute md:before:w-full md:before:transition-all md:before:duration-700 md:before:hover:w-full md:before:-left-full md:before:hover:left-0 md:before:rounded-full md:hover:text-gray-50 md:before:-z-10 md:before:aspect-square md:before:hover:scale-150 md:before:hover:duration-700 md:relative md:z-10 md:px-4 md:py-2 md:overflow-hidden md:border md:border-gray-900 md:rounded-full md:group flex justify-start gap-2 items-center text-base bg-white text-gray-900 font-medium px-6 py-3 rounded-full border-0 hover:bg-gray-100 transition-all duration-300"
          >
            Get a Free Consultation
          </button>

          <div ref={scrollIndicatorRef} className="md:hidden mt-12 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
            <p className="text-white text-sm">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  )
}
