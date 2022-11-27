<template>
<div>
    <!-- 子传父
        每次加2, 则绑定一个函数add传入参数2
     -->
    <button @click="add(2)">+</button>
</div>
</template>



<script>

export default {

    name: 'sonComponent',
    
    components:{
      
    },

    props: {

    },

    data() {
      return {

      };
    },

    computed: {

    },

    methods: {
        add(step) {
            // 在该函数中, 提交一个事件, 第一个参数为提交的事件名, 第二个参数为传入的参数
            // 在子组件事件绑定的函数发生时, 则父组件会触发addStep2这个事件
            this.$emit('addStep2', step);
        }
    },


};

</script>



<style scoped>

</style>
