// 使用 07 使用模板.js 修改
// views文件夹下创建list.html
// 为其配置get方法
// 查看list.html

//需求
// 当点击list.html时, 请求后端接口detail, 
// 并传入不同参数以区分用户点的是哪个信息
// 
// 跳转到list.html接口查看



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

app.get('/list.html', (req, res) => {
    res.render('list.html');
})

// 使用:id传过来参数以确定到底是哪条新闻
app.get('/detail/:id', (req, res) => {
    

    // 使用req.params对象接收参数
    console.log(req.params);

    // 这里可以通过req.params确定用户需要的是哪条新闻
    // 并从数据库查找该新闻然后返回
    res.send('第' + req.params.id + '条新闻的内容');

    // 如果需要更多的参数, 可以在list.html中的a链接的href请求类似 detail/01/music 的接口
    // 然后在这里的app.get()的第一个参数写: '/detail/:id/:type'
    // 那么req.params就有id和type两个属性
})

// 监听express是否启动成功
app.listen(port, ()=>{
    console.log('express is running...');
});

// run in nodemon




