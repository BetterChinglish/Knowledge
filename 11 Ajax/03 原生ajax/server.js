
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

// 监听端口启动更多服务
app.listen(8000,()=>{
    console.log("服务器已经启动, 8000端口监听中")
})