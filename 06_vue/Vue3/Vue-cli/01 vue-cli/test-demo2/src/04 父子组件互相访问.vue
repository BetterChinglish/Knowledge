<template>
<div>
    <!-- 子访问父:
        使用$parent, 详见SonComponent组件
    -->

    <!-- 父访问子: 
        $children[index]或$refs方式

        $children会得到该页面所有组件, 然后使用第n个来访问, 但是这受组件排序的影响, vue3已经删除

        $refs则需要使用ref属性对组件起别名aliaName, 再使用$refs.aliaName进行访问
    -->
    <p>
        {{num}}
    </p>
    <hr>

    <h2>father: </h2><button @click="fAdd(1)">+</button>
    son1
    <SonComponent ref="son1"></SonComponent>    

    <hr>
    <h2>father</h2><button @click="fSub(2)">-</button>
    son2
    <SonComponent ref="son2"></SonComponent>    

</div>
</template>



<script>
import SonComponent from "./components/04 父子组件互相访问/SonComponent.vue";

export default {
    name: 'app',
    
    components:{
      SonComponent,
    },

    props: {

    },

    data() {
      return {
        fatherMsg: 'this is fatherMsg',
        num: 0,
      };
    },

    computed: {
        
    },

    methods: {
        fatherShow() {
            console.log('this is fatherShow method');
        },
        add() {
            this.num++;
        },
        fAdd(step) {
            this.$refs.son1.add(step);
        },
        fSub(step) {
            this.$refs.son2.sub(step);

        }
    },


};

</script>



<style scoped>

</style>
