/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Stop Scout',
        short_name: 'StopScout',

        theme_color: '#0f172a',
        background_color: '#ffffff',

        display: 'standalone',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },

          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  test: {
      environment: 'jsdom'
    },
})