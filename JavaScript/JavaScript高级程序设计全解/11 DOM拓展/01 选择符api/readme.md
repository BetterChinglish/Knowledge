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


