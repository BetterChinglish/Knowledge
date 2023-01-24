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

app.post('/postExcution.html',(req, res)=>{
    let {username, pwd} = req.body;
    console.log(username, pwd);
    // 这里获得了用户提交的用户名和密码 可以与数据库进行匹配

    res.send('post发送成功');
});

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




