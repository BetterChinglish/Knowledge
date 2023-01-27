// 创建routes文件夹
// 在其中创建passport.js文件
// 其实就是分离文件, 在passport中写路由相关内容, 在主文件中引入并使用
// 使得项目层次结构更加清晰明朗

const express = require('express');

const app = express();
const port = 3000;

// 引入passport中的路由对象
const routerPort = require('./routes/passport');
// 在app中使用
app.use(routerPort);

app.get('/', (req, res) => {
    res.send('hello, nodeJS!');
})

app.listen(port, ()=>{
    console.log('express is running...');
})




