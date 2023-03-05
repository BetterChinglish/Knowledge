// 在 04 重定向.js 中, 我们有两个 /register.html 请求, 一个是post, 另一个是get
// 
// 如下:
// 
// // 获取注册界面
// app.get('/register.html', (req, res) => {
//     let filePath = path.join(__dirname, 'views', 'register.html');
//     let content = fs.readFileSync(filePath, 'utf-8');
//     res.send(content);
// });
// 
// // 响应注册反应, 使用redirect重定向到登录页面
// app.post('/register.html',(req,res) => {
//     // 
//     res.redirect('/login.html');
// });
// 
// 可以使用all方法合并同个请求路径, 不同请求方法

const express = require('express');

// 读取 ./views/index.html, 先引入相关模块
const path = require('path');
const fs = require('fs');

// 使用body-parser获取post参数
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 将body-parser功能添加到项目app中
app.use(bodyParser.urlencoded({extended:false}));   // false表示接受的值为字符串或数组
app.use(bodyParser.json()); // 解析json格式

app.all('/register.html', (req, res) => {

    let method = req.method;
    if(method == 'GET') {
        let filePath = path.join(__dirname, 'views', 'register.html');
        let content = fs.readFileSync(filePath, 'utf-8');
        res.send(content);
    }
    else if(method == 'POST') {
        res.redirect('/login.html');
    }

    // 后续还有put, delete方式


})

// 处理登录请求, 返回登录页面html 
app.get('/login.html', (req, res) => {
    let filePath = path.join(__dirname, 'views', 'login.html');
    let content = fs.readFileSync(filePath, 'utf-8');
    res.send(content);
});

app.get('/', (req,res)=>{
    res.send('hello');
});

app.listen(port, ()=>{
    console.log('express is running...');
})






