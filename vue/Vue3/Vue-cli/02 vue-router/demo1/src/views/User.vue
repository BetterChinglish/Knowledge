<template>
    <div>
        <h3>
            个人中心:
        </h3>
        <div class="menu">
            <ul>
                <li>
                    <router-link to="/user/info">个人信息</router-link>
                </li>
                <li>
                    <router-link to="/user/setting">设置中心</router-link>
                </li>
            </ul>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user',
}
</script>

<style scoped>
.menu {
    width: 20%;
    height: 500px;
    background-color: antiquewhite;
    float: left;
}
.content {
    width: 78%;
    height: 500px;
    background-color: #bbb;
    float: right;
}
ul {
    list-style: none;
}
</style>