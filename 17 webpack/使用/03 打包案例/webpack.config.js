const {resolve} = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")



module.exports = {

    mode:'production',

    entry:{
        vender:['./src/js/jquery.js','./src/js/common.js'],
        index:'./src/js/index.js',
        cart:'./src/js/cart.js'
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[

        ]
    },

    plugins: [
        // 如果这里多个页面则new多个HtmlWebpackPlugin对象
        new HtmlWebpackPlugin({

            template:'./src/index.html',

            // 使用chunks属性确定该html需要引入哪些js文件
            chunks:['vender','index'],
            filename:'index.html',
            minify:false

        }),

        new HtmlWebpackPlugin({
            template:'./src/cart.html',
            chunks:['vender','cart'],
            filename:'cart.html',
            minify:false
        })
    ]



}