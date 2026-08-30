import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from 'lucide-react'

import AppShell from '../components/AppShell'

const WHATSAPP_NUMBER = '593992699716'

function Quote() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    const nombre = String(data.get('nombre') || '')
    const telefono = String(data.get('telefono') || '')
    const servicio = String(data.get('servicio') || '')
    const sector = String(data.get('sector') || '')
    const fecha = String(data.get('fecha') || '')
    const detalle = String(data.get('detalle') || '')

    const message = [
      '*NUEVA SOLICITUD DE COTIZACIÓN*',
      '',
      `*Cliente:* ${nombre}`,
      `*Teléfono:* ${telefono}`,
      `*Servicio:* ${servicio}`,
      `*Sector / Ciudad:* ${sector}`,
      `*Fecha aproximada:* ${fecha || 'Por definir'}`,
      '',
      '*Detalle del servicio:*',
      detalle,
      '',
      'Solicitud enviada desde la web de W.P. Limpieza y Mantenimiento.',
    ].join('\n')

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

    setSent(true)

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer',
    )
  }

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
                Solicitar cotización
              </p>

            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl">

              Cuéntenos qué

              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                necesita.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Complete los datos y prepare su solicitud.
              La información se enviará directamente por WhatsApp
              a nuestro equipo.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">

              <span>
                Atención directa
              </span>

              <span className="h-px w-10 bg-white/10" />

              <span>
                WhatsApp W.P.
              </span>

            </div>

          </div>

        </section>

        {/* =====================================================
            FORMULARIO
        ====================================================== */}

        <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-5 shadow-2xl shadow-black/10 sm:p-8"
          >

            {/* ENCABEZADO */}

            <div className="mb-8 border-b border-white/[0.06] pb-7">

              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-400">
                Datos del servicio
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Solicitud de cotización
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Mientras más información nos proporcione,
                mejor podremos comprender su necesidad.
              </p>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* NOMBRE */}

              <label className="group">

                <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">

                  <User
                    size={15}
                    className="text-blue-400"
                  />

                  Nombre completo

                </span>

                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej. Juan Pérez"
                  autoComplete="name"
                  required
                  className="h-14 w-full rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/[0.08]"
                />

              </label>

              {/* TELÉFONO */}

              <label className="group">

                <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">

                  <Phone
                    size={15}
                    className="text-blue-400"
                  />

                  Teléfono

                </span>

                <input
                  type="tel"
                  name="telefono"
                  placeholder="Ej. 099 123 4567"
                  autoComplete="tel"
                  required
                  className="h-14 w-full rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/[0.08]"
                />

              </label>

              {/* SERVICIO */}

              <label className="group">

                <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">

                  <Send
                    size={15}
                    className="text-blue-400"
                  />

                  Tipo de servicio

                </span>

                <select
                  name="servicio"
                  defaultValue=""
                  required
                  className="h-14 w-full appearance-none rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/[0.08]"
                >

                  <option
                    value=""
                    disabled
                    className="bg-slate-950"
                  >
                    Seleccione un servicio
                  </option>

                  <option
                    value="Limpieza institucional"
                    className="bg-slate-950"
                  >
                    Limpieza institucional
                  </option>

                  <option
                    value="Limpieza residencial"
                    className="bg-slate-950"
                  >
                    Limpieza residencial
                  </option>

                  <option
                    value="Limpieza post-obra"
                    className="bg-slate-950"
                  >
                    Limpieza post-obra
                  </option>

                  <option
                    value="Desinfección"
                    className="bg-slate-950"
                  >
                    Desinfección
                  </option>

                  <option
                    value="Limpieza profunda"
                    className="bg-slate-950"
                  >
                    Limpieza profunda
                  </option>

                  <option
                    value="Mantenimiento"
                    className="bg-slate-950"
                  >
                    Mantenimiento
                  </option>

                  <option
                    value="Otro servicio"
                    className="bg-slate-950"
                  >
                    Otro servicio
                  </option>

                </select>

              </label>

              {/* SECTOR */}

              <label className="group">

                <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">

                  <MapPin
                    size={15}
                    className="text-blue-400"
                  />

                  Ciudad / sector

                </span>

                <input
                  type="text"
                  name="sector"
                  placeholder="Ej. Quito, Valle de los Chillos"
                  required
                  className="h-14 w-full rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/[0.08]"
                />

              </label>

              {/* FECHA */}

              <label className="group sm:col-span-2">

                <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">

                  <CalendarDays
                    size={15}
                    className="text-blue-400"
                  />

                  Fecha aproximada

                </span>

                <input
                  type="date"
                  name="fecha"
                  className="h-14 w-full rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/[0.08]"
                />

              </label>

              {/* DETALLE */}

              <label className="group sm:col-span-2">

                <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">

                  <MessageCircle
                    size={15}
                    className="text-blue-400"
                  />

                  Cuéntenos sobre el servicio

                </span>

                <textarea
                  name="detalle"
                  rows={6}
                  required
                  placeholder="Describa brevemente el lugar, tamaño aproximado, frecuencia o cualquier detalle importante..."
                  className="min-h-36 w-full resize-y rounded-2xl border border-white/[0.08] bg-slate-950/60 px-4 py-4 text-sm leading-6 text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500/50 focus:bg-slate-950 focus:ring-4 focus:ring-blue-500/[0.08]"
                />

              </label>

            </div>

            {/* BOTÓN */}

            <button
              type="submit"
              className="group mt-7 flex min-h-15 w-full items-center justify-between rounded-full bg-gradient-to-r from-blue-600 to-blue-500 pl-6 pr-2 text-sm font-bold text-white shadow-[0_20px_50px_rgba(37,99,235,.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(37,99,235,.38)] active:scale-[0.98]"
            >

              <span>
                Enviar solicitud por WhatsApp
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">

                <ArrowUpRight size={19} />

              </span>

            </button>

            {/* CONFIRMACIÓN */}

            {sent && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-400/20 bg-green-500/[0.06] p-4 text-green-300">

                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <div>

                  <strong className="block text-xs">
                    Solicitud preparada correctamente
                  </strong>

                  <span className="mt-1 block text-xs leading-5 text-green-200/60">
                    WhatsApp se ha abierto para completar el envío
                    de la solicitud.
                  </span>

                </div>

              </div>
            )}

          </form>

        </section>

        {/* =====================================================
            CONTACTO DIRECTO
        ====================================================== */}

        <section className="border-y border-white/[0.06] bg-white/[0.012]">

          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">

            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-400">
                  También puede contactarnos
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                  Atención directa W.P.
                </h2>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 text-sm font-bold text-blue-300 transition-all hover:bg-blue-500/15 active:scale-95"
                >

                  <MessageCircle size={17} />

                  099 269 9716

                </a>

                <a
                  href="tel:3051060"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] px-5 text-sm font-bold text-slate-300 transition-all hover:bg-white/[0.05] active:scale-95"
                >

                  <Phone size={17} />

                  3051060

                </a>

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

export default Quote