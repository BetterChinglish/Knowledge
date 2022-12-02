# demo1

## 路由简介
src/router/index.js中写路由

### 路由表
创建数组routes, 数组中每个都为一个对象
对象内容: 
```js
const routes= [
    // 第一个路由配置对象
    {
        // 路由路径名
        path: '',

        // 路由名称
        name: '',

        // 路由绑定的组件
        component: 
    },

    // 第二个路由的配置对象
    {

    },

    // ...
]
```

### 路由对象
```js
// 引入路由库中创建路由函数
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

// 创建路由
const router = createRouter({
    // 路由使用什么模式
    // 历史模式
    history: createWebHistory(process.env.BASE_URL),

    // 哈希模式, 默认, 使用url的哈希值来作为路由,
    // 用于指导浏览器动作, 对服务端完全无用, 支持所有浏览器
    // history: createWebHashHistory(process.env.BASE_URL),

    // abstract模式, 支持所有js运行模式
    // 如果发现浏览器没有history api, 则自动强制进入该模式

    // es6语法, 其实是routes: [],这个数组是上面刚才写的路由表
    // 所以也就是routes: routers,
    // 简写routes,
    routes
})

export default router;
```

### 路由挂载
创建好的路由对象, 也就是上面的const router, 需要在vue对象中使用
```js
// 此为简写, 默认js文件名为index.js, 如果需要更改js文件名则记得改路径
import router from './router'

// 使用use(routerObjName)使vue对象使用配置好的路由
createApp(App).use(router).mount('#app')
```

### 路由的使用
使用时一般在主vue文件中使用nav, router-link与router-view三个标签
nav为h5新增的语言标签, 包含所需要的router-link页面
router-link标签有一个属性to, 绑定我们路由配置对象的path, 且router-link会被渲染为a标签, 点击时跳转to绑定的路径将页面展现到router-view中
router-view只需要写一个, 同一时间只能显示一个路径嘛
```js
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>
```

### 激活的路由的类
当前展示的路由的router-link渲染的a标签会被添加.router-link-exact-active类
```html
<a 
    href="/" 
    class="router-link-active router-link-exact-active" 
    aria-current="page"
>
    Home
</a>
```
我们对其修改样式一般使用该类

```css
nav a.router-link-exact-active {
  color: #42b983;
}
```

### 路由配置对象的懒加载
如果直接先import再component中写入, 会直接将该组件打包加入js中
当router很多的时候, 这会导致效率的降低
```js
import Home from '../view/HomePage.vue';
import About from '../view/AboutPage.vue';

const routes= [
  {
    path: '/',

    name: 'Home',

    component: Home
  },

  {
    path: '/',

    name: 'About',

    component: About
  },
]
```

一般只将主页面这样如上引入, 因为主页面始终都要加载, 属于必备的
而其他页面则按需引入再加载, 所以需要打包成单独的js文件
可以如下引入:
```js
import Home from '../view/HomePage.vue';

// 其他组件按需引入则需要使用回调加载, 而不是直接import
const About = () => import('../view/AboutPage.vue');

const routes= [
  {
    path: '/',

    name: 'Home',

    component: Home
  },

  {
    path: '/',

    name: 'About',

    component: About
  },
]
```

这样会将About组件路由单独打包一个js, 只有需要的时候才加载
打包好的js文件应该是如下格式名: chunkName.[hash].js
chunkName可以通过魔术注释进行修改
```js
const About = () => import(/* webpackChunkName: 'about' */'../view/AboutPage.vue');
```
这样About组件就会单独打包为about.[hash].js文件了, 其中[hash]为一串哈希值

### 修改默认渲染标签
默认将router-link渲染为a
vue2直接使用tag="button",就可以直接改为渲染成按钮标签
```html
<router-link to="/test1" tag="button">
  test1
</router-link>
```

vue3则需要使用插槽的方式
```html
<router-link to="/test1" custom v-slot=" { navigate } ">
  <button @click="navigate">test1</button>
</router-link>
```

### 修改active-link标签
当前路由会默认添加俩标签:router-link-active router-link-exact-active
使用active-class属性修改router-link-active类名
```html
<router-link to="/test1" active-class="myActive">test1</router-link> | 

```
渲染为:
```html
<a href="/test1" 
  class="myActive router-link-exact-active" 
  aria-current="page"
>
test1
</a>
```
但是没必要这样改, 可以自己直接加类名再通过新加的类名修改样式


### 使用全局变量$router
上面修改默认渲染的方式很麻烦, 可以直接对新标签添加跳转路由
使用$router.go()可以跳转页面, 相当于history.go()
使用$router.push('router'), 可以跳转路由页面
```html
<button @click="$router.push('/test1')">to test1</button> | 
<button @click="$router.go(-1)">back</button> | 
```
使用$route.path获得当前路由路径

### 使用命名视图(一个路由对应多个组件)
router-view标签一般只放一个, 但是需要多个页面级组件同时展示也是可以的
```html
<!-- App.vue -->

<!-- 添加name属性, 对应router/index.js中的组件名
-->
<router-view name="About"></router-view>
<router-view></router-view>
<router-view name="User"></router-view>
```

```js
// /router/index.js
const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView

    // 使用components
    components: {
      default: Home,
      // 这里是es6语法, 可以修改名字, router-view中应当使用此处的键名
      About,
      User
    }
  },
  // ...
]
```