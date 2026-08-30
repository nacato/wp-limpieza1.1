import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import AppShell from '../components/AppShell'

const whatsappNumber = '593992699716'

function Contact() {
  return (
    <AppShell>
      <main className="min-h-screen overflow-hidden bg-[#020617] text-white">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden border-b border-white/[0.06]">

          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

          <div className="pointer-events-none absolute -left-40 top-52 h-80 w-80 rounded-full bg-blue-900/20 blur-[110px]" />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />

          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12">

            <Link
              to="/"
              className="group mb-12 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-medium text-slate-400 backdrop-blur-xl transition-all hover:border-blue-400/30 hover:bg-blue-500/[0.06] hover:text-white"
            >
              <ArrowLeft
                size={15}
                className="transition-transform group-hover:-translate-x-1"
              />

              Inicio
            </Link>

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,.9)]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-blue-400">
                Contacto W.P.
              </p>

            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl">

              Hablemos de su

              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                proyecto.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Estamos disponibles para atender sus necesidades
              de limpieza y mantenimiento.
            </p>

          </div>

        </section>

        {/* =====================================================
            CONTACTOS
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">

          <div className="grid gap-4 sm:grid-cols-2">

            {/* TELÉFONO */}

            <a
              href="tel:3051060"
              className="group rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.045] sm:p-7"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                  <Phone
                    size={23}
                    strokeWidth={1.5}
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400"
                />

              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400">
                Teléfono
              </p>

              <p className="mt-3 text-2xl font-bold tracking-tight">
                3051060
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Llámenos directamente.
              </p>

            </a>

            {/* CELULAR */}

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola%20W.P.%20Limpieza,%20deseo%20información%20sobre%20sus%20servicios.`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[2rem] border border-blue-500/20 bg-blue-500/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/[0.1] sm:p-7"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-400">

                  <MessageCircle
                    size={23}
                    strokeWidth={1.5}
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-blue-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400">
                WhatsApp
              </p>

              <p className="mt-3 text-2xl font-bold tracking-tight">
                099 269 9716
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Escríbanos directamente.
              </p>

            </a>

            {/* CORREO */}

            <a
              href="mailto:w.aldirgregorio@hotmail.com"
              className="group rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.045] sm:p-7"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                  <Mail
                    size={23}
                    strokeWidth={1.5}
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-slate-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400"
                />

              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400">
                Correo electrónico
              </p>

              <p className="mt-3 break-all text-base font-bold sm:text-lg">
                w.aldirgregorio@hotmail.com
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Envíenos su consulta.
              </p>

            </a>

            {/* UBICACIÓN */}

            <div className="rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 sm:p-7">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                <MapPin
                  size={23}
                  strokeWidth={1.5}
                />

              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400">
                Atención
              </p>

              <p className="mt-3 text-2xl font-bold tracking-tight">
                Quito, Ecuador
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Atención a hogares, empresas e instituciones.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            WHATSAPP CTA
        ====================================================== */}

        <section className="px-5 pb-16 sm:px-8 sm:pb-24">

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700 p-7 shadow-[0_30px_100px_rgba(37,99,235,0.20)] sm:rounded-[2.5rem] sm:p-12">

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-950/40 blur-[90px]" />

            <div className="relative">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">

                <MessageCircle size={22} />

              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.4em] text-blue-100">
                Atención directa
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                ¿Necesita una cotización?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                Escríbanos por WhatsApp y cuéntenos qué servicio
                necesita. Estamos listos para atenderle.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hola%20W.P.%20Limpieza,%20deseo%20solicitar%20una%20cotización.`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-13 items-center justify-center gap-4 rounded-full bg-white px-6 text-sm font-bold text-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                >

                  WhatsApp

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">

                    <ArrowUpRight size={16} />

                  </span>

                </a>

                <Link
                  to="/cotizar"
                  className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition-all hover:bg-white/15 active:scale-95"
                >
                  Formulario de cotización
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="border-t border-white/[0.06] px-5 py-8 text-center">

          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-700">
            W.P. LIMPIEZA & MANTENIMIENTO
          </p>

          <p className="mt-2 text-[8px] text-slate-800">
            Quito · Ecuador
          </p>

        </footer>

      </main>
    </AppShell>
  )
}

export default Contact