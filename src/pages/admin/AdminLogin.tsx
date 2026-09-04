import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from 'lucide-react'

import { supabase } from '../../lib/supabase'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (loginError) {
      setError(
        'Correo o contraseña incorrectos. Verifique sus datos.',
      )
      setLoading(false)
      return
    }

    navigate('/admin')
  }

  return (
    <main className="min-h-screen bg-[#020617] px-5 text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center">
        <Link
          to="/"
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-blue-400"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <ShieldCheck size={27} />
          </div>

          <p className="mt-7 text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
            W.P. Administración
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Acceso administrador
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Ingresa para administrar productos, fotos y videos
            de W.P. Limpieza y Mantenimiento.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Mail size={15} />
                Correo electrónico
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@ejemplo.com"
                autoComplete="email"
                required
                className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <LockKeyhole size={15} />
                Contraseña
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </label>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 text-sm font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={18} />

              {loading
                ? 'Ingresando...'
                : 'Ingresar al administrador'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-slate-600">
          W.P. Limpieza & Mantenimiento
        </p>
      </div>
    </main>
  )
}

export default AdminLogin