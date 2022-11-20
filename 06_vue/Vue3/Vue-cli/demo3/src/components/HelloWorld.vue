<template>
    <div>
        <h1> {{message}} </h1>

    </div>
</template>


<script>
export default {
    name:'HelloWorld',
    data() {
        return {
            message:'hello world!!!',
        }
    }
}
</script>


<style>
    h1 {
        color: red;
        height: 300px;
        width: 300px;
        line-height: 300px;
        background-color: skyblue;
        text-align: center;
        font-size: 40px;
    }
</style>