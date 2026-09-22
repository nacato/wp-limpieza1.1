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
      <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#172033]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="border-b border-[#D9E2EC] bg-white">

          <div className="mx-auto max-w-6xl px-5 pb-14 pt-7 sm:px-8 sm:pb-16 sm:pt-9">

            <Link
              to="/"
              className="group mb-10 inline-flex items-center gap-2 rounded-full border border-[#D9E2EC] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#64748B] transition-all duration-300 hover:border-[#0F4C81] hover:bg-[#EAF3F8] hover:text-[#0F4C81]"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Inicio
            </Link>

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-[#0F4C81]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#0F4C81]">
                Contacto W.P.
              </p>

            </div>

            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] text-[#123B5D] sm:text-7xl">
              Hablemos de su
              <span className="block text-[#0F4C81]">
                proyecto.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
              Estamos disponibles para atender sus necesidades
              de limpieza y mantenimiento.
            </p>

          </div>

        </section>

        {/* =====================================================
            CONTACTOS
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">

          <div className="grid gap-4 sm:grid-cols-2">

            {/* TELÉFONO */}

            <a
              href="tel:3051060"
              className="group rounded-3xl border border-[#D9E2EC] bg-white p-6 shadow-[0_8px_30px_rgba(18,59,93,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81]/40 hover:shadow-[0_16px_40px_rgba(18,59,93,0.09)] sm:p-7"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-[#0F4C81]/15 bg-[#EAF3F8] text-[#0F4C81]">

                  <Phone
                    size={22}
                    strokeWidth={1.7}
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-[#94A3B8] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0F4C81]"
                />

              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.3em] text-[#0F4C81]">
                Teléfono
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-[#123B5D]">
                3051060
              </p>

              <p className="mt-2 text-sm text-[#64748B]">
                Llámenos directamente.
              </p>

            </a>

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hola%20W.P.%20Limpieza,%20deseo%20información%20sobre%20sus%20servicios.`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-[#0F4C81]/25 bg-[#EAF3F8] p-6 shadow-[0_8px_30px_rgba(15,76,129,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81]/45 hover:bg-[#E3F0F7] hover:shadow-[0_16px_40px_rgba(15,76,129,0.10)] sm:p-7"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-[#0F4C81]/15 bg-white text-[#0F4C81]">

                  <MessageCircle
                    size={22}
                    strokeWidth={1.7}
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-[#0F4C81] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />

              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.3em] text-[#0F4C81]">
                WhatsApp
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-[#123B5D]">
                099 269 9716
              </p>

              <p className="mt-2 text-sm text-[#64748B]">
                Escríbanos directamente.
              </p>

            </a>

            {/* CORREO */}

            <a
              href="mailto:w.aldirgregorio@hotmail.com"
              className="group rounded-3xl border border-[#D9E2EC] bg-white p-6 shadow-[0_8px_30px_rgba(18,59,93,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C81]/40 hover:shadow-[0_16px_40px_rgba(18,59,93,0.09)] sm:p-7"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-[#0F4C81]/15 bg-[#EAF3F8] text-[#0F4C81]">

                  <Mail
                    size={22}
                    strokeWidth={1.7}
                  />

                </div>

                <ArrowUpRight
                  size={18}
                  className="text-[#94A3B8] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#0F4C81]"
                />

              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.3em] text-[#0F4C81]">
                Correo electrónico
              </p>

              <p className="mt-2 break-all text-base font-bold text-[#123B5D] sm:text-lg">
                w.aldirgregorio@hotmail.com
              </p>

              <p className="mt-2 text-sm text-[#64748B]">
                Envíenos su consulta.
              </p>

            </a>

            {/* UBICACIÓN */}

            <div className="rounded-3xl border border-[#D9E2EC] bg-white p-6 shadow-[0_8px_30px_rgba(18,59,93,0.05)] sm:p-7">

              <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-[#0F4C81]/15 bg-[#EAF3F8] text-[#0F4C81]">

                <MapPin
                  size={22}
                  strokeWidth={1.7}
                />

              </div>

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.3em] text-[#0F4C81]">
                Atención
              </p>

              <p className="mt-2 text-2xl font-bold tracking-tight text-[#123B5D]">
                Quito, Ecuador
              </p>

              <p className="mt-2 text-sm text-[#64748B]">
                Atención a hogares, empresas e instituciones.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            WHATSAPP CTA
        ====================================================== */}

        <section className="px-5 pb-14 sm:px-8 sm:pb-20">

          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#123B5D] p-7 shadow-[0_20px_60px_rgba(18,59,93,0.14)] sm:rounded-[2rem] sm:p-10">

            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

              <div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">

                  <MessageCircle size={21} />

                </div>

                <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.4em] text-[#AFC7D8]">
                  Atención directa
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                  ¿Necesita una cotización?
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-[#C8D8E5]">
                  Escríbanos por WhatsApp y cuéntenos qué servicio
                  necesita. Estamos listos para atenderle.
                </p>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hola%20W.P.%20Limpieza,%20deseo%20solicitar%20una%20cotización.`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-white px-6 text-sm font-bold text-[#123B5D] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >

                  WhatsApp

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F4C81] text-white">

                    <ArrowUpRight size={16} />

                  </span>

                </a>

                <Link
                  to="/cotizar"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white transition-all duration-300 hover:bg-white/15 active:scale-95"
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

        <footer className="border-t border-[#D9E2EC] bg-white px-5 py-7 text-center">

          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#64748B]">
            W.P. LIMPIEZA & MANTENIMIENTO
          </p>

          <p className="mt-2 text-[8px] text-[#94A3B8]">
            Quito · Ecuador
          </p>

        </footer>

      </main>
    </AppShell>
  )
}

export default Contact