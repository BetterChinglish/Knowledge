<template>
    <div>
        <h3>
            使用param方式传参
        </h3>
        <!-- 绑定式传入id -->
        <div class="menu">
            <ul>
                <li v-for="page in pages" :key="page.id">
                    <router-link :to="'/page/p/' + page.id">page{{page.id}}</router-link>
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
    name: 'page',
    data() {
        return {
            pages: [
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5},

            ]
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
.menu {
    width: 25%;
    height: 500px;
    float: left;
    background-color: aquamarine;
}

.content {
    width: 73%;
    height: 500px;
    float: right;
    background-color: #ccc;
    padding-top: 25%;
    box-sizing: border-box;
}

li {
    height: 100px;
    line-height: 100px;

}
</style>