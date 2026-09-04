import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Boxes,
  Image,
  LogOut,
  Package,
  Plus,
  ShieldCheck,
  Video,
} from 'lucide-react'

import type { User } from '@supabase/supabase-js'

import { supabase } from '../../lib/supabase'

function Admin() {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) {
        return
      }

      if (!session) {
        navigate('/admin/login', {
          replace: true,
        })
        return
      }

      setUser(session.user)
      setChecking(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate('/admin/login', {
            replace: true,
          })
          return
        }

        setUser(session.user)
        setChecking(false)
      },
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()

    navigate('/admin/login', {
      replace: true,
    })
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

          <p className="mt-5 text-sm text-slate-400">
            Verificando acceso...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <header className="border-b border-white/[0.08] bg-[#020617]/95">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-bold text-blue-400"
          >
            <ArrowLeft size={18} />
            W.P.
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-red-500/30 hover:text-red-300"
          >
            <LogOut size={15} />
            Salir
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        <div className="rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-blue-950/50 via-white/[0.04] to-white/[0.02] p-6 md:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <ShieldCheck size={28} />
          </div>

          <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
            Panel de administración
          </p>

          <h1 className="mt-3 text-3xl font-black md:text-4xl">
            Bienvenido a W.P. Admin
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            Desde aquí podrás administrar los productos y la
            galería de fotos y videos de W.P. Limpieza y
            Mantenimiento.
          </p>

          {user?.email && (
            <p className="mt-5 text-xs text-slate-500">
              Sesión iniciada como:{' '}
              <span className="font-semibold text-slate-300">
                {user.email}
              </span>
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            to="/admin/productos"
            className="group rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Package size={22} />
              </div>

              <Plus
                size={19}
                className="text-slate-600 transition group-hover:text-blue-400"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Productos
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Agregar productos, precios, imágenes,
              categorías y disponibilidad.
            </p>
          </Link>

          <Link
            to="/admin/galeria"
            className="group rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Image size={22} />
              </div>

              <Plus
                size={19}
                className="text-slate-600 transition group-hover:text-blue-400"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Galería
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Administrar fotografías de trabajos realizados.
            </p>
          </Link>

          <Link
            to="/admin/galeria"
            className="group rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Video size={22} />
              </div>

              <Plus
                size={19}
                className="text-slate-600 transition group-hover:text-blue-400"
              />
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Videos
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Subir y administrar videos de los trabajos de
              W.P.
            </p>
          </Link>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6">
          <div className="flex items-center gap-3">
            <Boxes
              size={20}
              className="text-blue-400"
            />

            <h2 className="font-bold">
              Sistema W.P.
            </h2>
          </div>

          <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.03] p-4">
              <strong className="block text-white">
                Supabase
              </strong>
              Base de datos y almacenamiento.
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4">
              <strong className="block text-white">
                Productos
              </strong>
              Catálogo administrable.
            </div>

            <div className="rounded-2xl bg-white/[0.03] p-4">
              <strong className="block text-white">
                Galería
              </strong>
              Fotos y videos.
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin