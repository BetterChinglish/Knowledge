import { createRouter, createWebHistory } from 'vue-router'

import About from '../views/About';
import Home from '../views/Home'
import User from '../views/User'

// 注意, 使用如上的import方式引入的方法
// 会导致这些组件被打包到同一个js文件中
// 当有100个组件但只需要使用10个时, 这个js文件会被整个加载进去
// 无法实现按需加载

// 可以使用如下注释的方法
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      component:About
    },
    {
        path:'/user',
        name:'User',
        component:User
    }
  ]


const router = createRouter({
    history:createWebHistory(process.env.BASE_URL),
    routes
})

export default router;