import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import AppShell from '../components/AppShell'

const values = [
  'Calidad en cada servicio',
  'Puntualidad y responsabilidad',
  'Eficiencia y eficacia',
  'Atención especializada',
]

function About() {
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
                W.P. Limpieza & Mantenimiento
              </p>

            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl">

              Experiencia,

              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                confianza y calidad.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              W.P. Limpieza y Mantenimiento ofrece soluciones
              profesionales para hogares, empresas e instituciones,
              con un enfoque basado en calidad, eficiencia y atención
              especializada.
            </p>

            <div className="mt-8 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">

              <span>
                Más de 20 años
              </span>

              <span className="h-px w-10 bg-white/10" />

              <span>
                Experiencia W.P.
              </span>

            </div>

          </div>

        </section>

        {/* =====================================================
            EXPERIENCIA
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">

          <div className="grid gap-4 sm:grid-cols-2">

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 sm:p-8">

              <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                  <Award
                    size={24}
                    strokeWidth={1.5}
                  />

                </div>

                <p className="mt-8 text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                  20+
                </p>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                  Años de experiencia
                </p>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Una trayectoria enfocada en brindar servicios
                  profesionales de limpieza y mantenimiento.
                </p>

              </div>

            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 sm:p-8">

              <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                  <ShieldCheck
                    size={24}
                    strokeWidth={1.5}
                  />

                </div>

                <p className="mt-8 text-5xl font-black tracking-[-0.06em]">
                  W.P.
                </p>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
                  Servicio profesional
                </p>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Compromiso con la calidad de nuestros servicios
                  y la satisfacción de nuestros clientes.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            MISIÓN Y VISIÓN
        ====================================================== */}

        <section className="border-y border-white/[0.06] bg-white/[0.012]">

          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">

            <div className="mb-10">

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-blue-400" />

                <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
                  Nuestra identidad
                </p>

              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">

                Una empresa enfocada en

                <span className="block text-blue-500">
                  servir mejor.
                </span>

              </h2>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {/* MISIÓN */}

              <article className="rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 sm:p-8">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                    <Target
                      size={21}
                      strokeWidth={1.5}
                    />

                  </div>

                  <span className="text-[9px] font-bold tracking-[0.3em] text-slate-700">
                    01
                  </span>

                </div>

                <h3 className="mt-7 text-2xl font-bold">
                  Nuestra misión
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Proporcionar servicios de limpieza y mantenimiento
                  bajo estrictas normas de seguridad, puntualidad,
                  eficiencia y eficacia.
                </p>

              </article>

              {/* VISIÓN */}

              <article className="rounded-[2rem] border border-white/[0.075] bg-white/[0.025] p-6 sm:p-8">

                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                    <Sparkles
                      size={21}
                      strokeWidth={1.5}
                    />

                  </div>

                  <span className="text-[9px] font-bold tracking-[0.3em] text-slate-700">
                    02
                  </span>

                </div>

                <h3 className="mt-7 text-2xl font-bold">
                  Nuestra visión
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Ser reconocidos por la calidad de nuestros servicios,
                  actualización de técnicas y procedimientos y atención
                  especializada a nuestros clientes.
                </p>

              </article>

            </div>

          </div>

        </section>

        {/* =====================================================
            VALORES
        ====================================================== */}

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 rounded-full bg-blue-400" />

                <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
                  Lo que nos representa
                </p>

              </div>

              <h2 className="mt-5 text-3xl font-black leading-[1.02] tracking-[-0.04em] sm:text-5xl">

                Nuestros valores

                <span className="block text-blue-500">
                  en cada servicio.
                </span>

              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
                Trabajamos para que cada servicio refleje nuestro
                compromiso con nuestros clientes y con la calidad
                de nuestro trabajo.
              </p>

            </div>

            <div className="grid gap-3">

              {values.map((value, index) => (

                <div
                  key={value}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/10 text-blue-400">

                    <CheckCircle2 size={17} />

                  </div>

                  <span className="flex-1 text-sm text-slate-300">
                    {value}
                  </span>

                  <span className="text-[9px] font-bold text-slate-700">
                    0{index + 1}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            EQUIPO / COMPROMISO
        ====================================================== */}

        <section className="border-y border-white/[0.06] bg-white/[0.012]">

          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">

                <Users
                  size={24}
                  strokeWidth={1.5}
                />

              </div>

              <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.4em] text-blue-400">
                Compromiso W.P.
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
                Cuidamos cada espacio como si fuera nuestro.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                Nuestro trabajo busca generar espacios limpios,
                ordenados y en excelentes condiciones para nuestros
                clientes.
              </p>

              <Link
                to="/cotizar"
                className="group mt-8 inline-flex min-h-13 items-center gap-4 rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 active:scale-95"
              >

                Solicitar cotización

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">

                  <ArrowUpRight size={16} />

                </span>

              </Link>

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
            Soluciones profesionales para cada espacio.
          </p>

        </footer>

      </main>
    </AppShell>
  )
}

export default About