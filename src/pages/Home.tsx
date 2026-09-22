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
      iconColor: 'text-[#1877F2]',
      iconBg: 'bg-[#EAF2FF]',
      borderColor: '#C9DDFF',
    },
    {
      title: 'TikTok',
      href: 'https://www.tiktok.com/',
      icon: TikTokIcon,
      iconColor: 'text-[#111111]',
      iconBg: 'bg-[#F1F1F1]',
      borderColor: '#D8D8D8',
    },
    {
      title: 'WhatsApp',
      href: whatsappUrl,
      icon: WhatsAppIcon,
      iconColor: 'text-[#25D366]',
      iconBg: 'bg-[#E9FFF1]',
      borderColor: '#BDEFCF',
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
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            opacity-[0.32]
          "
        />

        <div className="absolute inset-0 bg-[#F8FAFC]/45" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#F8FAFC]/60
            via-[#F8FAFC]/28
            to-white/5
          "
        />

      </div>

      <div className="relative z-10 min-h-screen">

        {/* ===================================================
            MOBILE
        ==================================================== */}

        <div
          className="
            flex
            h-[100dvh]
            min-h-0
            flex-col
            justify-between
            overflow-hidden
            px-3
            py-2
            sm:hidden
          "
        >

          {/* ================= HEADER ================= */}

          <header className="flex shrink-0 items-center justify-between">

            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src={logoImage}
                alt="W.P. Limpieza & Mantenimiento"
                className="h-12 w-auto object-contain"
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
                tracking-[0.25em]
                text-[#123B5D]
                shadow-[0_6px_18px_rgba(18,59,93,0.10)]
              "
            >
              <Menu size={17} />
              MENÚ
            </button>

          </header>

          {/* ================= IDENTIDAD ================= */}

          <section className="shrink-0 text-center">

            <p className="text-[9px] font-black uppercase tracking-[0.30em] text-[#0F4C81]">
              W.P. LIMPIEZA Y MANTENIMIENTO
            </p>

            <p className="mt-1 text-[7px] font-medium uppercase tracking-[0.18em] text-[#64748B]">
              Calidad que se nota, limpieza que perdura
            </p>

          </section>

          {/* ================= REDES ================= */}

          <section className="shrink-0">

            <div
              className="
                rounded-[1.5rem]
                border
                border-white
                bg-white/92
                px-2.5
                py-3
                shadow-[0_8px_28px_rgba(18,59,93,0.10)]
                backdrop-blur-sm
              "
            >

              <div className="mb-2.5 flex items-center justify-center gap-2">

                <span className="h-px w-8 bg-[#C8D8E5]" />

                <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#123B5D]">
                  Síguenos en nuestras redes
                </p>

                <span className="h-px w-8 bg-[#C8D8E5]" />

              </div>

              <div className="grid grid-cols-3 gap-2">

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
                        h-[58px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        bg-white
                        transition-all
                        active:scale-[0.95]
                      "
                      style={{
                        borderColor: item.borderColor,
                      }}
                    >

                      <span
                        className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          ${item.iconBg}
                          ${item.iconColor}
                        `}
                      >
                        <Icon />
                      </span>

                      <span className="text-[8px] font-bold text-[#123B5D]">
                        {item.title}
                      </span>

                    </a>
                  )
                })}

              </div>

            </div>

          </section>

          {/* ================= SOLUCIONES ================= */}

          <section className="shrink-0">

            <div className="mb-2 flex items-center gap-3">

              <span className="h-px flex-1 bg-[#C8D8E5]" />

              <p className="text-[8px] font-black uppercase tracking-[0.38em] text-[#0F4C81]">
                Soluciones
              </p>

              <span className="h-px flex-1 bg-[#C8D8E5]" />

            </div>

            <div className="grid grid-cols-3 gap-2">

              {navigationItems.map((item) => {

                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="
                      flex
                      h-[62px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[1rem]
                      border
                      border-[#D9E2EC]
                      bg-white/92
                      shadow-[0_5px_15px_rgba(18,59,93,0.06)]
                      active:scale-[0.97]
                    "
                  >

                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#CFE5F2]
                        bg-[#EAF3F8]
                        text-[#0F4C81]
                      "
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.7}
                      />
                    </span>

                    <span className="mt-1 text-[8px] font-bold text-[#123B5D]">
                      {item.title}
                    </span>

                  </Link>
                )
              })}

            </div>

          </section>

          {/* ================= HERO ================= */}

          <section
            className="
              flex
              min-h-0
              flex-1
              flex-col
              items-center
              justify-center
              px-2
              text-center
            "
          >

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-[#0F4C81]" />

              <p className="text-[7px] font-bold uppercase tracking-[0.34em] text-[#0F4C81]">
                Quito · Ecuador
              </p>

            </div>

            <h1
              className="
                mt-3
                max-w-[350px]
                text-[2.65rem]
                font-black
                leading-[0.84]
                tracking-[-0.07em]
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

            <p className="mt-3 max-w-[315px] text-[8px] leading-4 text-[#64748B]">
              Limpieza y mantenimiento profesional para empresas,
              instituciones y hogares.
            </p>

            <Link
              to="/cotizar"
              className="
                mt-4
                flex
                h-11
                w-[245px]
                items-center
                justify-center
                rounded-full
                bg-[#0F4C81]
                text-[8px]
                font-bold
                uppercase
                tracking-[0.20em]
                text-white
                shadow-[0_10px_28px_rgba(15,76,129,0.23)]
              "
            >
              Solicitar servicio
            </Link>

          </section>

          {/* ================= DIRECTOR ================= */}

          <section
            className="
              flex
              shrink-0
              items-center
              justify-between
              rounded-[1.3rem]
              border
              border-white
              bg-white/92
              px-4
              py-3
              shadow-[0_8px_25px_rgba(18,59,93,0.09)]
            "
          >

            <div className="text-left">

              <p className="text-[6px] font-bold uppercase tracking-[0.22em] text-[#64748B]">
                Director de Operaciones
              </p>

              <p className="mt-1 text-[15px] font-black uppercase tracking-[0.04em] text-[#123B5D]">
                Waldir Palma
              </p>

            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-2
                text-[#0F4C81]
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
                  bg-[#0F4C81]
                  text-white
                "
              >
                <Phone size={14} />
              </span>

              <span className="text-[10px] font-black tracking-[0.07em]">
                099 269 9716
              </span>

            </a>

          </section>

          {/* ================= VALORES ================= */}

          <section className="grid shrink-0 grid-cols-4 gap-2">

            {companyValues.map((value) => {

              const Icon = value.icon

              return (
                <div
                  key={value.title}
                  className="
                    flex
                    h-[58px]
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#D9E2EC]
                    bg-white/92
                    text-center
                  "
                >

                  <Icon
                    size={15}
                    strokeWidth={1.7}
                    className="text-[#0F4C81]"
                  />

                  <p className="mt-1 text-[6px] font-black uppercase text-[#123B5D]">
                    {value.title}
                  </p>

                  <p className="text-[5px] uppercase text-[#64748B]">
                    {value.subtitle}
                  </p>

                </div>
              )
            })}

          </section>

          {/* ================= FOOTER ================= */}

          <footer className="flex h-6 shrink-0 items-center justify-center">

            <p className="text-[5.5px] font-bold uppercase tracking-[0.24em] text-[#64748B]">
              W.P. LIMPIEZA & MANTENIMIENTO · QUITO
            </p>

          </footer>

        </div>

        {/* ===================================================
            DESKTOP / PC
        ==================================================== */}

        <div className="hidden min-h-screen flex-col sm:flex">

          {/* ================= HEADER ================= */}

          <header className="flex shrink-0 items-center justify-between px-10 py-5 lg:px-14">

            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src={logoImage}
                alt="W.P. Limpieza & Mantenimiento"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="
                flex
                h-11
                items-center
                gap-3
                rounded-full
                border
                border-white/90
                bg-white/82
                px-6
                text-[10px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#123B5D]
                shadow-[0_8px_30px_rgba(18,59,93,0.10)]
                backdrop-blur-md
                transition
                hover:bg-white
              "
            >
              <Menu size={19} />
              MENÚ
            </button>

          </header>

          {/* ================= HERO PC ================= */}

          <section className="flex min-h-0 flex-1 items-center px-10 lg:px-14">

            <div className="grid w-full grid-cols-[1.1fr_0.9fr] items-center gap-12">

              <div className="max-w-3xl">

                <div className="flex items-center gap-3">

                  <span className="h-2 w-2 rounded-full bg-[#0F4C81]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#0F4C81]">
                    Quito · Ecuador
                  </p>

                </div>

                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#64748B]">
                  Soluciones profesionales
                </p>

                <h1
                  className="
                    mt-5
                    text-6xl
                    font-black
                    leading-[0.86]
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

                <p className="mt-5 max-w-xl text-base leading-7 text-[#64748B]">
                  Limpieza y mantenimiento profesional para empresas,
                  instituciones y hogares.
                </p>

                <Link
                  to="/cotizar"
                  className="
                    mt-7
                    inline-flex
                    h-14
                    min-w-[285px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0F4C81]
                    px-7
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-white
                    shadow-[0_15px_40px_rgba(15,76,129,0.22)]
                    transition-all
                    hover:bg-[#123B5D]
                  "
                >
                  Solicitar servicio
                </Link>

              </div>

              {/* ================= PANEL PC ================= */}

              <div className="flex justify-end">

                <div
                  className="
                    w-full
                    max-w-[410px]
                    rounded-[2rem]
                    border
                    border-white/75
                    bg-white/58
                    p-8
                    shadow-[0_25px_70px_rgba(18,59,93,0.10)]
                    backdrop-blur-[5px]
                  "
                >

                  <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#0F4C81]">
                    W.P. Limpieza y Mantenimiento
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-[#123B5D]">
                    Calidad que se nota,
                    <span className="block">
                      limpieza que perdura.
                    </span>
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-[#64748B]">
                    Soluciones profesionales de limpieza y mantenimiento
                    para hogares, empresas e instituciones.
                  </p>

                  <div className="mt-6 border-t border-[#D9E2EC]/80 pt-5">

                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#64748B]">
                      Director de Operaciones
                    </p>

                    <p className="mt-1 text-2xl font-black uppercase tracking-[0.04em] text-[#123B5D]">
                      Waldir Palma
                    </p>

                  </div>

                  <div className="mt-6 grid grid-cols-4 border-t border-[#D9E2EC]/80 pt-5">

                    {companyValues.map((value) => {

                      const Icon = value.icon

                      return (
                        <div
                          key={value.title}
                          className="flex flex-col items-center text-center"
                        >

                          <Icon
                            size={19}
                            strokeWidth={1.7}
                            className="text-[#0F4C81]"
                          />

                          <p className="mt-2 text-[8px] font-black uppercase tracking-[0.04em] text-[#123B5D]">
                            {value.title}
                          </p>

                          <p className="mt-0.5 text-[6px] uppercase leading-3 text-[#64748B]">
                            {value.subtitle}
                          </p>

                        </div>
                      )
                    })}

                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-6
                      flex
                      items-center
                      justify-center
                      gap-3
                      border-t
                      border-[#D9E2EC]/80
                      pt-5
                      text-[#123B5D]
                      transition
                      hover:text-[#0F4C81]
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
                        bg-[#0F4C81]
                        text-white
                      "
                    >
                      <Phone size={16} />
                    </span>

                    <span className="text-lg font-black tracking-[0.14em]">
                      099 269 9716
                    </span>

                  </a>

                </div>

              </div>

            </div>

          </section>

          {/* ================= ACCESOS PC ================= */}

          <section className="shrink-0 px-10 pb-4 lg:px-14">

            <div className="grid grid-cols-6 gap-4">

              {navigationItems.map((item) => {

                const Icon = item.icon

                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="
                      group
                      flex
                      h-[115px]
                      flex-col
                      items-center
                      justify-center
                      rounded-[1.5rem]
                      border
                      border-white/90
                      bg-white/78
                      shadow-[0_12px_35px_rgba(18,59,93,0.12)]
                      backdrop-blur-[4px]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-[#0F4C81]/50
                      hover:bg-white/95
                      hover:shadow-[0_20px_45px_rgba(15,76,129,0.18)]
                      active:scale-[0.98]
                    "
                  >

                    <span
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C8E4F5]
                        bg-[#EAF3F8]
                        text-[#0F4C81]
                        transition-all
                        duration-300
                        group-hover:scale-105
                        group-hover:border-[#0F4C81]
                        group-hover:bg-white
                      "
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.7}
                      />
                    </span>

                    <span className="mt-3 text-[13px] font-bold text-[#123B5D]">
                      {item.title}
                    </span>

                    <span
                      className="
                        mt-2
                        h-[2px]
                        w-7
                        rounded-full
                        bg-[#CFE5F2]
                        transition-all
                        duration-300
                        group-hover:w-12
                        group-hover:bg-[#0F4C81]
                      "
                    />

                  </Link>
                )
              })}

            </div>

            {/* ================= REDES PC ================= */}

            <div className="mt-3 grid grid-cols-3 gap-4">

              {socialItems.map((item) => {

                const Icon = item.icon

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group
                      flex
                      h-14
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/90
                      bg-white/78
                      text-[#123B5D]
                      shadow-[0_8px_25px_rgba(18,59,93,0.08)]
                      backdrop-blur-[4px]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#0F4C81]/40
                      hover:bg-white/95
                    "
                  >

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        ${item.iconBg}
                        ${item.iconColor}
                      `}
                    >
                      <Icon />
                    </span>

                    <span className="text-[11px] font-bold">
                      {item.title}
                    </span>

                  </a>
                )
              })}

            </div>

          </section>

          {/* ================= FOOTER PC ================= */}

          <footer className="shrink-0 px-10 py-2.5 text-center lg:px-14">

            <p className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#64748B]">
              W.P. LIMPIEZA & MANTENIMIENTO · QUITO · ECUADOR
            </p>

          </footer>

        </div>

      </div>

      {/* =====================================================
          MENÚ
      ====================================================== */}

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#123B5D]/20 p-4 backdrop-blur-sm">

          <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-[2rem] border border-[#D9E2EC] bg-white shadow-[0_30px_100px_rgba(18,59,93,0.18)]">

            <div className="flex items-center justify-between border-b border-[#D9E2EC] px-5 py-4">

              <img
                src={logoImage}
                alt="W.P. Limpieza"
                className="h-9 w-auto"
              />

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D9E2EC]
                  text-[#123B5D]
                "
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
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      px-4
                      py-3
                      transition
                      hover:bg-[#EAF3F8]
                    "
                  >

                    <span
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-[#D9E2EC]
                        bg-[#F8FAFC]
                        text-[#0F4C81]
                      "
                    >
                      <Icon size={18} />
                    </span>

                    <span className="flex-1 text-sm font-bold text-[#123B5D]">
                      {item.title}
                    </span>

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
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#0F4C81]
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-[#123B5D]
                "
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