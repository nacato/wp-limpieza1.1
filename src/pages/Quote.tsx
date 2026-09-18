import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  User,
  Wrench,
  Users,
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
      <main className="min-h-[calc(100vh-0px)] bg-[#F8FAFC] text-[#172033]">

        {/* =====================================================
            CONTENEDOR PRINCIPAL
        ====================================================== */}

        <section className="mx-auto flex min-h-[calc(100vh-0px)] max-w-[1500px] flex-col lg:grid lg:grid-cols-[0.9fr_1.1fr]">

          {/* ===================================================
              LADO IZQUIERDO
          ==================================================== */}

          <div className="relative flex flex-col justify-between overflow-hidden bg-white px-6 py-6 sm:px-10 lg:min-h-screen lg:px-14 lg:py-8 xl:px-20">

            {/* detalle decorativo */}

            <div className="pointer-events-none absolute -left-40 bottom-[-120px] h-80 w-80 rounded-full bg-[#EAF3F8]" />

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-[#EAF3F8]/70" />

            {/* HEADER */}

            <div className="relative flex items-center justify-between">

              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-xs font-bold text-[#64748B] transition hover:text-[#0F4C81]"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />

                Inicio
              </Link>

              <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#64748B]">
                W.P. Limpieza & Mantenimiento
              </span>

            </div>

            {/* CONTENIDO */}

            <div className="relative mx-auto w-full max-w-xl py-12 lg:py-0">

              <div className="flex items-center gap-3">

                <span className="h-px w-9 bg-[#0F4C81]" />

                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#0F4C81]">
                  Solicitar cotización
                </p>

              </div>

              <h1 className="mt-5 max-w-lg text-5xl font-black leading-[0.92] tracking-[-0.055em] text-[#123B5D] sm:text-6xl xl:text-7xl">

                Cuéntenos qué

                <span className="block text-[#0F4C81]">
                  necesita.
                </span>

              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-[#64748B]">
                Limpieza y mantenimiento profesional para espacios
                más limpios, seguros y productivos.
              </p>

              {/* BENEFICIOS */}

              <div className="mt-9 grid grid-cols-3 border-y border-[#D9E2EC] py-5">

                <div className="text-center">

                  <ShieldCheck
                    size={23}
                    strokeWidth={1.5}
                    className="mx-auto text-[#0F4C81]"
                  />

                  <p className="mt-2 text-[10px] font-black text-[#123B5D]">
                    Confianza
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#64748B]">
                    en cada servicio
                  </p>

                </div>

                <div className="border-x border-[#D9E2EC] text-center">

                  <Leaf
                    size={23}
                    strokeWidth={1.5}
                    className="mx-auto text-[#0F4C81]"
                  />

                  <p className="mt-2 text-[10px] font-black text-[#123B5D]">
                    Espacios
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#64748B]">
                    más saludables
                  </p>

                </div>

                <div className="text-center">

                  <Users
                    size={23}
                    strokeWidth={1.5}
                    className="mx-auto text-[#0F4C81]"
                  />

                  <p className="mt-2 text-[10px] font-black text-[#123B5D]">
                    Atención
                  </p>

                  <p className="mt-0.5 text-[9px] text-[#64748B]">
                    personalizada
                  </p>

                </div>

              </div>

            </div>

            {/* PIE */}

            <div className="relative flex items-end justify-between">

              <div>

                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#0F4C81]">
                  Hagamos un espacio mejor
                </p>

              </div>

              <div className="hidden text-right lg:block">

                <p className="text-5xl font-black tracking-[-0.08em] text-[#123B5D]/10">
                  W.P.
                </p>

              </div>

            </div>

          </div>

          {/* ===================================================
              LADO DERECHO — FORMULARIO
          ==================================================== */}

          <div className="relative flex items-center justify-center bg-[#EAF3F8]/55 px-5 py-8 sm:px-8 lg:min-h-screen lg:px-10">

            <div className="w-full max-w-2xl">

              {/* TARJETA */}

              <form
                onSubmit={handleSubmit}
                className="rounded-[1.75rem] border border-[#D9E2EC] bg-white p-5 shadow-[0_20px_60px_rgba(18,59,93,0.09)] sm:p-7 xl:p-8"
              >

                {/* CABECERA */}

                <div className="flex items-start gap-4 border-b border-[#D9E2EC] pb-5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3F8] text-[#0F4C81]">
                    <FileText
                      size={21}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div>

                    <p className="text-lg font-black tracking-tight text-[#123B5D]">
                      Datos del servicio
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      Complete la información y reciba atención por WhatsApp.
                    </p>

                  </div>

                </div>

                {/* CAMPOS */}

                <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">

                  {/* NOMBRE */}

                  <label className="block">

                    <span className="mb-1.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#123B5D]">

                      <User
                        size={13}
                        className="text-[#0F4C81]"
                      />

                      Nombre completo *

                    </span>

                    <input
                      type="text"
                      name="nombre"
                      placeholder="Ej. Juan Pérez"
                      autoComplete="name"
                      required
                      className="h-11 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 text-xs text-[#172033] outline-none transition focus:border-[#0F4C81] focus:bg-white focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                  </label>

                  {/* TELÉFONO */}

                  <label className="block">

                    <span className="mb-1.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#123B5D]">

                      <Phone
                        size={13}
                        className="text-[#0F4C81]"
                      />

                      Teléfono *

                    </span>

                    <input
                      type="tel"
                      name="telefono"
                      placeholder="Ej. 099 123 4567"
                      autoComplete="tel"
                      required
                      className="h-11 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 text-xs text-[#172033] outline-none transition focus:border-[#0F4C81] focus:bg-white focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                  </label>

                  {/* SERVICIO */}

                  <label className="block">

                    <span className="mb-1.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#123B5D]">

                      <Wrench
                        size={13}
                        className="text-[#0F4C81]"
                      />

                      Tipo de servicio *

                    </span>

                    <select
                      name="servicio"
                      defaultValue=""
                      required
                      className="h-11 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 text-xs text-[#172033] outline-none transition focus:border-[#0F4C81] focus:bg-white focus:ring-2 focus:ring-[#0F4C81]/10"
                    >

                      <option value="" disabled>
                        Seleccione un servicio
                      </option>

                      <option value="Limpieza institucional">
                        Limpieza institucional
                      </option>

                      <option value="Limpieza residencial">
                        Limpieza residencial
                      </option>

                      <option value="Limpieza post-obra">
                        Limpieza post-obra
                      </option>

                      <option value="Desinfección">
                        Desinfección
                      </option>

                      <option value="Limpieza profunda">
                        Limpieza profunda
                      </option>

                      <option value="Mantenimiento">
                        Mantenimiento
                      </option>

                      <option value="Otro servicio">
                        Otro servicio
                      </option>

                    </select>

                  </label>

                  {/* SECTOR */}

                  <label className="block">

                    <span className="mb-1.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#123B5D]">

                      <MapPin
                        size={13}
                        className="text-[#0F4C81]"
                      />

                      Ciudad / sector *

                    </span>

                    <input
                      type="text"
                      name="sector"
                      placeholder="Ej. Quito, Valle de los Chillos"
                      required
                      className="h-11 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 text-xs text-[#172033] outline-none transition focus:border-[#0F4C81] focus:bg-white focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                  </label>

                  {/* FECHA */}

                  <label className="block sm:col-span-2">

                    <span className="mb-1.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#123B5D]">

                      <CalendarDays
                        size={13}
                        className="text-[#0F4C81]"
                      />

                      Fecha aproximada

                    </span>

                    <input
                      type="date"
                      name="fecha"
                      className="h-11 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 text-xs text-[#172033] outline-none transition focus:border-[#0F4C81] focus:bg-white focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                  </label>

                  {/* DETALLE */}

                  <label className="block sm:col-span-2">

                    <span className="mb-1.5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#123B5D]">

                      <MessageCircle
                        size={13}
                        className="text-[#0F4C81]"
                      />

                      Cuéntenos sobre el servicio *

                    </span>

                    <textarea
                      name="detalle"
                      rows={3}
                      required
                      placeholder="Describa brevemente el lugar, tamaño, frecuencia o cualquier detalle importante..."
                      className="w-full resize-none rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-3 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0F4C81] focus:bg-white focus:ring-2 focus:ring-[#0F4C81]/10"
                    />

                  </label>

                </div>

                {/* BOTÓN */}

                <button
                  type="submit"
                  className="group mt-5 flex h-12 w-full items-center justify-between rounded-xl bg-[#0F4C81] pl-5 pr-2 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#123B5D] hover:shadow-[0_10px_25px_rgba(15,76,129,0.2)] active:scale-[0.99]"
                >

                  <span className="flex items-center gap-2">
                    <MessageCircle size={17} />
                    Enviar solicitud por WhatsApp
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition group-hover:translate-x-0.5">
                    <ArrowRight size={17} />
                  </span>

                </button>

                {/* MENSAJE */}

                {sent && (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#D9E2EC] bg-[#EAF3F8] p-3 text-[#123B5D]">

                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#0F4C81]"
                    />

                    <p className="text-xs">
                      Solicitud preparada. WhatsApp se ha abierto
                      para completar el envío.
                    </p>

                  </div>
                )}

                {/* PRIVACIDAD */}

                <p className="mt-4 text-center text-[9px] text-[#94A3B8]">
                  Su información será enviada directamente a nuestro equipo.
                </p>

                {/* CONTACTO */}

                <div className="mt-5 grid grid-cols-2 border-t border-[#D9E2EC] pt-5">

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 border-r border-[#D9E2EC] text-left"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]">
                      <MessageCircle size={17} />
                    </div>

                    <div>

                      <p className="text-[9px] font-black uppercase tracking-wider text-[#64748B]">
                        WhatsApp
                      </p>

                      <p className="mt-0.5 text-xs font-bold text-[#123B5D]">
                        099 269 9716
                      </p>

                    </div>

                  </a>

                  <a
                    href="tel:3051060"
                    className="flex items-center justify-center gap-2 text-left"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]">
                      <Phone size={17} />
                    </div>

                    <div>

                      <p className="text-[9px] font-black uppercase tracking-wider text-[#64748B]">
                        Llámenos
                      </p>

                      <p className="mt-0.5 text-xs font-bold text-[#123B5D]">
                        (02) 305 1060
                      </p>

                    </div>

                  </a>

                </div>

              </form>

            </div>

          </div>

        </section>

      </main>
    </AppShell>
  )
}

export default Quote