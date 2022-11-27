<template>
<div>
    <slot name="myTitle">
        this is title name
    </slot>

    <slot name="myContent">
        this is content area
    </slot>

    <!-- 没名字的默认为default -->
    <slot>
        this is footer area
    </slot>

    <slot>
        this is footer area
    </slot>
</div>
</template>



<script>

export default {

    name: 'app',
    
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
