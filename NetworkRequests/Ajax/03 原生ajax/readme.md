## 创建xhr对象
const xhr = new XMLHttpRequest()

## 设置请求类型与url
xhr.open('GET或POST','url')

## 发送请求
xhr.send('参数')
参数可以使用json格式利用&符号连接起来
    xhr.send('a:1&b:2&c:3')
也可以使用等号
    xhr.send('a=1&b=2&c=3')
直接发送数字
    xhr.send("123124")

## xhr部分属性
1. readyState
值:0 1 2 3 4
0 － （未初始化）还没有调用send()方法
1 － （载入）已调用send()方法，正在发送请求但尚未发送请求
2 － （载入完成）send()方法执行完成，请求已经发送完成
3 － （交互）接收到部分响应数据
4 － （完成）响应内容解析完成,已经接收到全部数据,，可以在客户端调用, 连接已经关闭

2. onreadystatechange
表示一个事件
当readyState的值改变时,就触发这个事件
xhr.onreadystatechange = function() {..}
表示当readyState改变时, 触发onreadystatechange事件, 调用后面那个函数


3. status
即响应状态码
(200~299的数字都表示成功)

4. responseType
xhr.responseType = 'json'
将服务器返回的内容作为json格式的对象, 以后使用xhr.response相当于一个对象, 因为一般服务器发回来的信息也是一个对象转化为字符串, 这样在ajax中可以直接使用对象而不需要再手动使用JSON.parse(xhr.response)进行转化

## 设置头部信息
在open方法后使用setRequestHeader('string1', 'string2')
第一个参数为头名字, 第二个为其值



## 使用nodemon插件
当修改server.js文件时, 自动关闭服务并重启服务
安装方式:
npm i -g nodemon

使用方式
nodemon server.js


## IE中ajax的缓存问题
当我们第一次向服务器发送请求后, ie浏览器会自动将服务器发送过来的内容缓存
这造成部分需要实时更新的地方无法呈现正确的内容

解决方式
加上时间戳
即xhr.open('POST',"http://127.0.0.1:8000/server?t="+Date.now())
Date.now()返回现在的时间
由于时间不同, ie重新发送请求并读取返回的报文


## 请求超时与网络异常

### 请求超时
在server.js文件中, 将send内容放入setTimeOut中, 延迟5秒再响应
然后网页请求页面代码加入如下
```JavaScript
xhr.timeout = 2000  // 设置如果2s没有收到响应报文则认为超时, 发生超时事件
xhr.ontimeout = function() {
    // 超时回调 
}
```

### 网络异常
当网络异常时, 回调函数提醒用户无网络等操作
```javascript
xhr.onerror = function() {
    // 网络错误回调函数
}
```

## 取消请求

### abort()
xhr.abort()
服务器设置延迟响应    ontimeout()
点击发送请求,由于服务器延迟返回数据,那么:
当请求后还未返回响应体时, 调用此函数以取消请求

## 重复请求问题
当用户疯狂使用发送请求操作, 会给服务器造成巨大压力
这时可以使用一个布尔变量, 初值为false
如果发送请求了设为true, 如果请求结束(状态码为4,无论是否成功返回响应体)则再设置回false

在发送请求操作前判断此布尔变量是否为true, 如果是则停止上一次请求(调用abort()方法)
这样重复发送的请求只会有最新一次的请求操作, 前面的请求都会被取消掉, 减少服务器压力



