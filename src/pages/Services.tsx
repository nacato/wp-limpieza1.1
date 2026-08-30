import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Droplets,
  Home,
  Layers3,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Sofa,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import AppShell from '../components/AppShell'

const services = [
  {
    number: '01',
    title: 'Limpieza institucional',
    description:
      'Mantenimiento profesional de oficinas, empresas, instituciones y espacios corporativos.',
    icon: Building2,
  },
  {
    number: '02',
    title: 'Limpieza residencial',
    description:
      'Cuidado profesional de hogares, departamentos y espacios residenciales.',
    icon: Home,
  },
  {
    number: '03',
    title: 'Limpieza post-obra',
    description:
      'Recuperamos espacios después de trabajos de construcción, remodelación o adecuación.',
    icon: Layers3,
  },
  {
    number: '04',
    title: 'Muebles y alfombras',
    description:
      'Limpieza especializada para muebles, tapizados, alfombras y diferentes superficies.',
    icon: Sofa,
  },
  {
    number: '05',
    title: 'Recubrimiento de pisos',
    description:
      'Tratamiento y mantenimiento profesional de diferentes tipos de pisos y superficies.',
    icon: Sparkles,
  },
  {
    number: '06',
    title: 'Estructuras',
    description:
      'Limpieza y mantenimiento de estructuras con procedimientos profesionales.',
    icon: Building2,
  },
  {
    number: '07',
    title: 'Desinfección',
    description:
      'Procesos profesionales de limpieza y desinfección para espacios que requieren mayor cuidado.',
    icon: SprayCan,
  },
  {
    number: '08',
    title: 'Mantenimiento personalizado',
    description:
      'Soluciones adaptadas a las necesidades específicas de cada cliente y espacio.',
    icon: Droplets,
  },
]

const benefits = [
  'Personal capacitado',
  'Atención profesional',
  'Soluciones para diferentes espacios',
  'Equipos y procedimientos especializados',
]

function Services() {
  return (
    <AppShell>
      <main className="min-h-screen overflow-hidden bg-[#020617] text-white">

        {/* HERO */}

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
                Nuestros servicios
              </p>

            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl">

              Soluciones para

              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                cada espacio.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Servicios profesionales de limpieza y mantenimiento
              diseñados para mantener sus espacios limpios, seguros
              y en excelentes condiciones.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">

              <span>
                08 soluciones
              </span>

              <span className="h-px w-10 bg-white/10" />

              <span>
                W.P. Limpieza
              </span>

            </div>

          </div>

        </section>

        {/* SERVICIOS */}

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-600">
                Catálogo
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
                Servicios W.P.
              </h2>

            </div>

            <span className="hidden text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600 sm:block">
              Profesional · Preciso · Confiable
            </span>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {services.map((service) => {

              const Icon = service.icon

              return (
                <article
                  key={service.number}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-white/[0.075] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.045] sm:p-6"
                >

                  <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative">

                    <div className="flex items-start justify-between">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.015] text-blue-400 shadow-inner shadow-white/[0.03] transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">

                        <Icon
                          size={23}
                          strokeWidth={1.5}
                        />

                      </div>

                      <span className="text-[10px] font-bold tracking-[0.25em] text-slate-700">
                        {service.number}
                      </span>

                    </div>

                    <h3 className="mt-7 text-lg font-bold tracking-tight text-white sm:text-xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                      {service.description}
                    </p>

                    <Link
                      to="/cotizar"
                      className="group/action mt-6 inline-flex items-center gap-2 text-[11px] font-bold text-blue-400 transition-colors hover:text-blue-300"
                    >

                      Solicitar este servicio

                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
                      />

                    </Link>

                  </div>

                </article>
              )
            })}

          </div>

        </section>

        {/* DIFERENCIAL */}

        <section className="border-y border-white/[0.06] bg-white/[0.012]">

          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">

            <div className="grid gap-10 md:grid-cols-2 md:items-center">

              <div>

                <div className="flex items-center gap-3">

                  <span className="h-2 w-2 rounded-full bg-blue-400" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
                    La diferencia W.P.
                  </p>

                </div>

                <h2 className="mt-5 max-w-xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">

                  Profesionalismo en

                  <span className="block text-blue-500">
                    cada servicio.
                  </span>

                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
                  Cada espacio tiene necesidades diferentes. Por eso
                  trabajamos con soluciones profesionales adaptadas
                  a las características de cada lugar.
                </p>

              </div>

              <div className="grid gap-3">

                {benefits.map((benefit, index) => (

                  <div
                    key={benefit}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/10 text-blue-400">

                      <CheckCircle2 size={17} />

                    </div>

                    <div className="flex flex-1 items-center justify-between">

                      <span className="text-sm text-slate-300">
                        {benefit}
                      </span>

                      <span className="text-[9px] font-bold text-slate-700">
                        0{index + 1}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="px-5 py-16 sm:px-8 sm:py-24">

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700 p-7 shadow-[0_30px_100px_rgba(37,99,235,0.20)] sm:rounded-[2.5rem] sm:p-12">

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-950/40 blur-[90px]" />

            <div className="relative">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <ShieldCheck size={22} />
              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.4em] text-blue-100">
                Atención personalizada
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                ¿Necesita un servicio para su espacio?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                Cuéntenos qué necesita y nuestro equipo podrá orientarle
                sobre la mejor solución.
              </p>

              <Link
                to="/cotizar"
                className="group mt-8 inline-flex min-h-13 items-center gap-4 rounded-full bg-white px-6 text-sm font-bold text-slate-950 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
              >

                Solicitar cotización

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">

                  <ArrowUpRight size={16} />

                </span>

              </Link>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t border-white/[0.06] px-5 py-8 text-center">

          <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-700">
            W.P. LIMPIEZA & MANTENIMIENTO
          </p>

          <p className="mt-2 text-[8px] text-slate-800">
            Soluciones profesionales para cada espacio.
          </p>

        </footer>

      </main>
    </AppShell>
  )
}

export default Services