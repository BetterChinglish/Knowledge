
// 引入express
const { request, response } = require('express')
const express = require('express')


// 创建应用对象
const app = express()


// 创建路由规则
// request 对请求报文的封装
// response 对响应报文的封装
// 当页面使用post对服务器进行请求时执行的代码c
app.get('/', (request, response)=>{
    // 设置响应
    response.send('hello express')
})

// 当页面使用post对服务器进行请求时执行的代码
app.post('/', (request, response)=>{
    // 设置响应
    response.send('hello express')
})

// 无论使用何种请求都执行这个
app.all('/', (request, response)=>{
    // 设置响应
    response.send('hello express')
})
// 监听端口启动更多服务
app.listen(8000,()=>{
    console.log("服务器已经启动, 8000端口监听中")
})