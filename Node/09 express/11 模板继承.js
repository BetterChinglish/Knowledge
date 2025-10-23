// 创建 parent.html 与 child.html
// 用child.html中内容替换掉 parent.html的部分内容
// 而保留公共部分内容


// 引入express模块
const express = require('express');
const path = require('path');

const template = require('art-template');

// 创建app对象
const app = express();

// 设置端口号
const port = 3000;


app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'    
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    
    res.render('child.html');
});

app.listen(port, ()=>{
    console.log('express is running...');
});
