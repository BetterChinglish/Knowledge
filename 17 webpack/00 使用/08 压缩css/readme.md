# 使用插件
npm i optimize-css-assets-webpack-plugin -D

**注意, 该方法在webpack5中已经不再友好支持**
**webpack5使用css-minimizer-webpack-plugin**

# webpack.config.js中配置
```js
// 引入
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// ...

// 插件中配置
module.exports = {
    // ...
    plugins:[
        // ...
        new OptimizeCssAssetsWebpackPlugin()
    ]
}
```

# 运行
cmd中运行
```
webpack
```
打包后看到css文件已经被压缩(缩进等都没了)