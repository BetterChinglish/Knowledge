# 使用postcss
```
npm i postcss-loader postcss-preset-env -D
```

# 创建配置文件
```
postcss.config.js
```

# 添加rule
在webpack.config.js的module下的rule中, 对css先进行兼容性处理
再打包

```js
    module:{
        rules: [
            // 这里对css文件, 先进行兼容性处理, 再打包入js
            // 写上'postcss-loader, 会自动寻找其配置文件postcss.config.js
            { test:/\.css$/,  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            { test:/\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test:/\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },

        ]
    },
```

# 创建postcss.config.js文件并配置
```js
module.exports = {
    plugins: [
        // require后立即()调用, 这里会自动寻找package.json文件中的browserlist
        // browserlist规定兼容哪些浏览器, 根据这里的说明进行兼容性配置
        require('postcss-preset-env')()
    ]
}
```

# 为package.json文件添加browserlist配置项
json不允许注释, 但这里为说明所以注释
```json
"browserslist": [
    // 百分之八十的浏览器支持
    "> 0.2%",

    // 浏览器的最后两个版本支持
    "last 2 versions",

    // 死掉的浏览器(过时, 无人使用的)无不进行兼容
    "not dead"
  ]
```