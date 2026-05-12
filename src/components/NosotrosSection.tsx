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
    bio: 'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, Universidad Autónoma de Madrid. Tucumano. Convencido de que el acceso al conocimiento transforma comunidades.',
    photo: '/assets/exequiel.jpg',
    tags: ['Políticas Públicas', 'Gestión Estatal', 'Formación', 'NOA'],
  },
  {
    name: 'Eugenia Moreno',
    role: 'Urbanismo y Territorio',
    bio: 'Arquitecta y urbanista. Especializada en planificación territorial y hábitat popular en el norte argentino. Cree en el diseño participativo como herramienta de transformación.',
    tags: ['Urbanismo', 'Hábitat', 'Participación ciudadana'],
  },
  {
    name: 'Teresa Lizarraga',
    role: 'Área Legal',
    bio: 'Abogada especialista en derecho administrativo y acceso a la información pública. Trabaja en la intersección entre transparencia, derechos y gestión estatal.',
    tags: ['Derecho Administrativo', 'Transparencia', 'Legal'],
  },
]

function MemberCard({ member, featured }: { member: TeamMember; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/[0.05] border border-white/12 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col"
    >
      {member.photo ? (
        <div className="relative">
          <Image
            src={member.photo}
            alt={member.name}
            width={400}
            height={featured ? 280 : 220}
            className={`w-full object-cover ${featured ? 'h-52 md:h-64' : 'h-44 md:h-52'}`}
            priority={featured}
          />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(15,17,55,0.9) 0%, rgba(15,17,55,0.3) 50%, transparent 80%)' }} />
          <div className="absolute bottom-3 left-4 right-4">
            <span className="inline-block text-[0.58rem] font-bold tracking-[0.22em] uppercase text-dorado mb-1">
              {member.role}
            </span>
            <p className="font-title font-black text-white text-lg leading-tight">{member.name}</p>
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-azul-dark to-azul-deep p-5 pb-4">
          <div className="w-14 h-14 rounded-full bg-dorado/20 border border-dorado/30 flex items-center justify-center mb-3">
            <span className="font-title font-black text-dorado text-xl">
              {member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
          </div>
          <span className="inline-block text-[0.58rem] font-bold tracking-[0.22em] uppercase text-dorado mb-1">
            {member.role}
          </span>
          <p className="font-title font-black text-white text-lg leading-tight">{member.name}</p>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">{member.bio}</p>
        <div className="flex flex-wrap gap-1.5">
          {member.tags.map((tag) => (
            <span key={tag} className="text-[0.68rem] font-medium text-dorado/80 bg-dorado/10 rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function NosotrosSection() {
  const n = site.nosotros

  return (
    <section id="nosotros" className="relative bg-azul-deep py-20 md:py-28 lg:py-32 overflow-hidden grain">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(42,47,118,0.55) 0%, transparent 60%)' }} />

      <div className="blob-field">
        <div className="blob" style={{ width: '600px', height: '600px', background: 'rgba(42,47,118,0.5)', top: '-15%', left: '-10%', animationDuration: '34s', animationName: 'drift3', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }} />
        <div className="blob" style={{ width: '450px', height: '450px', background: 'rgba(22,26,76,0.55)', bottom: '-20%', right: '5%', animationDuration: '30s', animationName: 'drift2', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }} />
      </div>

      <BeamsBackground count={6} />
      <Particles count={12} />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)} className="max-w-2xl mb-14 md:mb-16"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">{n.eyebrow}</motion.span>
          <motion.h2 variants={fadeUp}
            className="font-title font-black text-white text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight">
            {n.titleStart}{' '}<em className="not-italic text-dorado">{n.titleAccent}</em>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Left: mission text */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.08, 0.08)} className="lg:col-span-5 space-y-5"
          >
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

          {/* Right: team grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM.map((member, i) => (
              <MemberCard key={member.name} member={member} featured={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
