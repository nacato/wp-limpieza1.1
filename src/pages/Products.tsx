import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Loader2,
  Package,
  ShoppingBag,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import { supabase } from '../lib/supabase'

type Product = {
  id: string
  nombre: string
  descripcion: string | null
  precio: number
  categoria: string | null
  imagen_url: string | null
  disponible: boolean
}

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    setError('')

    const { data, error: productsError } = await supabase
      .from('products')
      .select(
        'id, nombre, descripcion, precio, categoria, imagen_url, disponible',
      )
      .eq('disponible', true)
      .order('created_at', {
        ascending: false,
      })

    if (productsError) {
      console.error(productsError)
      setError(
        'No se pudieron cargar los productos.',
      )
    } else {
      setProducts((data || []) as Product[])
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* HEADER */}

      <header className="flex h-20 items-center justify-between border-b border-white/[0.08] px-5">

        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-blue-400"
        >
          <ArrowLeft size={17} />
          W.P.
        </Link>

        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
          W.P. Store
        </span>

      </header>

      {/* CONTENIDO */}

      <main className="mx-auto max-w-6xl px-5 pb-28 pt-12">

        {/* INTRO */}

        <div className="max-w-2xl">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <ShoppingBag size={21} />
          </div>

          <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
            W.P. Store
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-5xl">
            Productos
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
            Conoce nuestros productos de limpieza y
            mantenimiento disponibles.
          </p>

        </div>

        {/* CARGANDO */}

        {loading && (
          <div className="mt-12 flex min-h-48 items-center justify-center rounded-[2rem] border border-white/[0.08] bg-white/[0.04]">

            <div className="flex items-center gap-3 text-sm text-slate-400">

              <Loader2
                size={20}
                className="animate-spin text-blue-400"
              />

              Cargando productos...

            </div>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="mt-12 rounded-[2rem] border border-red-500/20 bg-red-500/5 p-6">

            <p className="text-sm font-semibold text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-4 rounded-full bg-blue-600 px-5 py-3 text-xs font-bold"
            >
              Intentar nuevamente
            </button>

          </div>
        )}

        {/* SIN PRODUCTOS */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <section className="mt-12 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">

              <Package
                size={42}
                className="mx-auto text-slate-700"
              />

              <h2 className="mt-5 text-xl font-bold">
                Próximamente
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Actualmente no tenemos productos
                disponibles para mostrar.
              </p>

            </section>
          )}

        {/* PRODUCTOS */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <section className="mt-12">

              <div className="mb-6 flex items-end justify-between">

                <div>
                  <p className="text-xs text-slate-600">
                    Catálogo W.P.
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Productos disponibles
                  </h2>
                </div>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold text-slate-500">
                  {products.length}{' '}
                  {products.length === 1
                    ? 'producto'
                    : 'productos'}
                </span>

              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {products.map((product) => (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-blue-500/20"
                  >

                    {/* IMAGEN */}

                    <div className="relative aspect-square overflow-hidden bg-slate-950">

                      {product.imagen_url ? (
                        <img
                          src={product.imagen_url}
                          alt={product.nombre}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">

                          <Package
                            size={48}
                            className="text-slate-700"
                          />

                        </div>
                      )}

                      {product.categoria && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#020617]/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur">
                          {product.categoria}
                        </span>
                      )}

                    </div>

                    {/* INFORMACIÓN */}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="text-lg font-bold">
                          {product.nombre}
                        </h3>

                        <strong className="whitespace-nowrap text-lg text-blue-400">
                          $
                          {Number(product.precio).toFixed(
                            2,
                          )}
                        </strong>

                      </div>

                      {product.descripcion && (
                        <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-500">
                          {product.descripcion}
                        </p>
                      )}

                      <a
                        href={`https://wa.me/593992699716?text=${encodeURIComponent(
                          `Hola, estoy interesado en el producto "${product.nombre}" con precio de $${Number(
                            product.precio,
                          ).toFixed(2)}.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 text-xs font-bold transition hover:bg-blue-500"
                      >
                        Consultar por WhatsApp
                        <ArrowUpRight size={16} />
                      </a>

                    </div>

                  </article>
                ))}

              </div>

            </section>
          )}

        {/* VOLVER */}

        <Link
          to="/"
          className="mt-12 inline-flex items-center text-sm font-semibold text-blue-400"
        >
          <ArrowLeft size={16} className="mr-2" />
          Volver al inicio
        </Link>

      </main>
    </div>
  )
}

export default Products