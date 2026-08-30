import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import AppShell from '../components/AppShell'

const projects = [
  {
    number: '01',
    title: 'Limpieza institucional',
    category: 'Institucional',
    description:
      'Soluciones profesionales de limpieza para empresas, oficinas e instituciones.',
    icon: Building2,
  },
  {
    number: '02',
    title: 'Mantenimiento profesional',
    category: 'Mantenimiento',
    description:
      'Cuidado especializado y mantenimiento de diferentes espacios.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Limpieza post-obra',
    category: 'Post-obra',
    description:
      'Recuperación y limpieza profesional de espacios después de obras y remodelaciones.',
    icon: Layers3,
  },
  {
    number: '04',
    title: 'Tratamiento de superficies',
    category: 'Especializado',
    description:
      'Procesos profesionales para conservar superficies en excelentes condiciones.',
    icon: Sparkles,
  },
]

const highlights = [
  'Atención profesional',
  'Soluciones adaptadas',
  'Procedimientos especializados',
  'Compromiso con cada espacio',
]

function Projects() {
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
                Nuestro trabajo
              </p>

            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl">

              Proyectos que

              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                hablan por nosotros.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Conozca las áreas de trabajo en las que W.P. Limpieza
              y Mantenimiento desarrolla soluciones profesionales.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">

              <span>
                Experiencia W.P.
              </span>

              <span className="h-px w-10 bg-white/10" />

              <span>
                Calidad · Compromiso
              </span>

            </div>

          </div>

        </section>

        {/* =====================================================
            PROYECTOS
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">

          <div className="mb-8">

            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-600">
              Portafolio
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Áreas de trabajo
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Una muestra de las soluciones que forman parte
              del trabajo profesional de W.P.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {projects.map((project) => {

              const Icon = project.icon

              return (
                <article
                  key={project.number}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/[0.075] bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.045]"
                >

                  {/* IMAGEN / VISUAL */}

                  <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900">

                    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-[80px] transition-all duration-500 group-hover:bg-blue-500/30" />

                    <div className="pointer-events-none absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-blue-900/20 blur-[70px]" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-blue-400/20 bg-white/[0.035] text-blue-400 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-110">

                      <Icon
                        size={31}
                        strokeWidth={1.4}
                      />

                    </div>

                    <span className="absolute bottom-5 left-5 text-6xl font-black tracking-[-0.08em] text-white/[0.045]">
                      {project.number}
                    </span>

                    <span className="absolute right-5 top-5 rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 backdrop-blur-md">
                      W.P.
                    </span>

                  </div>

                  {/* INFORMACIÓN */}

                  <div className="p-5 sm:p-6">

                    <div className="flex items-center justify-between">

                      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-400">
                        {project.category}
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="text-blue-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />

                    </div>

                    <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {project.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {project.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700">

                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500/70" />

                      Servicio profesional

                    </div>

                  </div>

                </article>
              )
            })}

          </div>

        </section>

        {/* =====================================================
            DIFERENCIAL
        ====================================================== */}

        <section className="border-y border-white/[0.06] bg-white/[0.012]">

          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">

            <div className="grid gap-10 md:grid-cols-2 md:items-center">

              <div>

                <div className="flex items-center gap-3">

                  <span className="h-2 w-2 rounded-full bg-blue-400" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
                    Nuestro compromiso
                  </p>

                </div>

                <h2 className="mt-5 max-w-xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">

                  Cada proyecto

                  <span className="block text-blue-500">
                    merece atención.
                  </span>

                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
                  Nuestro objetivo es entregar soluciones de limpieza
                  y mantenimiento con un enfoque profesional,
                  responsable y orientado a las necesidades de cada cliente.
                </p>

              </div>

              <div className="grid gap-3">

                {highlights.map((highlight, index) => (

                  <div
                    key={highlight}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/10 text-blue-400">

                      <CheckCircle2 size={17} />

                    </div>

                    <div className="flex flex-1 items-center justify-between">

                      <span className="text-sm text-slate-300">
                        {highlight}
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

        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="px-5 py-16 sm:px-8 sm:py-24">

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700 p-7 shadow-[0_30px_100px_rgba(37,99,235,0.20)] sm:rounded-[2.5rem] sm:p-12">

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-950/40 blur-[90px]" />

            <div className="relative">

              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-100">
                Hablemos de su proyecto
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                ¿Tiene un espacio que necesita atención profesional?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                Cuéntenos qué necesita y encontraremos una solución
                adecuada para su espacio.
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

export default Projects