es通过RegExp类型支持正则表达式

# 创建方法

```
let myRegExpType = /pattern/flags;
```

此正则表达式的pattern(模式)为任意简单或复制的正则表达式

每个正则表达式可以带多个或0个flags(标记)

# 匹配模式的标记

## g
全局模式

查找字符串的全部内容, 而不是找到第一个匹配内容就结束

## i
不区分大小写

忽略pattern和被查找字符串的大小写

## m

多行模式

查找到一行文本末尾时会继续下一行的查找

## y

粘附模式

只查找lastIndex开始及之后的字符串

lastIndex后面会讲

## u
Unicode模式

启动Unicode匹配

## s
dotAll模式(dot: 点的意思, dotAll, 点代表任何)

表示元字符 .  匹配任何字符(包括\n或\r)


## 例子
```JavaScript
// 可用于匹配字符串中所以的'at'
let pattern1 = /at/g;

// 匹配第一个at并且忽略大小写
let pattern2 = /at/i;

// 匹配所有ac或bc且忽略大小写
let pattern3 = /[ab]c/gi;
```

# 元字符与元字符的匹配

元字符还有: ( [ { \ ^ $ | } ] ) ? * + .

这些特殊字符在RegExp中有特殊含义,
所以如果pattern中要匹配这些字符本身, 需要进行转义, 使用反斜杠\

```JavaScript
// 匹配所有"'at'", 注意是而不是"at"
let pattern1 = /\'at\'/g;

// 匹配第一个 '\at'并且忽略大小写
let pattern2 = /\\at/i;
```


# 使用RegExp构造函数来创建RegExp实例
```JavaScript
// 匹配 \ax\ 或 \bx\ 或 \cx\
let pattern1 = /\\[abc]x\\/i
let pattern2 = new RegExp("\\[abc]x\\", 'i');
```
上述代码的pattern1与pattern2是等效的正则表达式

使用构造函数传递参数时, 参数是字符串

而这个参数转成值其实是要经过一次转义, 而这个值再如pattern1中的模式部分传递进去, 又需要一次转义

所以使用构造函数传递参数时, 特殊符号需要进行二次转义, 也就是要达到 \ 的目的, 则正则表达式为\ \, 则正则表达式的字符串形式为 \ \ \ \


## 使用已有的正则表达式实例作为参数
```javascript
let pattern1 = /ab/i;
console.log(pattern1);      // /ab/i

let pattern2 = new RegExp(pattern1);
console.log(pattern2);      // /ab/i

let pattern3 = new RegExp(pattern2, 'gi');
console.log(pattern3);      // /ab/gi

```

可以使用已有的实例作为RegExp构造函数的参数进行创建新的实例, 如pattern1作为参数创建了pattern2

同时可以选择性修改标记, 如pattern2作为参数创建pattern3时, 修改标记为gi


