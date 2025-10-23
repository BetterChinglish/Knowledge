<template>

<div>
    {{welcome}}

    <div>
        <h1>
            {{obj.name}}
        </h1>
        <p>
            {{obj.age}}
        </p>
    </div>

    <div class="sayNight"></div>
</div>

</template>

<script>
export default {
    name: 'ArrayProps',

    data() {
        return {
            

        };
    },

    // 父传子, 使用props属性
    // 此处介绍数组方式
    props:[
        'welcome',
        'obj',
        'goodNight',
    ]
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
