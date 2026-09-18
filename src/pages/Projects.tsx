import { useEffect, useState } from 'react'
import {
  Building2,
  HardHat,
  Layers3,
  Play,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { supabase } from '../lib/supabase'
import AppShell from '../components/AppShell'

type GalleryItem = {
  id: string
  title: string
  description: string | null
  media_type: string
  file_url: string
  thumbnail_url: string | null
  is_published: boolean
  sort_order: number
  project_id: string | null
}

type ProjectConfig = {
  id: string
  name: string
  icon: LucideIcon
}

const projects: ProjectConfig[] = [
  {
    id: 'limpieza-institucional',
    name: 'Limpieza institucional',
    icon: Building2,
  },
  {
    id: 'mantenimiento-profesional',
    name: 'Mantenimiento profesional',
    icon: Layers3,
  },
  {
    id: 'limpieza-post-obra',
    name: 'Limpieza post-obra',
    icon: HardHat,
  },
  {
    id: 'tratamiento-superficies',
    name: 'Tratamiento de superficies',
    icon: Layers3,
  },
]

export default function Projects() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  async function loadProjects() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: queryError } = await supabase
        .from('gallery_items')
        .select(`
          id,
          title,
          description,
          media_type,
          file_url,
          thumbnail_url,
          is_published,
          sort_order,
          project_id
        `)
        .eq('is_published', true)
        .eq('media_type', 'video')
        .not('project_id', 'is', null)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (queryError) {
        throw queryError
      }

      setItems(data ?? [])
    } catch (err) {
      console.error('Error cargando proyectos:', err)
      setError('No fue posible cargar los proyectos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <AppShell>
      <main className="min-h-screen bg-[#F8FAFC] text-[#172033]">

        {/* CABECERA MINIMALISTA */}
        <section className="mx-auto max-w-7xl px-5 pb-7 pt-8 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between border-b border-[#D9E2EC] pb-5">

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0F4C81]">
                W.P. Limpieza y Mantenimiento
              </p>

              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#123B5D] sm:text-4xl">
                Proyectos
              </h1>
            </div>

            <span className="hidden text-xs text-[#64748B] sm:block">
              Nuestro trabajo
            </span>

          </div>
        </section>

        {/* CONTENIDO */}
        <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">

          {/* LOADING */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#64748B]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#0F4C81]" />
                Cargando proyectos...
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && !loading && (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <p className="text-sm text-[#64748B]">
                {error}
              </p>

              <button
                type="button"
                onClick={loadProjects}
                className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#0F4C81]"
              >
                Reintentar
              </button>

            </div>
          )}

          {/* GALERÍA */}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">

              {projects.map((project) => {
                const projectVideos = items.filter(
                  (item) => item.project_id === project.id,
                )

                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    videos={projectVideos}
                    onOpen={setSelected}
                  />
                )
              })}

            </div>
          )}

        </section>

        {/* MODAL */}
        {selected && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#123B5D]/90 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >

            <div
              className="relative w-full max-w-5xl overflow-hidden bg-black shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#123B5D] shadow-lg transition hover:scale-105"
                aria-label="Cerrar"
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              <video
                src={selected.file_url}
                poster={selected.thumbnail_url ?? undefined}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] w-full bg-black object-contain"
              />

              <div className="bg-white px-5 py-4 sm:px-7">

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#0F4C81]">
                  W.P. Limpieza y Mantenimiento
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em] text-[#123B5D]">
                  {selected.title}
                </h2>

                {selected.description && (
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-[#64748B]">
                    {selected.description}
                  </p>
                )}

              </div>

            </div>

          </div>
        )}

      </main>
    </AppShell>
  )
}


/* =====================================================
   TARJETA DE PROYECTO
===================================================== */

type ProjectCardProps = {
  project: ProjectConfig
  videos: GalleryItem[]
  onOpen: (item: GalleryItem) => void
}

function ProjectCard({
  project,
  videos,
  onOpen,
}: ProjectCardProps) {
  const Icon = project.icon

  const video = videos[0]

  /* SIN VIDEO */
  if (!video) {
    return (
      <article className="group">

        <div className="relative aspect-[4/3] overflow-hidden border border-[#D9E2EC] bg-[#EAF3F8]">

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9E2EC] bg-white">
              <Icon
                size={18}
                strokeWidth={1.5}
                className="text-[#0F4C81]"
              />
            </div>

            <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Próximamente
            </span>

          </div>

        </div>

        <div className="pt-3">
          <h2 className="text-base font-semibold tracking-[-0.02em] text-[#123B5D]">
            {project.name}
          </h2>
        </div>

      </article>
    )
  }

  return (
    <article className="group">

      {/* VISUAL */}
      <button
        type="button"
        onClick={() => onOpen(video)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#123B5D] text-left"
        aria-label={`Ver ${project.name}`}
      >

        {/* IMAGEN */}
        {video.thumbnail_url ? (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          <video
            src={video.file_url}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/80 via-transparent to-transparent opacity-80 transition duration-300 group-hover:opacity-100" />

        {/* ICONO */}
        <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md">
          <Icon
            size={14}
            strokeWidth={1.6}
          />
        </div>

        {/* PLAY */}
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#123B5D] opacity-0 shadow-lg transition duration-300 group-hover:scale-105 group-hover:opacity-100">
          <Play
            size={13}
            fill="currentColor"
            strokeWidth={1.4}
          />
        </div>

        {/* TEXTO SOBRE LA IMAGEN */}
        <div className="absolute bottom-0 left-0 right-0 p-4">

          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/65">
            Proyecto
          </p>

          <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">
            {project.name}
          </h2>

        </div>

      </button>

      {/* INFORMACIÓN INFERIOR */}
      <div className="flex items-center justify-between border-b border-[#D9E2EC] py-3">

        <div className="min-w-0">

          <p className="truncate text-xs text-[#64748B]">
            {video.description || 'Trabajo profesional W.P.'}
          </p>

        </div>

        <span className="ml-4 shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F4C81]">
          Ver
        </span>

      </div>

    </article>
  )
}