<template>
<div>
    <!-- 这里绑定了一个key, v-bind:key

        这个key类似于sql里的主键, 将前面的参数中的某个值作为其循环的依据
     -->


    <!-- 对数组 -->
    <!-- <ul>
        <li v-for="(item, index) in list" :key="item">
            {{index+1}}: {{item}}

        </li>
    </ul> -->
    
    
    <!-- 对对象 -->
    <ul>
        <li v-for="(value, key, index) in arr" v-bind:key="index">
            {{index}}item: {{key}}, value: {{value}}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            list:['hello', 'world', 'C++'],
            arr: {
                name: 'zhangsan',
                age: 18,
            }
        }
    },
    methods: {
        
    },

    computed: {
        
    },

}
</script>

<style scoped>
ul {
    list-style: none;
}
</style>