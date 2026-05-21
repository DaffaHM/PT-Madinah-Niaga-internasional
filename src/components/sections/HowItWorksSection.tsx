'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const curvedPathRef = useRef<SVGPathElement>(null);
  const travelingDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Step cards stagger animation
      gsap.from('.journey-step', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 70%',
        },
      });

      // Curved SVG path draw animation
      const path = curvedPathRef.current;
      const dot = travelingDotRef.current;

      if (path && dot) {
        const length = path.getTotalLength();

        // Set initial state: path hidden, dot at start
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
        });

        const startPt = path.getPointAtLength(0);
        gsap.set(dot, { attr: { cx: startPt.x, cy: startPt.y }, opacity: 0 });

        // Timeline: draw path first, then start looping dots
        const tl = gsap.timeline({
          delay: 1.4,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
          },
          onComplete: startLoopingDots,
        });

        // Fade in glow path
        tl.to('.glow-path', { opacity: 0.15, duration: 0.3, ease: 'none' }, 0);
        // Fade in path
        tl.to(path, { opacity: 1, duration: 0.1, ease: 'none' }, 0);

        // Draw path from left to right
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.inOut',
        }, 0);

        // Initial dot travels along path in sync with draw, then hides
        tl.to(dot, { opacity: 1, duration: 0.15, ease: 'none' }, 0);
        const tracker = { progress: 0 };
        tl.to(tracker, {
          progress: 1,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate() {
            const pt = path.getPointAtLength(tracker.progress * length);
            gsap.set(dot, { attr: { cx: pt.x, cy: pt.y } });
          },
        }, 0);
        tl.to(dot, { opacity: 0, duration: 0.3, ease: 'none' }, 1.5);
      }

      function startLoopingDots() {
        // Hanya jalankan di desktop
        if (window.innerWidth < 768) return;

        const path = curvedPathRef.current;
        if (!path) return;

        const length = path.getTotalLength();
        const svgEl = path.ownerSVGElement;
        if (!svgEl) return;

        // Posisi icon di sepanjang path (progress 0-1)
        const iconTriggerPoints = [0.15, 0.5, 0.96];
        const triggerRadius = 0.04;

        // Ambil elemen icon dari DOM
        const iconEls = stepsRef.current?.querySelectorAll('.journey-step .icon-wrapper');

        // Create 3 looping dots with staggered offsets
        const numDots = 1;
        const dotDuration = 2.5;
        const staggerOffset = dotDuration / numDots;

        for (let i = 0; i < numDots; i++) {
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('r', '4');
          circle.setAttribute('fill', '#C8A46A');
          circle.setAttribute('opacity', '0');
          circle.setAttribute('cx', '-100');
          circle.setAttribute('cy', '-100');
          circle.style.filter = 'drop-shadow(0 0 5px #C8A46A)';
          svgEl.appendChild(circle);

          // Tiap dot punya triggered state sendiri
          const dotTriggered = [false, false, false];
          const dotTracker = { progress: 0 };

          gsap.to(dotTracker, {
            progress: 1,
            duration: dotDuration,
            ease: 'none',
            repeat: -1,
            delay: i * staggerOffset,
            onUpdate() {
              const p = dotTracker.progress % 1;

              const fadeZone = 0.08;
              let opacity = 0.9;
              if (p < fadeZone) opacity = (p / fadeZone) * 0.9;
              else if (p > 1 - fadeZone) opacity = ((1 - p) / fadeZone) * 0.9;

              const pt = path.getPointAtLength(p * length);
              circle.setAttribute('cx', String(pt.x));
              circle.setAttribute('cy', String(pt.y));
              circle.setAttribute('opacity', String(opacity));

              iconTriggerPoints.forEach((triggerP, idx) => {
                const dist = Math.abs(p - triggerP);
                if (dist < triggerRadius && !dotTriggered[idx]) {
                  dotTriggered[idx] = true;
                  triggerIconEffect(idx);
                } else if (dist >= triggerRadius) {
                  dotTriggered[idx] = false;
                }
              });
            },
          });
        }

        function triggerIconEffect(iconIndex: number) {
          if (!iconEls || !iconEls[iconIndex]) return;
          const iconEl = iconEls[iconIndex] as HTMLElement;

          gsap.killTweensOf(iconEl);

          gsap.timeline()
            .to(iconEl, {
              scale: 1.12,
              duration: 0.18,
              ease: 'power2.out',
            })
            .to(iconEl, {
              scale: 1,
              duration: 0.35,
              ease: 'elastic.out(1, 0.4)',
            });

          const ringEl = iconEl.querySelector('.pulse-ring') as HTMLElement;
          if (ringEl) {
            gsap.killTweensOf(ringEl);
            gsap.fromTo(ringEl,
              { scale: 0.8, opacity: 0.8 },
              { scale: 1.6, opacity: 0, duration: 0.6, ease: 'power2.out' }
            );
          }
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Consult',
      description: 'Share your product requirements and specifications with our team of experts.',
      icon: '/step-1.png',
    },
    {
      number: '2',
      title: 'Source & Quote',
      description: 'We identify the best suppliers and provide a transparent, all-inclusive quotation.',
      icon: '/step-2.png',
    },
    {
      number: '3',
      title: 'Ship & Receive',
      description: 'Once approved, we handle the logistics and deliver the goods to your doorstep in Indonesia.',
      icon: '/step-3.png',
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative bg-[#FAF8F3] py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-10 lg:mb-12">
          {/* Label */}
          <div className="mb-4 md:mb-5">
            <span className="inline-block text-xs md:text-sm tracking-[0.2em] uppercase text-[#0F5132] font-bold">
              How It Works
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C8A46A] to-transparent mx-auto mt-3"></div>
          </div>

          {/* Heading */}
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-serif font-normal text-[#0F5132] mb-5 md:mb-6 leading-[1.15] tracking-tight">
            A Simple 3-Step Process
          </h2>

          {/* Description */}
          <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From consultation to delivery, we make global sourcing seamless,
            transparent, and hassle-free.
          </p>
        </div>

        {/* Steps Container */}
        <div ref={stepsRef} className="relative">
          {/* Curved SVG Connector - Desktop only */}
          <div className="hidden md:block absolute inset-x-0 top-0 z-0 pointer-events-none" style={{ height: '160px' }}>
            <svg
              viewBox="0 0 900 160"
              preserveAspectRatio="none"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle glow / shadow path */}
              <path
                d="M 150 80 C 300 20, 600 140, 750 80"
                stroke="#C8A46A"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0"
                className="glow-path"
                fill="none"
              />
              {/* Main animated curved path */}
              <path
                ref={curvedPathRef}
                d="M 150 80 C 300 20, 600 140, 750 80"
                stroke="url(#curveGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Traveling dot */}
              <circle
                ref={travelingDotRef}
                cx="150"
                cy="80"
                r="5"
                fill="#C8A46A"
                opacity="0"
                style={{ filter: 'drop-shadow(0 0 6px #C8A46A)' }}
              />
              {/* Arrow head at end */}
              <circle cx="750" cy="80" r="4" fill="#C8A46A" opacity="0.9" />
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8A46A" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#C8A46A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C8A46A" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
            {steps.map((step, index) => (
              <div key={index} className="journey-step flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative mb-8 md:mb-10">
                  {/* Pulse ring - animasi saat dot melewati icon */}
                  <div className="icon-wrapper relative" style={{ display: 'inline-block' }}>
                    <div className="pulse-ring absolute inset-0 rounded-full border-2 border-[#C8A46A] opacity-0 pointer-events-none"></div>
                    {/* Icon Image */}
                    <div className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                      <Image
                        src={step.icon}
                        alt={step.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#C8A46A] flex items-center justify-center shadow-md">
                    <span className="text-white font-serif text-sm md:text-base font-semibold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="max-w-[280px]">
                  <h3 className="text-[20px] md:text-[22px] lg:text-[24px] font-serif font-normal text-[#0F5132] mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
