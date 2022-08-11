# 17使用webpack打包less文件

## 初始化项目
    npm init

## 下载插件
    npm i css-loader style-loader less less-loader html-webpack-plugin -D

## 打包less思路
    less首先需要编译为css,
    再打包css也就是上节内容了

## 编写文件
### 创建src目录
#### 创建index.html作为模板html
    写如两个div,并赋予id分别为box1与box2即可
#### 创建style.css文件
    为box1写入样式:
        #box1 {
            width: 500px;
            height: 500px;
            background-color: skyblue;
        }

#### 创建lessstyle.less文件
    为box2写入样式
        @width:500px;
        @height:500px;
        @color:gray;



        #box2 {
            width: @width;
            height: @height;
            background-color: @color;
        }

#### 创建index.js文件
    1. 引入两个样式文件:
        require('./style.css') 
        require('./lessstyle.less')
    2. 随意在输出一句话
        console.log('这是入口文件')

### 创建webpack.config.js文件
    编写配置文件
    less文件打包就是比css多一个loader:
        { test:/\.css$/, use:['style-loader','css-loader'] },
        { test:/\.less$/, use:['style-loader','css-loader', 'less-loader'] }
    

## 运行webpack
    webpack
    发现打包成果

## sass文件的打包
    类似于less文件的打包
    注意sass文件的后缀名为.scss
    { test:/\.scss$/, use:['style-loader','css-loader', 'sass-loader'] }

# 18 提取css为单独文件

## 下载插件 
    npm install mini-css-extract-plugin -D

## 引入插件
    在webpack-config-js中同html-webpack-plugin一样引入插件
        const MiniCssExtractPlugin = require('mini-css-extract-plugin')

## 创建插件的实例
    在plugins中同html-webpack-plugin一样new一个实例
        new MiniCssExtractPlugin()

## 使用插件的loader
    将之前的'style-loader'修改为MiniCssExtractPlugin.loader
    less文件与sass文件一样,如果需要单独打包成一个文件,也将他们的style-loader修改为MiniCssExtractPlugin.loader

## 运行
    删除出口文件夹
    运行:
        webpack
    发现出现main.css文件,并且html文件中出现link标签,src属性为./main.css
    浏览器运行html文件,与之前效果相同,成功

## 其他配置
    和html-webpack-plugin一样,mini-css-extract-plugin也有filename
        new MiniCssExtractPlugin({
            filename: 'myStyle.css' // 这里设置css文件名字
        })
    

# 19 处理css的兼容性

不同的浏览器兼容的css版本不同,要考虑所有浏览器都能达到相同的效果
写一个版本,使用打包工具自动编译成各种浏览器支持的版本

## 下载插件
    npm i postcss-loader postcss-preset-env -D


## 文件环境
    修改src/style.css文件
    #box {

        width: 200px;
        height: 200px;
        color: red;
        background-color: green;
        display: flex;
        backface-visibility: hidden;
    }
    给src/lessstyle.less也添加上述最后两行:
        display: flex;
        backface-visibility: hidden;

## 编写webpack.config.js文件
    在rules中最后添加postcss-loader即可
        { test:/\.css$/, use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader'] },
    less文件同理

## 编写postcss.config.js文件    
    创建文件夹postcss.config.js文件
    前面的postcss-loader会去寻找配置文件然后加载postcss-preset-env这个插件
    这个插件是loader要使用的插件,和之前使用的插件不同
    编写如下:
        module.exports={
            plugins:[
            require('postcss-preset-env')()
            ]
        }

## 编写package.json文件

    告诉运行时需要匹配什么样的浏览器版本
    "browserslist":[
        "> 0.2%",
        "last 2 versions",
        "not dead"
    ]
    具体含义如下:
        >0.2% 适配80%的浏览器
        last 2 versions 每种浏览器的最后两个版本
        not dead 取消那些已经不用了的浏览器

## 运行
    终端运行命令:
        webpack
    发现myStyle.css中box1的样式出现:
        #box1 {
            width: 500px;
            height: 500px;
            color: red;
            background-color: green;
            -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
            display: -webkit-flex;
            display: flex;
        }

    webkit等
    box2最后两行也出现如上所示


    成功


# 20 压缩css文件

## 下载插件
    使用optimize-css-assets-webpack-plugin插件
        npm i optimize-css-assets-webpack-plugin -D


## 引入插件
    webpack-config-js中:
        const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

## 使用插件
    new OptimizeCssAssetsWebpackPlugin()

## 运行
    webpack
    发现打包号的css文件去除了空格
    成功
## 注意
    开发时为了方便看最好不要使用
    等应用上架时使用
    这里先注释掉:
        new OptimizeCssAssetsWebpackPlugin()

# 21 打包图片资源

## 下载插件
    npm i url-loader file-loader -D

## 


# 22 打包其他资源字体图标

## 使用iconfont
    1. 打开iconfon.cn网页,使用GitHub登录
    2. 创建图标项目
    3. 将需要的图标加入购物车
    4. 将购物车的内容分别放入想要放入的目录
    5. 在项目中生成代码
    6. 在style标签里(css中)引入刚刚生成的代码
    7. 设置样式
    8. 5~7可以在iconfont项目中查看帮助,有三种使用方法



# 23 使用eslint对js代码进行检查








