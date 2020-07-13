import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home'
// import Category from '../views/category'
// import Cart from '../views/cart'
// import Personal from '../views/personal'
// import Search from '../views/search'
// import Product from '../views/product'

Vue.use(VueRouter)

const routes = [
  // 通过import动态引入,实现懒加载，访问相应的页面才会加载页面对应的代码
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home'),
    children: [
      // 二级路由
      {
        path: 'product/:id',
        name: 'home-product',
        component: () => import('../views/product')
      }
    ]
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/category')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/home')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../views/personal')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/search')
  },
  {
    path: '*',
    redirect: '/home'
  }
  // {
  //   path: '/product',
  //   name: 'Product',
  //   component: Product
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
