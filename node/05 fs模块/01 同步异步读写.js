// 引入fs模块
const FS = require('fs');

// 引入path模块
const Path = require('path');

let filePath = Path.join(__dirname, 'hello.txt');
console.log(filePath);


// FS同步读取
let helloFile = FS.readFileSync(filePath);
console.log(helloFile);     // 得到的是一个十六进制的buffer(缓冲区), 存储着文件

// 解析文件
console.dir(helloFile.toString());

// 直接解析文件, 第二个参数传入文件格式
let helloFileString = FS.readFileSync(filePath, 'utf-8');
// 此时可以直接得到转好的字符串
console.dir(helloFileString);

// 同步读取较大文件时后续代码需要等待较长时间, 一般使用异步读取

// 异步读取:
// FS.readFile(文件位置, 编码种类, 回调函数(失败错误信息, 成功返回数据)=>{})
FS.readFile(filePath, 'utf-8', (err, data) => {
    // console.log('err: ', err);      // 运行成功, 为null
    // console.log('data: ' + data);   

    // 一般不会同时error与data, 使用if判断
    if (err) {
        console.log('err: ', err);      // 运行成功, 为null
    }
    else {
        console.log('data: ' + data); 
    }
})

console.log('hello');   // 发现hello输出在上面readFile的回调之前输出信息


// 异步写入:
// FS.writeFile(文件路径, 写入的内容, 编码形式, 回调函数);
FS.writeFile(filePath, 'Ni Hao', 'utf-8', (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('成功');
})  // 发现该方法写入是覆盖了hello.txt
// 一般结合数据库使用





