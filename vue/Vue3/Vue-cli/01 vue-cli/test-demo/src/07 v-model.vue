<template>
<div>
    <h2>1 v-model双向绑定</h2>
    <input type="text" v-model="msg">
    <br>
    msg: {{msg}}
    <hr>

    <h2>2 v-bind单向绑定+事件实现双向绑定</h2>
    <input type="text" v-bind:value="testMsg" @input="changeTestMsg">
    <br>
    testMsg: {{testMsg}}
    <hr>

    <h2>3 v-model修饰符---- .lazy </h2>
    <!-- 懒加载, 回车后再绑定 -->
    <input type="text" v-model.lazy="msg">
    <br>
    msg: {{msg}}
    <hr>

    <h2>4 v-bind单向绑定+事件实现双向绑定的懒加载</h2>
    <input type="text" v-bind:value="testMsg" @keyup.enter="testMsg = $event.target.value">
    <br>
    testMsg: {{testMsg}}
    <hr>

    <h2>5 v-model修饰符---- .number </h2>
    <!-- 将绑定的值转化为number -->
    <input type="text" v-model.number="msg">
    <br>
    msg: {{msg}}    <br>
    <hr>

    <h2>6 v-model修饰符---- .trim </h2>
    <!-- 自动去除输入框收尾空格 -->
    <input type="text" v-model.trim="trimMsg">
    <br>
    trimMsg: !{{trimMsg}}    <br>
    msg: !{{msg}}
    <hr>

    <h2>7 v-model与单选标签</h2>
    <label for="sexMan">
        <input id="sexMan" type="radio"  value="man" v-model="sex"> man
    </label>
    <label for="sexWoman">
        <input id="sexWoman" type="radio"  value="woman" v-model="sex"> woman
    </label>
    
    <br>
    {{sex}}
    <hr>

    <h2>8 v-model与多选标签</h2>
    <label for="a">
        <input type="checkbox" id="a" value="eatting" v-model="todoList"> eatting
    </label>
    <label for="b">
        <input type="checkbox" id="b" value="sleeping" v-model="todoList"> sleeping
    </label>
    <label for="c">
        <input type="checkbox" id="c" value="drinking" v-model="todoList"> drinking
    </label>

    <br>
    {{todoList}}
    <hr>

    <h2>9 v-model 与下拉单选列表</h2>
    <select v-model="lan">
        <option value="java">java</option>
        <option value="C/C++">C/C++</option>
        <option value="cSharp">cSharp</option>
        <option value="goLang">goLang</option>
        <option value="Rust">Rust</option>
    </select>
    <br>
    {{lan}}

    <hr>
    <h2>10 v-model 与下拉多选列表(按住ctrl多选)</h2>
    <select v-model="language" multiple>
        <option value="java">java</option>
        <option value="C/C++">C/C++</option>
        <option value="cSharp">cSharp</option>
        <option value="goLang">goLang</option>
        <option value="Rust">Rust</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>

    </select>
    <br>
    {{language}}
</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            msg: '112',
            testMsg:'',
            trimMsg:'',
            sex: 'man',
            todoList: [],
            lan:'goLang',
            language: [],
        }
    },
    methods: {
        changeTestMsg(e) {
            this.testMsg = new String(e.target.value);
            // console.log(e.target.value);
        },
    },

    computed: {
        
    },

}
</script>

<style scoped>
div {
    white-space: pre;
}
</style>