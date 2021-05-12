# 初始化项目
    npm init

# 下载插件
    npm i css-loader style-loader less less-loader html-webpack-plugin -D

# 打包less思路
    less首先需要编译为css,
    再打包css也就是上节内容了

# 编写文件
## 创建src目录
### 创建index.html作为模板html
    写如两个div,并赋予id分别为box1与box2即可
### 创建style.css文件
    为box1写入样式:
        #box1 {
            width: 500px;
            height: 500px;
            background-color: skyblue;
        }

### 创建lessstyle.less文件
    为box2写入样式
        @width:500px;
        @height:500px;
        @color:gray;



        #box2 {
            width: @width;
            height: @height;
            background-color: @color;
        }

### 创建index.js文件
    1. 引入两个样式文件:
        require('./style.css') 
        require('./lessstyle.less')
    2. 随意在输出一句话
        console.log('这是入口文件')

## 创建webpack.config.js文件
    编写配置文件
    less文件打包就是比css多一个loader:
        { test:/\.css$/, use:['style-loader','css-loader'] },
        { test:/\.less$/, use:['style-loader','css-loader', 'less-loader'] }
    

# 运行webpack
    webpack
    发现打包成果

# sass文件的打包
    类似于less文件的打包
    


    