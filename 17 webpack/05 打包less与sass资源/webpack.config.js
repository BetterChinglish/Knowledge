
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules: [
            // 多个规则, 一个对以.less结尾的, 一个对以.css结尾的
            // 分别应用不同的loader
            { test:/\.css$/, use:['style-loader','css-loader'] },
            { test:/\.less$/, use:['style-loader','css-loader', 'less-loader'] },
            { test:/\.scss$/, use:['style-loader','css-loader', 'sass-loader'] },

        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:false
        })
    ]
}