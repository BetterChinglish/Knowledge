

# 事件循环
事件循环的三个阶段:

捕获 => 目标 => 冒泡

```javascript
// 第三个参数默认是false， 表示走冒泡， 为true走捕获
const myDiv = document.getElementById('myDiv')
myDiv.addEventListener('click', () => {
  console.log('clicked my div element.');
}, true);
```

## IE
冒泡


## 网景
捕获

## 阻止默认行为
### 使用onclick并且return false
```javascript
const myA = document.querySelector('.myA')
myA.onclick = () => {
  console.log('clicked')
  return false;
}
```

### 使用preventDefault
```javascript
const myA = document.querySelector('.myA')
myA.onclick = (e) => {
  console.log('clicked')
  e.preventDefault();
}
// 或者
// myA.addEventListener('click', (e) => {
//   e.preventDefault();
// })
```

addEventListener中return false无效
```javascript
const myA = document.querySelector('.myA')
myA.addEventListener('click', () => {
  return false
})
```

## 阻止冒泡
阻止向上冒泡:

e.stopPropagation();

阻止向上冒泡 并且 阻止相同元素后续的事件

e.stopImmediatePropagation();

```javascript
const myA = document.querySelector('.myA')
myA.addEventListener('click', (e) => {
  console.log('first click event')
  e.stopImmediatePropagation();
  e.preventDefault();
})
// 下面这个不会执行
myA.addEventListener('click', (e) => {
  console.log('second click event')
  e.stopImmediatePropagation();
})
```

对捕获阶段同理, 如下, a的两个点击事件都不执行
```html
<body>
<div class="father">
  <a class="myA" href="http://www.baidu.com">baidu</a>
</div>

<script>
  const myA = document.querySelector('.myA')
  const father = document.querySelector('.father');
  father.addEventListener('click', (e) => {
    console.log('clicked father div')
    e.stopPropagation();
    e.preventDefault();
  }, true)
  myA.addEventListener('click', (e) => {
    console.log('first click event')
  }, true)
  myA.addEventListener('click', (e) => {
    console.log('second click event')
  }, true)

</script>
</body>
```

## dom级别
dom级别分为DOM0 DOM1 DOM2 DOM3

但是dom事件只有 DOM0 DOM2 DOM3

因为DOM1没有定义事件相关的内容
### dom1

1. 行内重复绑定, 只执行第一个
```html
<div class="father">
  <a class="myA" href="http://www.baidu.com" onclick="fn1()" onclick="fn2()">baidu</a>
</div>

<script>
  function fn1() {
    console.log('fn1')
  }
  function fn2() {
    console.log('fn2')
  }
</script>
```
2. 行内一个执行多个方法, 两个都执行, 但是过于耦合
```html
<div class="father">
  <a class="myA" href="http://www.baidu.com" onclick="fn1(); fn2()">baidu</a>
</div>

<script>
  function fn1() {
    console.log('fn1')
  }
  function fn2() {
    console.log('fn2')
  }
</script>
```

3. 动态绑定, 当绑定多个时后面的会覆盖前面的
```html
<div class="father">
  <a class="myA" href="http://www.baidu.com">baidu</a>
</div>

<script>
  const myA = document.querySelector('.myA')

  function fn1() {
    console.log('fn1')
  }
  function fn2() {
    console.log('fn2')
  }

  // 点击a链接时只执行了fn2
  myA.onclick = fn1;
  myA.onclick = fn2;
</script>
```

dom0级事件取消绑定只需要将onclick置空为null即可

### dom2
使用addEventListener绑定事件并使用removeEventListener解绑

IE8及以下不支持, 需要使用attachEvent
```html
<div class="father">
  <a class="myA" href="http://www.baidu.com">baidu</a>
</div>

<script>
  const myA = document.querySelector('.myA')

  function fn1(e) {
    console.log('fn1 event')
    e.preventDefault()
  }
  function fn2(e) {
    console.log('fn2 event')
    e.preventDefault()
  }

  myA.addEventListener('click', fn1)
  myA.addEventListener('click', fn2, true)
</script>
```

```javascript
myA.removeEventListener('click', fn1)
myA.removeEventListener('click', fn2, true)
```


### dom3级
UI: load scroll

焦点: blur focus

鼠标: dbclick 

滚轮: mousewheel

文本: textInput

键盘: keydown

合成: 当为输入法编辑器输入字符时触发 如 compositionstart

变动: 底层dom结构发生改变时触发 DOMsubtreeModified

也支持开发人员自定义事件
```html
<div>
  <button id="myBtn">click</button>
</div>

<script>
  const myBtn = document.getElementById("myBtn");

  // 自定义事件
  const myEvent = new CustomEvent("myEvent", {
    // 数据
    detail: {
      name: "我的自定义事件",
      value: '哈哈哈',
      hi: 'hello'
    },
    // 冒泡
    bubbles: true,
  })

  // 绑定
  document.addEventListener('myEvent', function (event) {
    console.log(event.detail)
  })
  
  // 分发
  myBtn.addEventListener('click', function (event) {
    document.dispatchEvent(myEvent);
  })
</script>
```
