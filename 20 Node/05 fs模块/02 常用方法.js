// 引入fs模块
const FS = require('fs');

// 引入path模块
const Path = require('path');

let filePath = Path.join(__dirname, 'hello.txt');
console.log(filePath);

// 常用方法

// 修改文件名
// FS.renameSync(旧文件名, 新文件名)
// FS.renameSync(filePath, './node/05 fs模块/nihao.txt');  // 当前项目文件夹为knowledge

// 获取文件夹下文件名称
// FS.readdirSync()
let myFiles = FS.readdirSync(__dirname);
console.log(myFiles);

myFiles.forEach(item => {
    if (item.endsWith('.js')) {
        FS.renameSync(`${__dirname}/${item}`, `./node/05 fs模块/node-${item}`);     // 当前文件夹为knowledge/node/05 fs模块
    }
})

// 对于上述案例, 如果需要更灵活的变动, 可以使用replace搭配正则替换字符串
// 然后再反应到文件名称上
// string.replace(/reg/, 'something');


