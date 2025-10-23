<template>
<div id="myText">
  {{helloworld}}
</div>
</template>

<script>
export default {
  name: 'text',
  data() {
    return {
      helloworld: 'hello world',
    };
  },
};
</script>

<style>
#myText {
    width: 100px;
    height: 30px;
    background-color: skyblue;
    text-align: center;
    line-height: 30px;
    color: #ccc;
    margin: 30px auto;
}
</style>
