
const {resolve} = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 模式
    mode:'production',    // production or develop, develop: 编译代码能运行， 质量检查等

    // 输入
    entry:'./src/index.js',

    //输出
    output:{
        filename:'build.js',
        path:resolve(__dirname,'build')
    },

    // loader
    module:{
        rules:[

        ]
    },

    // 插件
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'demo.html',
            minify:{
                // 移除空格
                collapseWhitespace:false,
                // 移除注释
                removeComments:true
            },
            // chunks:[]

        })
           
    ]

}
