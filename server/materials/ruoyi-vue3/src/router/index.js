/*
 * @Author: please
 * @Date: 2023-10-13 14:10:10
 * @LastEditors: please
 * @LastEditTime: 2023-10-15 21:23:58
 * @Description: 请填写简介
 */
import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import Layout from '@/layout'

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: false,
    redirect: 'noRedirect',
    permissions: ['system:user:edit'],
    meta: { title: '系统管理', icon : "system" },
    children: [
      {
        path: 'role/userId/1',
        component: () => import('@/views/system/user/index'),
        name: 'AuthRole',
        meta: { title: '分配角色1' }
      },
      {
        path: 'role/userss/2',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRoless',
        meta: { title: '分配角色2' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
