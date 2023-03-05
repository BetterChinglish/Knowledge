const express = require('express');

// 创建路由对象
const routerPort = express.Router();

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

routerPort.use(bodyParser.urlencoded({extended:false}));   // false表示接受的值为字符串或数组
routerPort.use(bodyParser.json()); // 解析json格式
routerPort.use(express.static(path.join(__dirname, '../public')));

// 将这些请求路径绑定到路由上
routerPort.get('/register.html', (req, res) => {
    let filePath = path.join(__dirname, '../views', 'register.html');
    let content = fs.readFileSync(filePath, 'utf-8');
    res.send(content);
});
routerPort.post('/register.html',(req, res)=>{
    let {username, pwd} = req.body;
    console.log(username, pwd);
    // 这里获得了用户提交的用户名和密码 可以与数据库进行匹配

    res.send('post发送成功');
});
routerPort.get('/index.html', (req, res) => {
    // console.log(req);
    // 待返回文件的路径
    let filePath = path.join(__dirname, '../views', 'index.html');

    // 获取待返回文件内容
    let content = fs.readFileSync(filePath, 'utf-8');

    // 请求参数
    let query = req.query;
    console.log(query);
    // 通过query对数据库查询, 然后返回对应数据

    // 返回文件内容
    res.send(content);
});

// 导出该路由
module.exports = routerPort;