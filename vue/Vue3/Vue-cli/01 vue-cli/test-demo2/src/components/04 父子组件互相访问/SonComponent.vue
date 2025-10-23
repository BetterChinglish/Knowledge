<template>
<div>
    <h2>子组件</h2>
    {{num}}
    <button @click="show">get from father</button>
</div>
</template>



<script>

export default {

    name: 'SonComponent',
    
    components:{
      
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
        show() {
            // 使用$parent获得当前组件所在的父组件
            // 可以$parent.$parent获得父组件的父组件, 以此类推
            // 
            // $root可以直接获得根组件, 这里不演示了
            console.log(this.$parent.fatherMsg);
            console.log(this.$parent.fatherShow());
            this.$parent.add();

        },
        add(step) {
            this.num += step;
        },
        sub(step) {
            this.num -=step;
        }
    },


};

</script>



<style scoped>

</style>
