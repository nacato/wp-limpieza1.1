import { ArrowLeft, ArrowUpRight, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

function Products() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
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

      <main className="mx-auto max-w-md px-5 pb-28 pt-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
          <ShoppingBag size={21} />
        </div>

        <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
          W.P. Store
        </p>

        <h1 className="mt-4 text-4xl font-black">
          Productos
        </h1>

        <p className="mt-5 text-sm leading-7 text-slate-400">
          Nuestra futura tienda de productos de limpieza y
          mantenimiento.
        </p>

        <section className="mt-10 rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <ShoppingBag size={28} />
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            Nuestra tienda
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Aquí construiremos el catálogo de productos de W.P.
            con fotografías, información, precios y disponibilidad.
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-5">
            <p className="text-sm font-semibold">
              Catálogo próximamente
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Posteriormente incorporaremos carrito de compras,
              pedidos y gestión de productos.
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex items-center text-sm font-semibold text-blue-400"
          >
            Volver al inicio
            <ArrowUpRight size={16} className="ml-2" />
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Products