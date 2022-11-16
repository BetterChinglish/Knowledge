const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path');

module.exports={
    mode:'development',

    entry:'./src/main.js',

    output:{
        filename:'bundle.js',
        path:resolve(__dirname,'dist')
    },

    module:{
        rules:[
            {
                // 正则
                // \是转义符, \.即为字符串.
                // $表示匹配以前面字符串结尾
                // 这里即为对以.css结尾的文件使用css-loader和style-loader
                test: /\.css$/,

                // 这里从右往左依次使用loader
                // 即先使用css-loader再使用style-loader
                use:['style-loader', 'css-loader']
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