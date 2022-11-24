<template>
<div>
    v-bind:属性名="变量"
    <img src="./assets/logo.png" v-bind:title="msg">
    <br>

    语法糖写法, 不需要写v-bind, 直接:属性名="变量"
    <img :src="imgsrc" :title="juejin">
    <div :style="[mycss.width, mycss.height, mycss.bgc, mycss.margin]"></div>

    <!-- 这会去找whther1, 如果为true就加上className1 -->
    <div class="a" :class="{test: whether1}"></div>
    <!-- 这里可以利用es6对象的缩写 -->
    <!-- 这里相当于:  <div class="a" :class="{test2: test2}"></div>-->
    <div class="a" :class="{test2}"></div>

</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            msg: 'this is vue',
            juejin: '这是稀土掘金图片',
            imgsrc:'https://sponsors.vuejs.org/images/xitujuejinjishushequ.avif',
            mycss:{
                width:'width: 300px',
                height:'height: 200px',
                bgc: 'background-color: grey',
                margin:'margin: 100px auto',
            },
            whether1: true,
            test2: true,

        }
    },

}
</script>

<style scoped>
.test {
    width: 300px;
    height: 200px;
    background-color: skyblue;
    margin: 100px auto;
}
.test2 {
    width: 300px;
    height: 200px;
    background-color: orange;
    margin: 100px auto;
}
</style>