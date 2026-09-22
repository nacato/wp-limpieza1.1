import { useEffect, useMemo, useState } from 'react'
import { jsPDF } from 'jspdf'
import { supabase } from '../lib/supabase'
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
  Navigation,
  MessageCircle,
  CreditCard,
  Package,
  Home,
  Store,
  CheckCircle2,
  Loader2,
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

// =====================================================
// DATOS BANCARIOS
// REEMPLAZA ESTOS DATOS POR LOS REALES
// =====================================================

const BANK_NAME = 'BANCO XXXXX'
const BANK_ACCOUNT = 'XXXXXXXXXX'
const BANK_TYPE = 'Cuenta corriente'
const BANK_HOLDER = 'W.P. LIMPIEZA Y MANTENIMIENTO'
const BANK_ID = 'XXXXXXXXXX'

// =====================================================
// LOCAL STORAGE
// =====================================================

const CART_STORAGE_KEY = 'wp-limpieza-carrito'
const ORDER_NUMBER_KEY = 'wp-limpieza-numero-pedido'

// =====================================================
// GENERAR NÚMERO DE PEDIDO
// =====================================================

function generateOrderNumber() {
  const current = Number(
    localStorage.getItem(ORDER_NUMBER_KEY) || '0',
  )

  const next = current + 1

  localStorage.setItem(
    ORDER_NUMBER_KEY,
    String(next),
  )

  return `WP-${String(next).padStart(4, '0')}`
}

// =====================================================
// COMPONENTE
// =====================================================

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

  // ===================================================
  // CARGAR CARRITO
  // ===================================================

  useEffect(() => {
    const saved = localStorage.getItem(
      CART_STORAGE_KEY,
    )

    if (!saved) return

    try {
      setCart(JSON.parse(saved))
    } catch (error) {
      console.error(
        'Error cargando carrito:',
        error,
      )

      localStorage.removeItem(
        CART_STORAGE_KEY,
      )
    }
  }, [])

  // ===================================================
  // GUARDAR CARRITO
  // ===================================================

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart),
    )
  }, [cart])

  // ===================================================
  // CARGAR PRODUCTOS
  // ===================================================

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

  // ===================================================
  // CARRITO
  // ===================================================

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id,
      )

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        )
      }

      return [
        ...current,
        {
          ...product,
          cantidad: 1,
        },
      ]
    })
  }

  function increaseQuantity(id: string) {
    setCart((current) =>
      current.map((item) =>
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
    setCart((current) =>
      current
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
    setCart((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    )
  }

  function clearCart() {
    setCart([])
  }

  // ===================================================
  // TOTALES
  // ===================================================

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

  // ===================================================
  // UBICACIÓN ACTUAL
  // ===================================================

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

  const googleMapsUrl = deliveryLocation
    ? `https://www.google.com/maps?q=${deliveryLocation.lat},${deliveryLocation.lng}`
    : ''

  // ===================================================
  // CHECKOUT
  // ===================================================

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

  // ===================================================
  // GENERAR PDF
  // ===================================================

  function generatePDF(
    currentOrderNumber: string,
  ) {
    const doc = new jsPDF()

    const pageWidth =
      doc.internal.pageSize.getWidth()

    let y = 18

    // -----------------------------------------------
    // ENCABEZADO
    // -----------------------------------------------

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

    y += 10

    doc.setDrawColor(217, 226, 236)

    doc.line(
      20,
      y,
      pageWidth - 20,
      y,
    )

    y += 10

    // -----------------------------------------------
    // TÍTULO
    // -----------------------------------------------

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
    doc.setFontSize(9)
    doc.setTextColor(100, 116, 139)

    doc.text(
      `Pedido: ${currentOrderNumber}`,
      20,
      y,
    )

    y += 5

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

    y += 10

    // -----------------------------------------------
    // CLIENTE
    // -----------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'DATOS DEL CLIENTE',
      20,
      y,
    )

    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(23, 32, 51)

    doc.text(
      `Nombre: ${customerName}`,
      20,
      y,
    )

    y += 5

    doc.text(
      `Teléfono: ${customerPhone}`,
      20,
      y,
    )

    y += 10

    // -----------------------------------------------
    // PRODUCTOS
    // -----------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'PRODUCTOS',
      20,
      y,
    )

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(23, 32, 51)

    cart.forEach((item) => {
      const itemTotal =
        Number(item.precio) *
        item.cantidad

      let productName = item.nombre

      if (productName.length > 50) {
        productName =
          productName.substring(0, 47) +
          '...'
      }

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

    y += 3

    doc.setDrawColor(217, 226, 236)

    doc.line(
      20,
      y,
      pageWidth - 20,
      y,
    )

    y += 8

    // -----------------------------------------------
    // TOTALES
    // -----------------------------------------------

    doc.setFontSize(9)

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

    y += 6

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

    y += 6

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

    y += 8

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
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

    y += 12

    // -----------------------------------------------
    // ENTREGA
    // -----------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'ENTREGA',
      20,
      y,
    )

    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(23, 32, 51)

    doc.text(
      deliveryType === 'domicilio'
        ? 'Domicilio'
        : 'Retiro en local',
      20,
      y,
    )

    y += 6

    if (
      deliveryType === 'domicilio' &&
      googleMapsUrl
    ) {
      doc.setTextColor(15, 76, 129)

      doc.text(
        'Ubicación:',
        20,
        y,
      )

      y += 5

      const mapText = googleMapsUrl

      doc.setFontSize(7)

      doc.text(
        mapText,
        20,
        y,
      )

      y += 7
    }

    // -----------------------------------------------
    // PAGO
    // -----------------------------------------------

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(18, 59, 93)

    doc.text(
      'FORMA DE PAGO',
      20,
      y,
    )

    y += 6

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(23, 32, 51)

    doc.text(
      'Transferencia bancaria',
      20,
      y,
    )

    y += 5

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

    y += 10

    // -----------------------------------------------
    // PIE
    // -----------------------------------------------

    doc.setDrawColor(217, 226, 236)

    doc.line(
      20,
      y,
      pageWidth - 20,
      y,
    )

    y += 8

    doc.setFontSize(7)
    doc.setTextColor(100, 116, 139)

    doc.text(
      'Comprobante generado automáticamente por W.P. Limpieza.',
      20,
      y,
    )

    y += 4

    doc.text(
      'El pedido será procesado una vez verificado el pago.',
      20,
      y,
    )

    doc.save(
      `Pedido-${currentOrderNumber}.pdf`,
    )
  }

  // ===================================================
  // MENSAJE WHATSAPP
  // ===================================================

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

💳 *FORMA DE PAGO*
Transferencia bancaria

🏦 Banco: ${BANK_NAME}
💳 Cuenta: ${BANK_ACCOUNT}
👤 Titular: ${BANK_HOLDER}
🪪 Cédula/RUC: ${BANK_ID}

📎 El cliente enviará el comprobante de transferencia por este medio.

📄 Pedido respaldado con comprobante PDF.

Gracias por confiar en *W.P. Limpieza*. 🧼`
  }

  // ===================================================
  // FINALIZAR PEDIDO
  // ===================================================

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
      alert('Tu carrito está vacío.')
      return
    }

    if (
      deliveryType === 'domicilio' &&
      !deliveryLocation
    ) {
      alert(
        'Primero usa tu ubicación actual.',
      )

      return
    }

    setSendingOrder(true)

    const newOrderNumber =
      generateOrderNumber()

    setOrderNumber(newOrderNumber)

    // Generar respaldo PDF
    generatePDF(newOrderNumber)

    // Crear mensaje
    const message =
      buildWhatsAppMessage(
        newOrderNumber,
      )

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`

    // Abrir WhatsApp
    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer',
    )

    setTimeout(() => {
      setCheckoutOpen(false)
      setSuccessOpen(true)
      setSendingOrder(false)
    }, 600)
  }

  // ===================================================
  // ABRIR WHATSAPP NUEVAMENTE
  // ===================================================

  function openWhatsAppAgain() {
    if (!orderNumber) return

    const message =
      buildWhatsAppMessage(
        orderNumber,
      )

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer',
    )
  }

  // ===================================================
  // FINALIZAR
  // ===================================================

  function finishAndClear() {
    clearCart()

    setSuccessOpen(false)

    setCustomerName('')
    setCustomerPhone('')

    setDeliveryType('domicilio')
    setDeliveryLocation(null)

    setOrderNumber('')
  }

  // ===================================================
  // LOADING
  // ===================================================

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

  // ===================================================
  // INTERFAZ
  // ===================================================

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 text-[#172033]">

      {/* ==============================================
          HEADER
      =============================================== */}

      <header className="sticky top-0 z-30 border-b border-[#D9E2EC] bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6">

          <div>

            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#0F4C81]">
              W.P. LIMPIEZA
            </p>

            <h1 className="text-base font-bold leading-none text-[#123B5D] sm:text-lg">
              Productos
            </h1>

          </div>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9E2EC] text-[#123B5D]"
          >

            <ShoppingCart className="h-4 w-4" />

            {cartQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0F4C81] px-1 text-[9px] font-bold text-white">
                {cartQuantity}
              </span>
            )}

          </button>

        </div>

      </header>

      {/* ==============================================
          PRODUCTOS
      =============================================== */}

      <section className="mx-auto max-w-7xl px-2.5 py-3 sm:px-6 sm:py-6">

        {products.length === 0 ? (

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-8 text-center">

            <Package className="mx-auto h-8 w-8 text-[#64748B]" />

            <p className="mt-2 text-sm text-[#64748B]">
              No hay productos disponibles.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (

              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-[#D9E2EC] bg-white"
              >

                <div className="aspect-square overflow-hidden bg-[#EAF3F8]">

                  {product.imagen_url ? (

                    <img
                      src={product.imagen_url}
                      alt={product.nombre}
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center">
                      <Package className="h-8 w-8 text-[#64748B]" />
                    </div>

                  )}

                </div>

                <div className="p-2 sm:p-3">

                  {product.categoria && (
                    <p className="mb-0.5 truncate text-[7px] font-bold uppercase tracking-wider text-[#0F4C81]">
                      {product.categoria}
                    </p>
                  )}

                  <h2 className="line-clamp-2 min-h-[30px] text-[11px] font-semibold leading-[15px] text-[#123B5D] sm:text-sm">
                    {product.nombre}
                  </h2>

                  <div className="mt-2 flex items-center justify-between gap-1">

                    <span className="text-sm font-bold text-[#123B5D] sm:text-base">
                      ${Number(product.precio).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        addToCart(product)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F4C81] text-white sm:h-8 sm:w-auto sm:px-3"
                      aria-label={`Agregar ${product.nombre}`}
                    >

                      <Plus className="h-4 w-4" />

                      <span className="ml-1 hidden text-[10px] font-bold sm:inline">
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

      {/* ==============================================
          CARRITO FIJO
      =============================================== */}

      {cartQuantity > 0 && (

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D9E2EC] bg-white px-2.5 py-2 shadow-[0_-4px_15px_rgba(15,76,129,0.08)]">

          <div className="mx-auto flex max-w-7xl items-center gap-2">

            <div className="min-w-0 flex-1">

              <p className="text-[9px] text-[#64748B]">
                {cartQuantity}{' '}
                {cartQuantity === 1
                  ? 'producto'
                  : 'productos'}
              </p>

              <p className="text-sm font-bold text-[#123B5D]">
                ${total.toFixed(2)}
              </p>

            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="rounded-lg bg-[#0F4C81] px-4 py-2.5 text-[10px] font-bold text-white"
            >
              VER CARRITO
            </button>

          </div>

        </div>

      )}

      {/* ==============================================
          CARRITO
      =============================================== */}

      {cartOpen && (

        <div className="fixed inset-0 z-50">

          <div
            className="absolute inset-0 bg-[#172033]/45"
            onClick={() => setCartOpen(false)}
          />

          <aside className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-hidden rounded-t-2xl bg-white sm:bottom-auto sm:left-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none">

            <div className="flex items-center justify-between border-b border-[#D9E2EC] px-4 py-3">

              <div>

                <p className="text-[8px] font-bold uppercase tracking-wider text-[#0F4C81]">
                  Tu pedido
                </p>

                <h2 className="text-base font-bold text-[#123B5D]">
                  Carrito
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setCartOpen(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2.5">

              {cart.length === 0 ? (

                <div className="py-10 text-center">

                  <ShoppingCart className="mx-auto h-7 w-7 text-[#64748B]" />

                  <p className="mt-2 text-xs text-[#64748B]">
                    Tu carrito está vacío.
                  </p>

                </div>

              ) : (

                <div className="space-y-2">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-2.5 rounded-lg border border-[#D9E2EC] p-2"
                    >

                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#EAF3F8]">

                        {item.imagen_url ? (

                          <img
                            src={item.imagen_url}
                            alt={item.nombre}
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center">
                            <Package className="h-4 w-4 text-[#64748B]" />
                          </div>

                        )}

                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex justify-between gap-2">

                          <h3 className="line-clamp-2 text-[11px] font-semibold leading-4 text-[#123B5D]">
                            {item.nombre}
                          </h3>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="shrink-0 text-[#64748B]"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>

                        </div>

                        <div className="mt-1.5 flex items-center justify-between">

                          <div className="flex items-center rounded-md border border-[#D9E2EC]">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id,
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center"
                            >
                              <Minus className="h-2.5 w-2.5" />
                            </button>

                            <span className="flex h-6 min-w-6 items-center justify-center border-x border-[#D9E2EC] text-[10px] font-bold">
                              {item.cantidad}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id,
                                )
                              }
                              className="flex h-6 w-6 items-center justify-center"
                            >
                              <Plus className="h-2.5 w-2.5" />
                            </button>

                          </div>

                          <span className="text-[11px] font-bold text-[#123B5D]">
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

              <div className="border-t border-[#D9E2EC] p-3">

                <div className="space-y-1 text-[11px]">

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
                  className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#0F4C81] py-3 text-xs font-bold text-white"
                >
                  CONTINUAR
                </button>

              </div>

            )}

          </aside>

        </div>

      )}

      {/* ==============================================
          CHECKOUT
      =============================================== */}

      {checkoutOpen && (

        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#F8FAFC]">

          <div className="mx-auto min-h-screen max-w-2xl bg-white">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D9E2EC] bg-white px-4 py-3">

              <div>

                <p className="text-[8px] font-bold uppercase tracking-wider text-[#0F4C81]">
                  Último paso
                </p>

                <h2 className="text-base font-bold text-[#123B5D]">
                  Confirmar pedido
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setCheckoutOpen(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

            <div className="space-y-2.5 p-2.5 sm:p-5">

              {/* DATOS */}

              <section className="rounded-lg border border-[#D9E2EC] p-2.5">

                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#123B5D]">
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
                    className="h-10 rounded-lg border border-[#D9E2EC] px-3 text-xs outline-none focus:border-[#0F4C81]"
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
                    className="h-10 rounded-lg border border-[#D9E2EC] px-3 text-xs outline-none focus:border-[#0F4C81]"
                  />

                </div>

              </section>

              {/* ENTREGA */}

              <section className="rounded-lg border border-[#D9E2EC] p-2.5">

                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#123B5D]">
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
                    className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-[10px] font-bold ${
                      deliveryType === 'domicilio'
                        ? 'border-[#0F4C81] bg-[#EAF3F8] text-[#0F4C81]'
                        : 'border-[#D9E2EC] text-[#64748B]'
                    }`}
                  >
                    <Home className="h-3.5 w-3.5" />
                    DOMICILIO
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeliveryChange(
                        'retiro',
                      )
                    }
                    className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-[10px] font-bold ${
                      deliveryType === 'retiro'
                        ? 'border-[#0F4C81] bg-[#EAF3F8] text-[#0F4C81]'
                        : 'border-[#D9E2EC] text-[#64748B]'
                    }`}
                  >
                    <Store className="h-3.5 w-3.5" />
                    RETIRO
                  </button>

                </div>

                {deliveryType === 'domicilio' && (

                  <div className="mt-2">

                    {!deliveryLocation ? (

                      <button
                        type="button"
                        onClick={
                          getCurrentLocation
                        }
                        disabled={locating}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F4C81] py-3 text-[10px] font-bold text-white disabled:opacity-60"
                      >

                        {locating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            OBTENIENDO UBICACIÓN...
                          </>
                        ) : (
                          <>
                            <Navigation className="h-4 w-4" />
                            USAR MI UBICACIÓN ACTUAL
                          </>
                        )}

                      </button>

                    ) : (

                      <div className="flex items-center gap-2 rounded-lg bg-[#EAF3F8] p-2.5">

                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />

                        <div className="min-w-0 flex-1">

                          <p className="text-[10px] font-bold text-[#123B5D]">
                            Ubicación lista
                          </p>

                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-[#0F4C81]"
                          >
                            Ver ubicación
                          </a>

                        </div>

                        <button
                          type="button"
                          onClick={
                            getCurrentLocation
                          }
                          className="text-[9px] font-bold text-[#0F4C81]"
                        >
                          CAMBIAR
                        </button>

                      </div>

                    )}

                  </div>

                )}

              </section>

              {/* PAGO */}

              <section className="rounded-lg border border-[#D9E2EC] p-2.5">

                <div className="flex items-center gap-1.5">

                  <CreditCard className="h-3.5 w-3.5 text-[#0F4C81]" />

                  <h3 className="text-[10px] font-bold uppercase tracking-wide text-[#123B5D]">
                    Transferencia bancaria
                  </h3>

                </div>

                <div className="mt-2 grid grid-cols-2 gap-y-1 text-[9px]">

                  <span className="text-[#64748B]">
                    Banco
                  </span>

                  <span className="text-right font-semibold">
                    {BANK_NAME}
                  </span>

                  <span className="text-[#64748B]">
                    Tipo
                  </span>

                  <span className="text-right font-semibold">
                    {BANK_TYPE}
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

              {/* RESUMEN */}

              <section className="rounded-lg bg-[#EAF3F8] p-2.5">

                <div className="flex justify-between text-[10px]">
                  <span>Subtotal</span>
                  <span>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="mt-1 flex justify-between text-[10px]">
                  <span>IVA 15%</span>
                  <span>
                    ${iva.toFixed(2)}
                  </span>
                </div>

                <div className="mt-1 flex justify-between text-[10px]">
                  <span>Entrega</span>
                  <span>
                    ${deliveryCost.toFixed(2)}
                  </span>
                </div>

                <div className="mt-2 flex justify-between border-t border-[#D9E2EC] pt-2 text-base font-bold text-[#123B5D]">

                  <span>TOTAL</span>

                  <span>
                    ${total.toFixed(2)}
                  </span>

                </div>

              </section>

              {/* CONFIRMAR */}

              <button
                type="button"
                onClick={finishOrder}
                disabled={sendingOrder}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F4C81] py-3.5 text-xs font-bold text-white disabled:opacity-60"
              >

                {sendingOrder ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    GENERANDO PEDIDO...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4" />
                    CONFIRMAR Y ENVIAR
                  </>
                )}

              </button>

              <p className="pb-2 text-center text-[8px] text-[#64748B]">
                Se generará tu comprobante PDF y se
                abrirá WhatsApp.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* ==============================================
          ÉXITO
      =============================================== */}

      {successOpen && (

        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#172033]/50 p-3">

          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl">

            <div className="text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF3F8] text-[#0F4C81]">

                <CheckCircle2 className="h-6 w-6" />

              </div>

              <h2 className="mt-2 text-base font-bold text-[#123B5D]">
                Pedido generado
              </h2>

              <p className="mt-1 text-[10px] text-[#64748B]">
                Pedido{' '}
                <strong>{orderNumber}</strong>
              </p>

            </div>

            <div className="mt-4 space-y-2">

              <button
                type="button"
                onClick={() =>
                  generatePDF(orderNumber)
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#D9E2EC] py-2.5 text-[10px] font-bold text-[#123B5D]"
              >

                <Download className="h-3.5 w-3.5" />

                GUARDAR COMPROBANTE PDF

              </button>

              <button
                type="button"
                onClick={
                  openWhatsAppAgain
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F4C81] py-2.5 text-[10px] font-bold text-white"
              >

                <MessageCircle className="h-3.5 w-3.5" />

                ABRIR WHATSAPP

              </button>

            </div>

            <button
              type="button"
              onClick={finishAndClear}
              className="mt-2 w-full py-2 text-[9px] font-semibold text-[#64748B]"
            >
              VOLVER A PRODUCTOS
            </button>

          </div>

        </div>

      )}

    </main>
  )
}