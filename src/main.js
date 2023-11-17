/*
 * @Author: please
 * @Date: 2023-10-12 14:05:42
 * @LastEditors: please
 * @LastEditTime: 2023-10-19 13:54:13
 * @Description: 请填写简介
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).mount('#app')
