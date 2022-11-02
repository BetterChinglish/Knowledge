[toc]

# Node 类型


## 节点

DOM1级定义了一个Node接口,该接口由DOM中的所有节点类型实现
这个Node接口在js中是作为Node类型实现的
除了IE以外其他浏览器都可以访问到这个类型
js中所有节点类型都继承自Node类型,所有节点类型都共享着相同的方法和属性

## 节点属性

每个节点都有一个nodeType属性,用于表明节点的类型
节点类型由在Node类型中定义的下列12个数值来表示
任何节点类型必居其一:

    Node.ELEMENT_NODE(1)
    Node.ATTRIBUTE_NODE(2)
    Node.TEXT_NODE(3)
    Node.ENTITY_REFERENCE_NODE(5)
    Node.ENTITY_NODE(6)
    Node.PROCESSING_INSTRUCTION_NODE(7)
    Node.COMMENT_NODE(8)
    Node.DOCUMENT_NODE(9)
    Node.DOCUMENT_TYPE_NODE(10)
    Node.DOCUMENT_FRAGMENT_NODE(11)
    Node.NOTATION_NODE(12)

比较上面的这些常量,可以确定节点的类型
节点还有属性nodeName和nodeValue
```JavaScript
// 假设someNode是指某个p节点(p标签)
console.log(someNode.nodeType)      // 1
console.log(someNode.nodeName)      // p
console.log(someNode.nodeValue)     // null
// 元素节点的nodeValue始终为null
```

## 节点关系


### childNodes
1. childNodes
每个节点都有一个childNodes属性,其中保存着一个NodeList对象,
Node List是一个类数组对象, 他并不是数组实例
将这个节点的所有子节点都保存在这个对象之中
(子节点的子节点也包含其中,也就是全部包含其中,并不只是单单的一级子节点)
```
---注. js高级程序设计第三版, 然鹅在chrome测试时并没有选择子节点的子节点

更:
    第四版似乎删除了, 没有提到, 但是其他地方有侧面体现出来只是一级子节点
    当然也有可能是我当年看错了,阿巴巴,
    更可能是我当时理解错了, 我还记得那天是冬天的一个傍晚哈哈哈和女朋友在kfc的时候看的
    具体以浏览器内核为准

    谁没事去读标准文件呢?
```
(包括所有节点, 不单单是元素节点)

2. 访问方法
可以使用方括号访问其中的内容, 有length属性, 查看其长度
也可以通过item方法访问第n个子节点

3. 转化为数组

```javascript
// 使用someNode代替某个节点
console.log(someNode.childNodes)            // 输出someNode的所有子节点
console.log(someNode.childNodes[0])         // 输出someNode的第一个子节点
console.log(someNode.childNodes.item(1))    // 输出someNode的第二个子节点
console.log(someNode.childNodes.length)     // 输出someNode的子节点个数
console.log(someNode.childNodes[someNode.childNodes.length-1])  // 输出someNode的最后一个子节点

// 将childNodes转化为数组
var arr = Array.prototype.slice.call(someNode.childNodes, 0)


```
### children
非标准

获得该节点的所有子元素节点, 适用更广, 因为childNodes会把文本节点也选中

### parentNode

每个节点都有一个parentNode属性, 指向文档中他的父节点(最近的父元素)
```JavaScript
let Parent_Node = someNode.parentNode;      // 访问someNode的父节点

```


### nextSibling 和 previousSibling

1. nextSibling 指向下一个同胞节点, 如果下一个同胞节点为空(也就是没有), 则返回null
2. previousSibling指向上一个同胞节点, 如果上一个同胞节点为空(也就是没有), 也返回null

```JavaScript
// 可以利用这两个属性判断某节点是否为其父节点的第一个或者最后一个子节点
if(someNode.previousSibling == null){
    console.log('这是第一个节点')
}else if(someNode.nextSibling == null){
    console.log('这是最后一个节点')
}

```

### hasChildNodes()

判断某节点是否有子节点, 如果有一个或多个子节点则返回true, 如果没有则返回false

```JavaScript
if(someNode.hasChildNodes() == true) {
    console.log('存在子节点')
}

```

### ownerDocument

每个节点都有这个属性, 可以直接访问到顶层(也就是说它指向表示整个文档的文档节点). 
任何节点都不可以同时存在于两个或两个以上的文档中
通过这个属性, 你不必层层回溯到顶层, 可以直接到达
```javascript
console.log(document.body.ownerDocument)        // #document
```

## 操作节点

### appendChild()
1. 接收参数
接收一个参数(新节点)

2. 插入位置
其插入某节点的末尾, 成为某节点的最后一个子节点

3. 返回值
添加节点后，childNodes的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。更新完成后，appendChild()返回新增的节点

```javascript
var returnedNode = someNode.appendChild(newNode)
if(newNode == someNode.lastChild) { // true
    console.log('插入成功!')
}
alert(returnedNode == newNode)      // true
```

4. 注意
如果要插入的节点newNode已经处于该文档中, 那么相当于将其从原先的位置转移至现在要插入的位置. 任何DOM节点不能同时出现在文档中的多个位置上

```JavaScript
var returnedNode = someNode.appendChild(someNde.firstChild)
console.log(someNode.firstChild == returnedNode)    // false 
console.log(someNode.lastChild == returnedNode)     // true 

```

### insertBefore()

1. 接收参数
接收两个节点
    1. 要插入的新节点(newNode)
    2. 参照节点, 即插入在哪个节点之前?

2. 返回值
返回插入的节点

```JavaScript
// 插入成为someNode的第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild)
console.log(newNode == someNode.firstChild)     // true
```

3. 注意
如果参照节点为null, 则插入到someNode的末尾, 即执行与appendChild()一样的操作

```javascript
// 插入成为someNode的最后一个子节点
var returnedNode = someNode.insertBefore(newNode, null)
console.log(newNode == someNode.lastNode)       // true
```


### replaceChild()

1. 作用
与前面两个方法不同, 这个方法可以移除节点

2. 参数
    1. 插入节点, 要插入的节点, newNode
    2. 替换节点, 要替换的节点, replacedNode

```JavaScript
// 替换第一个节点
var returnedNode1 = someNode.replacedChild(newNode, someNode.firstChild)
// 替换最后一个节点
var returnedNode2 = someNode.replacedChild(newNode, someNode.lastChild)
```

3. 返回值
返回被替代的节点replacedNode
```html
<!-- ... -->
<body>

    <p></p>
    <div></div>

    <script>
    console.log(document.body.childNodes)  // NodeList(6) [text, p, text, div, text, script]

    // 使用body的子节点的第三个节点替换掉第二个
    var replacedNode = document.body.replaceChild(document.body.childNodes[2], document.body.childNodes[1]) 
    console.log(replacedNode);      // <p></p>  输出了原本的第二个节点p, 故replaceChild()返回的是被替代的节点replacedNode
    </script>
   
</body>
<!-- ... -->
```
4. 注意
这个方法其实并没有删除原本的节点, 只是改变了一些相关的指针, 从技术上讲，被替换的节点仍然还在文档中，但它在文档中已经没有了自己的位置。

```html
<!-- ... -->
<body>

    <p></p>
    <div></div>
    <script>
    console.log(document.body.childNodes)
    var replacedNode = document.body.replaceChild(document.body.childNodes[2], document.body.childNodes[1])
    console.log(replacedNode)
    console.log(document.body.childNodes)

    var returnedNode = document.body.appendChild(replacedNode)      // 可以利用 4 继续将被替换的节点插入到其他地方
    console.log(document.body.childNodes)
    </script>
   
</body>
<!-- ... -->
```



### removeChild()

1. 参数
一个参数, 需要被移除的节点

2. 返回值
返回被移除的节点

3. 注意
与replaceChild相同, 被remove的节点仍然还在文档中, 但没有了自己的位置

```javascript
var formerNode = someNode.removeChild(someNode.lastChild)
```
## 其他方法

### cloneNode()

1. 作用
复制某个节点

2. 参数
传入一个布尔值参数
贝
    1. false
    执行浅复制, 即只复制当前节点

    2. true
    执行深复制, 复制当前节点与其所有子节点

3. 返回值
返回一个someNode的副本

4. 其他
复制后返回的节点副本属于文档所有，但并没有为它指定父节点。因此，这个节点副本就成为了一个“孤儿”，除非通过appendChild()、insertBefore()或replaceChild()将它添加到文档中

```html
<!-- 假设有如下html代码 -->
<ul>
    <li> li one </li>
    <li> li two </li>
    <li> li three </li>
</ul>

<!-- 假设 ul 的引用被保存在myList -->
var deepList = myList.cloneNode(true);
console.log(deepList.length)

var shallowList = myList.cloneNode(false);
console.log(shallowList.length)
```

5. 注意
    cloneNode()方法不会复制添加到DOM节点中的JavaScript属性，例如事件处理程序等。这个方法只复制特性、（在明确指定的情况下也复制）子节点，其他一切都不会复制。IE在此存在一个bug，即它会复制事件处理程序，所以我们建议在复制之前最好先移除事件处理程序。
    事件处理程序也就是如点击事件等

### normalize()
1. 作用
处理文档树中的文本节点。
由于解析器的实现或DOM操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点的情况。
当在某个节点上调用这个方法时，就会在该节点的后代节点中查找上述两种情况。
如果找到了空文本节点，则删除它；
如果找到相邻的文本节点，则将它们合并为一个文本节点。本章后面还将进一步讨论这个方法。

2. 解释
即在后代节点中寻找文本节点,如果文本节点是空的, 则删除这个, 如果是两个相邻的文本节点,则合并成一个