import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

let test1 =() => import(/* webpackChunkName: "test1" */'../views/test1.vue');
let AboutView = () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue');
const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView
    components: {
      default: HomeView,
      test: test1,
      about: AboutView
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/test1',
    name: 'test1',
    component: test1
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
