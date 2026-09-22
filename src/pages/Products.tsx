import { useEffect, useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'
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
  FileText,
  Download,
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

const CART_STORAGE_KEY = 'wp-limpieza-carrito'
const ORDER_NUMBER_KEY = 'wp-limpieza-numero-pedido'

// ==========================================
// GENERAR NÚMERO DE PEDIDO
// ==========================================

function generateOrderNumber() {
  const currentNumber = Number(
    localStorage.getItem(ORDER_NUMBER_KEY) || '0',
  )

  const nextNumber = currentNumber + 1

  localStorage.setItem(
    ORDER_NUMBER_KEY,
    String(nextNumber),
  )

  return `WP-${String(nextNumber).padStart(4, '0')}`
}

// ==========================================
// COMPONENTE
// ==========================================

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [cart, setCart] = useState<CartItem[]>([])

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const [deliveryType, setDeliveryType] = useState<
    'domicilio' | 'retiro'
  >('domicilio')

  const [deliveryLocation, setDeliveryLocation] =
    useState<DeliveryLocation | null>(null)

  const [locating, setLocating] = useState(false)
  const [sendingOrder, setSendingOrder] = useState(false)

  const [orderNumber, setOrderNumber] = useState('')

  // ==========================================
  // CARGAR CARRITO
  // ==========================================

  useEffect(() => {
    const savedCart = localStorage.getItem(
      CART_STORAGE_KEY,
    )

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error(
          'Error cargando carrito:',
          error,
        )

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
  // PRODUCTOS SUPABASE
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
      console.error(
        'Error cargando productos:',
        error,
      )

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
      currentCart.filter(
        (item) => item.id !== id,
      ),
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
        total +
        Number(item.precio) * item.cantidad,
      0,
    )
  }, [cart])

  const iva = subtotal * IVA_RATE

  const deliveryCost =
    deliveryType === 'domicilio'
      ? DELIVERY_FEE
      : 0

  const total =
    subtotal + iva + deliveryCost

  const cartQuantity = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.cantidad,
      0,
    )
  }, [cart])

  // ==========================================
  // UBICACIÓN
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
        setDeliveryLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })

        setLocating(false)
      },

      (error) => {
        console.error(
          'Error de ubicación:',
          error,
        )

        setLocating(false)

        alert(
          'No se pudo obtener tu ubicación. Activa el permiso de ubicación del navegador.',
        )
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    )
  }

  const googleMapsUrl = deliveryLocation
    ? `https://www.google.com/maps?q=${deliveryLocation.lat},${deliveryLocation.lng}`
    : ''

  // ==========================================
  // CHECKOUT
  // ==========================================

  function openCheckout() {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }

    setCartOpen(false)
    setCheckoutOpen(true)
  }

  function handleDeliveryChange(
    type: 'domicilio' | 'retiro',
  ) {
    setDeliveryType(type)

    if (type === 'retiro') {
      setDeliveryLocation(null)
    }
  }

  // ==========================================
  // GENERAR PDF
  // ==========================================

  function generatePDF(
    currentOrderNumber: string,
  ) {
    const doc = new jsPDF()

    const pageWidth =
      doc.internal.pageSize.getWidth()

    let y = 20

    // ------------------------------------------
    // ENCABEZADO
    // ------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'W.P. LIMPIEZA',
      20,
      y,
    )

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)

    doc.text(
      'Limpieza y Mantenimiento',
      20,
      y,
    )

    y += 12

    doc.setDrawColor(217, 226, 236)

    doc.line(
      20,
      y,
      pageWidth - 20,
      y,
    )

    y += 12

    // ------------------------------------------
    // PEDIDO
    // ------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'COMPROBANTE DE PEDIDO',
      20,
      y,
    )

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100, 116, 139)

    doc.text(
      `Pedido: ${currentOrderNumber}`,
      20,
      y,
    )

    y += 6

    const date = new Date()

    doc.text(
      `Fecha: ${date.toLocaleDateString(
        'es-EC',
      )} ${date.toLocaleTimeString(
        'es-EC',
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      )}`,
      20,
      y,
    )

    y += 12

    // ------------------------------------------
    // CLIENTE
    // ------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'DATOS DEL CLIENTE',
      20,
      y,
    )

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(23, 32, 51)

    doc.text(
      `Nombre: ${customerName}`,
      20,
      y,
    )

    y += 6

    doc.text(
      `Teléfono: ${customerPhone}`,
      20,
      y,
    )

    y += 12

    // ------------------------------------------
    // PRODUCTOS
    // ------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'PRODUCTOS',
      20,
      y,
    )

    y += 8

    doc.setFontSize(9)

    cart.forEach((item) => {
      const itemTotal =
        Number(item.precio) *
        item.cantidad

      const productName =
        item.nombre.length > 55
          ? item.nombre.substring(0, 52) +
            '...'
          : item.nombre

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(23, 32, 51)

      doc.text(
        `${item.cantidad} × ${productName}`,
        20,
        y,
      )

      doc.text(
        `$${itemTotal.toFixed(2)}`,
        pageWidth - 20,
        y,
        {
          align: 'right',
        },
      )

      y += 6
    })

    y += 5

    doc.setDrawColor(217, 226, 236)

    doc.line(
      20,
      y,
      pageWidth - 20,
      y,
    )

    y += 9

    // ------------------------------------------
    // TOTALES
    // ------------------------------------------

    doc.setFontSize(10)

    doc.text(
      'Subtotal',
      20,
      y,
    )

    doc.text(
      `$${subtotal.toFixed(2)}`,
      pageWidth - 20,
      y,
      {
        align: 'right',
      },
    )

    y += 7

    doc.text(
      'IVA 15%',
      20,
      y,
    )

    doc.text(
      `$${iva.toFixed(2)}`,
      pageWidth - 20,
      y,
      {
        align: 'right',
      },
    )

    y += 7

    doc.text(
      'Entrega',
      20,
      y,
    )

    doc.text(
      `$${deliveryCost.toFixed(2)}`,
      pageWidth - 20,
      y,
      {
        align: 'right',
      },
    )

    y += 9

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(15, 76, 129)

    doc.text(
      'TOTAL',
      20,
      y,
    )

    doc.text(
      `$${total.toFixed(2)}`,
      pageWidth - 20,
      y,
      {
        align: 'right',
      },
    )

    y += 14

    // ------------------------------------------
    // ENTREGA
    // ------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'ENTREGA',
      20,
      y,
    )

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(23, 32, 51)

    doc.text(
      deliveryType === 'domicilio'
        ? 'Domicilio'
        : 'Retiro en local',
      20,
      y,
    )

    y += 7

    if (
      deliveryType === 'domicilio' &&
      googleMapsUrl
    ) {
      doc.setFontSize(8)
      doc.setTextColor(15, 76, 129)

      doc.text(
        'Ubicación:',
        20,
        y,
      )

      y += 5

      doc.text(
        googleMapsUrl,
        20,
        y,
      )

      y += 8
    }

    // ------------------------------------------
    // PAGO
    // ------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'FORMA DE PAGO',
      20,
      y,
    )

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(23, 32, 51)

    doc.text(
      'Transferencia bancaria',
      20,
      y,
    )

    y += 6

    doc.text(
      `Banco: ${BANK_NAME}`,
      20,
      y,
    )

    y += 5

    doc.text(
      `Cuenta: ${BANK_ACCOUNT}`,
      20,
      y,
    )

    y += 5

    doc.text(
      `Titular: ${BANK_HOLDER}`,
      20,
      y,
    )

    y += 12

    // ------------------------------------------
    // PIE
    // ------------------------------------------

    doc.setDrawColor(217, 226, 236)

    doc.line(
      20,
      y,
      pageWidth - 20,
      y,
    )

    y += 9

    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)

    doc.text(
      'Este documento es un comprobante de pedido.',
      20,
      y,
    )

    y += 5

    doc.text(
      'El pedido será procesado una vez verificado el pago.',
      20,
      y,
    )

    doc.save(
      `Pedido-${currentOrderNumber}.pdf`,
    )
  }

  // ==========================================
  // MENSAJE WHATSAPP
  // ==========================================

  function buildWhatsAppMessage(
    currentOrderNumber: string,
  ) {
    const productLines = cart
      .map(
        (item) =>
          `• ${item.nombre} ×${item.cantidad} — $${(
            Number(item.precio) *
            item.cantidad
          ).toFixed(2)}`,
      )
      .join('\n')

    const locationText =
      deliveryType === 'domicilio'
        ? `📍 Ubicación:
${googleMapsUrl}`
        : '🏪 Retiro en local'

    return `🧼 W.P. LIMPIEZA Y MANTENIMIENTO

🛒 *NUEVO PEDIDO ${currentOrderNumber}*
━━━━━━━━━━━━━━━━━━

👤 *CLIENTE*
${customerName.trim()}
📱 ${customerPhone.trim()}

📦 *PRODUCTOS*
${productLines}

━━━━━━━━━━━━━━━━━━

💰 *RESUMEN*
Subtotal: $${subtotal.toFixed(2)}
IVA 15%: $${iva.toFixed(2)}
Entrega: $${deliveryCost.toFixed(2)}

💵 *TOTAL: $${total.toFixed(2)}*

━━━━━━━━━━━━━━━━━━

🚚 *ENTREGA*
${locationText}

━━━━━━━━━━━━━━━━━━

💳 *PAGO*
Transferencia bancaria

🏦 Banco: ${BANK_NAME}
💳 Cuenta: ${BANK_ACCOUNT}
👤 Titular: ${BANK_HOLDER}
🪪 Cédula/RUC: ${BANK_ID}

📎 El cliente enviará el comprobante de transferencia por este medio.

📄 Comprobante del pedido generado:
Pedido ${currentOrderNumber}

Gracias por confiar en *W.P. Limpieza*. 🧼`
  }

  // ==========================================
  // FINALIZAR PEDIDO
  // ==========================================

  function finishOrder() {
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
        'Usa tu ubicación actual para continuar.',
      )

      return
    }

    setSendingOrder(true)

    const newOrderNumber =
      generateOrderNumber()

    setOrderNumber(newOrderNumber)

    // Generamos el PDF inmediatamente
    generatePDF(newOrderNumber)

    // Construimos WhatsApp
    const message =
      buildWhatsAppMessage(
        newOrderNumber,
      )

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`

    // Abrimos WhatsApp
    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer',
    )

    // Mostramos pantalla de éxito
    setTimeout(() => {
      setCheckoutOpen(false)
      setSuccessOpen(true)
      setSendingOrder(false)
    }, 500)
  }

  // ==========================================
  // CERRAR ÉXITO
  // ==========================================

  function finishAndClear() {
    clearCart()

    setSuccessOpen(false)

    setCustomerName('')
    setCustomerPhone('')

    setDeliveryType('domicilio')
    setDeliveryLocation(null)
    setOrderNumber('')
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8FAFC]">

        <div className="flex min-h-[50vh] items-center justify-center">

          <div className="flex items-center gap-2 text-sm text-[#64748B]">

            <Loader2 className="h-5 w-5 animate-spin" />

            Cargando productos...

          </div>

        </div>

      </main>
    )
  }

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 text-[#172033]">

      {/* ======================================
          HEADER
      ======================================= */}

      <header className="sticky top-0 z-30 border-b border-[#D9E2EC] bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#0F4C81]">
              W.P. LIMPIEZA
            </p>

            <h1 className="text-lg font-bold leading-none text-[#123B5D]">
              Productos
            </h1>

          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9E2EC] bg-white text-[#123B5D]"
          >

            <ShoppingCart className="h-5 w-5" />

            {cartQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0F4C81] px-1 text-[10px] font-bold text-white">
                {cartQuantity}
              </span>
            )}

          </button>

        </div>

      </header>

      {/* ======================================
          PRODUCTOS
      ======================================= */}

      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-8">

        {products.length === 0 ? (

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-10 text-center">

            <Package className="mx-auto h-8 w-8 text-[#64748B]" />

            <p className="mt-3 text-sm text-[#64748B]">
              No hay productos disponibles.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (

              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#D9E2EC] bg-white"
              >

                {/* IMAGEN */}

                <div className="aspect-square overflow-hidden bg-[#EAF3F8]">

                  {product.imagen_url ? (

                    <img
                      src={product.imagen_url}
                      alt={product.nombre}
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center">
                      <Package className="h-9 w-9 text-[#64748B]" />
                    </div>

                  )}

                </div>

                {/* INFO */}

                <div className="p-2.5 sm:p-4">

                  {product.categoria && (
                    <p className="mb-1 truncate text-[8px] font-bold uppercase tracking-wider text-[#0F4C81]">
                      {product.categoria}
                    </p>
                  )}

                  <h2 className="line-clamp-2 min-h-[32px] text-xs font-semibold leading-4 text-[#123B5D] sm:text-sm">
                    {product.nombre}
                  </h2>

                  <div className="mt-2.5 flex items-center justify-between gap-1">

                    <span className="text-sm font-bold text-[#123B5D] sm:text-lg">
                      ${Number(product.precio).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        addToCart(product)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F4C81] text-white sm:h-9 sm:w-auto sm:px-3"
                      aria-label={`Agregar ${product.nombre}`}
                    >

                      <Plus className="h-4 w-4" />

                      <span className="ml-1 hidden text-xs font-semibold sm:inline">
                        Agregar
                      </span>

                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* ======================================
          BARRA CARRITO MÓVIL
      ======================================= */}

      {cartQuantity > 0 && (

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D9E2EC] bg-white px-3 py-2.5 shadow-[0_-4px_20px_rgba(15,76,129,0.08)] sm:px-6">

          <div className="mx-auto flex max-w-7xl items-center gap-3">

            <div className="min-w-0 flex-1">

              <p className="text-[10px] text-[#64748B]">
                {cartQuantity}{' '}
                {cartQuantity === 1
                  ? 'producto'
                  : 'productos'}
              </p>

              <p className="text-base font-bold text-[#123B5D]">
                ${total.toFixed(2)}
              </p>

            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-xl bg-[#0F4C81] px-5 py-3 text-xs font-bold text-white"
            >
              VER CARRITO
            </button>

          </div>

        </div>

      )}

      {/* ======================================
          CARRITO
      ======================================= */}

      {cartOpen && (

        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-[#172033]/40"
            onClick={() => setCartOpen(false)}
          />

          <aside className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-hidden rounded-t-2xl bg-white sm:bottom-auto sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none">

            <div className="flex items-center justify-between border-b border-[#D9E2EC] px-4 py-3">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-wider text-[#0F4C81]">
                  Tu pedido
                </p>

                <h2 className="text-lg font-bold text-[#123B5D]">
                  Carrito
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[#EAF3F8]"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="max-h-[55vh] overflow-y-auto p-3">

              {cart.length === 0 ? (

                <div className="py-10 text-center">

                  <ShoppingCart className="mx-auto h-8 w-8 text-[#64748B]" />

                  <p className="mt-3 text-sm text-[#64748B]">
                    Tu carrito está vacío.
                  </p>

                </div>

              ) : (

                <div className="space-y-2">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-[#D9E2EC] p-2.5"
                    >

                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#EAF3F8]">

                        {item.imagen_url ? (

                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            className="h-full w-full object-cover"
                          />

                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package className="h-5 w-5 text-[#64748B]" />
                          </div>
                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex justify-between gap-2">

                          <h3 className="line-clamp-2 text-xs font-semibold text-[#123B5D]">
                            {item.nombre}
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="shrink-0 text-[#64748B]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                        </div>

                        <div className="mt-2 flex items-center justify-between">

                          <div className="flex items-center rounded-lg border border-[#D9E2EC]">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id,
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center"
                            >
                              <Minus className="h-3 w-3" />
                            </button>

                            <span className="flex h-7 min-w-7 items-center justify-center border-x border-[#D9E2EC] text-[11px] font-bold">
                              {item.cantidad}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id,
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center"
                            >
                              <Plus className="h-3 w-3" />
                            </button>

                          </div>

                          <span className="text-xs font-bold text-[#123B5D]">
                            $
                            {(
                              Number(item.precio) *
                              item.cantidad
                            ).toFixed(2)}
                          </span>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {cart.length > 0 && (

              <div className="border-t border-[#D9E2EC] p-4">

                <div className="space-y-1.5 text-xs">

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Subtotal
                    </span>
                    <span>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      IVA 15%
                    </span>
                    <span>
                      ${iva.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Entrega
                    </span>
                    <span>
                      ${deliveryCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-[#D9E2EC] pt-2 text-base font-bold text-[#123B5D]">
                    <span>TOTAL</span>
                    <span>
                      ${total.toFixed(2)}
                    </span>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={openCheckout}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] py-3.5 text-sm font-bold text-white"
                >
                  CONTINUAR
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

        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#F8FAFC]">

          <div className="mx-auto min-h-screen max-w-2xl bg-white">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D9E2EC] bg-white px-4 py-3">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-wider text-[#0F4C81]">
                  Último paso
                </p>

                <h2 className="text-lg font-bold text-[#123B5D]">
                  Confirmar pedido
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setCheckoutOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <div className="space-y-4 p-3 sm:p-5">

              {/* DATOS */}

              <section className="rounded-xl border border-[#D9E2EC] p-3">

                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#123B5D]">
                  Tus datos
                </h3>

                <div className="grid gap-2 sm:grid-cols-2">

                  <input
                    type="text"
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(
                        event.target.value,
                      )
                    }
                    placeholder="Nombre completo"
                    className="h-11 rounded-lg border border-[#D9E2EC] px-3 text-sm outline-none focus:border-[#0F4C81]"
                  />

                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(event) =>
                      setCustomerPhone(
                        event.target.value,
                      )
                    }
                    placeholder="Teléfono"
                    className="h-11 rounded-lg border border-[#D9E2EC] px-3 text-sm outline-none focus:border-[#0F4C81]"
                  />

                </div>

              </section>

              {/* ENTREGA */}

              <section className="rounded-xl border border-[#D9E2EC] p-3">

                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#123B5D]">
                  Entrega
                </h3>

                <div className="grid grid-cols-2 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      handleDeliveryChange(
                        'domicilio',
                      )
                    }
                    className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-xs font-bold ${
                      deliveryType === 'domicilio'
                        ? 'border-[#0F4C81] bg-[#EAF3F8] text-[#0F4C81]'
                        : 'border-[#D9E2EC] text-[#64748B]'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Domicilio
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeliveryChange(
                        'retiro',
                      )
                    }
                    className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-xs font-bold ${
                      deliveryType === 'retiro'
                        ? 'border-[#0F4C81] bg-[#EAF3F8] text-[#0F4C81]'
                        : 'border-[#D9E2EC] text-[#64748B]'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    Retiro
                  </button>

                </div>

                {deliveryType === 'domicilio' && (

                  <div className="mt-2">

                    {!deliveryLocation ? (

                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={locating}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F4C81] px-4 py-3 text-xs font-bold text-white disabled:opacity-60"
                      >

                        {locating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Obteniendo ubicación...
                          </>
                        ) : (
                          <>
                            <Navigation className="h-4 w-4" />
                            USAR MI UBICACIÓN ACTUAL
                          </>
                        )}

                      </button>

                    ) : (

                      <div className="flex items-center gap-3 rounded-lg bg-[#EAF3F8] p-3">

                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />

                        <div className="min-w-0 flex-1">

                          <p className="text-xs font-bold text-[#123B5D]">
                            Ubicación lista
                          </p>

                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-0.5 block truncate text-[10px] text-[#0F4C81]"
                          >
                            Ver ubicación
                          </a>

                        </div>

                        <button
                          type="button"
                          onClick={
                            getCurrentLocation
                          }
                          className="text-[10px] font-bold text-[#0F4C81]"
                        >
                          CAMBIAR
                        </button>

                      </div>

                    )}

                  </div>

                )}

              </section>

              {/* PAGO */}

              <section className="rounded-xl border border-[#D9E2EC] p-3">

                <div className="flex items-center gap-2">

                  <CreditCard className="h-4 w-4 text-[#0F4C81]" />

                  <h3 className="text-xs font-bold uppercase tracking-wide text-[#123B5D]">
                    Transferencia bancaria
                  </h3>

                </div>

                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">

                  <span className="text-[#64748B]">
                    Banco
                  </span>

                  <span className="text-right font-semibold">
                    {BANK_NAME}
                  </span>

                  <span className="text-[#64748B]">
                    Cuenta
                  </span>

                  <span className="text-right font-semibold">
                    {BANK_ACCOUNT}
                  </span>

                  <span className="text-[#64748B]">
                    Titular
                  </span>

                  <span className="text-right font-semibold">
                    {BANK_HOLDER}
                  </span>

                </div>

              </section>

              {/* TOTAL */}

              <section className="rounded-xl bg-[#EAF3F8] p-3">

                <div className="flex justify-between text-xs">
                  <span>Subtotal</span>
                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="mt-1 flex justify-between text-xs">
                  <span>IVA 15%</span>
                  <span>
                    ${iva.toFixed(2)}
                  </span>
                </div>

                <div className="mt-1 flex justify-between text-xs">
                  <span>Entrega</span>
                  <span>
                    ${deliveryCost.toFixed(2)}
                  </span>
                </div>

                <div className="mt-2 flex justify-between border-t border-[#D9E2EC] pt-2 text-lg font-bold text-[#123B5D]">

                  <span>TOTAL</span>

                  <span>
                    ${total.toFixed(2)}
                  </span>

                </div>

              </section>

              {/* BOTÓN */}

              <button
                type="button"
                onClick={finishOrder}
                disabled={sendingOrder}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] py-4 text-sm font-bold text-white disabled:opacity-60"
              >

                {sendingOrder ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generando pedido...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5" />
                    CONFIRMAR Y ENVIAR
                  </>
                )}

              </button>

              <p className="pb-3 text-center text-[9px] text-[#64748B]">
                Se generará automáticamente tu comprobante
                PDF y se abrirá WhatsApp.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* ======================================
          PEDIDO GENERADO
      ======================================= */}

      {successOpen && (

        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172033]/50 p-4">

          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]">

                <CheckCircle2 className="h-7 w-7" />

              </div>

              <h2 className="mt-3 text-lg font-bold text-[#123B5D]">
                Pedido generado
              </h2>

              <p className="mt-1 text-xs text-[#64748B]">
                Tu pedido{' '}
                <strong>{orderNumber}</strong>{' '}
                fue preparado correctamente.
              </p>

            </div>

            <div className="mt-4 space-y-2">

              <button
                type="button"
                onClick={() =>
                  generatePDF(orderNumber)
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D9E2EC] py-3 text-xs font-bold text-[#123B5D]"
              >

                <Download className="h-4 w-4" />

                GUARDAR COMPROBANTE PDF

              </button>

              <button
                type="button"
                onClick={() => {
                  const message =
                    buildWhatsAppMessage(
                      orderNumber,
                    )

                  const url =
                    `https://wa.me/${WHATSAPP_NUMBER}` +
                    `?text=${encodeURIComponent(
                      message,
                    )}`

                  window.open(
                    url,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F4C81] py-3 text-xs font-bold text-white"
              >

                <MessageCircle className="h-4 w-4" />

                ABRIR WHATSAPP

              </button>

            </div>

            <button
              type="button"
              onClick={finishAndClear}
              className="mt-3 w-full py-2 text-[10px] font-semibold text-[#64748B]"
            >
              Volver a productos
            </button>

          </div>

        </div>

      )}

    </main>
  )
}