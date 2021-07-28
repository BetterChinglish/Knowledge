<template>
  <div class="home">
    <img alt="Vue logo" src="~assets/logo.png">
    <img :src="imgsrc" alt="">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div id="demo">

    </div>
  </div>



</template>

<script>
// @ is an alias to /src
import HelloWorld from 'components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      imgsrc:require('assets/logo.png')
      
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#demo {

  width: 100%;
  height: 500px;
  background: url('~assets/logo.png') no-repeat center;
}
</style>
