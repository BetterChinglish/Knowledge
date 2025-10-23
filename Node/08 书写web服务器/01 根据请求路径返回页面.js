// 1 导入http模块
const HTTP = require('http');

const FS = require('fs');
const Path = require('path');
const URL = require('url');
// 2 绑定服务程序端口号
const PORT = 8080;

// 3 创建服务器对象
const Server = HTTP.createServer((request, response) => {
    let requestURL = request.url;
    // console.log(requestURL);

    // 路由原理
    if (requestURL.endsWith('.html')) {

        // 当请求的.html页面不存在于服务器时也会报错
        // 可以通过readdir()操作提取出html文件夹中的文件, 并判断是否存在, 不存在则返回404
        // 只对html进行演示, css不再演示, 因为一般css由html链接过去,必然存在于css文件夹中

        // 标志待返回的文件是否存在于html文件夹中
        let exsitCharge = 0;

        // 获得待返回的html文件的名称
        let fileName = requestURL.substring(1);

        // 获取html文件夹的路径
        let htmlFolder = Path.join(__dirname, 'assets', 'html');

        // 获取html文件夹中文件的名称
        let filesInHtmlFolder = FS.readdirSync(htmlFolder);

        // 判断带返回的html文件是否存在于html文件夹中
        for (let i = 0; i < filesInHtmlFolder.length; i++) {
            if (fileName == filesInHtmlFolder[i]) {
                exsitCharge = 1;
            }
        }

        // exsitCharge为0则表示不存在, 返回404并退出
        if (exsitCharge == 0) {
            response.end('404 not found');
            return;
        }

        let filePath = Path.join(__dirname, 'assets', 'html', fileName);
        // console.log(filePath);
        let PageView = FS.readFileSync(filePath);
        response.end(PageView);
    }
    else if (requestURL == '/') {
        let filePath = Path.join(__dirname, 'assets', 'html', 'index.html');
        // console.log(filePath);
        let PageView = FS.readFileSync(filePath);
        response.end(PageView);
    }
    else if (requestURL.endsWith('.css')) {
        let filePath = Path.join(__dirname, 'assets', requestURL.substring(1).replace('/','\\'));
        console.log(filePath);
        let CssFile = FS.readFileSync(filePath);
        response.end(CssFile);
    }
   
    else {
        response.end('something wrong');
    }
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