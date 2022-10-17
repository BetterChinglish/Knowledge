
// 引入express
const { request, response } = require('express')
const express = require('express')


// 创建应用对象
const app = express()


// 创建路由规则
// request 对请求报文的封装
// response 对响应报文的封装
app.get('/server', (request, response)=>{
    // 设置响应头, 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应
    response.send('hello my ajax')
})
app.post('/server', (request, response)=>{
    // 设置响应头, 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应
    response.send('hello my ajax')
})

app.get('/json', (request, response)=>{
    // 设置响应头, 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应
    response.send('hello json')
})

// 4 ie 缓存问题
app.get('/ie', (request, response)=>{
    // 设置响应头, 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置响应
    response.send('hello ie')
    // 当响应的信息改变的时候, 
    // 由于ie使用缓存, 浏览器到缓存里去寻找返回的数据, 
    // 修改了的数据无法立即显示出来
    // 解决方法在xhr发送时加上时间戳
})

// 567 延迟响应/取消请求/重复请求问题
app.get('/delay', (request, response)=>{
    // 设置响应头, 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    // 设置延迟响应
    setTimeout(()=>{
        response.send('延迟响应')

    },3000)
    
})


// 监听端口启动更多服务
app.listen(8000,()=>{
    console.log("服务器已经启动, 8000端口监听中")
})