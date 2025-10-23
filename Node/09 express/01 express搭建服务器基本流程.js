// 引入express模块
const express = require('express');

// 创建app对象
const app = express();

// 设置端口号
const port = 3000;

// 处理get请求 ' / '
app.get('/', (req, res) => {
    res.send('hello world');
});

// 监听express是否启动成功
app.listen(port, ()=>{
    console.log('express is running...');
});

// run in nodemon




