'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' } as const

type IconName = 'bottle' | 'cap' | 'dumbbell' | 'pot'

interface Project {
  id: string
  client: string
  industry: string
  blurb: string
  services: string[]
  accent: string
  accentTint: string
  icon: IconName
  image: string | null
  url: string
}

/**
 * Selected-work section.
 *
 * To go live with real assets:
 * - set `image` to a real screenshot path (e.g. "/portfolio/yusuf-bhai.jpg")
 *   to replace the icon placeholder for that card
 * - set `url` to the client's live site to enable the "View site" CTA
 *
 * No invented stats (conversion %, enrollments, etc.) on purpose.
 * Don't attach numbers to a real client's name unless you can back
 * them up — that's a false-advertising problem, not a growth hack.
 */
const PROJECTS: Project[] = [
  {
    id: 'yusuf-bhai-perfumes',
    client: 'Yusuf Bhai Perfumes',
    industry: 'Fragrance & retail',
    blurb: 'Online catalog and storefront for a heritage attar and perfume house.',
    services: ['Web design', 'E-commerce'],
    accent: '#7C5CFC',
    accentTint: '#F1EEFE',
    icon: 'bottle',
    image: null,
    url: '',
  },
  {
    id: 'ms-education-academy',
    client: 'MS Education Academy',
    industry: 'Education',
    blurb: 'Course catalog and admissions enquiry funnel for a coaching academy.',
    services: ['Web design', 'Lead capture'],
    accent: '#127A6E',
    accentTint: '#E8F5F3',
    icon: 'cap',
    image: null,
    url: '',
  },
  {
    id: 'ykbi-fitness',
    client: 'YKBI Fitness',
    industry: 'Fitness',
    blurb: 'Membership info and class-booking presence for a fitness studio.',
    services: ['Web design', 'Booking'],
    accent: '#E2542E',
    accentTint: '#FCEAE5',
    icon: 'dumbbell',
    image: null,
    url: '',
  },
  {
    id: 'maks-kitchen',
    client: 'Maks Kitchen',
    industry: 'Food & beverage',
    blurb: 'Digital menu and ordering presence for a home-kitchen brand.',
    services: ['Web design', 'Menu & ordering'],
    accent: '#C8870B',
    accentTint: '#FBF1E0',
    icon: 'pot',
    image: null,
    url: '',
  },
]

function ProjectIcon({ icon, accent }: { icon: IconName; accent: string }) {
  const props = { viewBox: '0 0 100 100', width: 40, height: 40, 'aria-hidden': true } as const
  switch (icon) {
    case 'bottle':
      return (
        <svg {...props}>
          <rect x="44" y="10" width="12" height="9" rx="2" fill={accent} />
          <rect x="46" y="19" width="8" height="8" fill={accent} />
          <rect x="32" y="27" width="36" height="48" rx="9" fill={accent} />
          <rect x="38" y="42" width="24" height="3" rx="1.5" fill="white" opacity="0.5" />
        </svg>
      )
    case 'cap':
      return (
        <svg {...props}>
          <polygon points="50,28 88,46 50,62 12,46" fill={accent} />
          <ellipse cx="50" cy="58" rx="18" ry="8" fill={accent} opacity="0.85" />
          <circle cx="50" cy="45" r="3.5" fill="white" opacity="0.6" />
          <line x1="80" y1="48" x2="80" y2="70" stroke={accent} strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="73" r="3.5" fill={accent} />
        </svg>
      )
    case 'dumbbell':
      return (
        <svg {...props}>
          <rect x="22" y="46" width="56" height="8" rx="4" fill={accent} />
          <rect x="10" y="34" width="11" height="32" rx="3" fill={accent} />
          <rect x="2" y="40" width="8" height="20" rx="2" fill={accent} opacity="0.85" />
          <rect x="79" y="34" width="11" height="32" rx="3" fill={accent} />
          <rect x="90" y="40" width="8" height="20" rx="2" fill={accent} opacity="0.85" />
        </svg>
      )
    case 'pot':
      return (
        <svg {...props}>
          <rect x="20" y="48" width="60" height="8" rx="4" fill={accent} />
          <polygon points="25,56 75,56 68,84 32,84" fill={accent} opacity="0.9" />
          <ellipse cx="14" cy="58" rx="6" ry="10" fill={accent} />
          <ellipse cx="86" cy="58" rx="6" ry="10" fill={accent} />
          <path d="M44 40 q-4 -8 0 -14" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M56 40 q-4 -8 0 -14" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    default:
      return null
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headingId = `${project.id}-heading`
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={VP} transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      className="luxury-card p-6 sm:p-7"
    >
      <div className="relative mb-6 h-40 overflow-hidden rounded-sm" style={{ backgroundColor: project.accentTint }}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.client} site preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ProjectIcon icon={project.icon} accent={project.accent} />
          </div>
        )}
      </div>

      <p className="mb-2 font-inter text-[10px] uppercase tracking-[0.15em]" style={{ color: project.accent }}>
        {project.industry}
      </p>

      <h3 id={headingId} className="mb-2 font-syne text-base font-semibold text-[#1A1A1A]">
        {project.client}
      </h3>

      <p className="mb-4 font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
        {project.blurb}
      </p>

      <ul className="mb-5 flex flex-wrap gap-2">
        {project.services.map((service) => (
          <li
            key={service}
            className="font-inter text-[11px]"
            style={{ background: 'rgba(26,26,26,0.05)', color: '#4A4A4A', padding: '4px 10px' }}
          >
            {service}
          </li>
        ))}
      </ul>

      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby={headingId}
          className="inline-flex items-center gap-1 font-inter text-[11px] uppercase tracking-[0.12em] text-[#C9A84C] transition-opacity hover:opacity-70"
        >
          View site <span aria-hidden="true">→</span>
        </a>
      ) : (
        <span className="font-inter text-sm text-[#8A8A8A]">Case study coming soon</span>
      )}
    </motion.article>
  )
}

export function PortfolioScene() {
  return (
    <section id="work" className="relative section-padding section-has-glass" style={{ background: '#F5F0E8' }}>
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }} className="mb-10 md:mb-16"
        >
          <div className="section-divider" />
          <span className="eyebrow">Selected Work</span>
          <h2 className="mt-6 headline-luxury" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            Built for real businesses, not templates.
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-[1.8] text-[#4A4A4A]">
            A few of the local businesses we&apos;ve built and shipped sites for.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
