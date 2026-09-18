import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

import { Link } from 'react-router-dom'

import AppShell from '../components/AppShell'

const values = [
  {
    number: '01',
    title: 'Calidad',
    text: 'en cada servicio',
    icon: CheckCircle2,
  },
  {
    number: '02',
    title: 'Puntualidad',
    text: 'y responsabilidad',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Eficiencia',
    text: 'y eficacia',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Atención',
    text: 'especializada',
    icon: Users,
  },
]

function About() {
  return (
    <AppShell>
      <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#172033]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-white">

          {/* formas decorativas */}

          <div className="pointer-events-none absolute -left-40 bottom-[-180px] h-[520px] w-[520px] rounded-full bg-[#EAF3F8]" />

          <div className="pointer-events-none absolute right-[-180px] top-[-180px] h-[520px] w-[520px] rounded-full bg-[#EAF3F8]/80" />

          <div className="pointer-events-none absolute right-0 top-0 h-full w-[38%] bg-gradient-to-bl from-[#123B5D]/[0.04] via-transparent to-transparent" />

          {/* navegación */}

          <div className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 sm:px-10 lg:px-14">

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

            <div className="hidden items-center gap-3 sm:flex">

              <span className="h-px w-8 bg-[#D9E2EC]" />

              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#64748B]">
                W.P. Limpieza & Mantenimiento
              </span>

              <span className="h-px w-8 bg-[#D9E2EC]" />

            </div>

          </div>

          {/* contenido */}

          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-85px)] max-w-[1500px] items-center px-6 pb-12 sm:px-10 lg:px-14">

            <div className="grid w-full gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 xl:gap-24">

              {/* ===============================================
                  IZQUIERDA
              ================================================ */}

              <div className="max-w-2xl">

                <div className="flex items-center gap-4">

                  <span className="h-px w-12 bg-[#0F4C81]" />

                  <p className="text-[9px] font-black uppercase tracking-[0.45em] text-[#0F4C81]">
                    Sobre nosotros
                  </p>

                </div>

                <h1 className="mt-7 text-[clamp(3.3rem,7vw,6.7rem)] font-black leading-[0.87] tracking-[-0.065em] text-[#123B5D]">

                  Experiencia,

                  <span className="block text-[#0F4C81]">
                    confianza
                  </span>

                  <span className="block">
                    y calidad.
                  </span>

                </h1>

                <p className="mt-7 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base">
                  W.P. Limpieza y Mantenimiento ofrece soluciones
                  profesionales para hogares, empresas e instituciones,
                  con un enfoque basado en calidad, eficiencia y atención
                  especializada.
                </p>

                {/* BENEFICIOS */}

                <div className="mt-9 grid max-w-xl grid-cols-3 border-y border-[#D9E2EC] py-5">

                  <div className="text-center">

                    <ShieldCheck
                      size={23}
                      strokeWidth={1.4}
                      className="mx-auto text-[#0F4C81]"
                    />

                    <p className="mt-2 text-[10px] font-black text-[#123B5D]">
                      Calidad
                    </p>

                    <p className="mt-0.5 text-[9px] text-[#64748B]">
                      en cada servicio
                    </p>

                  </div>

                  <div className="border-x border-[#D9E2EC] text-center">

                    <Leaf
                      size={23}
                      strokeWidth={1.4}
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
                      strokeWidth={1.4}
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

                {/* MÉTRICAS */}

                <div className="mt-8 flex items-center gap-8">

                  <div>

                    <p className="text-4xl font-black tracking-[-0.06em] text-[#123B5D]">
                      20+
                    </p>

                    <p className="mt-1 text-[8px] font-black uppercase tracking-[0.3em] text-[#0F4C81]">
                      Años de experiencia
                    </p>

                  </div>

                  <div className="h-12 w-px bg-[#D9E2EC]" />

                  <div>

                    <p className="text-4xl font-black tracking-[-0.06em] text-[#123B5D]">
                      W.P.
                    </p>

                    <p className="mt-1 text-[8px] font-black uppercase tracking-[0.3em] text-[#64748B]">
                      Servicio profesional
                    </p>

                  </div>

                </div>

                <Link
                  to="/servicios"
                  className="group mt-8 inline-flex h-12 items-center gap-5 rounded-full bg-[#0F4C81] pl-6 pr-2 text-xs font-black uppercase tracking-wide text-white transition duration-300 hover:bg-[#123B5D] hover:shadow-[0_15px_35px_rgba(15,76,129,0.2)]"
                >
                  Conoce nuestros servicios

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>

                </Link>

              </div>

              {/* ===============================================
                  DERECHA
              ================================================ */}

              <div className="relative mx-auto w-full max-w-xl">

                {/* composición visual */}

                <div className="relative overflow-hidden rounded-[2rem] border border-[#D9E2EC] bg-[#EAF3F8] p-3 shadow-[0_25px_80px_rgba(18,59,93,0.10)]">

                  {/* fondo arquitectónico abstracto */}

                  <div className="relative min-h-[510px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white via-[#EAF3F8] to-[#D9E8F1]">

                    {/* líneas arquitectónicas */}

                    <div className="absolute inset-y-0 right-[17%] w-px bg-[#0F4C81]/10" />
                    <div className="absolute inset-y-0 right-[34%] w-px bg-[#0F4C81]/10" />
                    <div className="absolute inset-y-0 right-[51%] w-px bg-[#0F4C81]/10" />

                    <div className="absolute right-0 top-[22%] h-px w-full bg-[#0F4C81]/10" />
                    <div className="absolute right-0 top-[48%] h-px w-full bg-[#0F4C81]/10" />
                    <div className="absolute right-0 top-[73%] h-px w-full bg-[#0F4C81]/10" />

                    {/* bloque azul */}

                    <div className="absolute right-[-15%] top-[-10%] h-[65%] w-[58%] rounded-bl-[8rem] bg-[#123B5D]" />

                    <div className="absolute right-[8%] top-[9%]">

                      <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/60">
                        W.P.
                      </p>

                      <p className="mt-3 max-w-[130px] text-right text-[9px] font-bold uppercase leading-5 tracking-[0.25em] text-white">
                        Espacios
                        <br />
                        que generan
                        <br />
                        bienestar.
                      </p>

                    </div>

                    {/* gran marca */}

                    <div className="absolute bottom-5 left-6">

                      <p className="text-[7rem] font-black leading-none tracking-[-0.1em] text-[#123B5D]/[0.07] sm:text-[9rem]">
                        W.P.
                      </p>

                    </div>

                    {/* panel misión/visión */}

                    <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/80 bg-white/95 p-5 shadow-[0_15px_45px_rgba(18,59,93,0.12)] backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">

                      {/* MISIÓN */}

                      <div className="flex gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]">
                          <Target
                            size={20}
                            strokeWidth={1.5}
                          />
                        </div>

                        <div>

                          <div className="flex items-center gap-3">

                            <span className="text-[9px] font-black tracking-[0.25em] text-[#0F4C81]">
                              01
                            </span>

                            <h3 className="text-sm font-black text-[#123B5D]">
                              Nuestra misión
                            </h3>

                          </div>

                          <p className="mt-2 text-[11px] leading-5 text-[#64748B]">
                            Proporcionar servicios de limpieza y
                            mantenimiento bajo estrictas normas
                            de seguridad, puntualidad, eficiencia
                            y eficacia.
                          </p>

                        </div>

                      </div>

                      <div className="my-4 h-px bg-[#D9E2EC]" />

                      {/* VISIÓN */}

                      <div className="flex gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]">
                          <Sparkles
                            size={20}
                            strokeWidth={1.5}
                          />
                        </div>

                        <div>

                          <div className="flex items-center gap-3">

                            <span className="text-[9px] font-black tracking-[0.25em] text-[#0F4C81]">
                              02
                            </span>

                            <h3 className="text-sm font-black text-[#123B5D]">
                              Nuestra visión
                            </h3>

                          </div>

                          <p className="mt-2 text-[11px] leading-5 text-[#64748B]">
                            Ser reconocidos por la calidad de nuestros
                            servicios, actualización de técnicas y
                            procedimientos y atención especializada.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* indicador inferior */}

          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex">

            <span className="h-px w-8 bg-[#0F4C81]/30" />

            <span className="text-[8px] font-black uppercase tracking-[0.35em] text-[#64748B]">
              Experiencia · Confianza · Calidad
            </span>

            <span className="h-px w-8 bg-[#0F4C81]/30" />

          </div>

        </section>

        {/* =====================================================
            VALORES
        ====================================================== */}

        <section className="border-t border-[#D9E2EC] bg-[#EAF3F8]/45">

          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">

            <div className="text-center">

              <div className="flex items-center justify-center gap-4">

                <span className="h-px w-8 bg-[#0F4C81]/30" />

                <p className="text-[8px] font-black uppercase tracking-[0.45em] text-[#0F4C81]">
                  Lo que nos representa
                </p>

                <span className="h-px w-8 bg-[#0F4C81]/30" />

              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-[#123B5D] sm:text-5xl">
                Nuestros valores
                <span className="block text-[#0F4C81]">
                  en cada servicio.
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-[#64748B]">
                Trabajamos para que cada servicio refleje nuestro
                compromiso con nuestros clientes y con la calidad
                de nuestro trabajo.
              </p>

            </div>

            <div className="mt-10 grid overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white sm:grid-cols-2 lg:grid-cols-4">

              {values.map((value) => {
                const Icon = value.icon

                return (
                  <div
                    key={value.number}
                    className="group border-b border-[#D9E2EC] p-6 text-center last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-r lg:last:border-r-0"
                  >

                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81] transition group-hover:bg-[#0F4C81] group-hover:text-white">

                      <Icon
                        size={18}
                        strokeWidth={1.5}
                      />

                    </div>

                    <p className="mt-4 text-[8px] font-black tracking-[0.25em] text-[#64748B]">
                      {value.number}
                    </p>

                    <p className="mt-2 text-sm font-black text-[#123B5D]">
                      {value.title}
                    </p>

                    <p className="text-xs text-[#64748B]">
                      {value.text}
                    </p>

                  </div>
                )
              })}

            </div>

          </div>

        </section>

        {/* =====================================================
            CIERRE
        ====================================================== */}

        <section className="bg-[#123B5D]">

          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-center sm:px-8 md:flex-row md:text-left">

            <div>

              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#B9D8EC]">
                Compromiso W.P.
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                Cuidamos cada espacio como si fuera nuestro.
              </h2>

            </div>

            <Link
              to="/cotizar"
              className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 text-xs font-black text-[#123B5D] transition hover:bg-[#EAF3F8]"
            >
              Solicitar cotización

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3F8]">
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>

            </Link>

          </div>

        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <footer className="bg-white px-5 py-7 text-center">

          <p className="text-[8px] font-black uppercase tracking-[0.35em] text-[#123B5D]">
            W.P. LIMPIEZA & MANTENIMIENTO
          </p>

          <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#64748B]">
            Experiencia · Confianza · Calidad
          </p>

        </footer>

      </main>
    </AppShell>
  )
}

export default About