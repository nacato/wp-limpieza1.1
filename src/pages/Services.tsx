import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Layers3,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Sofa,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AppShell from '../components/AppShell'

const services = [
  ['01', 'Limpieza institucional', 'Empresas e instituciones.', Building2],
  ['02', 'Limpieza residencial', 'Hogares y departamentos.', Home],
  ['03', 'Limpieza post-obra', 'Espacios después de obra.', Layers3],
  ['04', 'Muebles y alfombras', 'Tapizados y superficies.', Sofa],
  ['05', 'Tratamiento de pisos', 'Cuidado profesional de pisos.', Sparkles],
  ['06', 'Limpieza de estructuras', 'Estructuras y espacios.', Building2],
  ['07', 'Desinfección', 'Espacios más seguros.', SprayCan],
  ['08', 'Mantenimiento personalizado', 'Soluciones a medida.', Wrench],
] as const

function Services() {
  return (
    <AppShell>
      <main className="min-h-screen bg-[#F8FAFC] text-[#172033]">

        {/* HERO */}

        <section className="border-b border-[#D9E2EC] bg-white">

          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#0F4C81]"
            >
              <ArrowLeft size={15} />
              Inicio
            </Link>

            <div className="mx-auto max-w-4xl py-12 text-center sm:py-14">

              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#0F4C81]" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#0F4C81]">
                  Nuestros servicios
                </span>
                <span className="h-px w-8 bg-[#0F4C81]" />
              </div>

              <h1 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#123B5D] sm:text-7xl">
                Espacios más
                <span className="block text-[#0F4C81]">
                  limpios y seguros.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#64748B]">
                Soluciones profesionales de limpieza y mantenimiento
                para hogares, empresas e instituciones.
              </p>

              <div className="mx-auto mt-7 flex max-w-md justify-center gap-6 border-y border-[#D9E2EC] py-4">

                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#0F4C81]" />
                  <span className="text-[9px] font-bold text-[#123B5D]">
                    Calidad
                  </span>
                </div>

                <div className="h-5 w-px bg-[#D9E2EC]" />

                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#0F4C81]" />
                  <span className="text-[9px] font-bold text-[#123B5D]">
                    Profesional
                  </span>
                </div>

                <div className="h-5 w-px bg-[#D9E2EC]" />

                <div className="flex items-center gap-2">
                  <Building2 size={18} className="text-[#0F4C81]" />
                  <span className="text-[9px] font-bold text-[#123B5D]">
                    Integral
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SERVICIOS */}

        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">

          <div className="mb-7 text-center">

            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#0F4C81]">
              Soluciones W.P.
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#123B5D] sm:text-4xl">
              Nuestros servicios
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {services.map(([number, title, description, Icon]) => (

              <article
                key={number}
                className="group rounded-2xl border border-[#D9E2EC] bg-white p-5 transition hover:-translate-y-1 hover:border-[#0F4C81]/30 hover:shadow-[0_15px_35px_rgba(18,59,93,0.07)]"
              >

                <div className="flex items-center justify-between">

                  <span className="text-[9px] font-black tracking-[0.25em] text-[#94A3B8]">
                    {number}
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81] transition group-hover:bg-[#0F4C81] group-hover:text-white">
                    <Icon size={17} strokeWidth={1.5} />
                  </div>

                </div>

                <h3 className="mt-7 text-base font-black leading-tight text-[#123B5D]">
                  {title}
                </h3>

                <p className="mt-2 text-xs text-[#64748B]">
                  {description}
                </p>

                <div className="mt-5 flex justify-end">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F8FAFC] text-[#0F4C81] group-hover:bg-[#EAF3F8]">
                    <ArrowRight size={14} />
                  </span>
                </div>

              </article>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="bg-[#123B5D]">

          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-9 sm:px-10">

            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-[#B9D8EC]">
                Trabajemos juntos
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                ¿Necesita un servicio personalizado?
              </h2>
            </div>

            <Link
              to="/cotizar"
              className="group flex shrink-0 items-center gap-3 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wide text-[#123B5D] transition hover:bg-[#EAF3F8]"
            >
              Cotizar
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t border-[#D9E2EC] bg-white py-6 text-center">

          <p className="text-[8px] font-black uppercase tracking-[0.35em] text-[#123B5D]">
            W.P. LIMPIEZA & MANTENIMIENTO
          </p>

        </footer>

      </main>
    </AppShell>
  )
}

export default Services