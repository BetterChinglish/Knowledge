// fs
// http
// path
const path = require('path');

// 所处文件夹绝对路径
console.log('__dirname: ', __dirname);

// 文件的绝对路径
console.log('__filename', __filename);

// 文件的拓展名
console.log('path.extname(__filename): ', path.extname(__filename));

// 文件的完整名称，包含拓展名部分
console.log('path.basename(__filename): ', path.basename(__filename));

// 文件所处的文件夹的绝对路径
console.log('path.dirname(__filename): ', path.dirname(__filename));

// 文件综合信息
// {
//     root: ,  // 所处盘区
//     dir: ,   // 所处文件夹的绝对路径
//     base: ,  // 文件完整名称(包含文件名与扩展名)
//     ext: ,   // 文件扩展名
//     name: ,  // 文件名
// }
console.log('path.parse(__filename): ', path.parse(__filename));

// 拼接
console.log('path.join(__dirname, \'another\.js\'): ', path.join(__dirname, 'another.js'));
// 多一层目录多一个文件(夹)名的参数, 无需 \
console.log('path.join(__dirname, \'folder\', \'another\.js\'): ', path.join(__dirname, 'folder', 'another.js'));



// querystring
// url