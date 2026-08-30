import { useState } from 'react'

function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-md items-center justify-between px-5">
          <a
            href="#inicio"
            aria-label="W.P. Limpieza y Mantenimiento"
            onClick={closeMenu}
            className="flex items-center"
          >
            <img
              src="/images/wp-logo.png"
              alt="W.P. Limpieza y Mantenimiento"
              className="h-14 w-auto object-contain"
            />
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-lg backdrop-blur-xl transition-transform duration-300 active:scale-90"
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-white transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />

              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`block h-0.5 w-5 origin-center rounded-full bg-white transition-all duration-300 ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl transition-all duration-500 ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="mx-auto flex min-h-screen max-w-md flex-col px-7 pb-10 pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-400">
            W.P. Limpieza
          </p>

          <div className="mt-8 space-y-2">
            <a
              href="#inicio"
              onClick={closeMenu}
              className="block border-b border-white/10 py-5 text-3xl font-semibold text-white transition-colors active:text-blue-400"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              onClick={closeMenu}
              className="block border-b border-white/10 py-5 text-3xl font-semibold text-white transition-colors active:text-blue-400"
            >
              Servicios
            </a>

            <a
              href="#productos"
              onClick={closeMenu}
              className="block border-b border-white/10 py-5 text-3xl font-semibold text-white transition-colors active:text-blue-400"
            >
              Productos
            </a>

            <a
              href="#proyectos"
              onClick={closeMenu}
              className="block border-b border-white/10 py-5 text-3xl font-semibold text-white transition-colors active:text-blue-400"
            >
              Proyectos
            </a>

            <a
              href="#nosotros"
              onClick={closeMenu}
              className="block border-b border-white/10 py-5 text-3xl font-semibold text-white transition-colors active:text-blue-400"
            >
              Nosotros
            </a>

            <a
              href="#contacto"
              onClick={closeMenu}
              className="block border-b border-white/10 py-5 text-3xl font-semibold text-white transition-colors active:text-blue-400"
            >
              Contacto
            </a>
          </div>

          <a
            href="#contacto"
            onClick={closeMenu}
            className="mt-auto flex items-center justify-between rounded-2xl bg-blue-600 px-6 py-5 text-base font-semibold text-white shadow-xl shadow-blue-600/20 active:scale-[0.98]"
          >
            <span>Solicitar cotización</span>
            <span className="text-xl">→</span>
          </a>
        </nav>
      </div>
    </>
  )
}

export default MobileHeader