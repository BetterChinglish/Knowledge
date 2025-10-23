<template>
  <div class="home">
    <div class="demo1">this is a test</div>
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

.demo1 {
  color:var(--color-high-text)
}
</style>
