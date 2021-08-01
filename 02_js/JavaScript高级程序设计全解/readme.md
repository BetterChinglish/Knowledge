


# 前言


听说大厂比较看重js掌握的好不好, 所以我翻起了俺们亲爱的,相爱的,深爱的,敬爱的"JavaScript高级程序设计"

读完这本书希望自己的js技术能变得"高级"起来

本文写下来主要是巩固自己的学习经历, 并在未来需要的时候再翻阅

为了未来翻阅, 我会做到极尽的详细

**2021-7-29-19:04**

----------------

# 一. 什么是JavaScript

## 小结
JavaScript是一门用来与网页交互的脚本语言，包含以下三个组成部分。

1. ECMAScript: 

    由ECMA-262定义并提供核心功能

2. 文档对象模型（DOM）：

    提供与网页内容交互的方法和接口。

3. 浏览器对象模型（BOM）：

    提供与浏览器交互的方法和接口。


其实就是这本书大概就是从ECMAScript开始讲

先讲讲基础语法, 然后BOM和DOM, 其中又有细分

然后再讲点其他的东西

大概就是这么回事, 好了, 我真刻苦读书, 俺去打把星际争霸, 欸就是那么突然, 还没开始就结束了


**19:07**

--------------
**19:51**

```
喊了半天突残求带突残求带没人理我啊我丢
```


## 二. HTML中的JavaScript

## 2.0 本章内容

1. 使用\<script\>元素 
2. 行内脚本与外部脚本的比较
3. 文档模式对JavaScript有什么影响
4. 确保JavaScript不可用时的用户体验 


## 2.1 script元素

将JavaScript插入HTML的主要方法是使用\<script\>元素
\<script\>具有以下八个属性:(看看就行)

1.src: 可选
    表示包含要执行的代码的外部文件。 
<br/>
2. charset: 可选
    使用src属性指定的代码字符集。
    这个属性很少使用，因为大多数浏览器不在乎它的值
<br/>
3. crossorigin：可选
    配置相关请求的CORS（跨源资源共享）设置。
    默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。
    crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
<br/>
4. defer：可选
    表示脚本可以延迟到文档完全被解析和显示之后再执行。
    只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。
<br/>
5. integrity：可选
    允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI, Subresource Integrity）。
    如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。
    这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容。
<br/>
6. async : 可选
    表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。
    只对外部脚本文件有效。
<br/>
7. type：可选。
    表示代码块中脚本语言的内容类型（也称MIME类型）。
    按照惯例，这个值始终都是"text/javascript"，
    尽管"text/javascript"和"text/ecmascript"都已经废弃了。
    JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。
    在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。
    如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。
<br/>

8. language: 已经废弃
    已经被type代替了

-----------------

使用\<script\>的方法
1. 通过它直接在网页中嵌入JavaScript代码
```html
<script>
    这里面写JavaScript代码
    包含在<script>内的代码会被从上到下解释。

    // 注意这里不要出现'</script>'如:
    // console.log("</script>");
    // 如果出现这样的写法, 会被认为在这里结束script

    可以使用转义字符解决上述问题
    console.log('<\/script>');
</script>
```

2. 以及通过它在网页中包含外部JavaScript文件。

```html
<script src-"这里填写js文件的路径"></script>

<!-- 在xhtml中可以忽略结束标签 -->
<!-- <script src-"这里填写js文件的路径"> -->


<!-- 
    注意使用src引入外部js的script标签不要再写js代码，否则只下载外部js文件而不执行行内js代码 
-->
<script src='./example.js'>
    // 这里面的代码不会被执行
    console.log('hello js!')
</script>


```



**注意**

注意 按照惯例，外部JavaScript文件的扩展名是．js。
这不是必需的，因为浏览器不会检查所包含JavaScript文件的扩展名。
这就为使用服务器端脚本语言动态生成JavaScript代码，
或者在浏览器中将JavaScript扩展语言（如TypeScript，或React的JSX）转译为JavaScript提供了可能性。
不过要注意，服务器经常会根据文件扩展来确定响应的正确MIME类型。
如果不打算使用．js扩展名，一定要确保服务器能返回正确的MIME类型。

MIME类型也就是媒体类型， 如文本， 音频， 视频


```html
<script src="./example.js"></script>

```
浏览器在解析这个资源时，会向src属性指定的路径发送一个GET请求，以取得相应资源，
假定是一个JavaScript文件。
这个初始的请求不受浏览器同源策略限制，但返回并被执行的JavaScript则受限制。
当然，这个请求仍然受父页面HTTP/HTTPS协议的限制。(看看就行)

来自外部域的代码会被当成加载它的页面的一部分来加载和解释。
这个能力可以让我们通过不同的域分发JavaScript。(如DNS引入)
不过，引用了放在别人服务器上的JavaScript文件时要格外小心，
因为恶意的程序员随时可能替换这个文件。(确实恶心)

在包含外部域的JavaScript文件时，
要确保该域是自己所有的，
或者该域是一个可信的来源

\<script\>标签的integrity属性是防范这种问题的一个武器，
但这个属性也不是所有浏览器都支持。

```
integrity：可选
    允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI, Subresource Integrity）。
    如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。
    这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容。

```





