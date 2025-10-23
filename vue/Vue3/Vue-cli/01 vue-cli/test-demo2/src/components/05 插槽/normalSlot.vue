<template>
<div>
    <slot>
        <!-- 可以在此写默认值, 如果没有传递则直接使用默认值 -->
        <h3>this is slot</h3>
    </slot>
</div>
</template>



<script>

export default {

    name: 'slotTest',
    
    components:{
      
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
