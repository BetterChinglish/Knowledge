
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
        rules:[
            { test:/\.css$/, use:['style-loader','css-loader'] },
            { test:/\.less$/, use:['style-loader','css-loader', 'less-loader'] },
            
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'main.html',
            minify:false
        })
    ]
}