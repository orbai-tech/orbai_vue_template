import type { App } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/views/layouts/default/index.vue'

/**
 * 路由只描述页面结构；权限、菜单和面包屑等扩展信息放在 meta 中。
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/pages/home/index.vue'),
        meta: { title: '工作台', icon: 'DashboardOutlined' },
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/pages/order/index.vue'),
        meta: { title: '订单示例', icon: 'UnorderedListOutlined' },
      },
      {
        path: 'components',
        name: 'Components',
        component: () => import('@/views/pages/component-examples/index.vue'),
        meta: { title: '组件示例', icon: 'AppstoreOutlined' },
      },
      {
        path: 'request',
        name: 'Request',
        component: () => import('@/views/pages/request-example/index.vue'),
        meta: { title: '请求示例', icon: 'CloudOutlined' },
      },
      {
        path: 'state',
        name: 'State',
        component: () => import('@/views/pages/state-example/index.vue'),
        meta: { title: '状态管理', icon: 'DatabaseOutlined' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/pages/not-found/index.vue'),
    meta: { title: '页面不存在' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROUTE_BASE || '/'),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

// 使用路由元信息更新浏览器标题；鉴权守卫也可在此按模块拆分注册。
router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'OrbAI Vue Template'
  document.title = to.meta.title ? `${String(to.meta.title)} - ${appTitle}` : appTitle
})

/** 由 plugin/index.ts 统一调用并注册 Vue Router。 */
export function setup(app: App) {
  app.use(router)
}

export default router
