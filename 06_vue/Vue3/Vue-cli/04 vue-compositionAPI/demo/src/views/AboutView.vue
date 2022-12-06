<template>
  <div class="about">
    This is an about page
    <!-- <son-cmp :num="myNum" NotInProps="no in props" >
      <template v-slot:firstSlot>
        about view gives the slot
      </template>
    </son-cmp> -->


  </div>
</template>

<script>
import SonCmp from '@/components/SonCmp.vue';
export default {
  name: 'aboutView',
  components: {
    SonCmp
  },
  data() {
    return {
      myNum: 7,
    }
  },

  // setup执行的时候还没有创建组件示例, 无法使用this
  beforeCreate() {
    console.log('beforeCreate start   --------');


    console.log('beforeCreate ending  --------');
  },
  created() {
    console.log('created start        --------');
    console.log('created ending       --------');

  },

  // 第一个参数代表props
  // 第二个参数代表上下文context
  setup(p, c) {
    console.log('setup start          --------');
    // setup中没有this
    console.log(this);

    // 两个参数, 由于当前组件没有子组件所以不全
    console.log(p);
    console.log(c);



    console.log('setup ending         --------');

    // 使用return将任意变量返回
    // 然后就可以在template标签中使用插值方式引用了
    let num = 2;
    return {
      // {{num}}
      num,
    }
  },

  
}
</script>
