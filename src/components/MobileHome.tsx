import MobileHeader from './MobileHeader'
import Hero from './Hero'
import ServiceGrid from './ServiceGrid'
import ProjectShowcase from './ProjectShowcase'

const menuItems = [
  {
    icon: '🧹',
    title: 'Servicios',
    description: 'Soluciones profesionales',
    href: '#servicios',
  },
  {
    icon: '🛒',
    title: 'Productos',
    description: 'Nuestra tienda',
    href: '#productos',
  },
  {
    icon: '✦',
    title: 'Proyectos',
    description: 'Nuestro trabajo',
    href: '#proyectos',
  },
  {
    icon: '☎',
    title: 'Contacto',
    description: 'Hablemos',
    href: '#contacto',
  },
]

function MobileHome() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <MobileHeader />

      <Hero />

      {/* ACCESOS PRINCIPALES */}

      <section className="mx-auto max-w-md px-5 pb-16 pt-10">
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">
            Explora W.P.
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Todo lo que necesitas
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="min-h-40 rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-lg backdrop-blur-xl transition-transform duration-300 active:scale-95"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.08] text-xl">
                {item.icon}
              </span>

              <span className="mt-6 block text-lg font-semibold">
                {item.title}
              </span>

              <span className="mt-1 block text-xs leading-5 text-slate-400">
                {item.description}
              </span>

              <span className="mt-3 block text-sm text-blue-400">
                Explorar →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}

      <ServiceGrid />

      {/* PROYECTOS */}

      <ProjectShowcase />

      {/* PRODUCTOS */}

      <section
        id="productos"
        className="scroll-mt-24 bg-slate-950 px-5 py-20"
      >
        <div className="mx-auto max-w-md">

          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">
            W.P. Store
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            Productos
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            Próximamente podrás encontrar aquí los productos
            disponibles de W.P. Limpieza y Mantenimiento.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-2xl">
              🛒
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              Nuestra tienda
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Estamos preparando nuestro catálogo para que
              próximamente puedas consultar productos, precios y
              realizar pedidos.
            </p>

          </div>
        </div>
      </section>

      {/* NOSOTROS */}

      <section
        id="nosotros"
        className="scroll-mt-24 bg-slate-950 px-5 py-20"
      >
        <div className="mx-auto max-w-md">

          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">
            W.P. Limpieza
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight">
            Experiencia,
            <span className="block text-blue-500">
              confianza y calidad.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            W.P. Limpieza y Mantenimiento trabaja para ofrecer
            soluciones profesionales de limpieza y mantenimiento,
            buscando siempre eficiencia, cumplimiento y calidad.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-2xl font-bold text-blue-400">
                20+
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Años de experiencia
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-2xl font-bold text-blue-400">
                W.P.
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Servicio profesional
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACTO */}

      <section
        id="contacto"
        className="scroll-mt-24 bg-slate-950 px-5 pb-20 pt-10"
      >
        <div className="mx-auto max-w-md">

          <div className="relative overflow-hidden rounded-[2rem] bg-blue-600 p-7 shadow-2xl shadow-blue-600/20">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">

              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-100">
                Contacto
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight">
                Hablemos de su proyecto.
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Solicite información sobre nuestros servicios de
                limpieza y mantenimiento.
              </p>

              <a
                href="mailto:w.aldirgregorio@hotmail.com"
                className="mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-slate-950 active:scale-95"
              >
                Solicitar cotización

                <span className="ml-3">
                  →
                </span>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-slate-950 px-5 py-10">

        <div className="mx-auto max-w-md text-center">

          <img
            src="/images/wp-logo.png"
            alt="W.P. Limpieza y Mantenimiento"
            className="mx-auto h-16 w-auto object-contain opacity-80"
          />

          <p className="mt-4 text-xs text-slate-500">
            Limpieza y mantenimiento profesional.
          </p>

          <p className="mt-6 text-[10px] text-slate-600">
            © W.P. Limpieza y Mantenimiento
          </p>

        </div>

      </footer>

    </div>
  )
}

export default MobileHome