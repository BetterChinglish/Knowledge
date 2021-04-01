
// 引入一个包
const path = require('path');

// 引入htmlwebpackplugin
const htmlwebpackplugin = require('html-webpack-plugin');


// webpack中配置信息都要写在这里module.exports
module.exports = {

    mode:"production",

    // 指定入口文件
    entry:"./src/index.ts",

    // 指定打包文件所在目录
    output:{

        // 指定打包后的目录
        path:path.resolve(__dirname,"dist"),

        // 打包后的文件名
        filename:"bundle.js"
    },


    // 指定webpack打包时使用的模块
    module:{
     
        // 指定加载的规则
        rules:[
            {
                // test指定规则生效的文件
                test:/\.ts$/,

                // 要使用的loader
                use:'ts-loader',

                // 要排除的文件
                exclude:/node_modules/
            }
        ]
    },

    plugins:[
        new htmlwebpackplugin(
            {
                // title:"qsj's web"
                template:"./template.html",
            }
        ),
    ]

}


