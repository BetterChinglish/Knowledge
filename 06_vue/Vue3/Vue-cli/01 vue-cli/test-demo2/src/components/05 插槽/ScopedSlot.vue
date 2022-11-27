<template>
<div>
    <!-- 可以使用绑定的方式将属性名与本组件的变量绑定在一起 -->
    <slot name="header" :welcome="welcome" :user="name">
        你好, 欢迎你
    </slot>
</div>
</template>



<script>

export default {

    name: 'ScopedSlot',
    
    components:{
      
    },

    props: {

    },

    data() {
      return {
        hello: 'hello',
        world: 'world',
        name: 'zhangsan',
      };
    },

    computed: {
        welcome() {
            return this.hello + ' ' + this.world;
        }
    },

    methods: {

    },


};

</script>



<style scoped>

</style>
