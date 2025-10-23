// 1 导入http模块
const HTTP = require('http');
const { url } = require('inspector');

// 引入url模块
const URL = require('url');

// 2 绑定服务程序端口号
const PORT = 8080;

// 3 创建服务器对象
const Server = HTTP.createServer((request, response) => {
    // 每收到一次请求执行当前位置代码

    // request: 请求对象

    // 获取请求uri
    let requestURL = request.url;
    console.log('请求uri: ', requestURL);

    // 获取请求方法, get, post等
    let requestMethod = request.method;
    console.log('请求方法: ', requestMethod);
    // 可见请求多次每次都会执行当前回调

    // 获取get请求的参数    先引入url模块
    // let parse = URL.parse(requestURL, true);     // true表示解析为对象, false则为解析为字符串
    // console.log('URL.parse: ', parse);
    // console.log('获取query: ');
    // console.log(parse.query);
    // console.log(parse.query.name);
    // console.log(parse.query.age);

    // 获取post请求参数
    // 结合post请求案例, 获取用户名以及密码
    // 需要以事件的方式接收
    request.on('data', (postData) => {
        // 这里传给postData的数据就是url中的query string
        console.log('postData: ', postData);
        console.log('postData.toString(): ', postData.toString());
    }) // 写起来很麻烦, 后续使用框架会简单方便些


    // response： 响应对象
    
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