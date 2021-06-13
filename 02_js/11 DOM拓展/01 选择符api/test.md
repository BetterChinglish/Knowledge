# 选择符
## 选择符api
利用css匹配规则做的原生js api接口, 提高匹配效率

## querySelector()

1. 参数
一个css选择符

2. 返回
返回第一个匹配CSS选择符的DOM元素

3. 注意
    1. document下使用则在文档元素范围内查找匹配
    2. element下使用则在该element元素后代元素的范围内查找匹配


## querySelectorAll()

几乎与querySelector()相同
返回一个NodeList对象, 包含所有匹配CSS选择符的DOM节点, 若无也是返回NodeList对象,不过其为空


## 注意
querySelector与querySelectorAll返回的是静态的NodeList


## matchesSelector()

1. 参数
css选择符

2. 作用
调用该方法的元素如果与css选择符匹配则返回true, 否则返回false


# 元素遍历
## childElementCount：
返回子元素（不包括文本节点和注释）的个数

## firstElementChild：
指向第一个子元素；
firstChild的元素版


## lastElementChild：
指向最后一个子元素；
lastChild的元素版

## previousElementSibling：
指向前一个同辈元素；
previousSibling的元素版

## nextElementSibling：
指向后一个同辈元素；
nextSibling的元素版。

## 注意以上都是返回元素节点

# html5
## getElementByClassName()
1. 参数
一个包含一个或多个类名的字符串

2. 返回
指定的类的所有元素的NodeList

3. 注意
    1. 传入多个类名时, 类名的先后顺序不重要, 返回所有类名符合的元素
    2. 使用这个方法时, 只会匹配调用这个方法的元素的后代元素
    3. 性能问题, 由于NodeList是动态的, 每次使用都会重新查询一次以保证NodeList是最新的

## outerHTML属性

返回调用元素和调用元素的所有子节点的引用



## insertAdjacentHTML()

1. 参数
    1. 第一个参数必须是下列值之一
        1. "beforebegin"
            在当前元素之前插入一个紧邻的同辈元素
        2. "afterbegin"
            在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
        3. "beforeend"
            在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
        4. "afterend"
            在当前元素之后插入一个紧邻的同辈元素。

    2. 第二个参数是一个HTML字符串, 如果浏览器无法解析该字符串，就会抛出错误

## 内存与性能问题
在删除带有事件处理程序或引用了其他JavaScript对象子树时，
就有可能导致内存占用问题。

假设某个元素有一个事件处理程序（或者引用了一个JavaScript对象作为属性），
在使用前述某个属性将该元素从文档树中删除后，
元素与事件处理程序（或JavaScript对象）之间的绑定关系在内存中并没有一并删除。
如果这种情况频繁出现，页面占用的内存数量就会明显增加。

因此，在使用innerHTML、outerHTML属性和insertAdjacentHTML()方法时，
最好先手工删除要被替换的元素的所有事件处理程序和JavaScript对象属性
(第13章将进一步讨论事件处理程序)

不过，使用这几个属性——特别是使用innerHTML，仍然还是可以为我们提供很多便利的。一般来说，在插入大量新HTML标记时，使用innerHTML属性与通过多次DOM操作先创建节点再指定它们之间的关系相比，效率要高得多。这是因为在设置innerHTML或outerHTML时，就会创建一个HTML解析器。这个解析器是在浏览器级别的代码（通常是C++编写的）基础上运行的，因此比执行JavaScript快得多。不可避免地，创建和销毁HTML解析器也会带来性能损失，所以最好能够将设置innerHTML或outerHTML的次数控制在合理的范围内

虽然inner HTML或outerHTML很方便, 但创建和销毁时会带来更高的性能损失, 应该避免频繁使用