<template>
  <div class="hello">
    <h3>在子组件helloworld中应用home中的data</h3>
    {{count}}

    <h2>在 hello world 组件中使用vuex全局属性</h2>
    <button @click="$store.state.num--">-</button>
    {{$store.state.num}} 
    <button @click="$store.state.num++">+</button>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    count: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
