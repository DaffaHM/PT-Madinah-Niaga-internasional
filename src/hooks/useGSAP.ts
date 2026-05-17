import { useEffect, useRef, MutableRefObject } from 'react'
import { gsap } from 'gsap'

type GSAPContextFunction = () => void | (() => void)

/**
 * Custom hook untuk GSAP animations dengan automatic cleanup
 * @param callback - Function yang berisi GSAP animations
 * @param dependencies - Array of dependencies untuk re-run animasi
 * @returns ref object untuk scope context
 */
export function useGSAPContext(
  callback: GSAPContextFunction,
  dependencies: any[] = []
): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(callback, ref)
    return () => ctx.revert()
  }, dependencies)

  return ref
}

/**
 * Fade in animation preset
 */
export const fadeIn = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    ...options,
  })
}

/**
 * Fade in with stagger animation preset
 */
export const fadeInStagger = (
  elements: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    ...options,
  })
}

/**
 * Scale in animation preset
 */
export const scaleIn = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(element, {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: 'back.out(1.7)',
    ...options,
  })
}

/**
 * Slide in from left animation preset
 */
export const slideInLeft = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(element, {
    opacity: 0,
    x: -100,
    duration: 0.8,
    ease: 'power3.out',
    ...options,
  })
}

/**
 * Slide in from right animation preset
 */
export const slideInRight = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(element, {
    opacity: 0,
    x: 100,
    duration: 0.8,
    ease: 'power3.out',
    ...options,
  })
}

/**
 * Rotate in animation preset
 */
export const rotateIn = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(element, {
    opacity: 0,
    rotation: 180,
    scale: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    ...options,
  })
}

/**
 * Floating animation (infinite loop)
 */
export const floating = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.to(element, {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    ...options,
  })
}

/**
 * Pulse animation (infinite loop)
 */
export const pulse = (
  element: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.to(element, {
    scale: 1.1,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    ...options,
  })
}
