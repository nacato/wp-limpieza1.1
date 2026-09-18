import { useState } from 'react'
import {
  Building2,
  CheckSquare,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

import heroImage from '../assets/hero-wp.jpg'

/* =====================================================
   PANELES PRINCIPALES
===================================================== */

const mainPanels = [
  {
    title: 'Servicios',
    description: 'Soluciones profesionales',
    path: '/servicios',
    icon: Sparkles,
  },
  {
    title: 'Productos',
    description: 'Suministros de calidad',
    path: '/productos',
    icon: ShoppingBag,
  },
  {
    title: 'Portafolio',
    description: 'Nuestros proyectos',
    path: '/proyectos',
    icon: Building2,
  },
  {
    title: 'Nosotros',
    description: 'Conozca W.P.',
    path: '/nosotros',
    icon: Users,
  },
  {
    title: 'Contacto',
    description: 'Estamos para ayudarle',
    path: '/contacto',
    icon: Phone,
  },
  {
    title: 'Cotizar',
    description: 'Solicite su servicio',
    path: '/cotizar',
    icon: CheckSquare,
  },
]


/* =====================================================
   FACEBOOK
===================================================== */

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 8H17V4.4c-.5-.1-1.8-.2-3.1-.2-3.1 0-5.2 1.9-5.2 5.4V12H5v4h3.7v8h4.2v-8h3.5l.6-4h-4.1V10c0-1.2.3-2 1.3-2Z"
      />
    </svg>
  )
}


/* =====================================================
   TIKTOK
===================================================== */

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.2 3c.4 2.5 1.8 4.1 4.3 4.4v3.4c-1.5 0-2.9-.4-4.3-1.2v6.1c0 4.1-2.8 6.8-6.7 6.8-3.6 0-6.2-2.5-6.2-5.8 0-3.6 2.9-6.2 6.8-6.2.3 0 .6 0 .9.1v3.5c-.3-.1-.6-.1-.9-.1-1.7 0-2.9 1.1-2.9 2.6 0 1.5 1 2.5 2.4 2.5 1.7 0 2.4-1.1 2.4-3.1V3h4.2Z"
      />
    </svg>
  )
}


/* =====================================================
   WHATSAPP
===================================================== */

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.4a9.6 9.6 0 0 0-8.2 14.6L2.5 21.5l4.7-1.3A9.6 9.6 0 1 0 12 2.4Zm0 17.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1 1 12 19.7Zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9.6.2 1.1.4 1.4.6.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z"
      />
    </svg>
  )
}


/* =====================================================
   REDES SOCIALES
   MISMA ESTRUCTURA QUE LOS OTROS PANELES
===================================================== */

const socialPanels = [
  {
    title: 'Facebook',
    description: 'Síguenos en Facebook',
    url: 'https://www.facebook.com/',
    icon: FacebookIcon,
  },
  {
    title: 'TikTok',
    description: 'Síguenos en TikTok',
    url: 'https://www.tiktok.com/',
    icon: TikTokIcon,
  },
  {
    title: 'WhatsApp',
    description: 'Escríbenos directamente',
    url: 'https://wa.me/593992699716?text=Hola%20W.P.%20Limpieza%20y%20Mantenimiento%2C%20deseo%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios.',
    icon: WhatsAppIcon,
  },
]


/* =====================================================
   HOME
===================================================== */

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="wp-home">


      {/* =================================================
          FONDO
      ================================================= */}

      <div className="wp-home__image" />

      <div className="wp-home__overlay" />


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="wp-header">

        <a
          href="/"
          className="wp-logo"
        >

          <span className="wp-logo__mark">
            W.P.
          </span>

          <span className="wp-logo__text">

            <strong>
              LIMPIEZA
            </strong>

            <small>
              & MANTENIMIENTO
            </small>

          </span>

        </a>


        {/* HAMBURGUESA */}

        <button
          type="button"
          className="wp-menu-button"
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          aria-label={
            menuOpen
              ? 'Cerrar menú'
              : 'Abrir menú'
          }
        >

          {menuOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )}

          <span>
            {menuOpen ? 'CERRAR' : 'MENÚ'}
          </span>

        </button>

      </header>


      {/* =================================================
          MENÚ HAMBURGUESA
          
          SOLO NAVEGACIÓN.
          
          NO REEMPLAZA LOS PANELES
          DE LA PANTALLA PRINCIPAL.
      ================================================= */}

      {menuOpen && (

        <div className="wp-hamburger-menu">

          <div className="wp-hamburger-inner">

            <span className="wp-hamburger-label">
              NAVEGACIÓN
            </span>


            <a
              href="/"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </a>


            <a
              href="/servicios"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Servicios
            </a>


            <a
              href="/productos"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Productos
            </a>


            <a
              href="/proyectos"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Portafolio
            </a>


            <a
              href="/nosotros"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Nosotros
            </a>


            <a
              href="/contacto"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </a>


            <a
              href="/cotizar"
              className="wp-hamburger-link"
              onClick={() => setMenuOpen(false)}
            >
              Cotizar
            </a>

          </div>

        </div>

      )}


      {/* =================================================
          CONTENIDO
      ================================================= */}

      <section className="wp-content">


        {/* =================================================
            IZQUIERDA
        ================================================= */}

        <div className="wp-intro">


          <div className="wp-location">

            <span />

            QUITO · ECUADOR

          </div>


          <p className="wp-kicker">
            SOLUCIONES PROFESIONALES
          </p>


          <h1>

            Espacios

            <br />

            <strong>
              que hablan
            </strong>

            <br />

            <em>
              por usted.
            </em>

          </h1>


          <p className="wp-description">

            Limpieza y mantenimiento profesional
            para empresas, instituciones y hogares.

          </p>


          <a
            href="/cotizar"
            className="wp-cta"
          >

            <span>
              SOLICITAR SERVICIO
            </span>

            <span className="wp-cta__arrow">
              ↗
            </span>

          </a>


          {/* BENEFICIOS */}

          <div className="wp-benefits">

            <div className="wp-benefit">

              <strong>
                20+
              </strong>

              <span>
                AÑOS DE EXPERIENCIA
              </span>

            </div>


            <div className="wp-benefit">

              <strong>
                W.P.
              </strong>

              <span>
                SERVICIO PROFESIONAL
              </span>

            </div>


            <div className="wp-benefit">

              <strong>
                100%
              </strong>

              <span>
                COMPROMISO
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            DERECHA
        ================================================= */}

        <div className="wp-navigation">


          <div className="wp-navigation__heading">

            <span>
              EXPLORAR
            </span>

            <span>
              W.P.
            </span>

          </div>


          {/* =================================================
              TODOS LOS PANELES
              
              6 PRINCIPALES + 3 REDES
          ================================================= */}

          <div className="wp-accesses">


            {/* ---------------------------------------------
                6 PANELES PRINCIPALES
            --------------------------------------------- */}

            {mainPanels.map((item) => {

              const Icon = item.icon

              return (

                <a
                  key={item.path}
                  href={item.path}
                  className="wp-access"
                >

                  <div className="wp-access__icon">

                    <Icon />

                  </div>


                  <div className="wp-access__content">

                    <h2>
                      {item.title}
                    </h2>

                    <p>
                      {item.description}
                    </p>

                  </div>

                </a>

              )

            })}


            {/* ---------------------------------------------
                FACEBOOK
            --------------------------------------------- */}

            {socialPanels.map((item) => {

              const Icon = item.icon

              return (

                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="wp-access wp-social-access"
                >

                  <div className="wp-access__icon">

                    <Icon />

                  </div>


                  <div className="wp-access__content">

                    <h2>
                      {item.title}
                    </h2>

                    <p>
                      {item.description}
                    </p>

                  </div>

                </a>

              )

            })}

          </div>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="wp-footer">

        <span>
          W.P. LIMPIEZA & MANTENIMIENTO
        </span>

        <span>
          UN MUNDO MÁS LIMPIO, UN MEJOR MAÑANA.
        </span>

      </footer>


      {/* =================================================
          ESTILOS
      ================================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }


        /* =================================================
           BASE
        ================================================= */

        .wp-home {

          position: relative;

          width: 100%;

          min-height: 100vh;

          overflow: hidden;

          background:
            #F8FAFC;

          color:
            #123B5D;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }


        /* =================================================
           FOTO
        ================================================= */

        .wp-home__image {

          position: absolute;

          inset: 0;

          background-image:
            url(${heroImage});

          background-size:
            cover;

          background-position:
            center;

          transform:
            scale(1.02);
        }


        /* =================================================
           CAPA CLARA
        ================================================= */

        .wp-home__overlay {

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,

              rgba(248,250,252,0.97)
              0%,

              rgba(248,250,252,0.92)
              29%,

              rgba(248,250,252,0.69)
              55%,

              rgba(248,250,252,0.82)
              100%
            );
        }


        /* =================================================
           HEADER
        ================================================= */

        .wp-header {

          position: relative;

          z-index: 100;

          height: 82px;

          padding:
            0 4.5vw;

          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;
        }


        /* =================================================
           LOGO
        ================================================= */

        .wp-logo {

          display:
            flex;

          align-items:
            center;

          gap:
            12px;

          color:
            #0F4C81;

          text-decoration:
            none;
        }


        .wp-logo__mark {

          width:
            43px;

          height:
            43px;

          display:
            grid;

          place-items:
            center;

          border:
            1.4px solid
            #0F4C81;

          border-radius:
            50%;

          font-size:
            9px;

          font-weight:
            800;
        }


        .wp-logo__text {

          display:
            flex;

          flex-direction:
            column;

          line-height:
            1;
        }


        .wp-logo__text strong {

          font-size:
            14px;

          letter-spacing:
            2.3px;
        }


        .wp-logo__text small {

          margin-top:
            5px;

          color:
            #64748B;

          font-size:
            6px;

          font-weight:
            700;

          letter-spacing:
            1.8px;
        }


        /* =================================================
           HAMBURGUESA
        ================================================= */

        .wp-menu-button {

          height:
            42px;

          padding:
            0 16px;

          display:
            flex;

          align-items:
            center;

          gap:
            9px;

          border:
            1px solid
            rgba(15,76,129,0.17);

          border-radius:
            22px;

          background:
            rgba(255,255,255,0.84);

          color:
            #123B5D;

          cursor:
            pointer;

          font-size:
            8px;

          font-weight:
            750;

          letter-spacing:
            1.8px;

          backdrop-filter:
            blur(12px);
        }


        /* =================================================
           MENÚ
        ================================================= */

        .wp-hamburger-menu {

          position:
            absolute;

          z-index:
            90;

          top:
            72px;

          right:
            4.5vw;

          width:
            270px;

          padding:
            9px;

          background:
            rgba(255,255,255,0.97);

          border:
            1px solid
            #D9E2EC;

          border-radius:
            17px;

          box-shadow:
            0 20px 50px
            rgba(15,59,93,0.15);

          backdrop-filter:
            blur(18px);
        }


        .wp-hamburger-inner {

          padding:
            12px;
        }


        .wp-hamburger-label {

          display:
            block;

          margin-bottom:
            5px;

          color:
            #64748B;

          font-size:
            7px;

          font-weight:
            750;

          letter-spacing:
            2px;
        }


        .wp-hamburger-link {

          min-height:
            40px;

          display:
            flex;

          align-items:
            center;

          border-bottom:
            1px solid
            #EAF0F5;

          color:
            #123B5D;

          text-decoration:
            none;

          font-size:
            11px;

          font-weight:
            600;

          transition:
            0.2s ease;
        }


        .wp-hamburger-link:last-child {

          border-bottom:
            0;
        }


        .wp-hamburger-link:hover {

          padding-left:
            5px;

          color:
            #0F6FBB;
        }


        /* =================================================
           CONTENIDO
        ================================================= */

        .wp-content {

          position:
            relative;

          z-index:
            5;

          min-height:
            calc(100vh - 115px);

          padding:
            1vh 4.5vw 70px;

          display:
            grid;

          grid-template-columns:
            minmax(0, 0.80fr)
            minmax(550px, 1.20fr);

          align-items:
            center;

          gap:
            5vw;
        }


        /* =================================================
           IZQUIERDA
        ================================================= */

        .wp-intro {

          max-width:
            620px;
        }


        .wp-location {

          display:
            flex;

          align-items:
            center;

          gap:
            8px;

          margin-bottom:
            23px;

          color:
            #0F4C81;

          font-size:
            8px;

          font-weight:
            750;

          letter-spacing:
            2.6px;
        }


        .wp-location span {

          width:
            7px;

          height:
            7px;

          border-radius:
            50%;

          background:
            #2497DC;
        }


        .wp-kicker {

          margin:
            0 0 10px;

          color:
            #2999DC;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            2.8px;
        }


        .wp-intro h1 {

          margin:
            0;

          color:
            #123B5D;

          font-size:
            clamp(50px, 5.8vw, 82px);

          line-height:
            0.90;

          letter-spacing:
            -4.5px;

          font-weight:
            400;
        }


        .wp-intro h1 strong {

          font-weight:
            700;
        }


        .wp-intro h1 em {

          font-style:
            normal;

          font-weight:
            300;

          color:
            #258ED2;
        }


        .wp-description {

          max-width:
            440px;

          margin:
            20px 0;

          color:
            #52677D;

          font-size:
            13px;

          line-height:
            1.55;
        }


        /* =================================================
           CTA
        ================================================= */

        .wp-cta {

          width:
            285px;

          height:
            50px;

          padding:
            0 17px 0 21px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            space-between;

          border-radius:
            28px;

          background:
            linear-gradient(
              90deg,
              #48B3F2,
              #0F6FBB
            );

          color:
            white;

          text-decoration:
            none;

          font-size:
            9px;

          font-weight:
            800;

          letter-spacing:
            1.6px;

          box-shadow:
            0 10px 25px
            rgba(15,76,129,0.16);
        }


        .wp-cta__arrow {

          font-size:
            17px;
        }


        /* =================================================
           BENEFICIOS
        ================================================= */

        .wp-benefits {

          margin-top:
            25px;

          display:
            flex;

          gap:
            28px;
        }


        .wp-benefit {

          display:
            flex;

          flex-direction:
            column;

          gap:
            4px;
        }


        .wp-benefit strong {

          color:
            #123B5D;

          font-size:
            16px;
        }


        .wp-benefit span {

          color:
            #64748B;

          font-size:
            6px;

          letter-spacing:
            1.1px;
        }


        /* =================================================
           NAVEGACIÓN
        ================================================= */

        .wp-navigation {

          width:
            100%;

          max-width:
            720px;

          justify-self:
            end;
        }


        .wp-navigation__heading {

          display:
            flex;

          justify-content:
            space-between;

          margin-bottom:
            10px;

          padding:
            0 3px;

          color:
            #64748B;

          font-size:
            7px;

          font-weight:
            750;

          letter-spacing:
            2.2px;
        }


        /* =================================================
           9 PANELES
        ================================================= */

        .wp-accesses {

          display:
            grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap:
            10px;
        }


        /* =================================================
           PANEL
        ================================================= */

        .wp-access {

          min-height:
            128px;

          padding:
            18px 19px;

          display:
            flex;

          flex-direction:
            column;

          justify-content:
            space-between;

          border:
            1px solid
            rgba(15,76,129,0.12);

          border-radius:
            18px;

          background:
            rgba(255,255,255,0.78);

          box-shadow:
            0 8px 25px
            rgba(15,59,93,0.06);

          backdrop-filter:
            blur(15px);

          color:
            #123B5D;

          text-decoration:
            none;

          transition:
            transform 0.22s ease,
            background 0.22s ease,
            box-shadow 0.22s ease,
            border-color 0.22s ease;
        }


        .wp-access:hover {

          transform:
            translateY(-4px);

          background:
            rgba(255,255,255,0.95);

          border-color:
            rgba(15,76,129,0.25);

          box-shadow:
            0 16px 32px
            rgba(15,59,93,0.11);
        }


        /* =================================================
           ICONO DEL PANEL
        ================================================= */

        .wp-access__icon {

          width:
            43px;

          height:
            43px;

          display:
            grid;

          place-items:
            center;

          border-radius:
            50%;

          background:
            #F5FAFD;

          border:
            1px solid
            rgba(45,153,218,0.16);

          color:
            #0F6FBB;
        }


        .wp-access__icon svg {

          width:
            22px;

          height:
            22px;

          stroke-width:
            1.5;
        }


        /* =================================================
           TEXTO PANEL
        ================================================= */

        .wp-access__content h2 {

          margin:
            0;

          color:
            #123B5D;

          font-size:
            17px;

          line-height:
            1;

          font-weight:
            650;

          letter-spacing:
            -0.3px;
        }


        .wp-access__content p {

          margin:
            5px 0 0;

          color:
            #64748B;

          font-size:
            8px;
        }


        /* =================================================
           REDES
           
           EXACTAMENTE IGUALES
        ================================================= */

        .wp-social-access .wp-access__icon {

          color:
            #0F4C81;
        }


        /* =================================================
           FOOTER
        ================================================= */

        .wp-footer {

          position:
            absolute;

          z-index:
            5;

          left:
            4.5vw;

          right:
            4.5vw;

          bottom:
            14px;

          display:
            flex;

          justify-content:
            space-between;

          color:
            #718096;

          font-size:
            6px;

          font-weight:
            700;

          letter-spacing:
            1.5px;
        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 1150px) {

          .wp-content {

            grid-template-columns:
              1fr;

            gap:
              40px;

            padding-bottom:
              90px;
          }


          .wp-intro {

            max-width:
              720px;
          }


          .wp-navigation {

            max-width:
              100%;
          }

        }


        /* =================================================
           MOBILE
           PANTALLA TIPO ANDROID
        ================================================= */

        @media (max-width: 650px) {


          /* -----------------------------------------------
             PANTALLA COMPLETA
          ----------------------------------------------- */

          .wp-home {

            height:
              100dvh;

            min-height:
              100dvh;

            overflow:
              hidden;
          }


          /* -----------------------------------------------
             FONDO
          ----------------------------------------------- */

          .wp-home__image {

            background-position:
              60% center;

            transform:
              scale(1.04);
          }


          .wp-home__overlay {

            background:
              linear-gradient(
                180deg,

                rgba(248,250,252,0.97)
                0%,

                rgba(248,250,252,0.92)
                45%,

                rgba(248,250,252,0.86)
                100%
              );
          }


          /* -----------------------------------------------
             HEADER
          ----------------------------------------------- */

          .wp-header {

            height:
              58px;

            padding:
              0 14px;
          }


          .wp-logo {

            gap:
              7px;
          }


          .wp-logo__mark {

            width:
              32px;

            height:
              32px;

            font-size:
              7px;
          }


          .wp-logo__text strong {

            font-size:
              9px;

            letter-spacing:
              1.5px;
          }


          .wp-logo__text small {

            margin-top:
              3px;

            font-size:
              4.5px;

            letter-spacing:
              1.2px;
          }


          /* -----------------------------------------------
             MENÚ
          ----------------------------------------------- */

          .wp-menu-button {

            height:
              32px;

            padding:
              0 11px;

            gap:
              6px;

            border-radius:
              17px;

            font-size:
              6.5px;
          }


          .wp-menu-button svg {

            width:
              14px;

            height:
              14px;
          }


          .wp-hamburger-menu {

            top:
              53px;

            left:
              14px;

            right:
              14px;

            width:
              auto;

            border-radius:
              14px;
          }


          .wp-hamburger-inner {

            padding:
              10px;
          }


          .wp-hamburger-label {

            font-size:
              6px;

            margin-bottom:
              2px;
          }


          .wp-hamburger-link {

            min-height:
              31px;

            font-size:
              9px;
          }


          /* -----------------------------------------------
             CONTENIDO
          ----------------------------------------------- */

          .wp-content {

            height:
              calc(100dvh - 58px);

            min-height:
              0;

            padding:
              7px 14px 9px;

            display:
              flex;

            flex-direction:
              column;

            justify-content:
              space-between;

            gap:
              5px;
          }


          /* -----------------------------------------------
             INTRO MUY COMPACTA
          ----------------------------------------------- */

          .wp-intro {

            flex:
              0 0 auto;

            max-width:
              100%;
          }


          .wp-location {

            margin-bottom:
              5px;

            gap:
              5px;

            font-size:
              5.5px;

            letter-spacing:
              1.5px;
          }


          .wp-location span {

            width:
              5px;

            height:
              5px;
          }


          .wp-kicker {

            margin:
              0 0 4px;

            font-size:
              5.5px;

            letter-spacing:
              1.5px;
          }


          .wp-intro h1 {

            font-size:
              clamp(28px, 8.5vw, 39px);

            line-height:
              0.88;

            letter-spacing:
              -2px;
          }


          .wp-description {

            max-width:
              330px;

            margin:
              6px 0;

            font-size:
              7px;

            line-height:
              1.25;
          }


          /* -----------------------------------------------
             BOTÓN
          ----------------------------------------------- */

          .wp-cta {

            width:
              175px;

            height:
              31px;

            min-width:
              175px;

            padding:
              0 12px;

            gap:
              10px;

            border-radius:
              18px;

            font-size:
              6px;

            letter-spacing:
              1px;
          }


          .wp-cta__arrow {

            font-size:
              13px;
          }


          /* -----------------------------------------------
             BENEFICIOS
          ----------------------------------------------- */

          .wp-benefits {

            margin-top:
              6px;

            gap:
              13px;
          }


          .wp-benefit {

            gap:
              2px;
          }


          .wp-benefit strong {

            font-size:
              8px;
          }


          .wp-benefit span {

            font-size:
              3.8px;

            letter-spacing:
              0.5px;
          }


          /* -----------------------------------------------
             NAVEGACIÓN
          ----------------------------------------------- */

          .wp-navigation {

            flex:
              1 1 auto;

            min-height:
              0;

            width:
              100%;

            max-width:
              none;

            display:
              flex;

            flex-direction:
              column;
          }


          .wp-navigation__heading {

            flex:
              0 0 auto;

            margin:
              1px 2px 4px;

            font-size:
              5px;

            letter-spacing:
              1.3px;
          }


          /* ===============================================
             3 × 3
             
             COMO PANTALLA DE ANDROID
          =============================================== */

          .wp-accesses {

            flex:
              1 1 auto;

            min-height:
              0;

            display:
              grid;

            grid-template-columns:
              repeat(3, 1fr);

            grid-template-rows:
              repeat(3, minmax(0, 1fr));

            gap:
              5px;
          }


          /* -----------------------------------------------
             TODOS LOS PANELES
          ----------------------------------------------- */

          .wp-access {

            min-height:
              0;

            height:
              100%;

            padding:
              5px 3px;

            border-radius:
              13px;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            flex-direction:
              column;

            gap:
              3px;

            background:
              rgba(255,255,255,0.84);

            border:
              1px solid
              rgba(15,76,129,0.10);

            box-shadow:
              0 4px 12px
              rgba(15,59,93,0.05);

            backdrop-filter:
              blur(10px);
          }


          .wp-access:active {

            transform:
              scale(0.95);

            background:
              #EAF3F8;
          }


          /* -----------------------------------------------
             ICONOS PEQUEÑOS
          ----------------------------------------------- */

          .wp-access__icon {

            width:
              31px;

            height:
              31px;

            min-width:
              31px;

            border-radius:
              50%;

            background:
              #F5FAFD;

            border:
              1px solid
              rgba(45,153,218,0.13);

            box-shadow:
              none;
          }


          .wp-access__icon svg {

            width:
              16px;

            height:
              16px;

            stroke-width:
              1.5;
          }


          /* -----------------------------------------------
             NOMBRES
          ----------------------------------------------- */

          .wp-access__content {

            width:
              100%;

            text-align:
              center;
          }


          .wp-access__content h2 {

            font-size:
              8px;

            line-height:
              1;

            letter-spacing:
              -0.1px;
          }


          /*
             Las descripciones desaparecen
             para que parezca una pantalla
             de aplicación.
          */

          .wp-access__content p {

            display:
              none;
          }


          /* -----------------------------------------------
             FOOTER
          ----------------------------------------------- */

          .wp-footer {

            position:
              relative;

            left:
              auto;

            right:
              auto;

            bottom:
              auto;

            margin:
              1px 0 0;

            padding:
              0;

            text-align:
              center;

            flex:
              0 0 auto;
          }


          .wp-footer span {

            font-size:
              4px;

            letter-spacing:
              0.8px;
          }


          .wp-footer span:last-child {

            display:
              none;
          }

        }


        /* =================================================
           CELULARES MUY PEQUEÑOS
        ================================================= */

        @media (max-width: 380px) {

          .wp-header {

            height:
              54px;
          }


          .wp-content {

            height:
              calc(100dvh - 54px);

            padding:
              5px 11px 7px;
          }


          .wp-intro h1 {

            font-size:
              27px;

            letter-spacing:
              -1.6px;
          }


          .wp-description {

            margin:
              5px 0;

            font-size:
              6.5px;
          }


          .wp-cta {

            width:
              165px;

            min-width:
              165px;

            height:
              29px;

            font-size:
              5.7px;
          }


          .wp-benefits {

            margin-top:
              4px;

            gap:
              10px;
          }


          .wp-accesses {

            gap:
              4px;
          }


          .wp-access {

            border-radius:
              11px;

            padding:
              4px 2px;

            gap:
              2px;
          }


          .wp-access__icon {

            width:
              27px;

            height:
              27px;

            min-width:
              27px;
          }


          .wp-access__icon svg {

            width:
              14px;

            height:
              14px;
          }


          .wp-access__content h2 {

            font-size:
              7px;
          }

        }

      `}</style>

    </main>
  )
}