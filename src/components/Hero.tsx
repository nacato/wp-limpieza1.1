function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-[#020617]"
    >
      {/* Iluminación cinematográfica */}
      <div
        className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-blue-600/30 blur-[100px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-80 w-80 rounded-full bg-blue-500/15 blur-[100px]"
        aria-hidden="true"
      />

      {/* Línea de luz superior */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] max-w-md flex-col px-6 py-8">

        {/* Logo */}
        <div className="hero-logo flex justify-center">
          <img
            src="/images/wp-logo.png"
            alt="W.P. Limpieza y Mantenimiento"
            className="h-28 w-auto object-contain drop-shadow-[0_0_30px_rgba(37,99,235,0.18)]"
          />
        </div>

        {/* Identidad */}
        <div className="mt-5 text-center">
          <p className="hero-label text-[10px] font-bold uppercase tracking-[0.45em] text-blue-400">
            W P &nbsp; L I M P I E Z A
          </p>
        </div>

        {/* Título principal */}
        <div className="mt-6 text-center">
          <h1 className="hero-title text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.055em] text-white">
            Espacios que
            <span className="mt-2 block text-blue-500">
              hablan de usted.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[340px] text-[15px] leading-7 text-slate-300">
            Limpieza y mantenimiento profesional para hogares,
            empresas e instituciones.
          </p>
        </div>

        {/* Botón */}
        <div className="mt-8 flex justify-center">
          <a
            href="#contacto"
            className="hero-button inline-flex min-h-14 items-center gap-4 rounded-full bg-blue-600 px-7 text-sm font-bold text-white shadow-[0_15px_45px_rgba(37,99,235,0.28)] transition-all duration-300 active:scale-95"
          >
            <span>Solicitar servicio</span>

            <span className="text-xl transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        {/* Espaciador */}
        <div className="flex-1" />

        {/* Indicador inferior */}
        <div className="pb-2 pt-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/10" />

            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-slate-500">
              Descubre W.P.
            </span>

            <span className="h-px w-8 bg-white/10" />
          </div>

          <div className="mx-auto mt-4 h-8 w-px overflow-hidden bg-white/10">
            <div className="hero-scroll-dot h-3 w-px bg-blue-400" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero