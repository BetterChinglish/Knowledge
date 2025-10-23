## 发送get与post请求
```javascript
$.get/post('url', {参数}, function(data){
    // data为响应体
    // ...
}, 'json' )
```


## jQuery里通用型ajax方法
```JavaScript
$.ajax({
    url:'',                     // 请求的url
    data:{},                    // 参数
    type:'get',                 // 请求类型, get或post
    dataType:'json',            // 响应体结果类型
    success:function(data){}    // 成功的回调函数
    error:function(){}          // 失败的回调函数
    timeout:2000,               // 超时时间
    // ...
})

```