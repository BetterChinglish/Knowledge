
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 20
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


module.exports={
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            // 17
            // { test:/\.css$/, use:['style-loader'.loader,'css-loader'] },
            // { test:/\.less$/, use:['style-loader','css-loader', 'less-loader'] },

            // 18
            // { test:/\.css$/, use:[MiniCssExtractPlugin.loader,'css-loader'] },
            // { test:/\.less$/, use:[MiniCssExtractPlugin.loader,'css-loader', 'less-loader'] },

            // 19
            { test:/\.css$/, use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader'] },
            { test:/\.less$/, use:[MiniCssExtractPlugin.loader,'css-loader', 'less-loader','postcss-loader'] },
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'main.html',
            minify:false
        }),


        new MiniCssExtractPlugin({
            filename: 'mystyle.css'
        }),

        // new OptimizeCssAssetsWebpackPlugin()

    ]
}