# 为什么要去除
有一些库很大, 但是你可能只用到其中一部分
没必要把整个库都打包到项目中

所以把用到的都打包到项目中, 没有用到的就略过
包括自己写的js

此功能主要针对于生产环境, 以减小项目的体积


# 依赖
webpack自身就支持

使用名为树摇(tree shaking)的功能

# 原理

## 对于js
需要使用es6的export
还要设置mode为production

然后直接打包即可

使用到的对象才去原文件找export的原型并引入
否则全忽略

## 对于css
webpack会自动将相同的样式合并到一起

但是对于没有使用到的样式webpack自身无法确定

需要使用插件purgecss-webpack-plugin, 此插件需要搭配mini-css-extract-plugin使用

下载该插件
```
npm i purgecss-webpack-plugin -D
```

在plugin中创建并配置
```js
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const {join} = require('path');

const glob = require('glob');
const PATHS = {
    src: join(__dirname,'src')
}

// plugins:
new PurgecssWebpackPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`, {nodir:true}),
}),
```

可能由于更新原因以上并不适用, 可以移步 **https://www.purgecss.cn/plugins/webpack**

