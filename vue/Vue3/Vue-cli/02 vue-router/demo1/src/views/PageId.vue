<template>
    id is {{getId}}
</template>

<script>
export default {
    name: 'pageId',
    computed: {
        getId() {
            // 此处params.id中的id应该对应route配置对象中的名称
            return this.$route.params.id;
        }
    }
}
</script>

<style scoped>
</style>