const projects = [
  {
    number: '01',
    title: 'Limpieza institucional',
    category: 'Limpieza profesional',
  },
  {
    number: '02',
    title: 'Mantenimiento de espacios',
    category: 'Mantenimiento',
  },
  {
    number: '03',
    title: 'Limpieza post-obra',
    category: 'Post-obra',
  },
]

function ProjectShowcase() {
  return (
    <section
      id="proyectos"
      className="scroll-mt-24 bg-slate-950 px-5 py-20"
    >
      <div className="mx-auto max-w-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">
          Nuestro trabajo
        </p>

        <h2 className="mt-4 text-3xl font-bold leading-tight text-white">
          Proyectos que
          <span className="block text-blue-500">
            hablan por nosotros.
          </span>
        </h2>

        <p className="mt-5 text-sm leading-6 text-slate-400">
          Conoce algunos de los trabajos y soluciones realizadas
          por W.P. Limpieza y Mantenimiento.
        </p>

        <div className="mt-10 space-y-4">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
            >
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />

                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

                <span className="relative text-7xl font-black tracking-tighter text-white/5">
                  {project.number}
                </span>

                <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>

                  <span className="text-blue-400">
                    →
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Proyecto realizado por W.P. Limpieza y Mantenimiento.
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/5 text-sm font-semibold text-blue-400 active:scale-[0.98]"
        >
          Ver todos los proyectos
          <span className="ml-3 text-lg">
            →
          </span>
        </button>
      </div>
    </section>
  )
}

export default ProjectShowcase