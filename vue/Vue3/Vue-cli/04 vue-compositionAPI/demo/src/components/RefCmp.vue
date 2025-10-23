<template>
    <div>
        {{num}}
        <button @click="add1()">add1</button>
        <hr>
        <!-- ref的num2在模板中直接使用num2变量名即可 -->
        ref num2: {{num2}} 
        <button @click="add2()">add2</button>

        <hr>
        myObj1: {{myObj1}}
        <button @click="myObj1.id++">id++</button>
    </div>
</template>
<script>
import { ref, reactive, } from 'vue';
export default {
    name: 'ref',
    setup() {
        // ref用于声明响应式变量, 如果要声明响应式对象则使用reactive
        

        let num = 2;
        // 发现直接这样无效, 因为num不是响应式数据
        function add1() {
            num++;
        };

        let num2 = ref(2);
        function add2() {
            // 修改值的时候则需要使用他的value属性
            num2.value ++;
        };

        let myObj1 = reactive({
            id: 0,
        });

        return {
            num,
            add1,
            num2,
            add2,
            myObj1,

            // 如果直接解构赋值暴露出去, 则不是响应式的了
            // ...myObj1        // 非响应式变量id被暴露出去
            // 如果想
        };

    }
    
}
</script>