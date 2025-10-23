<template>
<div>
    <p>
        {{num}}
    </p>
    <!-- 先看子组件注释 -->
    <!-- 这里绑定addStep2事件, 将函数myAddDemo和该事件绑定, 当该事件发生时, 调用myAddDemo函数 -->
    <SonComponent @addStep2="myAddDemo"></SonComponent>
</div>
</template>



<script>
import SonComponent from './components/03 子传父/SonComponent.vue';
export default {

    name: 'app',
    
    components:{
      SonComponent,
    },

    props: {

    },

    data() {
      return {
        num: 0,
      };
    },

    computed: {

    },

    methods: {
        // 这里的形参会接收子组件提交事件时发送的参数
        myAddDemo(step) {
            this.num += step;
        }
    },


};

</script>



<style scoped>

</style>
