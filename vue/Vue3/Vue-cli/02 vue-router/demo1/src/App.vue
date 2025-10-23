<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    
    <!-- <router-link to="/test1" active-class="myActive">test1</router-link> | 
    <router-link to="/test1" custom v-slot=" { navigate } ">
      <button @click="navigate">test1</button>
    </router-link>  | 
    <button @click="$router.push('/test1')">to test1</button> | 
    <button @click="$router.go(-1)">back</button> | 

    <router-link to="/user">个人中心</router-link> -->
    <router-link to="/page" >params</router-link> | 
    <router-link to="/article" >query</router-link>


    <p type="text" :innerText="$route.path"></p>
    
  </nav>
  <router-view />

<!-- 使用命名视图 -->
  <!-- <router-view name="about" />
  <router-view />
  <router-view name="test" /> -->

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
