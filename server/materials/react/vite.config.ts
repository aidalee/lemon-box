import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    server: {
        host: "0.0.0.0", // 开启局域网访问，暴露ip
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://0.0.0.0:8111',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
