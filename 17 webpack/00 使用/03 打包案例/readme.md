# 初始化文件夹15 webpack打包案例
    npm init yes


# 创建src目录
    src目录下有cart.html与index.html和一个js文件夹

    ## js文件夹
        包括
        cart.js
        common.js
        index.js
        jquery.js
    
    现在要将
    cart.js,common.js,jquery.js在cart.js引入
    index.js,common.js,jquery.js在index.js引入

# 下载插件html-webpack-plugin
    npm i html-webpack-plugin -D

# 创建webpack.config.js并配置

    由于两个html都需要common.js和jquery.js,
    故将这两个打包为一个chunk
    在entry中写入:
    vender:['./src/js/common.js', './src/js/jquery.js'],
    cart:'./src/js/cart.js',
    index:'./src/js/index.js'

    配置将生成的js引入html时,有多少个html就要创建多少个htmlwebpackplugin
    这里有两个html文件需要引入,index.html和cart.js
    则需要两个htmlwebpackplugin
    设置需要引入的js文件时,使用chunks:['name1','name2',...]
    name1,name2就是entry中键对的key

    其余自配

# 完成
    至此完成配置
    运行webpack
    生成(或已经自己创建)出口目录
    里面有三个js文件和两个html文件
    打开html查看是否包含正确
    


