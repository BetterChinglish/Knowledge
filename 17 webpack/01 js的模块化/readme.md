# 全局变量

js设计之初是为了一些小功能，所 以设计者并没有考虑到js未来发展前景，没有设计模块化

故所有代码都写在一个js文件之中

```js
function foo() {
  console.log('foo')
}

// 此处省略几千行代码


function foo() {
  // 其他逻辑
}
```

这样的代码会导致全局变量污染，变量名冲突等问题


# namespace
namespace原理则是使用自执行方法在window全局对象上挂载一个属性，所有的方法都挂载在这个属性上
```js
// index.js
window.__myModule = {
  age: 18,
  sum(a, b) {
    return a + b;
  },
  foo() {
    console.log('foo');
  }
}

const m = window.__myModule;

console.log(m.sum(1, 2));
```

不难看出，虽然解决了全局变量污染的问题，但是其中的属性并非私有


# iife（immediately-invoked function expression）

通过闭包的方式，将变量封装在函数内部，只暴露需要暴露的方法

```js
(function (){
  let age = 0;
  
  function passYears(val) {
    age += val;
  }
  
  function getAge() {
    return age;
  }
  
  window.__myModule = {
    age,
    passYears,
    getAge
  }
})()

console.log(__myModule.getAge()); // 0

console.log(__myModule.passYears(18));
console.log(__myModule.getAge()); // 18

__myModule.age = 100;
console.log(__myModule.age);  // 100
console.log(__myModule.getAge()); // 18
```

可见，通过iife闭包解决了外部修改模块内部数据的问题，但是无法解决多模块的依赖问题


# iife增强

可以对iife进行增强，使其支持多模块依赖

原理是自执行方法传入其他模块的名称

```js
// ageModule.js
(function (){
  let age = 0;
  
  function passYears(val) {
    age += val;
  }
  
  function getAge() {
    return age;
  }
  
  window.__ageModule = {
    age,
    passYears,
    getAge
  }
})()


// handle.js
(function (global, ageModule){
  function sum(a, b) {
    return a + b;
  }

  global.__myModule = {
    sum,
    passYears: ageModule.passYears,
    getAge: ageModule.getAge
  }
})(window, window.__ageModule)


// index.js
const m = window.__myModule;
m.passYears(18);
m.getAge(); // 18
m.sum(m.getAge(), 2); // 20

// index.html
<script src="ageModule.js"></script>
<script src="handle.js"></script>
<script src="index.js"></script>
``` 

虽然这样解决了多模块依赖的问题，但是多个依赖传入时，代码阅读困难，难以支持大规模的模块开发（传几百个依赖模块）

没有形成特定语法，导致代码简陋，可读性差，且需要维护script标签的引入顺序


# commonJS

cjs是nodejs的模块化规范，通过module.exports导出模块，通过require引入模块

```js
// age.js
let age = 0;

function initAge(val) {
  age = val;
}

function passYears(val) {
  age += val;
}

function getAge() {
  return age;
}

module.exports = {
  age,
  initAge,
  passYears,
  getAge
}

// index.js
const { age, initAge, passYears, getAge } = require('./age.js');

initAge(18);
passYears(2);
console.log(getAge()); // 20
```

cjs解决了多模块的依赖问题，且固定的require语法，使得代码可读性更高

同时cjs遵循同步加载方式，即指定执行文件后，根据代码顺序进行加载，例如读到require则才去加载这个require的文件

且某个文件加载只执行一次，后续加载则直接返回缓存的结果

其实现原理是通过nodejs读取require中路径代表的文件的内容，将其封装成自执行函数
```js
require('./xxx.js')

// 读取xxx.js文件内容
// 将其中内容渲染成一个方法执行，并传入module、exports等，这样xxx.js中的exports就会传出来
// 再将传出来的内容与该文件的路径+名称使用key：value缓存起来

// key(路径+名称)：value(文件内容执行获取到的exports对象)

// 当再次require这个文件时，直接返回缓存的exports对象
```