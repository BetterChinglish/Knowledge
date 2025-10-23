<template>
  <div class="home">
    
    <h2>单页模板使用</h2>
    <button @click="count--">-</button>
    {{count}}
    <button @click="count++">+</button>

    <hr>

    <h2>使用vuex全局属性</h2>
    <button @click="$store.state.num--">-</button>
    {{$store.state.num}} 
    <button @click="$store.state.num++">+</button>

    <hr>

    <h2>使用mutation控制</h2>
    dnum: {{$store.state.dnum}}
    <button @click="sub1">-</button>
    <button @click="add1">+</button>

    <h2>使用getters</h2>
    num^2: {{$store.getters.numpower}}
    <br>
    num^3: {{$store.getters.num3}}

    <br>
    <input v-model="num">
    <button @click="getNum2(num)">计算</button>
    <p>
      你输入了: {{num}}
      结果为:   {{$store.getters.inputNumber2(num)}}
    </p>
    <HelloWorld :count="count" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      count:0,
      num:0,
      answer:0
    }
  },
  components: {
    HelloWorld
  },
 
  methods:{
    add1(){
      this.$store.commit('add')
      // 当传入参数时, 直接在参数列表加入一个参数即可
      // 当传入多个参数时, 参数列表长度不可以超过二, 由于第一个参数是指定函数
      // 也就是说当要传递多个参数时, 应当把多个参数合并为一个数组传递过去
    },
    sub1() {
      this.$store.commit('sub')
    },
    getNum2(n) {
      this.answer=$store.getters.inputNumber2(num);
    }
  }
}
</script>
