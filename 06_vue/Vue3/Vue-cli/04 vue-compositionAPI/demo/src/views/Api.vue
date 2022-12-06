<template>
    <div>
        <h3>常用api</h3>
        <div class="main">
            <div class="menu">
                <router-link to="/api/ref">ref</router-link>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
       
    </div>
</template>
<style scoped>
.menu {
    width: 20%;
    height: 500px;
    float: left;
    background-color: #ccc;
}

.content {
    width: 79%;
    height: 500px;
    float: right;
    background-color: skyblue;
}
</style>