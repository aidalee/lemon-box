import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://an-dev.soterea.cn',
        changeOrigin: true,
        // rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
  }
})
