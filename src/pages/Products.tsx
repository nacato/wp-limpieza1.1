import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  MapPin,
  Navigation,
  MessageCircle,
  CreditCard,
  Package,
  Home,
  Store,
  CheckCircle2,
  Loader2,
} from 'lucide-react'

type Product = {
  id: string
  nombre: string
  descripcion: string | null
  precio: number
  categoria: string | null
  imagen_url: string | null
  disponible: boolean
}

type CartItem = Product & {
  cantidad: number
}

type DeliveryLocation = {
  lat: number
  lng: number
}

const WHATSAPP_NUMBER = '593979678105'

const IVA_RATE = 0.15

const DELIVERY_FEE = 3.0

// ==========================================
// DATOS BANCARIOS
// CAMBIA ESTOS DATOS POR LOS REALES
// ==========================================

const BANK_NAME = 'BANCO XXXXX'
const BANK_ACCOUNT = 'XXXXXXXXXX'
const BANK_TYPE = 'Cuenta corriente'
const BANK_HOLDER = 'W.P. LIMPIEZA Y MANTENIMIENTO'
const BANK_ID = 'XXXXXXXXXX'

// ==========================================
// LOCAL STORAGE
// ==========================================

const CART_STORAGE_KEY = 'wp-limpieza-carrito'

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [cart, setCart] = useState<CartItem[]>([])

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const [deliveryType, setDeliveryType] = useState<
    'domicilio' | 'retiro'
  >('domicilio')

  const [deliveryLocation, setDeliveryLocation] =
    useState<DeliveryLocation | null>(null)

  const [locating, setLocating] = useState(false)

  const [sendingOrder, setSendingOrder] = useState(false)

  // ==========================================
  // CARGAR CARRITO
  // ==========================================

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error cargando carrito:', error)
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  // ==========================================
  // GUARDAR CARRITO
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart),
    )
  }, [cart])

  // ==========================================
  // CARGAR PRODUCTOS DESDE SUPABASE
  // ==========================================

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)

    const { data, error } = await supabase
      .from('products')
      .select(
        `
        id,
        nombre,
        descripcion,
        precio,
        categoria,
        imagen_url,
        disponible
        `,
      )
      .eq('disponible', true)
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      console.error('Error cargando productos:', error)
      setProducts([])
    } else {
      setProducts(data || [])
    }

    setLoading(false)
  }

  // ==========================================
  // CARRITO
  // ==========================================

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id,
      )

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          cantidad: 1,
        },
      ]
    })
  }

  function increaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item,
      ),
    )
  }

  function decreaseQuantity(id: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    )
  }

  function removeFromCart(id: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id),
    )
  }

  function clearCart() {
    setCart([])
  }

  // ==========================================
  // TOTALES
  // ==========================================

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.precio) * item.cantidad,
      0,
    )
  }, [cart])

  const iva = subtotal * IVA_RATE

  const deliveryCost =
    deliveryType === 'domicilio'
      ? DELIVERY_FEE
      : 0

  const total = subtotal + iva + deliveryCost

  const cartQuantity = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.cantidad,
      0,
    )
  }, [cart])

  // ==========================================
  // UBICACIÓN ACTUAL
  // ==========================================

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert(
        'Tu navegador no permite obtener la ubicación.',
      )

      return
    }

    setLocating(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setDeliveryLocation(location)
        setLocating(false)
      },

      (error) => {
        console.error(
          'Error obteniendo ubicación:',
          error,
        )

        setLocating(false)

        alert(
          'No se pudo obtener tu ubicación. Activa el permiso de ubicación del navegador e inténtalo nuevamente.',
        )
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  // ==========================================
  // GOOGLE MAPS
  // ==========================================

  const googleMapsUrl = deliveryLocation
    ? `https://www.google.com/maps?q=${deliveryLocation.lat},${deliveryLocation.lng}`
    : ''

  // ==========================================
  // ABRIR CHECKOUT
  // ==========================================

  function openCheckout() {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }

    setCartOpen(false)
    setCheckoutOpen(true)
  }

  // ==========================================
  // CAMBIO DE ENTREGA
  // ==========================================

  function handleDeliveryChange(
    type: 'domicilio' | 'retiro',
  ) {
    setDeliveryType(type)

    if (type === 'retiro') {
      setDeliveryLocation(null)
    }
  }

  // ==========================================
  // ENVIAR PEDIDO A WHATSAPP
  // ==========================================

  function sendOrderToWhatsApp() {
    if (sendingOrder) return

    if (!customerName.trim()) {
      alert('Ingresa tu nombre.')
      return
    }

    if (!customerPhone.trim()) {
      alert('Ingresa tu número de teléfono.')
      return
    }

    if (cart.length === 0) {
      alert('El carrito está vacío.')
      return
    }

    if (
      deliveryType === 'domicilio' &&
      !deliveryLocation
    ) {
      alert(
        'Primero debes usar tu ubicación actual para el domicilio.',
      )

      return
    }

    setSendingOrder(true)

    const productLines = cart
      .map(
        (item) =>
          `• ${item.nombre} x${item.cantidad} — $${(
            Number(item.precio) * item.cantidad
          ).toFixed(2)}`,
      )
      .join('\n')

    const deliveryText =
      deliveryType === 'domicilio'
        ? `Domicilio — $${DELIVERY_FEE.toFixed(2)}`
        : 'Retiro en local — $0.00'

    const locationText =
      deliveryType === 'domicilio'
        ? `Ubicación actual:
${googleMapsUrl}`
        : 'El cliente retirará el pedido en el local.'

    const message = `Hola, W.P. Limpieza 👋

Quiero realizar el siguiente pedido:

${productLines}

━━━━━━━━━━━━━━━━━━

Subtotal: $${subtotal.toFixed(2)}
IVA 15%: $${iva.toFixed(2)}
Entrega: ${deliveryText}

TOTAL: $${total.toFixed(2)}

━━━━━━━━━━━━━━━━━━

DATOS DEL CLIENTE

Nombre: ${customerName.trim()}
Teléfono: ${customerPhone.trim()}

━━━━━━━━━━━━━━━━━━

FORMA DE ENTREGA

${locationText}

━━━━━━━━━━━━━━━━━━

FORMA DE PAGO

Transferencia bancaria.

DATOS PARA LA TRANSFERENCIA

Banco: ${BANK_NAME}
Tipo: ${BANK_TYPE}
Cuenta: ${BANK_ACCOUNT}
Titular: ${BANK_HOLDER}
Cédula/RUC: ${BANK_ID}

Enviaré el comprobante de transferencia por este medio.

Gracias.`

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer',
    )

    setTimeout(() => {
      clearCart()

      setCheckoutOpen(false)

      setCustomerName('')
      setCustomerPhone('')

      setDeliveryType('domicilio')
      setDeliveryLocation(null)

      setSendingOrder(false)
    }, 500)
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6">
          <div className="flex items-center gap-3 text-[#64748B]">
            <Loader2 className="h-5 w-5 animate-spin" />

            <span>Cargando productos...</span>
          </div>
        </div>
      </main>
    )
  }

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#172033]">

      {/* ======================================
          HEADER
      ======================================= */}

      <section className="border-b border-[#D9E2EC] bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

          <div className="flex items-end justify-between gap-6">

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0F4C81]">
                W.P. Limpieza
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#123B5D] sm:text-4xl">
                Productos
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                Productos para limpieza, mantenimiento y
                cuidado profesional.
              </p>
            </div>

            {/* CARRITO */}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D9E2EC] bg-white text-[#123B5D] transition hover:border-[#0F4C81] hover:bg-[#EAF3F8]"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartQuantity > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0F4C81] px-1 text-[10px] font-bold text-white">
                  {cartQuantity}
                </span>
              )}
            </button>

          </div>

        </div>

      </section>

      {/* ======================================
          PRODUCTOS
      ======================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        {products.length === 0 ? (

          <div className="rounded-2xl border border-[#D9E2EC] bg-white px-6 py-16 text-center">

            <Package className="mx-auto h-10 w-10 text-[#64748B]" />

            <h2 className="mt-5 text-lg font-semibold text-[#123B5D]">
              No hay productos disponibles
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Actualmente no existen productos publicados.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (

              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#D9E2EC] bg-white transition hover:-translate-y-1 hover:border-[#B8C9D8] hover:shadow-lg"
              >

                {/* IMAGEN */}

                <div className="relative aspect-square overflow-hidden bg-[#EAF3F8]">

                  {product.imagen_url ? (

                    <img
                      src={product.imagen_url}
                      alt={product.nombre}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center text-[#64748B]">

                      <Package className="h-12 w-12" />

                    </div>

                  )}

                </div>

                {/* INFORMACIÓN */}

                <div className="p-5">

                  {product.categoria && (
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0F4C81]">
                      {product.categoria}
                    </p>
                  )}

                  <h2 className="mt-2 line-clamp-2 text-base font-semibold text-[#123B5D]">
                    {product.nombre}
                  </h2>

                  {product.descripcion && (
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#64748B]">
                      {product.descripcion}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between gap-4">

                    <span className="text-xl font-bold text-[#123B5D]">
                      ${Number(product.precio).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0F4C81] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123B5D]"
                    >
                      <Plus className="h-4 w-4" />
                      Agregar
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* ======================================
          CARRITO
      ======================================= */}

      {cartOpen && (

        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-[#172033]/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* HEADER CARRITO */}

            <div className="flex items-center justify-between border-b border-[#D9E2EC] px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F4C81]">
                  Tu pedido
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#123B5D]">
                  Carrito
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] hover:bg-[#EAF3F8]"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* PRODUCTOS CARRITO */}

            <div className="flex-1 overflow-y-auto px-6 py-5">

              {cart.length === 0 ? (

                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                  <ShoppingCart className="h-10 w-10 text-[#64748B]" />

                  <p className="mt-4 text-sm font-medium text-[#123B5D]">
                    Tu carrito está vacío
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Agrega productos para continuar.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="rounded-xl border border-[#D9E2EC] p-4"
                    >

                      <div className="flex gap-4">

                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#EAF3F8]">

                          {item.imagen_url ? (

                            <img
                              src={item.imagen_url}
                              alt={item.nombre}
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center">
                              <Package className="h-6 w-6 text-[#64748B]" />
                            </div>

                          )}

                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex items-start justify-between gap-2">

                            <h3 className="line-clamp-2 text-sm font-semibold text-[#123B5D]">
                              {item.nombre}
                            </h3>

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="shrink-0 text-[#64748B] hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                          </div>

                          <p className="mt-1 text-sm font-semibold text-[#0F4C81]">
                            ${Number(item.precio).toFixed(2)}
                          </p>

                          <div className="mt-3 flex items-center justify-between">

                            <div className="flex items-center overflow-hidden rounded-lg border border-[#D9E2EC]">

                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center text-[#123B5D] hover:bg-[#EAF3F8]"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>

                              <span className="flex h-8 min-w-8 items-center justify-center border-x border-[#D9E2EC] text-xs font-semibold">
                                {item.cantidad}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(item.id)
                                }
                                className="flex h-8 w-8 items-center justify-center text-[#123B5D] hover:bg-[#EAF3F8]"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>

                            </div>

                            <span className="text-sm font-bold text-[#172033]">
                              $
                              {(
                                Number(item.precio) *
                                item.cantidad
                              ).toFixed(2)}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* TOTAL CARRITO */}

            {cart.length > 0 && (

              <div className="border-t border-[#D9E2EC] px-6 py-5">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-[#64748B]">
                    Subtotal
                  </span>

                  <span className="text-sm font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="mt-2 flex items-center justify-between">

                  <span className="text-sm text-[#64748B]">
                    IVA 15%
                  </span>

                  <span className="text-sm font-semibold">
                    ${iva.toFixed(2)}
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#D9E2EC] pt-4">

                  <span className="font-semibold text-[#123B5D]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#0F4C81]">
                    ${total.toFixed(2)}
                  </span>

                </div>

                <button
                  type="button"
                  onClick={openCheckout}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#123B5D]"
                >
                  Continuar pedido
                  <Navigation className="h-4 w-4" />
                </button>

              </div>

            )}

          </aside>

        </div>

      )}

      {/* ======================================
          CHECKOUT
      ======================================= */}

      {checkoutOpen && (

        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#172033]/50 px-4 py-6 backdrop-blur-sm sm:px-6">

          <div className="mx-auto max-w-2xl rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#D9E2EC] px-6 py-5">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0F4C81]">
                  Finalizar pedido
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#123B5D]">
                  Datos de entrega
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] hover:bg-[#EAF3F8]"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="space-y-7 p-6">

              {/* DATOS CLIENTE */}

              <section>

                <h3 className="text-sm font-semibold text-[#123B5D]">
                  Datos del cliente
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-xs font-medium text-[#64748B]">
                      Nombre completo
                    </label>

                    <input
                      type="text"
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(event.target.value)
                      }
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#EAF3F8]"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-medium text-[#64748B]">
                      Teléfono
                    </label>

                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(event) =>
                        setCustomerPhone(event.target.value)
                      }
                      placeholder="099..."
                      className="w-full rounded-xl border border-[#D9E2EC] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#EAF3F8]"
                    />

                  </div>

                </div>

              </section>

              {/* ENTREGA */}

              <section>

                <h3 className="text-sm font-semibold text-[#123B5D]">
                  Forma de entrega
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  {/* DOMICILIO */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeliveryChange('domicilio')
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      deliveryType === 'domicilio'
                        ? 'border-[#0F4C81] bg-[#EAF3F8]'
                        : 'border-[#D9E2EC] bg-white hover:border-[#B8C9D8]'
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#0F4C81]">
                        <Home className="h-5 w-5" />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-[#123B5D]">
                          Domicilio
                        </p>

                        <p className="mt-1 text-xs text-[#64748B]">
                          Entrega a tu ubicación
                        </p>

                      </div>

                    </div>

                  </button>

                  {/* RETIRO */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeliveryChange('retiro')
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      deliveryType === 'retiro'
                        ? 'border-[#0F4C81] bg-[#EAF3F8]'
                        : 'border-[#D9E2EC] bg-white hover:border-[#B8C9D8]'
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#0F4C81]">
                        <Store className="h-5 w-5" />
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-[#123B5D]">
                          Retiro en local
                        </p>

                        <p className="mt-1 text-xs text-[#64748B]">
                          Retira tu pedido
                        </p>

                      </div>

                    </div>

                  </button>

                </div>

              </section>

              {/* UBICACIÓN */}

              {deliveryType === 'domicilio' && (

                <section>

                  <div className="rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] p-5">

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3F8] text-[#0F4C81]">
                        <MapPin className="h-5 w-5" />
                      </div>

                      <div className="flex-1">

                        <h3 className="text-sm font-semibold text-[#123B5D]">
                          Ubicación de entrega
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-[#64748B]">
                          Permite que el navegador use tu
                          ubicación actual para enviar el
                          punto exacto de entrega por WhatsApp.
                        </p>

                      </div>

                    </div>

                    {!deliveryLocation ? (

                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={locating}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#123B5D] disabled:cursor-not-allowed disabled:opacity-60"
                      >

                        {locating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Obteniendo ubicación...
                          </>
                        ) : (
                          <>
                            <Navigation className="h-4 w-4" />
                            Usar mi ubicación actual
                          </>
                        )}

                      </button>

                    ) : (

                      <div className="mt-5 rounded-xl border border-[#B8D8C0] bg-white p-4">

                        <div className="flex items-start gap-3">

                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                          <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-[#123B5D]">
                              Ubicación obtenida
                            </p>

                            <p className="mt-1 break-all text-xs leading-5 text-[#64748B]">
                              {deliveryLocation.lat.toFixed(
                                6,
                              )}
                              ,{' '}
                              {deliveryLocation.lng.toFixed(
                                6,
                              )}
                            </p>

                            <a
                              href={googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#0F4C81] hover:underline"
                            >
                              <MapPin className="h-3.5 w-3.5" />
                              Ver ubicación
                            </a>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          disabled={locating}
                          className="mt-4 w-full rounded-lg border border-[#D9E2EC] px-4 py-2.5 text-xs font-semibold text-[#123B5D] transition hover:bg-[#F8FAFC]"
                        >
                          {locating
                            ? 'Actualizando...'
                            : 'Actualizar ubicación'}
                        </button>

                      </div>

                    )}

                  </div>

                </section>

              )}

              {/* FORMA DE PAGO */}

              <section>

                <h3 className="text-sm font-semibold text-[#123B5D]">
                  Forma de pago
                </h3>

                <div className="mt-4 rounded-xl border border-[#0F4C81] bg-[#EAF3F8] p-4">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0F4C81]">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-[#123B5D]">
                        Transferencia bancaria
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#64748B]">
                        Realiza la transferencia y envía
                        el comprobante por WhatsApp.
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 rounded-lg bg-white p-4">

                    <div className="grid gap-3 text-xs">

                      <div className="flex justify-between gap-4">
                        <span className="text-[#64748B]">
                          Banco
                        </span>
                        <span className="text-right font-semibold text-[#123B5D]">
                          {BANK_NAME}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#64748B]">
                          Tipo
                        </span>
                        <span className="text-right font-semibold text-[#123B5D]">
                          {BANK_TYPE}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#64748B]">
                          Cuenta
                        </span>
                        <span className="text-right font-semibold text-[#123B5D]">
                          {BANK_ACCOUNT}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#64748B]">
                          Titular
                        </span>
                        <span className="text-right font-semibold text-[#123B5D]">
                          {BANK_HOLDER}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#64748B]">
                          Cédula/RUC
                        </span>
                        <span className="text-right font-semibold text-[#123B5D]">
                          {BANK_ID}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

              </section>

              {/* RESUMEN */}

              <section>

                <h3 className="text-sm font-semibold text-[#123B5D]">
                  Resumen del pedido
                </h3>

                <div className="mt-4 rounded-xl border border-[#D9E2EC] bg-white p-5">

                  <div className="space-y-3">

                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">
                        Subtotal
                      </span>
                      <span className="font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">
                        IVA 15%
                      </span>
                      <span className="font-semibold">
                        ${iva.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">
                        Entrega
                      </span>
                      <span className="font-semibold">
                        {deliveryType === 'domicilio'
                          ? `$${DELIVERY_FEE.toFixed(2)}`
                          : '$0.00'}
                      </span>
                    </div>

                    <div className="border-t border-[#D9E2EC] pt-4">

                      <div className="flex items-center justify-between">

                        <span className="font-semibold text-[#123B5D]">
                          Total
                        </span>

                        <span className="text-2xl font-bold text-[#0F4C81]">
                          ${total.toFixed(2)}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </section>

              {/* BOTÓN WHATSAPP */}

              <button
                type="button"
                onClick={sendOrderToWhatsApp}
                disabled={sendingOrder}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#123B5D] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {sendingOrder ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Preparando pedido...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5" />
                    Enviar pedido por WhatsApp
                  </>
                )}

              </button>

              <p className="text-center text-[11px] leading-5 text-[#64748B]">
                Al continuar se abrirá WhatsApp con el
                detalle del pedido, total, datos de
                transferencia y ubicación de entrega.
              </p>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}