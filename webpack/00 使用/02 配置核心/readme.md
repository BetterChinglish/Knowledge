# 初始化文件
    npm init 

# node-modules文件夹
    未来npm下载的配置都存储在这个文件夹之中
    使用git将其排除同步方便很多

# package.json
    初始化后出现package.json文件
    保存了配置文件的信息
    由于git排除node-modules的同步,合作任务中不排除package.json
    这样其他成员使用这个文件时只需要npm install就会自动下载需要的配置文件



# 下载webpack5
    npm -i -g webpack webpack-cli

# 默认
    默认入口文件为src/index.js, src文件夹需要自己创建
    默认出口文件为dist/main.js,如果没有自动创建

# 命令行指定出入口文件
    webpack url-input -o url-output --mode pattern
    -o表示output
    url-input填入自己想要的入口文件
    url-output填入自己想要的出口文件夹
    pattern指定打包模式

    缺点:
        每次打包都需要自己指定url,很不方便

# 五个核心配置项
    配置文件名默认为:
        webpack.config.js
    默认名可以修改但是修改后每次终端中都需要指定配置文件,
    如果不指定则寻找默认文件名

    1. mode:''
        指定webpack打包模式
        有三种,none, development, production
    
    2. entry 入口
        entry:'url','url1',....
        默认url为./src/index.js

    3. output 输出
        output: {
            filename:'fileName',
            path:resolve(__dirname,'foldUrl')
        }

        需要在webpack.config.js中引入一个node.js方法,使用resolve名字接受path:
        const {resolve} = require('path')
        resolve(__dirname)
        可以找到根目录url,再指定输出文件夹的地址即可将filename输出

    4. loader
        让webpack能够去处理那些非js资源css,img等
        可以理解为一个翻译过程,webpack自身只能识别js
        module:{
            rules:[

            ]
        }

    5. plugin
        插件,比loader更强

# entry多入口

    1. 直接一个url
        entry:'.src/index.js'
        这里一个入口文件,生成一个chunk,一个bundle
    2. 数组写法,多个入口文件
        entry:[
            'url1',
            'url2'
        ]
        这里两个入口文件,url1与url2
        生成一个chunk一个bundle
    
    3. 对象写法
        entry:{
            one:'url1',
            two:'url2',
            // ...
        }
        这里有几个键值对就生成几个chunk和bundle
        同时,output应该改变
        output:{
            filename:'[name].js',
            // path....
        }
        这里的[name]就是entry中的键的key,
        会生成两个文件,一个为one.js,另一个为two.js

    4. 特殊用法, 即数组与对象写法混合使用
        如:
        entry:{
            one:['url_one', 'url_two'],
            two:['url_three']
        }
        这里生成两个chunk两个bundle, 第一个chunk是两个入口文件合在一起的

# 自动将打包后的js文件引入到模板html文件中
    1. 下载html-webpack-plugin
        npm install html-webpack-plugin -D
    
    2. 在webpack.config.js中引入
        const htmlWebpackPlugin = requir('html-webpack-plugin')

    3. 配置
        1. template:'url'
            以某个html为模板,然后向该模板中引入打包后的js等文件
        2. filename:'filename'
            向模板引入打包后的js文件后,这个html也会输出到出口文件夹中
            这里可以指定输出后html的名字
        3. minify
            minify:false //默认为false
            minify:{
                // 移除空格
                collapseWhitespace: true/false,
                // 移除注释
                removeComments:true/false
            }

        配置完成

        













