<template>
<!-- 主要是为了解决props与emit的层级次数太多的问题
    一个组件提供provide数据, 其子组件无论多深都可以inject注入该数据
-->
<div>
    father: <br>
    {{welcome}} {{name}}
    <br>
    num: {{num}}    <button @click="add">+</button>

    <hr>

    son:    <br>
    <son-component>

    </son-component>
</div>
</template>



<script>
import { computed } from '@vue/runtime-core';
import SonComponent from './components/06 依赖注入/SonComponent.vue';

export default {

    name: 'app',
    
    components:{
      SonComponent,
        SonComponent,
    },

    props: {

    },

    data() {
      return {
        name: 'zhangsan',
        welcome: 'hello',
        num: 0,
      };
    },

    // 可以以对象方式传, 但是那样无法访问当前组件变量
    // privide:{ },

    // 使用函数方式传, 可以调用this以访问当前组件变量
    provide() {
        return {
            name: this.name,
            welcome: this.welcome,

            // 显示提供一个计算属性
            num: computed(()=> this.num),
            // 临时配置要求
            // 上面的用例num需要设置 app.config.unwrapInjectedRef = true 
            // 以保证注入会自动解包这个计算属性。
            // 这将会在 Vue 3.3 后成为一个默认行为，
            // 而我们暂时在此告知此项配置以避免后续升级对代码的破坏性。
            // 在 3.3 后就不需要这样做了
        }
    },

    computed: {

    },

    methods: {
        add() {
            this.num++;
        }
    },


};

</script>



<style scoped>

</style>
