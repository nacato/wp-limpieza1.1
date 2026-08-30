import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Building2,
  CheckSquare,
  Info,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'

import heroImage from '../assets/hero-wp.jpg'

const accesses = [
  {
    title: 'Servicios',
    path: '/servicios',
    icon: Sparkles,
  },
  {
    title: 'Productos',
    path: '/productos',
    icon: ShoppingBag,
  },
  {
    title: 'Proyectos',
    path: '/proyectos',
    icon: Building2,
  },
  {
    title: 'Contacto',
    path: '/contacto',
    icon: Phone,
  },
  {
    title: 'Nosotros',
    path: '/nosotros',
    icon: Info,
  },
  {
    title: 'Cotizar',
    path: '/cotizar',
    icon: CheckSquare,
  },
]

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M13.8 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.7v2.1H8.3V14h2.5v7h3Z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M15.2 3h3.1c.2 1.7 1.2 3.1 2.7 3.8v3.1c-1.1-.1-2.2-.5-3.1-1.1v6.1c0 3.7-2.4 6-5.9 6-3 0-5.2-2-5.2-4.8 0-3.1 2.5-5.2 5.8-5.2.3 0 .6 0 .9.1v3c-.3-.1-.6-.1-.9-.1-1.5 0-2.6.8-2.6 2.1 0 1.1.8 1.9 2 1.9 1.4 0 2.4-.9 2.4-2.8V3h.8Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a11.9 11.9 0 0 0 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.2-1.2-6.2-3.5-8.5Zm-8.4 18.3c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8Zm5.4-7.3c-.3-.2-1.7-.9-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6.2-.2.3-.3.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  )
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="wp-home">

      <section className="wp-hero">

        <div className="wp-hero__image">
          <img
            src={heroImage}
            alt="W.P. Limpieza y Mantenimiento"
          />
        </div>

        <div className="wp-hero__overlay" />
        <div className="wp-hero__grid" />

        <header className="wp-header">

          <Link
            to="/"
            className="wp-logo"
            aria-label="Inicio W.P."
          >
            <div className="wp-logo__brand">
              W.P.
            </div>

            <div className="wp-logo__words">
              <strong>LIMPIEZA</strong>
              <span>& MANTENIMIENTO</span>
            </div>
          </Link>

          <button
            type="button"
            className="wp-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu
              size={27}
              strokeWidth={1.6}
            />
          </button>

        </header>

        {menuOpen && (
          <div className="wp-menu-layer">

            <button
              type="button"
              className="wp-menu-background"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
            />

            <aside className="wp-menu-panel">

              <div className="wp-menu-panel__top">

                <div>
                  <strong>W.P.</strong>

                  <span>
                    LIMPIEZA & MANTENIMIENTO
                  </span>
                </div>

                <button
                  type="button"
                  className="wp-menu-close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X size={22} />
                </button>

              </div>

              <nav className="wp-menu-nav">

                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </Link>

                <Link
                  to="/servicios"
                  onClick={() => setMenuOpen(false)}
                >
                  Servicios
                </Link>

                <Link
                  to="/productos"
                  onClick={() => setMenuOpen(false)}
                >
                  Productos
                </Link>

                <Link
                  to="/proyectos"
                  onClick={() => setMenuOpen(false)}
                >
                  Proyectos
                </Link>

                <Link
                  to="/nosotros"
                  onClick={() => setMenuOpen(false)}
                >
                  Nosotros
                </Link>

                <Link
                  to="/contacto"
                  onClick={() => setMenuOpen(false)}
                >
                  Contacto
                </Link>

                <Link
                  to="/cotizar"
                  className="wp-menu-quote"
                  onClick={() => setMenuOpen(false)}
                >
                  Solicitar cotización
                  <ArrowUpRight size={18} />
                </Link>

              </nav>

            </aside>

          </div>
        )}

        <div className="wp-content">

          <section className="wp-access">

            <div className="wp-access__heading">
              <span />
              ACCESOS W.P.
            </div>

            <div className="wp-access__grid">

              {accesses.map((item) => {

                const Icon = item.icon

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="wp-app"
                  >
                    <div className="wp-app__icon">
                      <Icon
                        size={24}
                        strokeWidth={1.6}
                      />
                    </div>

                    <span>
                      {item.title}
                    </span>
                  </Link>
                )
              })}

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="wp-app wp-social"
                aria-label="Facebook"
              >
                <div className="wp-app__icon">
                  <FacebookIcon />
                </div>

                <span>
                  Facebook
                </span>
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="wp-app wp-social"
                aria-label="TikTok"
              >
                <div className="wp-app__icon">
                  <TikTokIcon />
                </div>

                <span>
                  TikTok
                </span>
              </a>

              <a
                href="https://wa.me/593992699716?text=Hola%20W.P.%20Limpieza%20y%20Mantenimiento%2C%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="wp-app wp-social wp-whatsapp"
                aria-label="Contactar por WhatsApp"
              >
                <div className="wp-app__icon">
                  <WhatsAppIcon />
                </div>

                <span>
                  WhatsApp
                </span>
              </a>

            </div>

          </section>

          <section className="wp-copy">

            <div className="wp-badge">
              <span />
              W.P. LIMPIEZA & MANTENIMIENTO
            </div>

            <div className="wp-kicker">
              SERVICIO PROFESIONAL
            </div>

            <h1>
              Espacios que

              <strong>
                hablan de usted.
              </strong>
            </h1>

            <p>
              Limpieza y mantenimiento profesional para hogares,
              empresas e instituciones.
            </p>

            <Link
              to="/cotizar"
              className="wp-button"
            >
              <span>
                Solicitar servicio
              </span>

              <span className="wp-button__arrow">
                <ArrowUpRight size={19} />
              </span>
            </Link>

          </section>

        </div>

      </section>

    </main>
  )
}

export default Home