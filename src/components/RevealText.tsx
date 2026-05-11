'use client'

import { motion } from 'framer-motion'
import { revealText, stagger } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  as?: 'span' | 'div'
  className?: string
  wordClassName?: string
  delay?: number
}

export default function RevealText({
  text,
  as = 'span',
  className,
  wordClassName,
  delay = 0.1,
}: Props) {
  const Component = motion[as]
  const words = text.split(' ')

  return (
    <Component
      className={cn('inline-flex flex-wrap', className)}
      variants={stagger(delay, 0.07)}
      initial="hidden"
      animate="show"
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] mr-[0.28em] last:mr-0">
          <motion.span
            custom={i}
            variants={revealText}
            className={cn('inline-block', wordClassName)}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}
