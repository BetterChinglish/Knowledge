
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules: [
            // 这里对css文件, 先进行兼容性处理, 再打包入js
            // 写上'postcss-loader, 会自动寻找其配置文件postcss.config.js
            { test:/\.css$/,  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            { test:/\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'] },
            { test:/\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'] },

        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}