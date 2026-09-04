import {
  ArrowLeft,
  Check,
  Edit3,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react'

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { supabase } from '../../lib/supabase'

type ProjectId =
  | 'limpieza-institucional'
  | 'mantenimiento-profesional'
  | 'limpieza-post-obra'
  | 'tratamiento-superficies'

type GalleryItem = {
  id: string
  title: string
  description: string | null
  media_type: 'video'
  file_url: string
  storage_path: string
  thumbnail_url: string | null
  is_published: boolean
  sort_order: number
  project_id: ProjectId | null
  created_at: string
  updated_at: string
}

type FormState = {
  title: string
  description: string
  projectId: ProjectId | ''
  isPublished: boolean
  sortOrder: number
}

const initialForm: FormState = {
  title: '',
  description: '',
  projectId: '',
  isPublished: true,
  sortOrder: 0,
}

const projects: {
  id: ProjectId
  name: string
}[] = [
  {
    id: 'limpieza-institucional',
    name: 'Limpieza institucional',
  },
  {
    id: 'mantenimiento-profesional',
    name: 'Mantenimiento profesional',
  },
  {
    id: 'limpieza-post-obra',
    name: 'Limpieza post-obra',
  },
  {
    id: 'tratamiento-superficies',
    name: 'Tratamiento de superficies',
  },
]

function getProjectName(
  projectId: ProjectId | null,
) {
  return (
    projects.find(
      (project) => project.id === projectId,
    )?.name ?? 'Sin proyecto'
  )
}

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formOpen, setFormOpen] = useState(false)

  const [editingItem, setEditingItem] =
    useState<GalleryItem | null>(null)

  const [form, setForm] =
    useState<FormState>(initialForm)

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null)

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const fileInputRef =
    useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('media_type', 'video')
      .order('sort_order', {
        ascending: true,
      })
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      console.error(error)

      setError(
        `No se pudo cargar la galería: ${error.message}`,
      )

      setLoading(false)
      return
    }

    setItems((data ?? []) as GalleryItem[])
    setLoading(false)
  }

  function openNewForm() {
    setEditingItem(null)
    setForm(initialForm)
    setSelectedFile(null)
    setPreviewUrl(null)
    setMessage('')
    setError('')
    setFormOpen(true)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function openEditForm(item: GalleryItem) {
    setEditingItem(item)

    setForm({
      title: item.title,
      description: item.description ?? '',
      projectId: item.project_id ?? '',
      isPublished: item.is_published,
      sortOrder: item.sort_order,
    })

    setSelectedFile(null)
    setPreviewUrl(item.file_url)
    setMessage('')
    setError('')
    setFormOpen(true)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function closeForm() {
    if (saving) return

    setFormOpen(false)
    setEditingItem(null)
    setSelectedFile(null)
    setPreviewUrl(null)
    setMessage('')
    setError('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    setError('')

    if (!file.type.startsWith('video/')) {
      setSelectedFile(null)
      setPreviewUrl(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      setError(
        'Solo puedes seleccionar archivos de video.',
      )

      return
    }

    setSelectedFile(file)

    const objectUrl = URL.createObjectURL(file)

    setPreviewUrl(objectUrl)
  }

  function validateForm() {
    if (!form.title.trim()) {
      setError(
        'Escribe un título para el video.',
      )
      return false
    }

    if (!form.projectId) {
      setError(
        'Selecciona el proyecto al que pertenece el video.',
      )
      return false
    }

    if (!editingItem && !selectedFile) {
      setError(
        'Selecciona un video para continuar.',
      )
      return false
    }

    if (selectedFile) {
      if (!selectedFile.type.startsWith('video/')) {
        setError(
          'El archivo seleccionado no es un video.',
        )
        return false
      }
    }

    return true
  }

  function createStoragePath(file: File) {
    const extension =
      file.name.split('.').pop()?.toLowerCase() ||
      'mp4'

    const randomPart = crypto.randomUUID()

    return `videos/${Date.now()}-${randomPart}.${extension}`
  }

  async function uploadFile(file: File) {
    const storagePath = createStoragePath(file)

    const { error } = await supabase.storage
      .from('galeria')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw new Error(
        `No se pudo subir el video: ${error.message}`,
      )
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from('galeria')
      .getPublicUrl(storagePath)

    return {
      storagePath,
      publicUrl: publicUrlData.publicUrl,
    }
  }

  async function deleteStorageFile(
    storagePath: string,
  ) {
    const { error } = await supabase.storage
      .from('galeria')
      .remove([storagePath])

    if (error) {
      console.error(
        'No se pudo eliminar el archivo:',
        error,
      )
    }
  }

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault()

    if (!validateForm()) return

    setSaving(true)
    setMessage('')
    setError('')

    try {
      /*
       * ==========================================
       * EDITAR VIDEO
       * ==========================================
       */

      if (editingItem) {
        let fileUrl = editingItem.file_url
        let storagePath =
          editingItem.storage_path

        let newUploadedPath: string | null = null

        if (selectedFile) {
          const uploaded =
            await uploadFile(selectedFile)

          fileUrl = uploaded.publicUrl
          storagePath =
            uploaded.storagePath

          newUploadedPath =
            uploaded.storagePath
        }

        const { data, error } =
          await supabase
            .from('gallery_items')
            .update({
              title: form.title.trim(),
              description:
                form.description.trim() ||
                null,
              media_type: 'video',
              file_url: fileUrl,
              storage_path: storagePath,
              project_id: form.projectId,
              is_published:
                form.isPublished,
              sort_order:
                Number(form.sortOrder) || 0,
              updated_at:
                new Date().toISOString(),
            })
            .eq('id', editingItem.id)
            .select()
            .single()

        if (error) {
          if (newUploadedPath) {
            await deleteStorageFile(
              newUploadedPath,
            )
          }

          throw new Error(
            `No se pudo actualizar: ${error.message}`,
          )
        }

        if (
          newUploadedPath &&
          editingItem.storage_path !==
            newUploadedPath
        ) {
          await deleteStorageFile(
            editingItem.storage_path,
          )
        }

        const updatedItem =
          data as GalleryItem

        setItems((current) =>
          current.map((item) =>
            item.id === updatedItem.id
              ? updatedItem
              : item,
          ),
        )

        setMessage(
          'Video actualizado correctamente.',
        )

        setFormOpen(false)
        setEditingItem(null)
        setSelectedFile(null)
        setPreviewUrl(null)

        return
      }

      /*
       * ==========================================
       * NUEVO VIDEO
       * ==========================================
       */

      if (!selectedFile) {
        throw new Error(
          'Selecciona un video.',
        )
      }

      const uploaded =
        await uploadFile(selectedFile)

      const { data, error } =
        await supabase
          .from('gallery_items')
          .insert({
            title: form.title.trim(),
            description:
              form.description.trim() ||
              null,
            media_type: 'video',
            file_url: uploaded.publicUrl,
            storage_path:
              uploaded.storagePath,
            thumbnail_url: null,
            is_published:
              form.isPublished,
            sort_order:
              Number(form.sortOrder) || 0,
            project_id: form.projectId,
          })
          .select()
          .single()

      if (error) {
        await deleteStorageFile(
          uploaded.storagePath,
        )

        throw new Error(
          `No se pudo guardar el video: ${error.message}`,
        )
      }

      const newItem =
        data as GalleryItem

      /*
       * Actualización inmediata.
       * No hace falta recargar.
       */

      setItems((current) => [
        newItem,
        ...current,
      ])

      setMessage(
        'Video agregado correctamente.',
      )

      setForm(initialForm)
      setSelectedFile(null)
      setPreviewUrl(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      setFormOpen(false)
    } catch (error) {
      console.error(error)

      setError(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(
    item: GalleryItem,
  ) {
    const confirmed =
      window.confirm(
        `¿Seguro que quieres eliminar "${item.title}"?`,
      )

    if (!confirmed) return

    setError('')
    setMessage('')

    const previousItems = items

    /*
     * Actualización inmediata.
     */

    setItems((current) =>
      current.filter(
        (galleryItem) =>
          galleryItem.id !== item.id,
      ),
    )

    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', item.id)

    if (error) {
      setItems(previousItems)

      setError(
        `No se pudo eliminar: ${error.message}`,
      )

      return
    }

    await deleteStorageFile(
      item.storage_path,
    )

    setMessage(
      'Video eliminado correctamente.',
    )
  }

  async function togglePublished(
    item: GalleryItem,
  ) {
    setError('')

    const newValue =
      !item.is_published

    /*
     * Actualización visual inmediata.
     */

    setItems((current) =>
      current.map((galleryItem) =>
        galleryItem.id === item.id
          ? {
              ...galleryItem,
              is_published: newValue,
            }
          : galleryItem,
      ),
    )

    const { error } =
      await supabase
        .from('gallery_items')
        .update({
          is_published: newValue,
          updated_at:
            new Date().toISOString(),
        })
        .eq('id', item.id)

    if (error) {
      setItems((current) =>
        current.map((galleryItem) =>
          galleryItem.id === item.id
            ? {
                ...galleryItem,
                is_published:
                  item.is_published,
              }
            : galleryItem,
        ),
      )

      setError(
        `No se pudo actualizar: ${error.message}`,
      )
    }
  }

  function formatFileSize(
    bytes: number,
  ) {
    if (bytes < 1024) {
      return `${bytes} B`
    }

    if (
      bytes <
      1024 * 1024
    ) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`
    }

    if (
      bytes <
      1024 *
        1024 *
        1024
    ) {
      return `${(
        bytes /
        (1024 * 1024)
      ).toFixed(1)} MB`
    }

    return `${(
      bytes /
      (1024 *
        1024 *
        1024)
    ).toFixed(1)} GB`
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#020617]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-4">

            <Link
              to="/admin"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08]"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-blue-400">
                WP Admin
              </p>

              <h1 className="mt-1 text-xl font-black">
                Videos
              </h1>
            </div>

          </div>

          <button
            type="button"
            onClick={openNewForm}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
          >
            <Plus size={18} />

            <span className="hidden sm:inline">
              Agregar video
            </span>
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* MENSAJES */}

        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            <Check size={18} />

            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* INTRO */}

        <section className="mb-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 md:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Video size={22} />
            </div>

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-400">
                Portafolio
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Videos de proyectos
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Sube videos de los trabajos realizados
                y asigna cada uno al proyecto correspondiente.
              </p>

            </div>

          </div>

        </section>

        {/* LOADING */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="flex items-center gap-3 text-slate-400">

              <Loader2
                size={22}
                className="animate-spin"
              />

              Cargando videos...

            </div>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          items.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <Video size={28} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                Todavía no hay videos
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Sube tu primer video y selecciona
                el proyecto al que pertenece.
              </p>

              <button
                type="button"
                onClick={openNewForm}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold"
              >
                <Plus size={18} />
                Agregar video
              </button>

            </div>
          )}

        {/* VIDEOS */}

        {!loading &&
          items.length > 0 && (
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {items.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03]"
                >

                  {/* VIDEO */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-black">

                    <video
                      src={item.file_url}
                      className="h-full w-full object-cover"
                      controls
                      preload="metadata"
                    />

                    {!item.is_published && (
                      <div className="absolute right-3 top-3">

                        <span className="rounded-full bg-red-500/90 px-3 py-1 text-[10px] font-bold">
                          Oculto
                        </span>

                      </div>
                    )}

                  </div>

                  {/* INFO */}

                  <div className="p-5">

                    <h3 className="truncate font-bold">
                      {item.title}
                    </h3>

                    <div className="mt-3 rounded-xl border border-blue-500/10 bg-blue-500/[0.05] p-3">

                      <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-blue-400">
                        Proyecto
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-300">
                        {getProjectName(
                          item.project_id,
                        )}
                      </p>

                    </div>

                    {item.description && (
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">

                      <span>
                        Orden: {item.sort_order}
                      </span>

                      <span>
                        {item.is_published
                          ? 'Publicado'
                          : 'Oculto'}
                      </span>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-4 grid grid-cols-3 gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(item)
                        }
                        className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.08]"
                      >
                        <Edit3 size={14} />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePublished(item)
                        }
                        className={`flex items-center justify-center rounded-xl py-2 text-xs font-semibold transition ${
                          item.is_published
                            ? 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                            : 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
                        }`}
                      >
                        {item.is_published
                          ? 'Visible'
                          : 'Publicar'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(item)
                        }
                        className="flex items-center justify-center rounded-xl bg-red-500/10 py-2 text-red-300 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </section>
          )}

      </main>

      {/* MODAL */}

      {formOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="flex min-h-full items-center justify-center py-8">

            <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b1120] shadow-2xl">

              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-white/[0.08] p-5">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-blue-400">
                    WP Admin
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    {editingItem
                      ? 'Editar video'
                      : 'Agregar video'}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-slate-400 hover:bg-white/[0.1]"
                >
                  <X size={19} />
                </button>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-5"
              >

                {/* TÍTULO */}

                <div>

                  <label className="text-xs font-bold text-slate-300">
                    Título del video
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Ej. Limpieza profesional de oficinas"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  />

                </div>

                {/* DESCRIPCIÓN */}

                <div>

                  <label className="text-xs font-bold text-slate-300">
                    Descripción
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        description:
                          event.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Describe brevemente el trabajo realizado..."
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                  />

                </div>

                {/* PROYECTO */}

                <div>

                  <label className="text-xs font-bold text-slate-300">
                    ¿A qué proyecto pertenece?
                  </label>

                  <select
                    value={form.projectId}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        projectId:
                          event.target
                            .value as ProjectId | '',
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
                  >

                    <option value="">
                      Selecciona un proyecto
                    </option>

                    {projects.map(
                      (project) => (
                        <option
                          key={project.id}
                          value={project.id}
                        >
                          {project.name}
                        </option>
                      ),
                    )}

                  </select>

                  <p className="mt-2 text-[11px] text-slate-500">
                    El video aparecerá dentro de este
                    proyecto en la página pública.
                  </p>

                </div>

                {/* VIDEO */}

                <div>

                  <label className="text-xs font-bold text-slate-300">
                    {editingItem
                      ? 'Cambiar video'
                      : 'Video'}
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-xs file:font-bold file:text-white"
                  />

                  {selectedFile && (
                    <p className="mt-2 text-xs text-slate-500">
                      {selectedFile.name} ·{' '}
                      {formatFileSize(
                        selectedFile.size,
                      )}
                    </p>
                  )}

                </div>

                {/* PREVIEW */}

                {previewUrl && (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">

                    <video
                      src={previewUrl}
                      controls
                      playsInline
                      className="max-h-80 w-full"
                    />

                  </div>
                )}

                {/* ORDEN */}

                <div>

                  <label className="text-xs font-bold text-slate-300">
                    Orden
                  </label>

                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        sortOrder: Number(
                          event.target.value,
                        ),
                      }))
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                  <p className="mt-2 text-[11px] text-slate-500">
                    Los números menores aparecen primero.
                  </p>

                </div>

                {/* PUBLICAR */}

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">

                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        isPublished:
                          event.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-blue-500"
                  />

                  <div>

                    <p className="text-sm font-bold">
                      Publicar en la web
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Si está desactivado, el video no
                      aparecerá en la página pública.
                    </p>

                  </div>

                </label>

                {/* ERROR */}

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* BOTONES */}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={saving}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-slate-300"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {saving ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        Guardando...
                      </>
                    ) : editingItem ? (
                      <>
                        <Save size={17} />

                        Guardar cambios
                      </>
                    ) : (
                      <>
                        <Upload size={17} />

                        Agregar video
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default AdminGallery