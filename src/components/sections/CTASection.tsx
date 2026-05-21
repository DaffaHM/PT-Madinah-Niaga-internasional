'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const ring3Ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headingRef.current, bodyRef.current, buttonRef.current], { opacity: 0, y: 30 })

      // Staggered content entrance on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(buttonRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.6)',
        }, '-=0.4')

      // Button pop on hover
      if (buttonRef.current) {
        const btn = buttonRef.current
        const onEnter = () => gsap.to(btn, { scale: 1.06, duration: 0.25, ease: 'power2.out' })
        const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.35, ease: 'power2.out' })
        btn.addEventListener('mouseenter', onEnter)
        btn.addEventListener('mouseleave', onLeave)
      }

      // Ring rotations
      gsap.to(ring1Ref.current, { rotation: 360, duration: 18, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
      gsap.to(ring2Ref.current, { rotation: -360, duration: 28, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
      gsap.to(ring3Ref.current, { rotation: 360, duration: 45, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })

      // Breathe
      gsap.to(ring1Ref.current, { scale: 1.06, duration: 4, ease: 'power1.inOut', repeat: -1, yoyo: true })
      gsap.to(ring2Ref.current, { scale: 1.04, duration: 6, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 2 })
      gsap.to(ring3Ref.current, { scale: 1.03, duration: 8, ease: 'power1.inOut', repeat: -1, yoyo: true, delay: 4 })
    }, sectionRef)

    // Mouse parallax
    const section = sectionRef.current
    const handleMouseMove = (e: MouseEvent) => {
      if (!section) return
      const rect = section.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height

      gsap.to(ring1Ref.current, { x: dx * 35, y: dy * 35, duration: 1.2, ease: 'power2.out' })
      gsap.to(ring2Ref.current, { x: dx * -22, y: dy * -22, duration: 1.6, ease: 'power2.out' })
      gsap.to(ring3Ref.current, { x: dx * 14, y: dy * 14, duration: 2, ease: 'power2.out' })
      gsap.to(glowRef.current, { x: dx * 60, y: dy * 60, opacity: 0.3, duration: 0.8, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
        x: 0, y: 0, duration: 1.5, ease: 'power2.out',
      })
      gsap.to(glowRef.current, { x: 0, y: 0, opacity: 0.12, duration: 1.5, ease: 'power2.out' })
    }

    section?.addEventListener('mousemove', handleMouseMove)
    section?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      ctx.revert()
      section?.removeEventListener('mousemove', handleMouseMove)
      section?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const whatsappNumber = '6281234567890'
  const whatsappMessage = encodeURIComponent('Halo, saya ingin berkonsultasi mengenai sourcing produk dari Arab Saudi.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 lg:py-36 cursor-default"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #1a7a4a 0%, #0F5132 45%, #0a3d26 100%)',
      }}
    >
      {/* Gold accent top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent" />

      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,164,106,0.18) 0%, transparent 70%)',
          opacity: 0.12,
        }}
      />

      {/* Ring 1 — inner dashed gold */}
      <div
        ref={ring1Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ border: '1px dashed rgba(200,164,106,0.3)' }}
      />

      {/* Ring 2 — mid solid white */}
      <div
        ref={ring2Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      />

      {/* Ring 3 — outer dashed gold */}
      <div
        ref={ring3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full pointer-events-none"
        style={{ border: '1px dashed rgba(200,164,106,0.1)' }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div ref={contentRef}>
          <h2
            ref={headingRef}
            className="text-[28px] md:text-[40px] lg:text-[52px] font-serif font-normal text-white leading-[1.1] mb-6 tracking-tight"
          >
            Ready to Start Your<br />
            <span className="text-[#C8A46A]">Global Trade Journey?</span>
          </h2>

          <p
            ref={bodyRef}
            className="text-white/60 text-[14px] md:text-[16px] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Don&apos;t let borders limit your business growth. Contact us today for a consultation on how we can help you source premium goods from Saudi Arabia.
          </p>

          <a
            ref={buttonRef}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#0F5132] font-semibold text-[15px] md:text-[16px] px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-white/20 transition-shadow duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Inquiry via WhatsApp
          </a>
        </div>
      </div>

      {/* Gold accent bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A46A]/40 to-transparent" />
    </section>
  )
}
