<template>
<div>
    <MyText></MyText>
    <!-- 首字母大写书写方式可以使用-代替 
        如果组件注册名为myText这种驼峰式则不可以
    -->
    <my-text></my-text>

    <Btn></Btn>
    <btn></btn>

</div>
</template>

<script>
// 在此导入组件对象值

// 这两个组件都是缺省暴露方式(default), 别 import { Text } ...
import Text from "./components/01 使用组件/01 text.vue";
import Btn from './components/01 使用组件/01 mybtn'
export default {
name: 'app',
data() {
    return {

    };
},
// 在本页面使用组件需要在此注册组件, 组件名: 组件对象值
components: {
    // 普通键值对
    MyText: Text,

    // es6键值相同省略写法
    Btn,
}


};
</script>


<style scoped>
/* style样式默认影响当前组件中包含的组件
    加上scoped取消影响子组件 
*/


</style>>

