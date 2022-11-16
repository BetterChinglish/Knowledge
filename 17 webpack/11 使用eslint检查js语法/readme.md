# 检查js
形成良好统一的风格, 可以使用eslint进行检查

比较常用的是airbnb

# 依赖
```
npm i eslint eslint-loader eslint-config-airbnb-base eslint-plugin-import -D

使用的是eslint的eslint-loader
所以下载eslint和eslint-loader

规范为eslint-config-airbnb-base
其依赖于eslint于eslint-plugin-import
```

# webpack.config.js配置
```js
{
    // 检查js代码
    test: /\.js$/,
    // 不检查第三方库的js代码, 只检查自己写的
    exclude: /node_module/,
    // 使用eslint-loader, 其自动去寻找规范
    loader: 'eslint-loader'
}
```

# package.json中确定规范
这里确定了规范
```json
"eslintConfig": {
    "extends": "airbnb-base"
}
```

eslint-loader找到规范后去寻找规范文件eslint-config-airbnb-base
并按照规范进行检查


# 按照规范自动修复
```js
{
    // 检查js代码
    test: /\.js$/,
    // 不检查第三方库的js代码, 只检查自己写的
    exclude: /node_module/,
    // 使用eslint-loader, 其自动去寻找规范
    loader: 'eslint-loader',

    // 添加选项, 开启修复
    options: {
        fix: true
    }
}
```