<template>
  <div id="app">
    <div>
      hello
      {{ $store.state.name }}
      {{ $store.state.age }}
    </div>
    
    <div>
      <button @click="$store.state.age += 1">+1</button>
      
      <button @click="$store.commit('changeAge', 1)"> commit-age +1 </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
