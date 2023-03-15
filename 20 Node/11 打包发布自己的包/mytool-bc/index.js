// 主入口文件
const goodbye = require('./src/saygoodbye');
const hello = require('./src/sayhello');
const deepClone = require('./src/deepClone');
module.exports = {
    ...goodbye,
    ...hello,
    ...deepClone
}