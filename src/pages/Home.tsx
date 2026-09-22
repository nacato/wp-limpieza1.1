import { useState } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import heroImage from '../assets/hero-wp.jpg'

const whatsappNumber = '593992699716'

const whatsappMessage =
  'Hola W.P. Limpieza, deseo información sobre sus servicios.'

const navigationItems = [
  {
    title: 'Servicios',
    href: '/servicios',
    icon: Sparkles,
  },
  {
    title: 'Productos',
    href: '/productos',
    icon: Package,
  },
  {
    title: 'Portafolio',
    href: '/proyectos',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Nosotros',
    href: '/nosotros',
    icon: Users,
  },
  {
    title: 'Contacto',
    href: '/contacto',
    icon: Phone,
  },
  {
    title: 'Cotizar',
    href: '/cotizar',
    icon: CheckCircle2,
  },
]

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H8v3h2.4v8h3.1Z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M15.5 3c.3 1.7 1.3 3 3 3.6v3c-1.1-.1-2.1-.5-3-1.1v5.7c0 3.6-2.2 5.8-5.4 5.8-3 0-5.1-2-5.1-4.7 0-2.9 2.4-5 5.6-5 .4 0 .8 0 1.2.1v3c-.4-.1-.7-.2-1.1-.2-1.3 0-2.4.8-2.4 2 0 1.1.9 1.9 2 1.9 1.3 0 2.2-.9 2.2-2.7V3h3Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.2 11.2 0 0 0 12.6 0C6.5 0 1.5 5 1.5 11.1c0 2 .5 3.9 1.5 5.6L1.4 22l5.5-1.5c1.6.9 3.5 1.4 5.4 1.4 6.1 0 11.1-5 11.1-11.1 0-2.8-1-5.4-2.9-7.3Zm-7.9 16.5c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.3.9.9-3.2-.2-.3a9 9 0 1 1 7.7 4.1Zm4.9-6.8c-.3-.2-1.7-.9-1.9-1-.3-.1-.4-.2-.6.1-.2.3-.7.9-.8 1.1-.1.2-.3.2-.5.1-1.3-.7-2.2-1.3-3.1-2.9-.2-.3.2-.3.5-1 .1-.2.1-.3 0-.5s-.6-1.4-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.3 0-.2-.2-.2-.5-.3Z" />
    </svg>
  )
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`

  const socialItems = [
    {
      title: 'Facebook',
      href: 'https://www.facebook.com/',
      icon: FacebookIcon,
    },
    {
      title: 'TikTok',
      href: 'https://www.tiktok.com/',
      icon: TikTokIcon,
    },
    {
      title: 'WhatsApp',
      href: whatsappUrl,
      icon: WhatsAppIcon,
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-[#172033]">

      {/* =====================================================
          FONDO GENERAL
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <img
          src={heroImage}
          alt=""
          className="
            h-full
            w-full
            object-cover
            object-center
            grayscale
            opacity-[0.16]
          "
        />

        <div className="absolute inset-0 bg-white/78" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-[#F8FAFC]/90" />

      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div className="relative z-10 min-h-screen">

        {/* ===================================================
            MOBILE
        ==================================================== */}

        <div className="flex min-h-screen flex-col px-4 sm:hidden">

          {/* HEADER */}

          <header className="flex shrink-0 items-center justify-between py-3">

            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="W.P. Limpieza & Mantenimiento"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-full
                border
                border-[#D9E2EC]
                bg-white/95
                px-4
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#123B5D]
                shadow-[0_5px_20px_rgba(18,59,93,0.06)]
              "
            >

              <Menu size={17} />

              MENÚ

            </button>

          </header>

          {/* SOLUCIONES */}

          <section className="shrink-0 pt-2">

            <div className="mb-4 flex items-center gap-4">

              <span className="h-px flex-1 bg-[#C8D8E5]" />

              <p className="text-[9px] font-black uppercase tracking-[0.45em] text-[#0F4C81]">
                Soluciones
              </p>

              <span className="h-px flex-1 bg-[#C8D8E5]" />

            </div>

            <div className="grid grid-cols-2 gap-2.5">

              {navigationItems.map((item) => {

                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="
                      group
                      flex
                      h-[92px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[1.25rem]
                      border
                      border-[#D9E2EC]
                      bg-white/95
                      shadow-[0_7px_24px_rgba(18,59,93,0.06)]
                      transition-all
                      duration-300
                      active:scale-[0.98]
                    "
                  >

                    <span
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#CFE5F2]
                        bg-[#F5FAFD]
                        text-[#0F4C81]
                      "
                    >

                      <Icon
                        size={20}
                        strokeWidth={1.6}
                      />

                    </span>

                    <span className="mt-2 text-[11px] font-bold text-[#123B5D]">
                      {item.title}
                    </span>

                  </Link>
                )
              })}

            </div>

          </section>

          {/* PRESENTACIÓN */}

          <section className="flex shrink-0 flex-col items-center px-2 pt-7 text-center">

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#0F4C81]" />

              <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-[#0F4C81]">
                Quito · Ecuador
              </p>

            </div>

            <h1
              className="
                mt-3
                max-w-[340px]
                text-[2.7rem]
                font-black
                leading-[0.88]
                tracking-[-0.065em]
                text-[#123B5D]
              "
            >
              Espacios que

              <span className="block">
                hablan{' '}
                <span className="text-[#0F4C81]">
                  por usted.
                </span>
              </span>

            </h1>

            <p className="mt-3 max-w-[310px] text-[10px] leading-4 text-[#64748B]">
              Limpieza y mantenimiento profesional para empresas,
              instituciones y hogares.
            </p>

            <Link
              to="/cotizar"
              className="
                mt-4
                flex
                h-11
                w-full
                max-w-[285px]
                items-center
                justify-between
                rounded-full
                bg-[#0F4C81]
                px-5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white
                shadow-[0_10px_30px_rgba(15,76,129,0.18)]
              "
            >

              Solicitar servicio

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">

                <ArrowUpRight size={15} />

              </span>

            </Link>

          </section>

          {/* REDES */}

          <section className="mt-5 shrink-0">

            <div className="mb-3 flex items-center gap-4">

              <span className="h-px flex-1 bg-[#C8D8E5]" />

              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0F4C81]">
                Síguenos
              </p>

              <span className="h-px flex-1 bg-[#C8D8E5]" />

            </div>

            <div className="grid grid-cols-3 gap-2.5">

              {socialItems.map((item) => {

                const Icon = item.icon

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      h-[82px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[1.15rem]
                      border
                      border-[#D9E2EC]
                      bg-white/95
                      shadow-[0_7px_24px_rgba(18,59,93,0.05)]
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#CFE5F2]
                        bg-[#F5FAFD]
                        text-[#0F4C81]
                      "
                    >
                      <Icon />
                    </span>

                    <span className="mt-1.5 text-[9px] font-bold text-[#123B5D]">
                      {item.title}
                    </span>

                  </a>
                )
              })}

            </div>

          </section>

          {/* FOOTER MOBILE */}

          <footer className="mt-auto py-3 text-center">

            <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-[#64748B]">
              W.P. LIMPIEZA & MANTENIMIENTO
            </p>

          </footer>

        </div>

        {/* ===================================================
            DESKTOP
        ==================================================== */}

        <div className="hidden min-h-screen sm:flex sm:flex-col">

          {/* HEADER */}

          <header className="flex shrink-0 items-center justify-between px-10 py-5 lg:px-14">

            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="W.P. Limpieza & Mantenimiento"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="
                flex
                h-11
                items-center
                gap-2
                rounded-full
                border
                border-[#D9E2EC]
                bg-white/90
                px-5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#123B5D]
                shadow-sm
                backdrop-blur-md
                transition
                hover:border-[#0F4C81]
                hover:bg-[#EAF3F8]
              "
            >

              <Menu size={18} />

              MENÚ

            </button>

          </header>

          {/* DESKTOP CONTENIDO */}

          <section className="flex flex-1 flex-col justify-center px-10 pb-5 lg:px-14">

            <div className="grid grid-cols-[1fr_1fr] items-center gap-12">

              {/* TEXTO */}

              <div className="max-w-2xl">

                <div className="flex items-center gap-3">

                  <span className="h-2 w-2 rounded-full bg-[#0F4C81]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#0F4C81]">
                    Quito · Ecuador
                  </p>

                </div>

                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.35em] text-[#64748B]">
                  Soluciones profesionales
                </p>

                <h1
                  className="
                    mt-5
                    text-6xl
                    font-black
                    leading-[0.87]
                    tracking-[-0.07em]
                    text-[#123B5D]
                    lg:text-7xl
                    xl:text-8xl
                  "
                >
                  Espacios que

                  <span className="block">
                    hablan{' '}
                    <span className="text-[#0F4C81]">
                      por usted.
                    </span>
                  </span>

                </h1>

                <p className="mt-5 max-w-xl text-sm leading-6 text-[#52677B] lg:text-base">
                  Limpieza y mantenimiento profesional para empresas,
                  instituciones y hogares.
                </p>

                <Link
                  to="/cotizar"
                  className="
                    mt-7
                    inline-flex
                    h-12
                    min-w-[250px]
                    items-center
                    justify-between
                    rounded-full
                    bg-[#0F4C81]
                    px-5
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-white
                    shadow-[0_12px_35px_rgba(15,76,129,0.18)]
                    transition
                    hover:bg-[#123B5D]
                  "
                >

                  Solicitar servicio

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">

                    <ArrowUpRight size={16} />

                  </span>

                </Link>

              </div>

              {/* INFORMACIÓN VISUAL */}

              <div className="flex justify-end">

                <div className="max-w-md rounded-[2rem] border border-white/70 bg-white/70 p-7 shadow-[0_20px_60px_rgba(18,59,93,0.08)] backdrop-blur-md">

                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#0F4C81]">
                    W.P. Limpieza
                  </p>

                  <p className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-[#123B5D] lg:text-3xl">
                    Profesionalismo en cada espacio.
                  </p>

                  <p className="mt-4 text-sm leading-6 text-[#64748B]">
                    Soluciones para hogares, empresas e instituciones.
                  </p>

                  <div className="mt-6 grid grid-cols-3 border-t border-[#D9E2EC] pt-5">

                    <div>
                      <p className="text-lg font-black text-[#123B5D]">
                        20+
                      </p>

                      <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                        Experiencia
                      </p>
                    </div>

                    <div className="border-l border-[#D9E2EC] pl-4">
                      <p className="text-lg font-black text-[#123B5D]">
                        W.P.
                      </p>

                      <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                        Servicio
                      </p>
                    </div>

                    <div className="border-l border-[#D9E2EC] pl-4">
                      <p className="text-lg font-black text-[#123B5D]">
                        100%
                      </p>

                      <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
                        Compromiso
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ACCESOS DESKTOP */}

          <section className="shrink-0 px-10 pb-5 lg:px-14">

            <div className="grid grid-cols-6 gap-3">

              {navigationItems.map((item) => {

                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="
                      group
                      flex
                      h-[72px]
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/80
                      bg-white/88
                      px-4
                      shadow-[0_8px_25px_rgba(18,59,93,0.06)]
                      backdrop-blur-md
                      transition
                      hover:-translate-y-1
                      hover:border-[#0F4C81]/30
                      hover:bg-white
                    "
                  >

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#CFE5F2] bg-[#F5FAFD] text-[#0F4C81]">

                      <Icon
                        size={17}
                        strokeWidth={1.7}
                      />

                    </span>

                    <span className="text-[10px] font-bold text-[#123B5D]">
                      {item.title}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-[#A7B5C2]"
                    />

                  </Link>
                )
              })}

            </div>

            <div className="mt-2 grid grid-cols-3 gap-3">

              {socialItems.map((item) => {

                const Icon = item.icon

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/80
                      bg-white/80
                      text-[#123B5D]
                      shadow-sm
                      backdrop-blur-md
                    "
                  >

                    <Icon />

                    <span className="text-[9px] font-bold">
                      {item.title}
                    </span>

                  </a>
                )
              })}

            </div>

          </section>

          {/* FOOTER */}

          <footer className="shrink-0 px-10 py-3 text-center lg:px-14">

            <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-[#52677B]">
              W.P. LIMPIEZA & MANTENIMIENTO · QUITO · ECUADOR
            </p>

          </footer>

        </div>

      </div>

      {/* =====================================================
          MENÚ
      ====================================================== */}

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#123B5D]/25 p-4 backdrop-blur-sm">

          <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-[2rem] border border-[#D9E2EC] bg-white shadow-[0_30px_100px_rgba(18,59,93,0.18)]">

            <div className="flex items-center justify-between border-b border-[#D9E2EC] px-5 py-4">

              <img
                src="/logo.png"
                alt="W.P. Limpieza"
                className="h-9 w-auto"
              />

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E2EC] text-[#123B5D]"
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>

            </div>

            <nav className="p-3">

              {navigationItems.map((item) => {

                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 rounded-2xl px-4 py-3 transition hover:bg-[#EAF3F8]"
                  >

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] text-[#0F4C81]">

                      <Icon size={18} />

                    </span>

                    <span className="flex-1 text-sm font-bold text-[#123B5D]">
                      {item.title}
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="text-[#94A3B8]"
                    />

                  </Link>
                )
              })}

            </nav>

            <div className="border-t border-[#D9E2EC] p-4">

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#0F4C81] text-xs font-bold text-white"
              >

                <MessageCircle size={16} />

                Escribir por WhatsApp

              </a>

            </div>

          </div>

        </div>
      )}

    </main>
  )
}

export default Home