'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CommodityCard {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
}

const commodities: CommodityCard[] = [
  {
    id: 1,
    title: 'Premium Dates & Foodstuffs',
    description: 'High-quality Ajwa, Sukkari, and authentic Saudi spices.',
    image: '/kurma.png',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,30,20,0.75) 100%)',
  },
  {
    id: 2,
    title: 'Industrial & Merchandise Products',
    description: 'Reliable sourcing for polymers and specialty materials.',
    image: '/industrial.png',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,25,40,0.75) 100%)',
  },
  {
    id: 3,
    title: 'Consumer Goods & Textiles',
    description: 'Bringing unique Middle Eastern products to the Indonesian market.',
    image: '/consumer.png',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(30,20,10,0.75) 100%)',
  },
  {
    id: 4,
    title: 'Custom Requests',
    description: 'Tell us your niche requirement, and we will find the source.',
    image: '/custom.png',
    gradient: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(15,30,35,0.75) 100%)',
  },
];

export default function CommodityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  // Total slides = total cards - cards visible + 1
  // 4 cards - 3 visible = 1, so we have 2 positions (0 and 1)
  const totalSlides = 2;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector('.label'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      section.querySelector('.heading'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      section.querySelector('.description'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      section.querySelectorAll('.commodity-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );
  }, []);

  // Auto slide
  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev >= totalSlides - 1 ? 0 : prev + 1;
        scrollToSlide(nextSlide);
        return nextSlide;
      });
    }, 3000); // Auto slide every 3 seconds
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const updateScrollButtons = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Update current slide based on scroll position
    const cardWidth = sliderRef.current.clientWidth / 3;
    const newSlide = Math.round(scrollLeft / cardWidth);
    setCurrentSlide(newSlide);
  };

  const handleScroll = () => {
    updateScrollButtons();
  };

  const scrollToSlide = (slideIndex: number) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.clientWidth / 3;
    sliderRef.current.scrollTo({
      left: cardWidth * slideIndex,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    stopAutoSlide();
    const newSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
    startAutoSlide();
  };

  const handleNext = () => {
    stopAutoSlide();
    const newSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
    startAutoSlide();
  };

  const handleDotClick = (index: number) => {
    stopAutoSlide();
    setCurrentSlide(index);
    scrollToSlide(index);
    startAutoSlide();
  };

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handlePrev();
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-12 md:py-16 lg:py-20"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <div className="label mb-4 md:mb-5">
            <span className="inline-block text-xs md:text-sm tracking-[0.2em] uppercase text-[#0F5132] font-bold">
              Sample Commodities
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent mx-auto mt-3"></div>
          </div>

          <h2 className="heading text-[24px] md:text-[32px] lg:text-[38px] font-serif text-[#0F5132] mb-6 md:mb-8 leading-[1.15] tracking-tight">
            Diverse Commodities,
            <br />
            Unlimited Opportunities.
          </h2>

          <p className="description text-[13px] md:text-[14px] lg:text-[15px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From Saudi Arabia to Indonesia, we provide a wide range of high-quality commodities
            <br className="hidden md:block" />
            tailored to your market needs.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollToDirection('left')}
            disabled={!canScrollLeft}
            className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-lg items-center justify-center transition-all duration-300 -translate-x-6 md:-translate-x-8 ${
              canScrollLeft
                ? 'hover:bg-[#0F5132] hover:scale-110 opacity-100'
                : 'opacity-40 cursor-not-allowed'
            } group`}
            aria-label="Previous commodities"
          >
            <svg
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                canScrollLeft ? 'text-[#0F5132] group-hover:text-white' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollToDirection('right')}
            disabled={!canScrollRight}
            className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-lg items-center justify-center transition-all duration-300 translate-x-6 md:translate-x-8 ${
              canScrollRight
                ? 'hover:bg-[#0F5132] hover:scale-110 opacity-100'
                : 'opacity-40 cursor-not-allowed'
            } group`}
            aria-label="Next commodities"
          >
            <svg
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                canScrollRight ? 'text-[#0F5132] group-hover:text-white' : 'text-gray-400'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile: Grid Layout */}
          <div className="lg:hidden grid grid-cols-1 gap-4 md:gap-5">
            {commodities.map((commodity, index) => (
              <div
                key={commodity.id}
                className="commodity-card group"
              >
                <div className="relative h-[320px] rounded-[20px] overflow-hidden transition-all duration-700">
                  <div className="absolute inset-0 overflow-hidden rounded-[20px]">
                    <img
                      src={commodity.image}
                      alt={commodity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div
                    className="absolute inset-0"
                    style={{ background: commodity.gradient }}
                  ></div>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent opacity-60"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                      <h3 className="text-[18px] font-serif text-white mb-2 leading-tight tracking-tight">
                        {commodity.title}
                      </h3>
                      <p className="text-[13px] text-white/90 leading-relaxed font-light">
                        {commodity.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Slider */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            className="hidden lg:flex gap-6 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {commodities.map((commodity, index) => (
              <div
                key={commodity.id}
                className="commodity-card flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[calc(33.333%-1.5rem)] group"
              >
                <div className="relative h-[480px] md:h-[500px] lg:h-[520px] rounded-[28px] md:rounded-[32px] overflow-hidden transition-all duration-700">
                  <div className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-[32px]">
                    <img
                      src={commodity.image}
                      alt={commodity.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div
                    className="absolute inset-0"
                    style={{ background: commodity.gradient }}
                  ></div>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent opacity-60"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 lg:p-8">
                    <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
                      <h3 className="text-xl md:text-2xl lg:text-2xl font-serif text-white mb-3 leading-tight tracking-tight">
                        {commodity.title}
                      </h3>
                      <p className="text-sm md:text-sm lg:text-base text-white/90 leading-relaxed font-light">
                        {commodity.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Pagination - Desktop Only */}
          <div className="hidden lg:flex justify-center items-center gap-2 mt-8 md:mt-10">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-[#0F5132]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-[#C8A46A]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
