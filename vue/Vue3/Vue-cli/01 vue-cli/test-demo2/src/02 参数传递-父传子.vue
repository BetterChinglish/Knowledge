<template>
<div>
  <!-- 直接给组件添加属性, 然后组件中props属性以数组方式接受 
    这里的话直接props:['welcome']即可, 数组中每个元素都为字符串的属性名就行了

    obj对象同理, 传入的仍然是一个对象, 可以直接在子组件中以obj.key方式使用
  -->
  <array-props :welcome="hello + ' ' + world" :obj="obj"></array-props>


  <ObjectProps :welcome="hello + ' ' + world" :person="obj"></ObjectProps>
</div>
</template>

<script>
import ArrayProps from './components/02 父传子/ArrayProps.vue';
import ObjectProps from './components/02 父传子/ObjectProps.vue';

export default {
  name: 'app',
  data() {
    return {
      hello: 'hello',
      world: 'world',
      obj: {
        name: 'zhangsan',
        age: 18
      }
    };
  },
  components: {
    ArrayProps,
    ObjectProps,

  }


};
</script>
<style>

</style>
