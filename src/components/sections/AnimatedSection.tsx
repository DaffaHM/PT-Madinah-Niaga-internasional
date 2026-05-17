'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state untuk cards (hide dulu)
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.animated-card')
        gsap.set(cards, { opacity: 0, y: 100 })
        
        // Animasi cards saat scroll
        cards.forEach((card, index) => {
          gsap.to(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1,
            ease: 'power3.out',
          })
        })
      }

      // Parallax effect untuk background
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        ease: 'none',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Parallax Background */}
      <div className="parallax-bg absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-900 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Contoh Animasi GSAP
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Scroll ke bawah untuk melihat berbagai efek animasi yang smooth dan profesional
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="animated-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Fast Performance</h3>
            <p className="text-gray-600">
              GSAP memberikan performa animasi yang sangat cepat dan smooth di semua browser.
            </p>
          </div>

          {/* Card 2 */}
          <div className="animated-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Easy to Use</h3>
            <p className="text-gray-600">
              API yang intuitif membuat pembuatan animasi kompleks menjadi sangat mudah.
            </p>
          </div>

          {/* Card 3 */}
          <div className="animated-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Precise Control</h3>
            <p className="text-gray-600">
              Kontrol penuh atas timing, easing, dan sequencing animasi Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
