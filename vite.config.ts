import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    allowedHosts: ['.loca.lt'],
  },

  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'robots.txt',
      ],

      manifest: {
        name: 'W.P. Limpieza y Mantenimiento',
        short_name: 'W.P. Limpieza',
        description:
          'Servicios profesionales de limpieza y mantenimiento.',

        lang: 'es',

        theme_color: '#020617',
        background_color: '#020617',

        display: 'standalone',
        orientation: 'portrait',

        scope: '/',
        start_url: '/',

        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes:
          5 * 1024 * 1024,

        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}',
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
})