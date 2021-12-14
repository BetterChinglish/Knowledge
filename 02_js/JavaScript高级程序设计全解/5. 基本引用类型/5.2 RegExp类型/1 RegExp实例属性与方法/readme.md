RegExp实例是对象, 对象可以有属性和方法

# RegExp实例属性

 而RegExp的实例都有以下属性

## global
布尔值

是否设置g标记

## ignoreCase
布尔值

是否设置i标记

## unicode
布尔值

是否设置u标记

## sticky
布尔值

是否设置y标记(y标记: 只查找lastIndex及其之后的字符)

## lastIndex
整数

表示在源字符串中下一次搜索的开始位置, 默认从0开始

## multiline
布尔值

是否设置m标记(m标记: 多行查找, 到行末尾继续下一行查找)

## dotAll
布尔值

是否设置s标记(s标记: 元字符 . 匹配任何字符)

## source
正则表达式的字面量字符串(不是传给构造函数的模式字符串, 不是二次转义的那个), 也就是pattern部分

/pattern/flags

## flags

let pattern1 = /pattern/flags

flags部分



# RegExp实例的方法





