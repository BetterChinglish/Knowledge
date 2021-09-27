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
import {mapState, mapGetters} from 'vuex'
export default {
  name:'About',
  methods: {
    useDemo(){
      this.$store.dispatch('demo');
    }
  },

  // computed, 为每个state声明一个computed很麻烦, 可以使用mapState
  // computed:mapState({

    // 第一种
    // computedName:()=>{}


    // 第二种
    // computedName:'stateName'
    // 简写:
    // 'stateNames'
    // 如果全简写, mapState里可以不传入对象而改传入数组

    // 第三种
    // function(state){

        // 可以使用this调用data里的数据

    // }


  // })


    computed:{
      localComputed:{
        // ...
      },
      // ...


      // 使用三点运算符将其解构赋值
      ...mapState({
        // ...
      }),

      // 使用mapGetters
      // mapGetters作用仅仅是将getter映射到局部计算属性
      ...mapGetters([

        // 'getterName',// 注意这里是es6语法
        // 如果另取名字, 使用对象赋值写法 aliasName:'getterName'

      ])



    }
}
</script>