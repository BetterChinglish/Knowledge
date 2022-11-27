<template>
<div>
    <div class="sayNight"> {{goodNight}} </div>
    <h1> {{welcome}} </h1>
    <h4>{{person.name}}</h4>
    <strong> {{person.age}} </strong>

</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {

        };
    },
    props:{
        welcome:{
            // type确定该变量类型
            type: String,

            // default确定该变量缺省默认值
            // default: 'welcome!!!',

            // 规定该变量是否必须传入, 一般不与default一起使用
            required: true,
        },

        goodNight:{
            type: String,
            default: 'good night!!!'
        },

        person: {
            type: Object,

        },

    }
};
</script>
<style>
.sayNight {
    width: 300px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    margin: 30px auto;
    background-color: skyblue;
}
</style>
