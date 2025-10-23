// 引入express模块
const express = require('express');
const path = require('path');
const fs = require('fs');


// 创建app对象
const app = express();

// 设置端口号
const port = 3000;

// 下载相关模块:
// npm install --save art-template
// npm install --save express-art-template
// 
// 模块设置
// view engine setup
app.engine('html', require('express-art-template'));
// 项目环境的设置
app.set('view options', {
    // production: 生产模式(线上), 可改为development, 开发模式
    debug: process.env.NODE_ENV !== 'production'    
});
// 设置在哪个目录去查找html文件
app.set('views', path.join(__dirname, 'views'));
// 设置模板后缀名
app.set('view engine', 'art');

app.use(express.static(path.join(__dirname, 'public')));

// 处理get请求 ' / '
app.get('/', (req, res) => {

    // 模拟后台拿到的数据
    let dataList = {
        name: 'zhangsan',
        age: 28,
        job: 'teacher',
        // kids: ['boy1', 'boy2']
        kids: []
    };

    // 使用模板index.html并传入数据dataList
    res.render('index.html',dataList);
});

// 监听express是否启动成功
app.listen(port, ()=>{
    console.log('express is running...');
});

// run in nodemon




