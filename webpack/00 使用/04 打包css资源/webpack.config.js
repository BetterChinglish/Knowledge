const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path');

module.exports={
    mode:'development',

    // 由js链接得到css文件以使用css-loader将css打包到js中
    entry:'./src/main.js',

    output:{
        filename:'bundle.js',
        path:resolve(__dirname,'build')
    },

    module:{
        rules:[
            {
                // 正则规则
                // \是转义符, \.即为字符串 '.'
                // $表示匹配以前面字符串结尾
                // 这里即为对以.css结尾的文件使用css-loader和style-loader
                test: /\.css$/,

                // 这里从右往左依次使用loader
                // 即先使用css-loader再使用style-loader
                use:[
                    'style-loader',    // 将js中的css通过创建style标签添加到html文件中生效
                    'css-loader'    // 将css文件编译成commonjs的模块到js中
                ]
                // 如果只需要使用一个loader则use属性改为
                // loader: 'css-loader'
            }
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
