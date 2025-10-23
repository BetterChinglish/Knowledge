<template>
<div>
    <!-- v-on绑定事件click, 调用函数sub() 
        如果使用带括号的函数
        则传入的参数会被捕捉到方法中, 
        如果没有传入实参而有形参, 则默认为undefined
    -->
    <button v-on:click="sub()">-</button>
    {{num}}
    <!-- 使用缩写@代替v-on, 且函数可以不带括号 
        如果没有括号的方式
        则也可以有形参, 默认为该事件的对象
    -->
    <button @click="add">+</button>


    <!-- 事件对象
        可以使用 $event 传入事件对象
    -->
    <button @click="add($event)">add(event)</button>

    <!-- 事件修饰符
        stop    阻止事件冒泡
        self    事件由该元素本身触发时才发生
        capture 添加事件侦听器, 使用事件捕获模式
        prevent 阻止默认事件
        once    事件只触发一次 

        用法示例:
        @click.stop=""
        @click.stop.prevent=""

    -->

</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            num: 0,
        }
    },
    methods: {
        sub(s) {
            console.log(s);
            this.num--;
        },
        add(e) {
            console.log(e); 
            this.num++;
        },
    },

    computed: {
        
    },

}
</script>

<style scoped>

</style>