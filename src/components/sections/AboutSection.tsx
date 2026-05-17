'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([imageRef.current, contentRef.current], {
        opacity: 0,
        y: 50
      })

      // Animate on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        }
      })

      tl.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-0 md:py-20 bg-white md:bg-white bg-[#F5F1E8]">
      <div className="mx-auto px-0 max-w-[1100px]">
        <div 
          ref={cardRef}
          className="relative bg-[#F5F1E8] md:rounded-[32px] lg:rounded-[48px] overflow-hidden min-h-[400px] md:min-h-[480px] lg:min-h-[500px]"
        >
          {/* Image for Mobile - Card style at top inside section */}
          <div className="md:hidden w-full px-4 pt-8 pb-6">
            <div className="w-full h-[280px] relative overflow-hidden rounded-[20px]">
              <Image
                src="/about-us.png"
                alt="Makkah - Saudi Arabia"
                fill
                className="object-cover object-top"
              />
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>

          {/* Image Container - Desktop only, positioned left */}
          <div 
            ref={imageRef}
            className="hidden md:block absolute left-6 md:left-12 lg:left-16 top-8 md:top-12 lg:top-16 bottom-8 md:bottom-12 lg:bottom-16 w-[240px] md:w-[300px] lg:w-[340px] rounded-[20px] md:rounded-[24px] overflow-hidden"
          >
            <Image
              src="/about-us.png"
              alt="Makkah - Saudi Arabia"
              fill
              className="object-cover"
            />
          </div>

          {/* Content - Kanan */}
          <div 
            ref={contentRef}
            className="relative z-10 pt-0 md:pt-8 pb-8 pr-6 pl-6 md:pl-[380px] lg:pl-[460px] md:pr-12 lg:pr-16 md:py-12 lg:py-16"
          >
            {/* Label */}
            <div className="mb-3 md:mb-4">
              <span className="text-[#2D6A4F] font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                WHO ARE WE
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent mt-3"></div>
            </div>

            {/* Heading */}
            <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-serif font-normal leading-[1.15] mb-4 md:mb-5 text-[#1B4332]">
              Your Strategic Partner<br />
              in the Heart of<br />
              <span className="text-[#B8956A]">Saudi Arabia</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed mb-6 md:mb-7 max-w-xl">
              PT Madinah Niaga Internasional is an international trading company dedicated to simplifying the complexities of cross-border trade. With a strong physical presence in Saudi Arabia, we provide Indonesian businesses with direct access to high-quality Saudi commodities. We act not just as a trader, but as your eyes and ears on the ground, ensuring every transaction is secure, transparent, and efficient.
            </p>

            {/* CTA Button */}
            <button className="bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-semibold text-[14px] md:text-[15px] px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all duration-300">
              Explore Our Services
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
