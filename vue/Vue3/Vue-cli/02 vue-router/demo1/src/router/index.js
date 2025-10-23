import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const test1 =() => import(/* webpackChunkName: "test1" */'../views/test1.vue');
const AboutView = () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue');

const User = () => import(/* webpackChunkName: "user" */ '../views/User.vue');
const UserInfo = () => import(/* webpackChunkName: "userInfo" */ '../views/UserInfo.vue');
const UserSetting = () => import(/* webpackChunkName: "userSetting" */ '../views/UserSetting.vue');

const Page = () => import(/* webpackChunkName: "page" */ '../views/Page.vue');
const PageId = () => import(/* webpackChunkName: "pageId" */ '../views/PageId.vue');

const Article = () => import(/* webpackChunkName: "article" */ '../views/Article.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    
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
  },

  // 嵌套路由
  {
    path: '/user',
    name: 'user',
    component: User,
    children: [
    
      // 路径: /user/info , 注意path的info前面不加/
      {
        path: 'info',
        name: 'userinfor',
        component: UserInfo
      },

      // /user/setting
      {
        path: 'setting',
        name: 'usersetting',
        component: UserSetting
      },

      // 添加以上俩路径, 则只有点击其中之一才显示页面
      // 可以设置一个空路径以默认显示其中之一
      {
        path: '',
        name: 'userinfor',
        component: UserInfo
      },
    ]
  },

  // 动态路由以及路由传参

  // params方式传参
  {
    path: '/page',
    component: Page,
    children: [
      {
        path: 'p/:id',
        component: PageId
      }
    ]
  },

  // query方式传参
  {
    path: '/article',
    name: 'article',
    component: Article,
    children: [
      {
        path: 'art',
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
