import { useState } from 'react'
import {
  BriefcaseBusiness,
  CheckCircle2,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Users,
  X,
  ShieldCheck,
  Clock3,
  Leaf,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-wp.jpg'
import logoImage from '../assets/logo.png'

const whatsappNumber = '593992699716'

const whatsappMessage =
  'Hola W.P. Limpieza, deseo información sobre sus servicios.'

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`

const navigationItems = [
  {
    label: 'Servicios',
    href: '/servicios',
    icon: Sparkles,
  },
  {
    label: 'Productos',
    href: '/productos',
    icon: Package,
  },
  {
    label: 'Portafolio',
    href: '/proyectos',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Nosotros',
    href: '/nosotros',
    icon: Users,
  },
  {
    label: 'Contacto',
    href: '/contacto',
    icon: Phone,
  },
  {
    label: 'Cotizar',
    href: '/cotizar',
    icon: CheckCircle2,
  },
]

const companyValues = [
  {
    title: 'Confianza',
    subtitle: 'En cada servicio',
    icon: ShieldCheck,
  },
  {
    title: 'Calidad',
    subtitle: 'Garantizada',
    icon: Sparkles,
  },
  {
    title: 'Puntualidad',
    subtitle: 'Y compromiso',
    icon: Clock3,
  },
  {
    title: 'Productos',
    subtitle: 'Biodegradables',
    icon: Leaf,
  },
]

const navigationColors = [
  {
    bg: 'bg-[#EAF3F8]',
    text: 'text-[#0F4C81]',
  },
  {
    bg: 'bg-[#EFF6FF]',
    text: 'text-[#2563EB]',
  },
  {
    bg: 'bg-[#F5F3FF]',
    text: 'text-[#7C3AED]',
  },
  {
    bg: 'bg-[#ECFEFF]',
    text: 'text-[#0891B2]',
  },
  {
    bg: 'bg-[#F0FDFA]',
    text: 'text-[#0F766E]',
  },
  {
    bg: 'bg-[#F0FDF4]',
    text: 'text-[#16A34A]',
  },
]

function FacebookIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.2 8.2h2.2V4.6c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 5.9v3.3H3.6v4h3.7v10h4.5v-10h3.7l.6-4h-4.3v-2.9c0-1.2.3-2.1 2.4-2.1Z" />
    </svg>
  )
}

function TikTokIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.2 7.1c-1.4-.1-2.6-.9-3.3-2.1-.3-.5-.5-1.1-.5-1.8h-3.4v13.1c0 1.6-1.3 2.8-2.9 2.8-1.6 0-2.8-1.2-2.8-2.7 0-1.5 1.2-2.7 2.8-2.7.3 0 .6.1.9.1v-3.5c-.3 0-.6-.1-.9-.1-3.5 0-6.3 2.8-6.3 6.2s2.8 6.1 6.3 6.1 6.3-2.7 6.3-6.1V10c1.2.9 2.7 1.4 4.3 1.4V8c-.2 0-.3-.4-.5-.9Z" />
    </svg>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.1c-1.5 0-3-.4-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.2-.3.2-.5.1-1.4-.7-2.4-1.3-3.4-2.9-.2-.3.2-.3.6-1 .1-.2.1-.3 0-.5 0-.1-.5-1.2-.7-1.6-.2-.4-.4-.3-.5-.3h-.4c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.5c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.4.5.6.2 1.2.1 1.6.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.2-.2-.2-.4-.3Z" />
    </svg>
  )
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#172033]">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.38]"
        />

        <div className="absolute inset-0 bg-white/35" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/15 to-[#F8FAFC]/35" />
      </div>

      {/* =========================================================
          MOBILE
      ========================================================== */}
      <section className="relative z-10 flex h-[100dvh] min-h-0 flex-col overflow-hidden px-4 py-2.5 sm:hidden">
        <div className="mx-auto flex h-full w-full max-w-[390px] flex-col">

          {/* HEADER */}
          <header className="flex shrink-0 items-center justify-between">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                src={logoImage}
                alt="W.P. Limpieza y Mantenimiento"
                className="h-[48px] w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-[#D9E2EC] bg-white/90 px-4 text-[11px] font-semibold tracking-[0.16em] text-[#123B5D] shadow-sm backdrop-blur"
            >
              <Menu className="h-4 w-4" />
              MENÚ
            </button>
          </header>

          {/* IDENTIDAD */}
          <div className="mt-1 shrink-0 text-center">
            <p className="text-[9px] font-bold tracking-[0.20em] text-[#0F4C81]">
              LIMPIEZA Y MANTENIMIENTO PROFESIONAL
            </p>

            <div className="mx-auto mt-1 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-[#0F4C81]/30" />

              <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#64748B]">
                Más de 20 años
              </span>

              <span className="h-px w-7 bg-[#0F4C81]/30" />
            </div>
          </div>

          {/* HERO */}
          <section className="mt-2 flex shrink-0 flex-col items-center text-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#64748B]">
              Soluciones profesionales
            </span>

            <h1 className="mt-0.5 max-w-[360px] text-[38px] font-semibold leading-[0.91] tracking-[-0.055em] text-[#123B5D]">
              Espacios que
              <br />
              <span className="text-[#0F4C81]">hablan por usted.</span>
            </h1>

            <p className="mt-1 max-w-[310px] text-[10px] leading-[1.25] text-[#64748B]">
              Limpieza, mantenimiento y soluciones profesionales
              para espacios que merecen más.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex h-8 items-center gap-2 rounded-full bg-[#0F4C81] px-5 text-[10px] font-semibold text-white shadow-md transition hover:bg-[#123B5D]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Solicitar servicio
            </a>
          </section>

          {/* SOLUCIONES */}
          <section className="mt-2.5 shrink-0">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                Soluciones
              </p>

              <span className="h-px flex-1 bg-[#D9E2EC] ml-3" />
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                const color = navigationColors[index]

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="group flex h-[58px] items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/88 px-2 shadow-[0_5px_18px_rgba(15,76,129,0.07)] backdrop-blur-sm transition hover:-translate-y-0.5"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${color.bg}`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${color.text}`}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="text-[9px] font-semibold leading-none text-[#172033]">
                      {item.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* DIRECTOR */}
          <section className="mt-2 flex shrink-0 items-center justify-between rounded-2xl border border-white/70 bg-white/82 px-3 py-2 shadow-[0_5px_18px_rgba(15,76,129,0.06)] backdrop-blur-sm">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#64748B]">
                Director de operaciones
              </p>

              <p className="mt-0.5 text-[12px] font-bold tracking-[0.02em] text-[#123B5D]">
                WALDIR PALMA
              </p>

              <a
                href="tel:+593992699716"
                className="mt-0.5 block text-[9px] font-medium text-[#64748B]"
              >
                099 269 9716
              </a>
            </div>

            <a
              href="tel:+593992699716"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </section>

          {/* REDES */}
          <section className="mt-2 shrink-0">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                Redes
              </p>

              <span className="h-px flex-1 bg-[#D9E2EC] ml-3" />
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {/* FACEBOOK */}
              <a
                href="#"
                className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/70 bg-white/88 shadow-[0_5px_18px_rgba(15,76,129,0.07)] backdrop-blur-sm"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1877F2]">
                  <FacebookIcon className="h-3.5 w-3.5" />
                </span>

                <span className="text-[8px] font-semibold text-[#172033]">
                  Facebook
                </span>
              </a>

              {/* TIKTOK */}
              <a
                href="#"
                className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/70 bg-white/88 shadow-[0_5px_18px_rgba(15,76,129,0.07)] backdrop-blur-sm"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#111827]">
                  <TikTokIcon className="h-3.5 w-3.5" />
                </span>

                <span className="text-[8px] font-semibold text-[#172033]">
                  TikTok
                </span>
              </a>

              {/* WHATSAPP */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-[58px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/70 bg-white/88 shadow-[0_5px_18px_rgba(15,76,129,0.07)] backdrop-blur-sm"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#EAF8F0] text-[#16A34A]">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </span>

                <span className="text-[8px] font-semibold text-[#172033]">
                  WhatsApp
                </span>
              </a>
            </div>
          </section>

          {/* VALORES */}
          <section className="mt-2 shrink-0">
            <div className="grid grid-cols-4 gap-1.5">
              {companyValues.map((value, index) => {
                const Icon = value.icon

                const colors = [
                  'text-[#2563EB]',
                  'text-[#7C3AED]',
                  'text-[#0891B2]',
                  'text-[#16A34A]',
                ]

                return (
                  <div
                    key={value.title}
                    className="flex h-[46px] flex-col items-center justify-center rounded-xl border border-white/70 bg-white/75 shadow-sm backdrop-blur-sm"
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${colors[index]}`}
                      strokeWidth={1.8}
                    />

                    <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.05em] text-[#172033]">
                      {value.title}
                    </span>

                    <span className="text-[6px] text-[#64748B]">
                      {value.subtitle}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* FOOTER */}
          <div className="mt-auto shrink-0 pb-1 pt-1 text-center">
            <p className="text-[7px] font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
              W.P. LIMPIEZA Y MANTENIMIENTO · QUITO
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESKTOP / PC
      ========================================================== */}
      <section className="relative z-10 hidden min-h-screen flex-col sm:flex">

        {/* HEADER PC */}
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-5 lg:px-10">
          <Link to="/">
            <img
              src={logoImage}
              alt="W.P. Limpieza y Mantenimiento"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-[#D9E2EC] bg-white/85 px-5 py-2.5 text-xs font-semibold text-[#123B5D] shadow-sm backdrop-blur transition hover:border-[#0F4C81]"
            >
              <MessageCircle className="h-4 w-4 text-[#16A34A]" />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9E2EC] bg-white/85 text-[#123B5D] shadow-sm backdrop-blur transition hover:border-[#0F4C81]"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* HERO PC */}
        <section className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-2 items-center gap-16 px-8 py-12 lg:px-10">

          {/* LEFT */}
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0F4C81]">
              Limpieza y mantenimiento profesional
            </p>

            <div className="mt-5 h-px w-16 bg-[#0F4C81]/30" />

            <h1 className="mt-6 text-6xl font-semibold leading-[0.96] tracking-[-0.055em] text-[#123B5D] lg:text-7xl">
              Espacios que
              <br />
              <span className="text-[#0F4C81]">hablan por usted.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-[#64748B]">
              Soluciones profesionales de limpieza y mantenimiento
              para hogares, empresas e instituciones.
            </p>

            <div className="mt-9 flex items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#0F4C81] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0F4C81]/15 transition hover:bg-[#123B5D]"
              >
                <MessageCircle className="h-4 w-4" />
                Solicitar servicio
              </a>

              <Link
                to="/proyectos"
                className="rounded-full border border-[#D9E2EC] bg-white/75 px-7 py-3.5 text-sm font-semibold text-[#123B5D] backdrop-blur transition hover:border-[#0F4C81]"
              >
                Ver portafolio
              </Link>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-[30px] border border-white/80 bg-white/72 p-7 shadow-[0_20px_70px_rgba(15,76,129,0.10)] backdrop-blur-xl">

            <div className="flex items-center justify-between border-b border-[#D9E2EC] pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#64748B]">
                  Experiencia
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#123B5D]">
                  Más de 20 años
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3F8] text-[#0F4C81]">
                <ShieldCheck className="h-6 w-6" strokeWidth={1.7} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {companyValues.map((value, index) => {
                const Icon = value.icon

                const iconStyles = [
                  'bg-[#EAF2FF] text-[#2563EB]',
                  'bg-[#F5F3FF] text-[#7C3AED]',
                  'bg-[#ECFEFF] text-[#0891B2]',
                  'bg-[#F0FDF4] text-[#16A34A]',
                ]

                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-[#D9E2EC]/70 bg-white/70 p-4"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyles[index]}`}
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.7}
                      />
                    </div>

                    <p className="mt-3 text-sm font-bold text-[#172033]">
                      {value.title}
                    </p>

                    <p className="mt-0.5 text-xs text-[#64748B]">
                      {value.subtitle}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#F8FAFC]/80 p-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                  Director de operaciones
                </p>

                <p className="mt-1 text-base font-bold text-[#123B5D]">
                  WALDIR PALMA
                </p>

                <a
                  href="tel:+593992699716"
                  className="mt-1 block text-xs text-[#64748B]"
                >
                  099 269 9716
                </a>
              </div>

              <a
                href="tel:+593992699716"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]"
              >
                <Phone className="h-5 w-5" strokeWidth={1.7} />
              </a>
            </div>
          </div>
        </section>

        {/* NAVEGACIÓN PC */}
        <section className="mx-auto w-full max-w-7xl px-8 pb-7 lg:px-10">
          <div className="mb-3 flex items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#64748B]">
              Soluciones
            </p>

            <span className="h-px flex-1 bg-[#D9E2EC]" />
          </div>

          <div className="grid grid-cols-6 gap-3">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const color = navigationColors[index]

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group flex h-[135px] flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/75 px-4 shadow-[0_8px_28px_rgba(15,76,129,0.06)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg} transition duration-300 group-hover:scale-105`}
                  >
                    <Icon
                      className={`h-7 w-7 ${color.text}`}
                      strokeWidth={1.55}
                    />
                  </span>

                  <span className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-[#172033]">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* REDES PC */}
        <section className="mx-auto w-full max-w-7xl px-8 pb-8 lg:px-10">
          <div className="grid grid-cols-3 gap-3">

            <a
              href="#"
              className="flex h-[76px] items-center gap-4 rounded-2xl border border-white/80 bg-white/72 px-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1877F2]">
                <FacebookIcon className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                  Síguenos
                </p>

                <p className="mt-0.5 text-sm font-bold text-[#172033]">
                  Facebook
                </p>
              </div>
            </a>

            <a
              href="#"
              className="flex h-[76px] items-center gap-4 rounded-2xl border border-white/80 bg-white/72 px-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#111827]">
                <TikTokIcon className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                  Síguenos
                </p>

                <p className="mt-0.5 text-sm font-bold text-[#172033]">
                  TikTok
                </p>
              </div>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-[76px] items-center gap-4 rounded-2xl border border-white/80 bg-white/72 px-5 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF8F0] text-[#16A34A]">
                <WhatsAppIcon className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
                  Contacto
                </p>

                <p className="mt-0.5 text-sm font-bold text-[#172033]">
                  WhatsApp
                </p>
              </div>
            </a>

          </div>
        </section>
      </section>

      {/* =========================================================
          MENÚ
      ========================================================== */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#123B5D]/20 backdrop-blur-sm">
          <div className="h-full w-full max-w-md bg-white px-7 py-7 shadow-2xl">

            <div className="flex items-center justify-between">
              <img
                src={logoImage}
                alt="W.P. Limpieza y Mantenimiento"
                className="h-12 w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9E2EC] text-[#123B5D]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#64748B]">
                Navegación
              </p>

              <nav className="mt-4 space-y-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  const color = navigationColors[index]

                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition hover:bg-white"
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${color.bg}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${color.text}`}
                          strokeWidth={1.7}
                        />
                      </span>

                      <span className="text-sm font-semibold text-[#172033]">
                        {item.label}
                      </span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F4C81] text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Solicitar información
            </a>

            <div className="mt-8 border-t border-[#E2E8F0] pt-5">
              <p className="text-center text-[9px] font-medium uppercase tracking-[0.16em] text-[#94A3B8]">
                W.P. LIMPIEZA Y MANTENIMIENTO
              </p>

              <p className="mt-1 text-center text-[8px] text-[#94A3B8]">
                Quito · Ecuador
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home