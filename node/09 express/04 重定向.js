// 可以发现 03 处理post请求中在register.html中点击提交后还是在当前页面
// 我们需要使用重定向跳转到其他页面


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

// 获取注册界面
app.get('/register.html', (req, res) => {
    let filePath = path.join(__dirname, 'views', 'register.html');
    let content = fs.readFileSync(filePath, 'utf-8');
    res.send(content);
});

// 相应注册反应, 使用redirect重定向到登录页面
app.post('/register.html',(req,res) => {
    // 
    res.redirect('/login.html');
});

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






