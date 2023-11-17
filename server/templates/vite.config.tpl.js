/*
 * @Author: please
 * @Date: 2023-10-13 10:28:53
 * @LastEditors: please
 * @LastEditTime: 2023-10-13 10:54:43
 * @Description: 请填写简介
 */
const tplStr = `
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8081,
    proxy: {
      '^/api/': 'http://0.0.0.0:8000/'
    }
  }
})
`
module.exports = tplStr