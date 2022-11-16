# 下载插件
```node
npm i mini-css-extract-plugin -D
```

# 使用插件及其loader
```js
// ...

// 引入插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// ...
module.exports = {
    // ...
    module: {
        rule:[
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
            // ...
        ]

    },

    plugins:[
        // ...
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
    // ...
}
```

# 缺陷
多个样式文件会被打包为一个css文件
可能导致命名冲突
(可能使用了魔术注释避免了, 但这样并不能完全到达我们的要求)

后续会介绍响应插件解决这个问题