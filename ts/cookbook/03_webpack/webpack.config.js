
// 引入一个包
const path = require('path');

// 引入htmlwebpackplugin
const htmlwebpackplugin = require('html-webpack-plugin');

// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


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
        // 先清楚文件再生成文件
        new CleanWebpackPlugin(),

        // 使生成的js文件自动引入html文件中
        new htmlwebpackplugin(
            {
                // title:"qsj's web"
                template:"./template.html",
            }
        ),

    ],

    // 设置引用模块(哪些文件可以作为模块被引用)
    resolve:{
        extensions:['.ts','.js']
    }

    // 新版本的语句可能在旧版本中不支持,所以要转换成旧版本支持的js

}


