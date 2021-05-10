const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path');

module.exports={
    mode:'production',

    entry:'./src/main.js',

    output:{
        filename:'bundle.js',
        path:resolve(__dirname,'dist')
    },

    module:{
        rules:[
            {
                test:/\.css$/,
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