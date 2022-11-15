

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

    plugins:[
        new HtmlWebpackPlugin({

            template:'./src/index.html',
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