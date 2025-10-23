<template>
<div>
    
</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            hello: 'hello',
            world: 'world',

        }
    },

    computed: {
        // 存在缓存, 与函数不同
        // 如下, hello与world变量没有发生改变helloworld这个计算属性就不会重新刷新
        helloworld: {
            get() {
                return this.hello + '' + this.world;
            },

            // 很少使用计算属性的set()去改变hello和world
            set(newValue) {
                let arr = newValue.split(' ');
                this.hello = arr[0];
                this.world = arr[1];
            }
        }
    },

}
</script>

<style scoped>

</style>