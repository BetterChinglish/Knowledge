const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        test: './src/test.js'
    },
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
            },
        ]
    },

    devtool: 'inline-source-map',

    devServer: {
        static: './dist',
        // 设置端口
        port: 'auto',

        // 运行时自动帮忙打开浏览器
        open: true,

        // 设置端口
        // host: 'local-ip',
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title:'test',
            template: './src/test.html',
            filename: 'index.html',
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: 'my.css'
        })
        
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist')
    },
    optimization: {
        runtimeChunk: 'single',
    },
}