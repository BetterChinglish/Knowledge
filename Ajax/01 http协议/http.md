# HTTP
规定了浏览器和万维网夫为妻之间互相通信的规则约定

## 请求报文
给服务器发的内容


### 请求行
请求类型: GET/POST
参数: 一个url
协议版本: HTTP/1.1

### 请求头
HOST: atguigu.com
Cookie: name=guigu
Content-type: application/x-www-form-urlencoded
User-Agent: chrome 83

### 空行



### 请求体
GET时为空
POST可以不为空
例如POST时
username=admin&password=admin






## 响应报文
服务器传回的结果

### 行
1. 协议版本    HTTP/1.1
2. 响应状态码   200
3. 响应字符串   OK
响应字符串与状态码对应

### 头
Content-Type:
Content-length:
Content-encoding
...
(对响应体内容做一些相关描述)

### 空行


### 体
主要返回的结果
如返回html内容
<html>
    ...
</html>
