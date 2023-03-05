const express = require('express');

// 读取 ./views/index.html, 先引入相关模块
const path = require('path');
const fs = require('fs');


const app = express();

const port = 3000;

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

app.listen(port, ()=>{
    console.log('express is running...');
})




