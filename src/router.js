import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import(/* webpackChunkName: "demo" */ './views/Order.vue')
        },
        {
          path: '/order/tambah',
          name: 'Order Baru',
          component: () => import(/* webpackChunkName: "demo" */ './views/Forms/OrderForms.vue')
        },
        {
          path: '/order/detail/:order_id',
          name: 'Detail Order',
          component: () => import(/* webpackChunkName: "demo" */ './views/Forms/OrderForms.vue')
        },
       {
          path: '/order/printout/:order_id',
          name: 'Printout',
          component: () => import(/* webpackChunkName: "demo" */ './views/Forms/OrderForms.vue')
        },
        {
          path: '/product',
          name: 'Produk',
          component: () => import(/* webpackChunkName: "demo" */ './views/Product.vue')
        },
        {
          path: '/product/tambah',
          name: 'Produk Baru',
          component: () => import(/* webpackChunkName: "demo" */ './views/Forms/ProductForms.vue')
        },
        {
          path: '/product/detail/:product_id',
          name: 'Detail Produk',
          component: () => import(/* webpackChunkName: "demo" */ './views/Forms/ProductForms.vue')
        },
        {
          path: '/printout/:printout_type/:id',
          name: 'Printout',
          component: () => import(/* webpackChunkName: "demo" */ './views/Printout.vue')
        },
        {
          path: '/settings',
          name: 'Pengaturan',
          component: () => import(/* webpackChunkName: "demo" */ './views/Settings.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    }
  ]
})
