# 介绍两个loader
## css-loader
    将css文件插入到js文件中
        作用是处理css中@import和url这样的外部资源

## style-loader
    将打包好的js文件中的css放入html中去
    会在head中插入一个style标签,并把样式写入这个标签的innerHTML中
    
## 如何使用插件
    module:[
        rules:[{
            // 对哪些文件使用loader
            test:/匹配规则/,

            // 对文件使用哪些loader
            use:['','',....要使用的loader]

            // 注意loader顺序, 从后往前执行,这里css-loader要写在后面
        }]
    ]

# 初始化项目
    npm init
    自己取名确认

# 下载插件与两个loader
    npm i html-webpack-plugin css-loader style-loader -D

# 创建src目录
    src下创建
        index.html
        main.js
        style.css
    html文件中有个div,id为box
    style对box写点东西
    js文件随便console.log()输出点东西并且包含css文件:require('./style.css)

# 配置文件
    其他都会主要是module:[]的配置, 在介绍两个loader已经讲了,照着写即可

# 运行webpack
    终端输入命令
        webpack[回车]

# 浏览器打开打包好的html文件
    打开控制台
    点击console,发现输出之前写的东西,js打包引入成功
    点击elements
    打开head标签,发现其中有style子标签,css打包引入成功