# 阅读须知
本章每节都作为单独的项目进行安装各种包以便学习



# 自动引入打包的资源
使用plugin： HtmlWebpackPlugin

# 开发服务器&自动化
使用：dev-server
```js
npm i webpack-dev-server -D
```

webpack.config.js:
```js
const path = require('path');

module.exports = {
  //...
  // 开发服务器不会有输出(dist)
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,  // 是否启用压缩
    port: 9000,  // 运行端口
    open: true,  // 自动打开浏览器
    // allowedHost: ['', '']  // 允许的主机
  },
};

```

启动指令:
```js
// npx: 将当前文件夹下的node_module文件夹临时加入环境变量中
npx webpack serve
```


[devServer](https://www.webpackjs.com/configuration/dev-server/)
