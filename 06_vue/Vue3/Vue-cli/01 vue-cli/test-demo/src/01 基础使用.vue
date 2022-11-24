<template>
<div>
  <!-- 插值 -->
  {{welcome}}
  <br>
  {{msg}}
  <br>

  <!-- 插值可以简单运算 -->
  {{welcome + ' ' + msg}}
  <br>
  num的十倍:{{num * 10}}
  <br>
  <br>

  <div class="instructions"><strong>vue.js的指令(以v开头): </strong>
    
    <br><br>

    <h3>
    1 v-pre 
    </h3>
    <pre>
      不解释vue.js
      v-pre与pre标签略有不同
    </pre>
    v-pre:
    <div v-pre>
      {{welcome + '' + msg}}
        aaa

              bbb
    </div>
    <br><br>
    pre:    
    <pre>
      aaa   {{welcome + '' + msg}}
            bbb
    </pre>

    <h3>
      2 v-once
    </h3>  
    <pre>
      只显示第一次的值, 非响应式
    </pre>   
    <div v-once>
      num(v-once): 
      {{num}}
    </div>
    <br><br>

    3 v-text: 
    <br> 
    <pre>
      文本内容, v-text="", 双引号中默认为变量
        例如v-text="hello world" 这会去找hello 和 world 两个变量
        然后将他们作为文本去显示
        如果要输出字符串hello world, 则使用 '' 把他们括起来
          v-text=" 'hello world' "
    </pre>
    <div v-text=" 'hello world' "></div>
    <br><br>

    4 v-html
    将字符串作为html解析
    <div v-html="myUrl"></div>


    5 v-bind
    

  </div>
 


  <div class="addMachineTest">
    <button @click="sub">-</button>
    {{num}}
    <button @click="add">+</button>
  </div>



</div>
</template>

<script>
// 在此引入.vue组件
// import myBtnTestDemo from './btn.vue';

export default {
  // 组件名称, 可以在其他页面中引入该组件, 引入时使用的名字
  name: 'App',
  
  // 引入其他组件
  components: {
    // myBtnTestDemo,
  },
  // 数据在此声明
  data() {
    return {
      welcome: 'hello',
      msg:'world',
      num: 0,
      myUrl:`
        <strong> hello world </strong>`,
      
      
    }
  },

  // 函数方法在此声明
  methods:{
    add() {
      this.num++;
    },  // 各个函数使用逗号隔开, 因为这是json格式

    sub() {
      this.num--;
    }

  }
}
</script>

<style>
.addMachineTest{
  width: 300px;
  height: 200px;
  margin: 100px auto;
  text-align: center;
  background-color: grey;
  line-height: 200px;
}
</style>
