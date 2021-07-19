<template>
  <div class="about">
    <h1>在about中使用</h1>
    <button @click="$store.state.num--">-</button>
    {{$store.state.num}} 
    <button @click="$store.state.num++">+</button>
    <br>
    <button @click="useDemo">click me</button>
    <p>actions to change num</p>
    {{$store.state.num}}
  </div>
</template>


<script>
export default {
  name:'About',
  methods: {
    useDemo(){
      this.$store.dispatch('demo');
    }
  }
}
</script>