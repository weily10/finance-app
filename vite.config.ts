import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Vue 3 PWA App',
        short_name: 'VuePWA',
        description: 'A Progressive Web App with Vue 3',
        theme_color: '#42b883',
        icons: [
          {
            src: './public/icon192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './public/icon512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
