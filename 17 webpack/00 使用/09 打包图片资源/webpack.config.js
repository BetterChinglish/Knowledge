
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
    module: {
        rules: [
            // 这里对css文件, 先进行兼容性处理, 再打包入js
            // 写上'postcss-loader, 会自动寻找其配置文件postcss.config.js
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader'] },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'] },

            // 使用多个loader(或多个loader并对每个老的r进行配置)
            // { test: /\.(jpg|gif|png)$/, use: ['url-loader,', { loader: 'file-loader', options: {} }]}
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'url-loader',
                options: {
                    // 对于每个图片都给一个根路径
                    publicPath: './images/',
                    // 图片输出路径
                    outputPath: 'images/',

                    // 图片打包后默认自动被编码成base64格式的文字写在css中
                    // 这里设置大小, 如果大于这个值(图片过大)则单独提为文件
                    // 单位byte
                    limit: 1024 * 30

                    
                }
            }
        ],
    },
            // 注意, webpack5已经使用asset代替了file-loader和url-loader
            // asset/resource：发送一个单独的文件并导出URL，替代file-loader
            // asset/inline：导出一个资源的data URI，替代url-loader
            // asset/source：导出资源的源代码，之前通过使用raw-loader实现
            // asset：介于asset/resource和asset/inline之间，在导出一个资源data URI和发送一个单独的文件并导出URL之间做选择，之前通过url-loader+limit属性实现。

            // {
            //     test:/\.(gif|jpg)$/,
            //     type:'asset',
            //     parser:{
            //         dataUrlCondition:{
            //             maxSize : 10 * 1024 * 1024
            //         }
            //     }
            
            // },

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