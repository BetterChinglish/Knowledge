

const {resolve} = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")



const exports = {

    mode:'production',
    entry:{
        vender:['./src/js/jquery.js','./src/js/common.js'],
        index:'./src/js/index.js',
        cart:'./src/js/cart.js'
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dist')
    }


}