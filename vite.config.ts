import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Finance Freedom Soon',
        short_name: 'FFS',
        description: 'An app that calculates how long you would spend to reach financial freedom',
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
  server: {
    watch: {
      usePolling: true
    }
  }
})
