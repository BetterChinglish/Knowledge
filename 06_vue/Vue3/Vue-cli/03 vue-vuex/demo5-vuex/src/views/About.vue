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

    <br>
    <p>
      dnum:{{$store.state.dnum}}
    </p>
    <br>
    <input v-model="mathScore"><button @click="addN(Number(mathScore))">add this to dnum</button>

    <p>
      {{mathScore}}
    </p>
  </div>
</template>


<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  name:'About',
  data() {
    return {
      mathScore:0

    }
  },
  methods: {
    useDemo(){
      this.$store.dispatch('demo');
    },
   

    // 提交mutation
    // 可以使用传统的commit, index.js已经提到两种风格
    // 还可以使用mapMutations
    // 在methods中使用mapMutation
    // ...mapMutations({
    //   add:'addN'  // 将this.addN(scores) 映射为 this.$store.commit('addN',scores);
    // })

    ...mapMutations([
      'addN'
    ])




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
      // localComputed:{
      //   // ...
      // },
      // // ...


      // // 使用三点运算符将其解构赋值
      // ...mapState({
      //   // ...
      // }),

      // 使用mapGetters
      // mapGetters作用仅仅是将getter映射到局部计算属性
      // ...mapGetters([

        // 'getterName',// 注意这里是es6语法
        // 如果另取名字, 使用对象赋值写法 aliasName:'getterName'
      // ])

      


    }
}
</script>