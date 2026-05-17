# GSAP Animation Guide

## 📚 Tentang GSAP

GSAP (GreenSock Animation Platform) adalah library animasi JavaScript yang paling powerful dan profesional. Library ini digunakan oleh perusahaan-perusahaan besar seperti Google, Adobe, Nike, dan banyak lagi.

## ✨ Fitur yang Sudah Diimplementasikan

### 1. **HeroSection Animations**
- ✅ Entrance animation untuk cards dengan stagger effect
- ✅ 3D rotation effect pada cards
- ✅ Parallax scrolling untuk cards
- ✅ Sequential text animations
- ✅ Floating animation untuk scroll indicator

### 2. **Navbar Animations**
- ✅ Smooth entrance animation
- ✅ Animated state changes saat scroll
- ✅ Mobile menu slide animations

### 3. **AnimatedSection**
- ✅ Scroll-triggered animations
- ✅ Parallax background effects
- ✅ Card reveal animations

### 4. **Custom Hooks**
- ✅ `useGSAPContext` - Hook untuk automatic cleanup
- ✅ Animation presets (fadeIn, scaleIn, slideIn, dll)

## 🚀 Cara Menggunakan

### Basic Animation

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function MyComponent() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.from(elementRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
  }, [])

  return <div ref={elementRef}>Animated Content</div>
}
```

### Timeline Animation

```tsx
useEffect(() => {
  const tl = gsap.timeline()
  
  tl.from('.element1', { opacity: 0, y: 50 })
    .from('.element2', { opacity: 0, x: -50 }, '-=0.5')
    .from('.element3', { opacity: 0, scale: 0 })
}, [])
```

### Scroll-Triggered Animation

```tsx
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useEffect(() => {
  gsap.from('.element', {
    scrollTrigger: {
      trigger: '.element',
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 100,
    duration: 1
  })
}, [])
```

### Menggunakan Custom Hooks

```tsx
import { fadeIn, fadeInStagger } from '@/hooks/useGSAP'

useEffect(() => {
  // Single element
  fadeIn('.title', { delay: 0.2 })
  
  // Multiple elements dengan stagger
  fadeInStagger('.cards > div', { stagger: 0.1 })
}, [])
```

## 🎨 Animation Presets

### fadeIn
Fade in dari bawah dengan opacity
```tsx
fadeIn(element, { delay: 0.5 })
```

### fadeInStagger
Fade in multiple elements dengan delay bertahap
```tsx
fadeInStagger(elements, { stagger: 0.1 })
```

### scaleIn
Scale dari kecil ke normal dengan bounce effect
```tsx
scaleIn(element, { delay: 0.3 })
```

### slideInLeft / slideInRight
Slide dari kiri/kanan
```tsx
slideInLeft(element)
slideInRight(element)
```

### floating
Animasi floating infinite loop
```tsx
floating(element, { y: -20 })
```

### pulse
Animasi pulse infinite loop
```tsx
pulse(element, { scale: 1.1 })
```

## 📖 Easing Functions

GSAP menyediakan berbagai easing functions:

- `power1.out`, `power2.out`, `power3.out`, `power4.out`
- `back.out(1.7)` - Bounce effect
- `elastic.out(1, 0.3)` - Elastic effect
- `bounce.out` - Bounce effect
- `circ.out` - Circular easing
- `expo.out` - Exponential easing

## 🎯 Best Practices

1. **Gunakan gsap.context untuk cleanup**
   ```tsx
   useEffect(() => {
     const ctx = gsap.context(() => {
       // animations here
     }, ref)
     return () => ctx.revert()
   }, [])
   ```

2. **Gunakan refs untuk target elements**
   ```tsx
   const elementRef = useRef<HTMLDivElement>(null)
   gsap.to(elementRef.current, { ... })
   ```

3. **Gunakan timeline untuk complex sequences**
   ```tsx
   const tl = gsap.timeline()
   tl.to(el1, { ... })
     .to(el2, { ... })
     .to(el3, { ... })
   ```

4. **Optimize dengan will-change CSS**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```

5. **Gunakan ScrollTrigger untuk scroll animations**
   ```tsx
   gsap.registerPlugin(ScrollTrigger)
   ```

## 🔧 Tips & Tricks

### Stagger dari Center
```tsx
gsap.from(elements, {
  stagger: {
    each: 0.1,
    from: 'center'
  }
})
```

### Random Stagger
```tsx
gsap.from(elements, {
  stagger: {
    each: 0.1,
    from: 'random'
  }
})
```

### Parallax Effect
```tsx
gsap.to(element, {
  y: 100,
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
})
```

### Hover Animation
```tsx
const handleMouseEnter = () => {
  gsap.to(element, { scale: 1.1, duration: 0.3 })
}

const handleMouseLeave = () => {
  gsap.to(element, { scale: 1, duration: 0.3 })
}
```

## 📚 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)
- [GSAP Forum](https://greensock.com/forums/)

## 🎓 Contoh Implementasi di Project

Lihat file-file berikut untuk contoh implementasi:
- `src/components/sections/HeroSection.tsx` - Complex entrance animations
- `src/components/layout/Navbar.tsx` - Scroll-based animations
- `src/components/sections/AnimatedSection.tsx` - ScrollTrigger examples
- `src/hooks/useGSAP.ts` - Custom hooks dan presets

## 🚀 Next Steps

Untuk menambahkan animasi baru:
1. Import GSAP dan plugins yang diperlukan
2. Buat refs untuk elements yang akan dianimasi
3. Gunakan useEffect untuk setup animations
4. Gunakan gsap.context untuk automatic cleanup
5. Test di berbagai devices dan browsers

Happy Animating! ✨
