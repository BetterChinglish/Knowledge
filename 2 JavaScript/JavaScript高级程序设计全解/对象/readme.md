# 理解对象

创建对象实例即Object实例
```javascript
let person = new Object();
person.name = "zhangsan";
person.age = 18;
person.getPerson = function(){
    console.log(this.name+" is " +  this.age + " years old");
}
person.getPerson();
```

上述类似name与age的叫做属性

类似于getPerson()的这种函数叫做方法


## 属性特征
1 [[Configurable]]
可否删除及重定义

2 [[Enumerable]]
是否可以使用for-in循环返回

3 
