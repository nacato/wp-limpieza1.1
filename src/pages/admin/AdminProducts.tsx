import {
  useEffect,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Edit3,
  ImagePlus,
  Package,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react'

import { supabase } from '../../lib/supabase'

type Product = {
  id: string
  nombre: string
  descripcion: string | null
  precio: number
  categoria: string | null
  imagen_url: string | null
  imagen_path: string | null
  disponible: boolean
  created_at: string
  updated_at?: string
}

type ProductForm = {
  nombre: string
  descripcion: string
  precio: string
  categoria: string
  disponible: boolean
}

const emptyForm: ProductForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: '',
  disponible: true,
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductForm>(emptyForm)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [currentImagePath, setCurrentImagePath] =
    useState<string | null>(null)

  const [imageFile, setImageFile] =
    useState<File | null>(null)

  const [preview, setPreview] =
    useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] =
    useState<string | null>(null)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fileInputRef =
    useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  // =====================================================
  // CARGAR PRODUCTOS
  // =====================================================

  const loadProducts = async () => {
    setLoading(true)
    setError('')

    try {
      const {
        data,
        error: productsError,
      } = await supabase
        .from('products')
        .select('*')
        .order('created_at', {
          ascending: false,
        })

      if (productsError) {
        throw new Error(productsError.message)
      }

      setProducts(
        (data || []) as Product[],
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar los productos.',
      )
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // IMAGEN
  // =====================================================

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setError(
        'Seleccione una imagen válida.',
      )
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        'La imagen no puede superar los 5 MB.',
      )
      return
    }

    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview)
    }

    const objectUrl =
      URL.createObjectURL(file)

    setImageFile(file)
    setPreview(objectUrl)
    setError('')
    setSuccess('')
  }

  const uploadImage = async (
    file: File,
    productId: string,
  ) => {
    const extension =
      file.name
        .split('.')
        .pop()
        ?.toLowerCase() || 'jpg'

    const path =
      `${productId}/${Date.now()}.${extension}`

    const {
      error: uploadError,
    } = await supabase.storage
      .from('productos')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      throw new Error(
        uploadError.message,
      )
    }

    const {
      data,
    } = supabase.storage
      .from('productos')
      .getPublicUrl(path)

    return {
      path,
      url: data.publicUrl,
    }
  }

  // =====================================================
  // LIMPIAR FORMULARIO
  // =====================================================

  const resetForm = () => {
    if (preview?.startsWith('blob:')) {
      URL.revokeObjectURL(preview)
    }

    setForm(emptyForm)
    setEditingId(null)
    setCurrentImagePath(null)
    setImageFile(null)
    setPreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // =====================================================
  // GUARDAR
  // =====================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (saving) {
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      // -------------------------------
      // VALIDAR NOMBRE
      // -------------------------------

      const nombre =
        form.nombre.trim()

      if (!nombre) {
        throw new Error(
          'Ingrese el nombre del producto.',
        )
      }

      // -------------------------------
      // VALIDAR PRECIO
      // -------------------------------

      const precio =
        Number(form.precio)

      if (
        !Number.isFinite(precio) ||
        precio < 0
      ) {
        throw new Error(
          'Ingrese un precio válido.',
        )
      }

      // =================================================
      // EDITAR
      // =================================================

      if (editingId) {
        let imageUrl =
          products.find(
            (product) =>
              product.id === editingId,
          )?.imagen_url || null

        let imagePath =
          currentImagePath

        // ---------------------------------------------
        // SUBIR NUEVA IMAGEN
        // ---------------------------------------------

        if (imageFile) {
          const uploaded =
            await uploadImage(
              imageFile,
              editingId,
            )

          imageUrl = uploaded.url
          imagePath = uploaded.path

          // Eliminar imagen anterior
          if (currentImagePath) {
            await supabase.storage
              .from('productos')
              .remove([
                currentImagePath,
              ])
          }
        }

        // ---------------------------------------------
        // ACTUALIZAR PRODUCTO
        // ---------------------------------------------

        const updateData = {
          nombre,
          descripcion:
            form.descripcion.trim() ||
            null,
          precio,
          categoria:
            form.categoria.trim() ||
            null,
          disponible:
            form.disponible,
          imagen_url: imageUrl,
          imagen_path: imagePath,
          updated_at:
            new Date().toISOString(),
        }

        const {
          data: updatedProduct,
          error: updateError,
        } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', editingId)
          .select()
          .single()

        if (updateError) {
          throw new Error(
            updateError.message,
          )
        }

        // ---------------------------------------------
        // ACTUALIZAR LA LISTA LOCAL
        // ---------------------------------------------

        setProducts((current) =>
          current.map((product) =>
            product.id === editingId
              ? (updatedProduct as Product)
              : product,
          ),
        )

        setSuccess(
          'Producto actualizado correctamente.',
        )

        resetForm()

        return
      }

      // =================================================
      // CREAR PRODUCTO
      // =================================================

      const {
        data: newProduct,
        error: insertError,
      } = await supabase
        .from('products')
        .insert({
          nombre,
          descripcion:
            form.descripcion.trim() ||
            null,
          precio,
          categoria:
            form.categoria.trim() ||
            null,
          disponible:
            form.disponible,
        })
        .select()
        .single()

      if (insertError || !newProduct) {
        throw new Error(
          insertError?.message ||
            'No se pudo crear el producto.',
        )
      }

      let finalProduct =
        newProduct as Product

      // =================================================
      // SUBIR IMAGEN
      // =================================================

      if (imageFile) {
        try {
          const uploaded =
            await uploadImage(
              imageFile,
              newProduct.id,
            )

          const {
            data: productWithImage,
            error: imageUpdateError,
          } = await supabase
            .from('products')
            .update({
              imagen_url:
                uploaded.url,
              imagen_path:
                uploaded.path,
            })
            .eq('id', newProduct.id)
            .select()
            .single()

          if (imageUpdateError) {
            await supabase
              .storage
              .from('productos')
              .remove([
                uploaded.path,
              ])

            throw new Error(
              imageUpdateError.message,
            )
          }

          finalProduct =
            productWithImage as Product
        } catch (imageError) {
          // Si falla la imagen, eliminamos
          // el producto que acabamos de crear.

          await supabase
            .from('products')
            .delete()
            .eq(
              'id',
              newProduct.id,
            )

          throw imageError
        }
      }

      // =================================================
      // ACTUALIZAR LISTA SIN RECARGAR SUPABASE
      // =================================================

      setProducts((current) => [
        finalProduct,
        ...current,
      ])

      setSuccess(
        'Producto creado correctamente.',
      )

      resetForm()
    } catch (err) {
      console.error(
        'Error al guardar producto:',
        err,
      )

      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al guardar.',
      )
    } finally {
      setSaving(false)
    }
  }

  // =====================================================
  // EDITAR
  // =====================================================

  const handleEdit = (
    product: Product,
  ) => {
    setEditingId(product.id)

    setForm({
      nombre:
        product.nombre,
      descripcion:
        product.descripcion || '',
      precio:
        String(product.precio),
      categoria:
        product.categoria || '',
      disponible:
        product.disponible,
    })

    setCurrentImagePath(
      product.imagen_path,
    )

    setPreview(
      product.imagen_url,
    )

    setImageFile(null)

    setError('')
    setSuccess('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // =====================================================
  // ELIMINAR
  // =====================================================

  const handleDelete = async (
    product: Product,
  ) => {
    const confirmed =
      window.confirm(
        `¿Eliminar "${product.nombre}"? Esta acción no se puede deshacer.`,
      )

    if (!confirmed) {
      return
    }

    setDeleting(product.id)
    setError('')
    setSuccess('')

    try {
      // ---------------------------------------------
      // ELIMINAR IMAGEN
      // ---------------------------------------------

      if (product.imagen_path) {
        await supabase.storage
          .from('productos')
          .remove([
            product.imagen_path,
          ])
      }

      // ---------------------------------------------
      // ELIMINAR PRODUCTO
      // ---------------------------------------------

      const {
        error: deleteError,
      } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (deleteError) {
        throw new Error(
          deleteError.message,
        )
      }

      // ---------------------------------------------
      // ACTUALIZAR LISTA LOCAL
      // ---------------------------------------------

      setProducts((current) =>
        current.filter(
          (item) =>
            item.id !== product.id,
        ),
      )

      if (
        editingId === product.id
      ) {
        resetForm()
      }

      setSuccess(
        'Producto eliminado correctamente.',
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo eliminar.',
      )
    } finally {
      setDeleting(null)
    }
  }

  // =====================================================
  // INTERFAZ
  // =====================================================

  return (
    <main className="min-h-screen bg-[#020617] text-white">

      {/* HEADER */}

      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">

          <Link
            to="/admin"
            className="flex items-center gap-2 text-sm font-bold text-blue-400"
          >
            <ArrowLeft size={18} />
            Administrador
          </Link>

          <div className="flex items-center gap-2">
            <Package
              size={18}
              className="text-blue-400"
            />

            <span className="text-sm font-bold">
              Productos
            </span>
          </div>

        </div>
      </header>

      {/* CONTENIDO */}

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">

        {/* TITULO */}

        <div className="mb-8">

          <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-blue-400">
            Catálogo W.P.
          </p>

          <h1 className="mt-3 text-3xl font-black md:text-4xl">
            {editingId
              ? 'Editar producto'
              : 'Agregar producto'}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Administra nombres, precios,
            imágenes y disponibilidad.
          </p>

        </div>

        {/* MENSAJES */}

        {(error || success) && (
          <div
            className={`mb-6 rounded-2xl border px-4 py-4 text-sm ${
              error
                ? 'border-red-500/20 bg-red-500/10 text-red-300'
                : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
            }`}
          >
            {error || success}
          </div>
        )}

        {/* FORMULARIO */}

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 md:p-7"
        >

          <div className="grid gap-6 md:grid-cols-[260px_1fr]">

            {/* IMAGEN */}

            <div>

              <p className="mb-3 text-xs font-bold text-slate-300">
                Imagen del producto
              </p>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-slate-950 transition hover:border-blue-500/50"
              >

                {preview ? (
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">

                    <ImagePlus
                      size={32}
                      className="mx-auto text-blue-400"
                    />

                    <p className="mt-3 text-sm font-semibold">
                      Subir imagen
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      JPG, PNG o WEBP
                    </p>

                  </div>
                )}

              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

              {preview && (
                <button
                  type="button"
                  onClick={() => {

                    if (
                      preview.startsWith(
                        'blob:',
                      )
                    ) {
                      URL.revokeObjectURL(
                        preview,
                      )
                    }

                    setPreview(null)
                    setImageFile(null)

                    if (
                      fileInputRef.current
                    ) {
                      fileInputRef.current.value =
                        ''
                    }
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2 text-xs text-slate-400"
                >
                  <X size={14} />
                  Quitar imagen nueva
                </button>
              )}

            </div>

            {/* CAMPOS */}

            <div className="space-y-5">

              {/* NOMBRE */}

              <label className="block">

                <span className="mb-2 block text-xs font-bold text-slate-300">
                  Nombre del producto
                </span>

                <input
                  type="text"
                  value={form.nombre}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      nombre:
                        event.target.value,
                    })
                  }
                  placeholder="Ej. Desinfectante"
                  required
                  className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm outline-none focus:border-blue-500"
                />

              </label>

              {/* PRECIO / CATEGORIA */}

              <div className="grid gap-5 sm:grid-cols-2">

                <label className="block">

                  <span className="mb-2 block text-xs font-bold text-slate-300">
                    Precio
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.precio}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        precio:
                          event.target.value,
                      })
                    }
                    placeholder="0.00"
                    required
                    className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm outline-none focus:border-blue-500"
                  />

                </label>

                <label className="block">

                  <span className="mb-2 block text-xs font-bold text-slate-300">
                    Categoría
                  </span>

                  <input
                    type="text"
                    value={form.categoria}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        categoria:
                          event.target.value,
                      })
                    }
                    placeholder="Ej. Limpieza"
                    className="h-13 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 text-sm outline-none focus:border-blue-500"
                  />

                </label>

              </div>

              {/* DESCRIPCIÓN */}

              <label className="block">

                <span className="mb-2 block text-xs font-bold text-slate-300">
                  Descripción
                </span>

                <textarea
                  value={form.descripcion}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      descripcion:
                        event.target.value,
                    })
                  }
                  placeholder="Descripción del producto..."
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />

              </label>

              {/* DISPONIBILIDAD */}

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 p-4">

                <input
                  type="checkbox"
                  checked={form.disponible}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      disponible:
                        event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-blue-500"
                />

                <span>

                  <strong className="block text-sm">
                    Producto disponible
                  </strong>

                  <small className="text-xs text-slate-500">
                    Se mostrará en el catálogo público.
                  </small>

                </span>

              </label>

              {/* BOTONES */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 text-sm font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      Guardando...
                    </>
                  ) : editingId ? (
                    <>
                      <Save size={18} />
                      Guardar cambios
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Agregar producto
                    </>
                  )}

                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex h-13 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-bold text-slate-300"
                  >
                    <X size={17} />
                    Cancelar
                  </button>
                )}

              </div>

            </div>

          </div>

        </form>

        {/* LISTA */}

        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Productos registrados
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                {products.length}{' '}
                {products.length === 1
                  ? 'producto'
                  : 'productos'}
              </p>

            </div>

          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-slate-500">
              Cargando productos...
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">

              <Package
                size={35}
                className="mx-auto text-slate-700"
              />

              <p className="mt-4 font-semibold text-slate-400">
                Todavía no hay productos
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Agrega el primero utilizando el formulario.
              </p>

            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {products.map(
                (product) => (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04]"
                  >

                    <div className="aspect-[4/3] bg-slate-950">

                      {product.imagen_url ? (
                        <img
                          src={
                            product.imagen_url
                          }
                          alt={
                            product.nombre
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">

                          <Package
                            size={35}
                            className="text-slate-700"
                          />

                        </div>
                      )}

                    </div>

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <h3 className="font-bold">
                            {product.nombre}
                          </h3>

                          {product.categoria && (
                            <p className="mt-1 text-xs text-blue-400">
                              {
                                product.categoria
                              }
                            </p>
                          )}

                        </div>

                        <strong className="text-lg">
                          $
                          {Number(
                            product.precio,
                          ).toFixed(2)}
                        </strong>

                      </div>

                      {product.descripcion && (
                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                          {
                            product.descripcion
                          }
                        </p>
                      )}

                      <div className="mt-5 flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(
                              product,
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-xs font-bold text-slate-300 transition hover:border-blue-500/30 hover:text-blue-400"
                        >
                          <Edit3 size={15} />
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              product,
                            )
                          }
                          disabled={
                            deleting ===
                            product.id
                          }
                          className="flex items-center justify-center rounded-xl border border-red-500/10 px-4 text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                          aria-label="Eliminar producto"
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                      </div>

                      <div className="mt-3">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${
                            product.disponible
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-slate-500/10 text-slate-500'
                          }`}
                        >
                          {product.disponible
                            ? 'Disponible'
                            : 'Oculto'}
                        </span>

                      </div>

                    </div>

                  </article>
                ),
              )}

            </div>
          )}

        </div>

      </section>

    </main>
  )
}

export default AdminProducts