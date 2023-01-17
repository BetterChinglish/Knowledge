// 1 导入http模块
const HTTP = require('http');

// 2 绑定服务程序端口号
const PORT = 8080;

// 3 创建服务器对象
const Server = HTTP.createServer((request, response) => {
    // 每收到一次请求执行当前位置代码

    // request: 请求对象
    // response： 相应对象
    
    // end 方法表示相应结束， 不要再在其后进行响应操作， 多次调用没有二次效果
    response.end('hello, this is a node js server');
})

// 4 创建服务器监听方法， 让服务器监听浏览器请求
Server.listen(PORT, (error) => {
    // 监听有无出错
    if (error) {
        console.log(error);
        
    }
    else {
        console.log('运行成功！');
    }
    
})