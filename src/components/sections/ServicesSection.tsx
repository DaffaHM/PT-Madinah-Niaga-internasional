'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Search, Shield, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 1,
    number: '01',
    title: 'Strategic Product Sourcing',
    description: 'Leverage our local network to find reliable suppliers',
    image: '/card-strategic.png',
    fullDescription: 'Tell us what you need. From premium food products to industrial materials, we leverage our local network to find reliable suppliers that meet your specific standards.',
    features: [
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Extensive Local Network',
        description: 'Deep connections across Saudi Arabia'
      },
      {
        icon: <Search className="w-6 h-6" />,
        title: 'Tailored Sourcing',
        description: 'Customized to your exact requirements'
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Reliable & Transparent',
        description: 'Full visibility throughout the process'
      }
    ]
  },
  {
    id: 2,
    number: '02',
    title: 'Quality Assurance & Compliance',
    description: 'Ensuring every product meets international standards',
    image: '/card-quality.png',
    fullDescription: 'We conduct thorough quality checks and ensure all products comply with Indonesian import regulations and international standards.',
    features: [
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Rigorous Testing',
        description: 'Comprehensive quality verification'
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Compliance Expertise',
        description: 'Navigate regulations seamlessly'
      },
      {
        icon: <Search className="w-6 h-6" />,
        title: 'Documentation Support',
        description: 'Complete paperwork assistance'
      }
    ]
  },
  {
    id: 3,
    number: '03',
    title: 'End-to-End Logistics',
    description: 'Seamless delivery from Saudi Arabia to Indonesia',
    image: '/card-end.png',
    fullDescription: 'From warehouse to your doorstep, we manage the entire logistics chain with precision and care, ensuring timely and secure delivery.',
    features: [
      {
        icon: <Search className="w-6 h-6" />,
        title: 'Global Shipping',
        description: 'Reliable international freight'
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Real-time Tracking',
        description: 'Monitor your shipment 24/7'
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Customs Clearance',
        description: 'Smooth border processing'
      }
    ]
  }
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(1)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const prevServiceRef = useRef(1)

  const handleServiceClick = (serviceId: number) => {
    setActiveService(serviceId)
    
    // Auto scroll ke posisi yang sesuai dengan service (instant, no animation)
    if (scrollTriggerInstance.current) {
      const st = scrollTriggerInstance.current
      let targetProgress = 0
      
      if (serviceId === 1) {
        targetProgress = 0.15 // 15% progress untuk card 1
      } else if (serviceId === 2) {
        targetProgress = 0.5 // 50% progress untuk card 2
      } else if (serviceId === 3) {
        targetProgress = 0.85 // 85% progress untuk card 3
      }
      
      // Hitung scroll position berdasarkan progress
      const scrollStart = st.start
      const scrollEnd = st.end
      const targetScroll = scrollStart + (scrollEnd - scrollStart) * targetProgress
      
      // Instant scroll ke posisi target (no animation)
      window.scrollTo({
        top: targetScroll,
        behavior: 'instant'
      })
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    const scrollLeft = container.scrollLeft
    const cardWidth = container.offsetWidth
    const newSlide = Math.round(scrollLeft / cardWidth)
    setCurrentSlide(newSlide)
  }

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      })
    }
  }

  // Auto slide effect - Always running
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev < services.length - 1 ? prev + 1 : 0
        scrollToSlide(nextSlide)
        return nextSlide
      })
    }, 5000) // Auto slide every 5 seconds

    return () => clearInterval(autoSlide)
  }, [services.length])

  // Crossfade right panel when active service changes
  useEffect(() => {
    if (prevServiceRef.current !== activeService && rightRef.current) {
      gsap.fromTo(rightRef.current,
        { opacity: 0.4, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )
    }
    prevServiceRef.current = activeService
  }, [activeService])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      // Initial fade in animation
      gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: 50 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        }
      })

      tl.to(leftRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(rightRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')

      // Pin cards grid and scroll-triggered service switching (DESKTOP ONLY)
      const mm = gsap.matchMedia()
      
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: cardsGridRef.current,
          start: 'top 150px',
          end: '+=200%', // Reduced from 300% to 200% for shorter scroll
          pin: cardsGridRef.current,
          pinSpacing: true,
          snap: {
            snapTo: [0, 0.5, 1], // Snap to 3 positions: 0%, 50%, 100%
            duration: 0.5,
            ease: 'power2.inOut',
            delay: 0.1
          },
          onUpdate: (self) => {
            const progress = self.progress
            
            // More sensitive thresholds for quicker switching
            if (progress < 0.33) {
              setActiveService(1)
            } else if (progress < 0.66) {
              setActiveService(2)
            } else {
              setActiveService(3)
            }
          }
        })

        scrollTriggerInstance.current = st
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activeServiceData = services.find(s => s.id === activeService) || services[0]

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-16 lg:px-20 max-w-[1600px]">
        
        {/* MOBILE ONLY - Premium Swipe Layout */}
        <div className="lg:hidden">
          {/* Heading Section */}
          <div className="mb-8 px-2">
            {/* Label */}
            <div className="mb-3">
              <span className="text-[#0F5132] font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                OUR SERVICES
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent mt-3"></div>
            </div>

            {/* Heading */}
            <h2 className="text-[24px] font-serif font-normal leading-[1.15] text-[#0F5132] mb-3">
              Your Trusted<br />
              Sourcing Partner in<br />
              <span className="text-[#B8956A]">Saudi Arabia</span>
            </h2>

            {/* Supporting Text */}
            <p className="text-gray-600 text-[13px] leading-relaxed max-w-md">
              We provide end-to-end solutions for your international trade needs
            </p>
          </div>

          {/* Swipe Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide gap-4 pb-2 px-4 -mx-4 touch-pan-x"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x'
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0 w-[85vw] snap-center"
                >
                  <div className="bg-white rounded-[28px] overflow-hidden shadow-lg h-full flex flex-col">
                    {/* Image with Gradient Overlay */}
                    <div className="relative h-[240px] w-full flex-shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="85vw"
                        className="object-cover"
                      />
                      {/* Dark Green Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F5132]/95 via-[#0F5132]/40 to-transparent"></div>
                      
                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-[18px] font-serif font-normal leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description Below Image */}
                    <div className="p-6 flex-1 flex items-center">
                      <p className="text-gray-600 text-[13px] leading-relaxed">
                        {service.fullDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots - Clickable */}
          <div className="flex justify-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollToSlide(index)
                  setCurrentSlide(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-6 bg-[#0F5132]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* DESKTOP - Original Layout */}
        <div className="hidden lg:block">
          {/* Heading Section - Full Width - NOT PINNED */}
          <div className="mb-12 lg:mb-16">
            {/* Label */}
            <div className="mb-3">
              <span className="text-[#0F5132] font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
                OUR SERVICES
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent mt-3"></div>
            </div>

            {/* Heading */}
            <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-serif font-normal leading-[1.15] text-[#0F5132] max-w-2xl">
              Your Trusted Sourcing Partner in<br />
              <span className="text-[#B8956A]">Saudi Arabia</span>
            </h2>
          </div>

          {/* Services Grid - Cards aligned - THIS WILL BE PINNED ON DESKTOP */}
          <div ref={cardsGridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 lg:items-center">
            
            {/* LEFT SIDE - Services Navigation */}
            <div ref={leftRef} className="lg:col-span-5">
              {/* Service Cards */}
              <div className="space-y-3 lg:space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className={`w-full text-left rounded-[24px] transition-all duration-300 group cursor-pointer overflow-hidden ${
                      activeService === service.id
                        ? 'bg-[#0F5132] text-white shadow-lg'
                        : 'bg-[#F6F1E8] text-gray-800 hover:bg-[#ede7dc]'
                    }`}
                  >
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-2">
                          {service.title}
                        </h3>
                        <p className={`text-[13px] md:text-sm mb-3 font-light ${
                          activeService === service.id
                            ? 'text-gray-200'
                            : 'text-gray-600'
                        }`}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - Active Service Content */}
            <div ref={rightRef} className="lg:col-span-7">
              <div className="bg-white rounded-[32px] overflow-hidden shadow-lg flex flex-col w-full h-full">
                {/* Service Image with Gradient Overlay */}
                <div className="relative w-full h-[400px] md:h-[450px] lg:h-[480px]">
                  <Image
                    src={activeServiceData.image}
                    alt={activeServiceData.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  {/* Dark Green Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F5132]/95 via-[#0F5132]/40 to-transparent"></div>
                  
                  {/* Title on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12">
                    <h3 className="text-white text-[28px] md:text-[32px] lg:text-[36px] font-serif font-normal leading-tight mb-4">
                      {activeServiceData.title}
                    </h3>
                    <p className="text-white/95 text-[15px] md:text-[16px] leading-relaxed font-light max-w-2xl">
                      {activeServiceData.fullDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
