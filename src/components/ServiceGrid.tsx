const services = [
  {
    number: '01',
    title: 'Limpieza institucional',
    description:
      'Mantenimiento profesional de oficinas, empresas e instituciones.',
    icon: '✦',
  },
  {
    number: '02',
    title: 'Limpieza residencial',
    description:
      'Cuidado profesional de hogares y espacios residenciales.',
    icon: '⌂',
  },
  {
    number: '03',
    title: 'Limpieza post-obra',
    description:
      'Recuperamos espacios después de trabajos de construcción o remodelación.',
    icon: '◈',
  },
  {
    number: '04',
    title: 'Muebles y alfombras',
    description:
      'Limpieza especializada para muebles, tapizados y alfombras.',
    icon: '◇',
  },
  {
    number: '05',
    title: 'Recubrimiento de pisos',
    description:
      'Tratamiento y mantenimiento profesional de diferentes superficies.',
    icon: '▣',
  },
  {
    number: '06',
    title: 'Estructuras',
    description:
      'Limpieza y pintura de estructuras con procedimientos profesionales.',
    icon: '△',
  },
]

function ServiceGrid() {
  return (
    <section
      id="servicios"
      className="scroll-mt-24 bg-slate-950 px-5 py-20"
    >
      <div className="mx-auto max-w-md">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">
            Nuestros servicios
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
            Soluciones para
            <span className="block text-blue-500">
              cada espacio.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            Servicios profesionales diseñados para mantener sus
            espacios limpios, seguros y en excelentes condiciones.
          </p>
        </div>

        <div className="space-y-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 active:scale-[0.98]"
            >
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-600/10 blur-3xl transition-all duration-500 group-active:bg-blue-600/20" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-blue-400">
                  {service.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-slate-500">
                      {service.number}
                    </p>

                    <span className="text-xs text-blue-400">
                      →
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a
          href="#contacto"
          className="mt-6 flex min-h-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/5 text-sm font-semibold text-blue-400 transition-all duration-300 active:scale-[0.98]"
        >
          Solicitar información
          <span className="ml-3 text-lg">→</span>
        </a>
      </div>
    </section>
  )
}

export default ServiceGrid