<template>
  <div id="app">
    <div>
       {{ $store.state.name }}
       {{ $store.state.age }}
    </div>

    <div>
      <!-- {{$store.state.aStore.nameA}} -->
      <!-- {{$store.state.aStore.ageA}} -->
    </div>

    <div>
      <!-- {{$store.state.bStore.nameB}} -->
      <!-- {{$store.state.bStore.ageB}} -->
    </div>

    <div>
     <button @click="$store.state.age += 1">+1</button> <br/>
     如果modules里还有同名的mutation则也会执行
     <button @click="$store.commit('changeAge', 1)"> commit-age +1 </button> <br/>
     <button @click="$store.dispatch('changeAgeAsync', 1)"> dispatch-age +1 </button> <br/>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  mounted() {
    console.log('this.$store', this.$store)
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
