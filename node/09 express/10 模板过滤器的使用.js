// 使用 07 使用模板.js 修改
// 注意引入template
// 查看 app.get('/', ()=>{})


// 引入express模块
const express = require('express');
const path = require('path');
const fs = require('fs');

// 
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

// ageFilter为自己取得名字
// 赋值为一个函数, 第一个形参接收值
template.defaults.imports.numberFilter = function (value) {
    if (value > 3) {
        return value;
    }
};


// 然后在art-template的html文档中使用则 {{value | filterName}}
// 这里演示的 filterName 应该是 numberFilter
// 查看index.html

app.get('/', (req, res) => {
    // 模拟从数据库拿数据
    let dataList = {
        num: [1, 2, 3, 4, 5, 6, 7]
    }; 
    // 给页面时进行筛选, 即模板的过滤器
    res.render('templateFilter.html',dataList);
});

app.listen(port, ()=>{
    console.log('express is running...');
});
