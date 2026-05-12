import type { Variants, Transition } from 'framer-motion'

/**
 * Premium easing curves — feel elastic and intentional.
 * Source: industry-standard for "luxury" product launches.
 */
export const ease = {
  outExpo:    [0.16, 1, 0.3, 1] as const,
  outQuart:   [0.25, 1, 0.5, 1] as const,
  premium:    [0.17, 0.67, 0.83, 0.67] as const,
  springSoft: { type: 'spring' as const, stiffness: 110, damping: 18, mass: 1 },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0.25, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: ease.outExpo } },
}

export const fadeUpSpring: Variants = {
  hidden: { opacity: 0.25, y: 32 },
  show:   { opacity: 1, y: 0, transition: ease.springSoft },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0.25 },
  show:   { opacity: 1, transition: { duration: 0.9, ease: ease.outExpo } },
}

export const stagger = (delayChildren = 0.12, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})

export const revealText: Variants = {
  hidden: { opacity: 0, y: '100%' },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.9, ease: ease.outExpo },
  }),
}

export const buttonTap: Transition = { type: 'spring', stiffness: 400, damping: 22 }
