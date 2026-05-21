'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column: slide in from left
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )

      // Gold line draw on left column
      gsap.fromTo('.why-gold-line',
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      // Cards: di mobile cukup fade+y, di desktop slide dari kiri/kanan
      const cards = cardsRef.current?.querySelectorAll('.why-card')
      const mm = gsap.matchMedia()

      mm.add('(max-width: 767px)', () => {
        cards?.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      })

      mm.add('(min-width: 768px)', () => {
        cards?.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
            {
              opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      })
      mm.add('(min-width: 1024px)', () => {
        const cardEls = cardsRef.current?.querySelectorAll('.why-card')
        cardEls?.forEach((card) => {
          const el = card as HTMLElement
          const img = el.querySelector('img') as HTMLElement
          const goldLine = el.querySelector('.card-gold-line') as HTMLElement

          if (!img) return

          const onEnter = () => {
            gsap.to(img, { scale: 1.06, duration: 0.6, ease: 'power2.out' })
            if (goldLine) gsap.to(goldLine, { scaleX: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
          }
          const onLeave = () => {
            gsap.to(img, { scale: 1, duration: 0.7, ease: 'power2.out' })
            if (goldLine) gsap.to(goldLine, { scaleX: 0.3, opacity: 0.5, duration: 0.4, ease: 'power2.out' })
          }
          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
            const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
            gsap.to(img, { x: dx * 12, y: dy * 8, duration: 0.4, ease: 'power2.out' })
          }
          const onLeaveReset = () => {
            gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })
          }

          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
          el.addEventListener('mousemove', onMove as EventListener)
          el.addEventListener('mouseleave', onLeaveReset)
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative bg-[#FAF8F3] py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── LEFT ── */}
          <div ref={leftRef} className="lg:col-span-4 self-start">
            <div className="mb-5">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C8A46A] font-semibold">
                Why Choose Us
              </span>
              <div className="why-gold-line w-8 h-[1px] bg-[#C8A46A] mt-3" />
            </div>

            <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-serif font-normal text-[#0F5132] leading-[1.15] mb-6 tracking-tight">
              Built on Trust,<br />
              Driven by{' '}
              <span className="text-[#C8A46A]">Value.</span>
            </h2>

            <p className="text-[14px] md:text-[15px] text-gray-500 leading-relaxed max-w-xs">
              We combine local expertise in Saudi Arabia with international standards to deliver reliable, transparent, and tailored sourcing solutions for your business.
            </p>
          </div>

          {/* ── RIGHT — 2×2 card grid ── */}
          <div ref={cardsRef} className="lg:col-span-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">

              {/* Card 1 — Local Presence (wider) */}
              <div className="why-card md:col-span-3 group relative bg-white border border-[#EDE8DF] rounded-[24px] overflow-hidden p-7 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-[#C8A46A]/10 transition-shadow duration-500">
                {/* Visual — real photo */}
                <div className="absolute bottom-0 right-0 w-[48%] h-full overflow-hidden rounded-r-[24px] pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-10" />
                  <Image
                    src="/local-img.png"
                    alt="Saudi Arabia local presence"
                    fill
                    sizes="(max-width: 768px) 48vw, 24vw"
                    className="object-cover object-right"
                  />
                </div>

                <div className="relative z-10 max-w-[55%]">
                  <h3 className="text-[22px] font-serif font-normal text-[#0F5132] leading-tight mb-3">
                    Local<br />Presence
                  </h3>
                  <div className="card-gold-line w-6 h-[1px] bg-[#C8A46A] mb-3" style={{ transformOrigin: 'left' }} />
                  <p className="text-gray-500 text-[12px] leading-relaxed">
                    We are physically based in Saudi Arabia, allowing for direct supplier negotiations and on-the-ground oversight.
                  </p>
                </div>
              </div>

              {/* Card 2 — Legal Certainty (narrower) */}
              <div className="why-card md:col-span-2 group relative bg-white border border-[#EDE8DF] rounded-[24px] overflow-hidden p-7 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-[#C8A46A]/10 transition-shadow duration-500">
                {/* Visual — legal photo */}
                <div className="absolute bottom-0 right-0 w-[75%] h-full overflow-hidden rounded-r-[24px] pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
                  <Image
                    src="/legal-img.png"
                    alt="Legal certification document"
                    fill
                    sizes="(max-width: 768px) 75vw, 30vw"
                    className="object-contain object-bottom"
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-[22px] font-serif font-normal text-[#0F5132] leading-tight mb-3">
                    Legal<br />Certainty
                  </h3>
                  <div className="card-gold-line w-6 h-[1px] bg-[#C8A46A] mb-3" style={{ transformOrigin: 'left' }} />
                  <p className="text-gray-500 text-[12px] leading-relaxed">
                    Operates as a fully registered and legal Indonesian entity (PT Madinah Niaga Internasional).
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Card 3 — 50/50 Partner Integrity */}
              <div className="why-card group relative bg-white border border-[#EDE8DF] rounded-[24px] overflow-hidden p-7 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-[#C8A46A]/10 transition-shadow duration-500">
                {/* Background image — right side only */}
                <div className="absolute bottom-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
                  <Image
                    src="/50.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 55vw, 27vw"
                    className="object-cover object-center"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative z-10 max-w-[55%]">
                  <h3 className="text-[22px] font-serif font-normal text-[#0F5132] leading-tight mb-3">
                    50/50 Partner<br />Integrity
                  </h3>
                  <div className="card-gold-line w-6 h-[1px] bg-[#C8A46A] mb-3" style={{ transformOrigin: 'left' }} />
                  <p className="text-gray-500 text-[12px] leading-relaxed">
                    Built on a foundation of professional collaboration and transparent profit-sharing models.
                  </p>
                </div>
              </div>

              {/* Card 4 — Tailored Solutions */}
              <div className="why-card group relative bg-white border border-[#EDE8DF] rounded-[24px] overflow-hidden p-7 flex flex-col justify-between min-h-[260px] hover:shadow-xl hover:shadow-[#C8A46A]/10 transition-shadow duration-500">
                {/* Visual — tailored photo */}
                <div className="absolute bottom-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
                  <Image
                    src="/tailored.png"
                    alt="Tailored solutions"
                    fill
                    sizes="(max-width: 768px) 55vw, 27vw"
                    className="object-cover object-right"
                  />
                </div>

                <div className="relative z-10 max-w-[55%]">
                  <h3 className="text-[22px] font-serif font-normal text-[#0F5132] leading-tight mb-3">
                    Tailored<br />Solutions
                  </h3>
                  <div className="card-gold-line w-6 h-[1px] bg-[#C8A46A] mb-3" style={{ transformOrigin: 'left' }} />
                  <p className="text-gray-500 text-[12px] leading-relaxed">
                    We adapt to your specific niche, whether you are a small business or a large corporation.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
