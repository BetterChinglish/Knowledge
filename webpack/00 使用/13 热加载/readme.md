# 为什么要模块热替换
当改动一个文件, 所有的文件都会自动被加载

当项目较大文件较多的时候这会造成较为严重的延迟

启用模块热替换, 它允许运行时更新各种模块, 而无需进行完全刷新

此优化属于开发模式下的优化, 是为了便于开发而设计的


# 开启
```js
devServer: {
        static: './dist',
        // 设置端口
        port: 'auto',

        // 运行时自动帮忙打开浏览器
        open: true,

        // 设置端口
        // host: 'local-ip',

        // 开启模块热替换
        hot: true

    },
```

# html的HMR
需要在entry引入html文件

# css的HMR
使用style-loader
```
开发环境中才会使用webpack-dev-server
这里使用style-loader只是为了方便模块热替换以预览效果
上线的时候可以再改成minicssextractplugin
```

# js的HMR
只能处理非入口文件的js文件
在index.js(入口文件中), webpack-dev-server会自动暴露module.hot
只需要在入口js中判断
```js
if(module.hot) {
    module.hot.accept('./demo.js', function() {
        // 监听demo.js, 有变化则调用该函数

        // demo.js中暴露了一些函数
        // 在这里可以将更新了的函数重新进行运行一次

        // 比如printMe函数更新了
        // 为了获取新的效果, 可以在这调用一次
        printMe();
    })
}
```

