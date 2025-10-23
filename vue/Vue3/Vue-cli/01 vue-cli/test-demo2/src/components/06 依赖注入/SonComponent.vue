<template>
<div>
    {{welcomeMsg}} {{userName}} <br>
    <!-- 点击该按钮发现使用inject注入的并不是一个响应式的数据 -->
    <button @click="changeName">click to change son's name to 'lisi'</button>

    <!-- 可以把注入得到的值再在data(){}中注册以称为响应式的数据 -->
    <hr>
    son:
    <br>
    myWelcomeMsg: {{myWelcomeMsg}}
    <br>
    myUserName: {{myUserName}}
    <br>
    <button @click="changeMyProps">click to change myWelcomeMsg and myUserName</button>

    <hr>
    son: 
    <br>
    <button>-</button> {{myNum.value}} <button @click="add">+</button>
</div>
</template>



<script>

export default {

    name: 'SonComponent',
   

    data() {
      return {
        myWelcomeMsg: this.welcomeMsg,
        myUserName: this.userName,
      };
    },

    // 注入则使用对象方式或数组方式
    // 数组方式: inject:['propName1', 'propName2', ...]
    // 无法详细控制每个变量

    // 使用对象控制注入属性
    inject: {
        // 一般使用模板:
        // 在此组件叫什么名字:{
        //     from: 来源的名字(即provide的时候取的名字),
        //     default: 缺省值
        // }
        welcomeMsg: {
            from: 'welcome',
        },

        userName: {
            from: 'name',
        }, 
        myNum: {
            from: 'num',
        }
    },
    created() {
        // 生命周期函数, 该函数会在组件created的时候调用
        // 即创建完成的时候调用
        console.log(this.welcomeMsg + ": " + this.userName)
    },

    methods: {
        changeName() {
            this.userName = 'lisi';
            console.log('changed to: ' + this.userName );
        },
        changeMyProps() {
            this.myUserName = 'wanger';
            this.myWelcomeMsg = "你好";
            console.log('changed to: ' + this.myWelcomeMsg + " and " + this.myUserName);
        },
        add() {
            this.myNum++;
        },
        sub() {
            this.myNum--;
        }
    },


};

</script>



<style scoped>

</style>
