<template>
<div>
    <!-- 普通插槽 -->
    <NormalSlot>
        <!-- 这里的内容将代替slot -->
        <button>click</button>
    </NormalSlot>

    <NormalSlot>
        <!-- 啥也不写, 使用默认插槽值 -->
    </NormalSlot>

    <!-- 具名插槽 
        一个组件有多个插槽的时候, 为了确定当前元素放入哪个插槽
        给插槽取不同的名字然后将要放入的内容指定插槽名即可
        (需要使用template标签包含)

        使用v-slot:slotName绑定插槽
        缩写为#slotName
    -->
    <NamedSlot>
        <template v-slot:myTitle>
            <h1>如何把握机会</h1>
        </template>

        <template v-slot:myContent>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, pariatur.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, pariatur.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, pariatur.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, pariatur.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, pariatur.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, pariatur.
            </p>
        </template>

        <!-- 所有非template的顶级标签都会一起插入default的slot
            如果有俩default则俩default都会包含这些
         -->
        <footer>
            <a href="#">about me</a>
        </footer>
        <footer>
            <a href="#">reach me</a>
        </footer>
        
    </NamedSlot>

    <ScopedSlot>
        <!-- 绑定名为header的插槽
            且将插槽的属性集合为对象greeting
            在此使用greeting.方式可以访问到传过来的属性名
         -->
        <template #header="greeting"> 
            <pre>
    {{greeting.welcome}}, 尊敬的:  {{greeting.user}} !!!
            </pre>
        </template>
        
    </ScopedSlot>

    <ScopedSlot>
        <!-- 也可以使用es6方式进行 -->
        <template #header="{welcome, user}"> 
            <pre>
    {{welcome}}, 尊敬的:  {{user}} !!!
            </pre>
        </template>
        
    </ScopedSlot>

</div>
</template>



<script>
import NormalSlot from './components/05 插槽/normalSlot.vue';
import NamedSlot from './components/05 插槽/NamedSlot.vue';
import ScopedSlot from './components/05 插槽/ScopedSlot.vue';

export default {

    name: 'app',
    
    components:{
        NormalSlot,
        NamedSlot,
        ScopedSlot,
    },

    props: {

    },

    data() {
      return {

      };
    },

    computed: {

    },

    methods: {

    },


};

</script>



<style scoped>

</style>
