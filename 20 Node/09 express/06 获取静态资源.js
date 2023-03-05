// 创建public文件夹
// public文件夹下创建: js, css, images三个文件夹

const express = require('express');

// 读取 ./views/index.html, 先引入相关模块
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 指定在本地public的资源
// 随后访问静态资源直接处于public路径
// 例如public/images/01 dog.jpg
// 则直接可以由/images/01 dog.jpg得到
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index.html', (req, res) => {
    // console.log(req);
    // 待返回文件的路径
    let filePath = path.join(__dirname, 'views', 'index.html');

    // 获取待返回文件内容
    let content = fs.readFileSync(filePath, 'utf-8');

    // 请求参数
    let query = req.query;
    console.log(query);
    // 通过query对数据库查询, 然后返回对应数据

    // 返回文件内容
    res.send(content);
});
app.get('/', (req, res) => {
    res.send('hello world!');
});


app.listen(port, ()=>{
    console.log('express is running...');
})




