'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { site } from '@/data/site'
import Particles from './Particles'
import BeamsBackground from './BeamsBackground'
import { fadeUp, stagger } from '@/lib/motion'

interface TeamMember {
  name: string
  role: string
  bio: string
  photo?: string
  tags: string[]
}

const TEAM: TeamMember[] = [
  {
    name: 'Exequiel Soria Arruñada',
    role: 'Fundador',
    bio: 'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, UAM. Tucumano.',
    photo: '/assets/exequiel.jpg',
    tags: ['Políticas Públicas', 'Gestión Estatal', 'NOA'],
  },
  {
    name: 'Eugenia Moreno',
    role: 'Urbanismo y Territorio',
    bio: 'Arquitecta y urbanista especializada en planificación territorial y hábitat popular en el norte argentino.',
    tags: ['Urbanismo', 'Hábitat', 'Participación ciudadana'],
  },
  {
    name: 'Teresa Lizarraga',
    role: 'Área Legal',
    bio: 'Abogada en derecho administrativo y acceso a la información pública. Transparencia y gestión estatal.',
    tags: ['Derecho Administrativo', 'Transparencia', 'Legal'],
  },
]

function MemberCard({ member }: { member: TeamMember }) {
  const initials = member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')
  return (
    <motion.div
      variants={fadeUp}
      className="group flex items-start gap-5 bg-white/[0.05] border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
        {member.photo ? (
          <div className="relative w-full h-full">
            <Image src={member.photo} alt={member.name} width={64} height={64}
              className="w-full h-full object-cover object-top
                         [filter:grayscale(100%)_contrast(1.05)_brightness(0.95)]
                         group-hover:[filter:none] transition-[filter] duration-500" priority />
            <div className="absolute inset-0 mix-blend-color"
                 style={{ background: 'linear-gradient(135deg, #2a2f76 0%, #C8A96A 100%)', opacity: 0.45 }} />
          </div>
        ) : (
          <div className="w-full h-full bg-dorado/20 border border-dorado/30 flex items-center justify-center">
            <span className="font-title font-black text-dorado text-lg">{initials}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <span className="text-[0.58rem] font-bold tracking-[0.2em] uppercase text-dorado">{member.role}</span>
        <p className="font-title font-black text-white text-sm leading-tight mt-0.5 mb-1">{member.name}</p>
        <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-2">{member.bio}</p>
        <div className="flex flex-wrap gap-1">
          {member.tags.map((tag) => (
            <span key={tag} className="text-[0.58rem] font-medium text-dorado/75 bg-dorado/10 rounded-full px-1.5 py-0.5">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function NosotrosSection() {
  const n = site.nosotros

  return (
    <section id="nosotros" className="relative bg-azul-deep py-16 md:py-24 overflow-hidden grain">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(42,47,118,0.55) 0%, transparent 60%)' }} />
      <div className="blob-field">
        <div className="blob" style={{ width:'600px',height:'600px',background:'rgba(42,47,118,0.5)',top:'-15%',left:'-10%',animationDuration:'34s',animationName:'drift3',animationIterationCount:'infinite',animationTimingFunction:'ease-in-out' }} />
        <div className="blob" style={{ width:'450px',height:'450px',background:'rgba(22,26,76,0.55)',bottom:'-20%',right:'5%',animationDuration:'30s',animationName:'drift2',animationIterationCount:'infinite',animationTimingFunction:'ease-in-out' }} />
      </div>
      <BeamsBackground count={6} />
      <Particles count={12} />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        <motion.span
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
          variants={fadeUp} className="eyebrow mb-5 block"
        >
          {n.eyebrow}
        </motion.span>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:items-stretch">
          {/* Left: title + mission */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            variants={stagger(0.08, 0.08)} className="space-y-5"
          >
            <motion.h2 variants={fadeUp}
              className="font-title font-black text-white text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight">
              {n.titleStart}{' '}<em className="not-italic text-dorado">{n.titleAccent}</em>
            </motion.h2>
            {n.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="text-white/75 text-base md:text-lg leading-relaxed">{p}</motion.p>
            ))}
            <motion.ul variants={fadeUp} className="mt-8 md:mt-10 grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/8">
              {n.valores.map((v) => (
                <li key={v.titulo} className="flex flex-col gap-1.5">
                  <span className="text-dorado text-xs font-bold tracking-widest uppercase">{v.titulo}</span>
                  <span className="text-white/50 text-[0.82rem] leading-snug">{v.detalle}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: team stack */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            variants={stagger(0.08, 0.1)} className="space-y-3 lg:flex lg:flex-col lg:justify-between"
          >
            <div className="space-y-3">
              {TEAM.map((member) => <MemberCard key={member.name} member={member} />)}
            </div>
            <p className="text-white/40 text-[0.78rem] mt-4 pt-4 border-t border-white/10 leading-relaxed">
              Equipo abierto. Colaboran investigadoras y profesionales del NOA en distintos proyectos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
