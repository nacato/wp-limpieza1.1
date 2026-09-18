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
      setError('No se pudieron cargar los productos.')
    } else {
      setProducts((data || []) as Product[])
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033]">

      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-[#D9E2EC] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 md:px-8">

          <Link
            to="/"
            className="group flex items-center gap-3 text-sm font-bold text-[#123B5D] transition hover:text-[#0F4C81]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] transition group-hover:border-[#0F4C81]/30 group-hover:bg-[#EAF3F8]">
              <ArrowLeft size={17} />
            </span>

            <span>W.P. Limpieza</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.25em] text-[#64748B] sm:block">
              W.P. Store
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF3F8] text-[#0F4C81]">
              <ShoppingBag size={17} />
            </div>
          </div>

        </div>
      </header>

      {/* CONTENIDO */}

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8 md:pt-10">

        {/* IDENTIFICACIÓN MÍNIMA */}

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF3F8] text-[#0F4C81]">
            <ShoppingBag size={18} />
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#0F4C81]">
              W.P. Store
            </p>

            <p className="mt-1 text-xs font-medium text-[#64748B]">
              Productos y suministros
            </p>
          </div>
        </div>

        {/* CARGANDO */}

        {loading && (
          <section className="flex min-h-60 items-center justify-center rounded-2xl border border-[#D9E2EC] bg-white">
            <div className="flex items-center gap-3 text-sm font-medium text-[#64748B]">
              <Loader2
                size={20}
                className="animate-spin text-[#0F4C81]"
              />
              Cargando productos...
            </div>
          </section>
        )}

        {/* ERROR */}

        {!loading && error && (
          <section className="rounded-2xl border border-red-200 bg-white p-7">
            <div className="rounded-xl bg-red-50 p-5">
              <p className="text-xs font-black uppercase tracking-wider text-red-600">
                Error de conexión
              </p>

              <p className="mt-2 text-sm leading-6 text-red-800">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={loadProducts}
              className="mt-5 rounded-xl bg-[#123B5D] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0F4C81]"
            >
              Intentar nuevamente
            </button>
          </section>
        )}

        {/* SIN PRODUCTOS */}

        {!loading && !error && products.length === 0 && (
          <section className="rounded-2xl border border-dashed border-[#D9E2EC] bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF3F8] text-[#64748B]">
              <Package size={30} strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 text-xl font-black text-[#123B5D]">
              Próximamente
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#64748B]">
              Actualmente no tenemos productos disponibles para mostrar.
            </p>
          </section>
        )}

        {/* CATÁLOGO DIRECTO */}

        {!loading && !error && products.length > 0 && (
          <section>

            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-semibold text-[#64748B]">
                {products.length}{' '}
                {products.length === 1 ? 'producto disponible' : 'productos disponibles'}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white shadow-[0_8px_25px_rgba(18,59,93,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(18,59,93,0.10)]"
                >

                  {/* IMAGEN */}

                  <div className="relative aspect-square overflow-hidden bg-[#EAF3F8]">

                    {product.imagen_url ? (
                      <img
                        src={product.imagen_url}
                        alt={product.nombre}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#64748B]">
                        <Package
                          size={46}
                          strokeWidth={1.2}
                        />
                      </div>
                    )}

                    {product.categoria && (
                      <span className="absolute left-3 top-3 rounded-full border border-[#D9E2EC] bg-white/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#123B5D] shadow-sm">
                        {product.categoria}
                      </span>
                    )}

                  </div>

                  {/* INFORMACIÓN */}

                  <div className="p-5">

                    <h3 className="text-base font-black leading-tight text-[#172033]">
                      {product.nombre}
                    </h3>

                    {product.descripcion && (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#64748B]">
                        {product.descripcion}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between gap-3">

                      <strong className="text-xl font-black tracking-tight text-[#0F4C81]">
                        ${Number(product.precio).toFixed(2)}
                      </strong>

                      <a
                        href={`https://wa.me/593992699716?text=${encodeURIComponent(
                          `Hola, estoy interesado en el producto "${product.nombre}" con precio de $${Number(
                            product.precio,
                          ).toFixed(2)}.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 items-center gap-2 rounded-xl bg-[#0F4C81] px-4 text-[10px] font-black uppercase tracking-wide text-white transition hover:bg-[#123B5D]"
                      >
                        Consultar
                        <ArrowUpRight size={15} />
                      </a>

                    </div>

                  </div>

                </article>
              ))}

            </div>

          </section>
        )}

        {/* VOLVER */}

        <div className="mt-12 border-t border-[#D9E2EC] pt-7">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#123B5D] transition hover:text-[#0F4C81]"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>

      </main>

      {/* FOOTER */}

      <footer className="border-t border-[#D9E2EC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 md:px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#123B5D]">
            W.P. LIMPIEZA & MANTENIMIENTO
          </p>

          <p className="mt-2 text-xs text-[#64748B]">
            Productos y soluciones para espacios profesionales.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default Products