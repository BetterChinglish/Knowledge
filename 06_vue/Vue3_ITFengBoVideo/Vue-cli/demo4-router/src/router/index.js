import { createRouter, createWebHistory } from 'vue-router'


// 懒加载实现方式
// 即在component中使用箭头函数进行import
// 再改进一步就是先声明Home， 再在component中使用Home
const Home = () => import('../views/Home.vue')
const User = ()=>import('../views/User.vue')
const About = () => import( '../views/About.vue')


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
      // component: () => import( '../views/About.vue') ///* webpackChunkName: "about" */
      component:About
    },
    {
        path:'/user',
        name:'User',
        component:User
    }
  ]


const router = createRouter({
  // 有三种方式引入路由, 
  // Hash, 使用url的hash值来作为路由,来指导浏览器动作
  // History, 使用HTML5 History API和服务配置
  // Abstract, 支持所有js运行模式, 如果发现没用浏览器的api, 路由会自动强制进入这个模式
  
  history:createWebHistory(process.env.BASE_URL),
  routes
})

export default router;