# 第三章 语言基础

## 3.0 本章内容

* 语法
* 数据类型
* 流控制语句
* 理解函数

(基于ECMAScript第六版)


## 3.1 语法

### 3.1.1 区分大小写

变量, 函数名, 操作符都区分大小写
如test与Test是两个不同的变量

类似的typeof不能作为函数名(关键字)
但是Typeof是一个有效的函数名

3.1.2 标识符

**定义**: 变量, 函数, 属性或函数参数的名称
**组成**: 
1. 第一个字符必须是一个**字母**或**下划线**或**美元符号**
2. 剩下的字符可以是字母,下划线,美元符号或数字

标识符中的字母可以是拓展ASCII中的字母也可以是Unicode的字母字符, 如À和Æ（但不推荐使用）

标识符形式: 使用驼峰大小写形式(第一个单词首字母小写其他后面每个单词的首字母大写如: somethingLikeThis)

非强制, 但因为这种形式跟ECMAScript内置函数和对象的命名方式一致, 故推荐(最佳实践)
```
注意:
关键字, 保留字, true, false和null不能作为标识符
```

### 3.1.3 注释

1. 单行注释
```JavaScript
// 这是单行注释
```


2. 多行注释

```JavaScript
/*
    这
    是
    多
    行
    注
    释
*/

```

### 3.1.4 严格模式

ECMAScript5 增加了严格模式
严格模式是一种不同的JavaScript解析和执行模型，
ECMAScript 3的一些不规范写法在这种模式下会被处理，
对于不安全的活动将抛出错误。

要对整个脚本启用严格模式，在脚本开头加上这一行：
```JavaScript
"use strict"
```
这个一个预处理指令
任何支持的JavaScript引擎看到它都会切换到严格模式。
选择这种语法形式的目的是不破坏ECMAScript 3语法

也可以单独指定一个函数在严格模式下执行, 将上面这句话放到函数体的开头即可:
```JavaScript
function demo(){
    "use strict";
    // ...
}
```

### 3.1.5语句

JavaScript中语句可以不加分号:
```JavaScript
let a = 100 + 200   // 有效但不推荐
let b = a + 1000;   // 加分号也有效, 推荐
```
不加分号则由解析器确定语句结尾, 而加分号自己确定, 
避免省略造成的问题(如输入内容不完整)
加分号便于开发者删除空行来压缩代码(没有分号只删除空行的化会导致语法错误)
加分号也有助于在某些情况下提升性能，因为解析器会尝试在合适的位置补上分号以纠正语法错误。
要养成加分号的好习惯

**代码块**
多条语句可以合并到一个c语言风格的代码块之中
代码块{}, 左花括号开始, 右花括号结束
```JavaScript
if(test){
    // ...
}

```
建议始终在控制语句中使用代码块, 即使例如if中只有一条语句可以省略{}


## 3.2 关键字与保留字

ECMA-262 描述了一组保留的**关键字**
这些关键字有特殊的用途, 不能用作标识符或属性名
ECMA-262第六版规定的所有关键字如下
```
break           do  
in              typeof
case            else
instanceof      var
catch           export
new             void
class           extends
return          while
const           finally
super           with
continue        for
switch          yield
debugger        function
this            default
if              throw
delete          import
try  
```

还描述了一组未来的保留字
同样不能用作标识符或属性名, 他们在语言中没有特定用途
但是他们是保留给将来做关键字用的

```
始终保留:
enum
严格模式下保留:
implements          package
public              interface
protected           static
let                 private
模块代码中保留:
await(现在好像有async/await)
```
这些词汇不能作为标识符
但是目前还可以用作对象的属性名
不建议使用关键字和保留字作为标识符和属性名



## 3.3 变量

可以保存任意类型值

var, const, let 声明变量

const与let只能在es6以及更新的版本才能用

### 3.3.1 var

variable 的缩写

```js
var message;
```

不进行初始化时默认保存undefined
```js
var message;
console.log(message);    // undefined
```


声明时进行初始化
```js
var message = "hello world";
```

作用域:
函数作用域, 非块作用域
```js
function myFunc(){
    var message = "hello world";
}
myFunc();
console.log(message);       // 报错
```

省略关键字直接定义变量, 会导致这个变量成为一个全局变量
```js
function myFunc() {
    message = "hello world";    // 全局变量
}

myFunc();   // 只要调用一次这个函数就可以在函数外访问到
console.log(message);   // hello world 
```
不推荐这样使用, 很难维护, 突然冒出来的一个变量都不知道是干啥的
严格模式下这样会报错

定义多个变量
```js
var message1 = "hi",
    message2 = "hello world",
    message3;
```
换行与空格缩进非必须, 但是如同上面的形式便于阅读


var声明提升问题:
var声明的变量会提升为在函数作用域的顶部声明(不包括赋值, 也就说如果有赋值则在原来位置上赋值)
```js
console.log(message);   // undefined
var message = "hi";
console.log(message);   // hi
```
上面这段代码相当于下面:
```js
var message;
console.log(message);   // undefined
message = "hi";
console.log(message);   // hi
```
提升会将所有变量声明都提升到函数作用域的顶部

使用var反复声明同一个变量不会出错
```js
function test() {
    var message = 1;
    var message = "hi";
    var message;
    var message = true;
    console.log(message);
}

test(); // true
```
如上段代码可以理解为先提升, 然后有四个message变量的var声明, 合并为一个, 所以不会报错

在全局作用域声明的变量会成为window对象的属性
```js
var message = 'hi';
console.log(window.message);    // hi
```


### 3.3.2 let

let声明的变量是块作用域
```js
{
    let message = "hi";
    console.log(message);   // hi
}
console.log(message);   // 报错
```



----



块作用域是函数作用域的子集, 所以let声明的变量离开他所在函数时也无法使用
```js
function test() {
    let message = "hi";
}
console.log(message);   // 报错, message is not defined
```


-----



let不允许在同一作用域出现冗余声明
```js
{
    let message;
    let message;    // 报错
}

// 嵌套不会受影响
{
    let message;
    {
        let message;    // 可以
    }
}

// 不受关键词影响
{
    var message;
    let message;    // 报错
}
```



-----



**暂时性死区**

let 声明的变量不会在作用域中提升
```js
{
    console.log(message);   // 报错
    let message = "hi"; 
}
``` 
但是js引擎会注意到出现在块后面的let声明, 不过在let声明执行之前, 都无法引用未声明的变量, 这称为**暂时性死区**

可以理解为实际上有提升(目前大多数都这样认为), 但是由于无法在原let声明出现前引用, 没有形式上如同var一样的提升, 所以看作没有提升

----------

**全局声明**

let在全局作用域中声明的变量不会成为window对象的属性
```js
var message1 = "hi";
let message2 = "hello world";
console.log(window.message1);   // hi
console.log(window.message2);   // undefined
```
不过，let声明仍然是在全局作用域中发生的，
相应变量会在页面的生命周期内存续。
因此，为了避免SyntaxError，必须确保页面不会重复声明同一个变量。

------------



** 条件声明 **
同一作用域用多次用var声明同一个变量不会出问题, 
但是对于let你无法检查前面是否已经使用let声明过同名变量

不信你试试

所以let无法依赖于条件声明模式

**for循环中的let声明**

let解决了循环定义的迭代变量渗透到循环体外部的问题
```js
// var
for(var i = 1; i <= 5; i++) {
    // 循环逻辑
}
console.log(i); // 5, 循环中定义的迭代变量i渗透到循环体外

// let
for(let j = 1; j <= 5; j++){
    // 循环逻辑
}
console.log(j); // 报错, j没有定义, 解决了var的渗透问题
```



-----------



var迭代变量问题:
```js
for(var i = 0; i< 5; i++){
    setTimeout(()=>console.log(i), 0);
}
// 实际输出的是5,5,5,5,5
```
这里注意, js是单线程的, 先执行i=0并判断了他比5小后, 开始执行第一次循环体中的内容, 但是这里发现是setTimeout, 而setTimeout是异步的, 于是将他放入一个任务队列, 等到当前的同步任务执行完后在执行这个队列里的任务, 这样就导致了将循环语句执行完了但是把五个setTimeout全加到队列里没有执行, 而最后i=5时循环体不再继续, 这时这个队列里有五个setTimeout函数, 但此时都是公用一个i=5, 就导致了输出了5个5, 这里虽然setTimeout设置的时间为0, 事件本身没有延迟,但是改变了任务执行的先后顺序,执行的先后顺序又导致了微小的延迟(执行其他语句的延迟而非专门等了多少毫秒才执行setTimeout的设置的延迟)
具体可以看看下面这个例子
```js
// 1
alert(1);//第一个输出

// 2
setTimeout(function() {
    alert(2);   //待同步任务执行完毕之后才输出
},0);   //虽然设置的是0

// 3 
alert(3);//第二个输出

// 2本身没有延迟但是由于顺序改变了, 要先执行完3才能执行2, 这里有一段微小延迟, 是执行顺序引起的而非函数中延迟参数设置引起的
```

而let可以解决上述问题

使用let时, js引擎在后台会为每个迭代循环声明一个新的迭代变量(虽然都叫i但是相当于在不同的块中)
每个setTimeout引用的都是不同的变量实例
```js
for(let i = 0; i < 5; i++){
    setTimeout(()=>console.log(i), 0);
}
```
这种每次迭代声明一个独立变量实例的行为适用于所有风格的for循环，
包括for-in和for-of循环

### 3.3.3 const

const与let基本相同

区别是： 声明时必须同时初始化， 且后续再尝试修改const声明的变量会导致错误

```JavaScript
const message1 = 'hi';
console.log(message1);  // hi

// const声明的变量的作用域也是块
{
    const message2 = 'hello';
    console.log(message2);  // hello
}

try{
    console.log(message2);  
}
catch(err){
    console.log('something wrong about message2')
}
// something wrong about message2

// 必须声明时初始化
const message3; // 报错
```

const声明不可修改的限制只限定于你指定的变量的引用， 也就是你不可以再更改去引用另一个对象， 但是你引用的对象的引用其实是可以更改的
```JavaScript
let person1 = {
    name = "zhangsan",
    age = 18
}
let person2 = {
    name = "lisi",
    age = 20
}

const student1 = person1;
student1 = person2; // wrong
person1.age+=1; // ok
```


注意你给你声明的const变量赋的是一个变量还是一个值
```JavaScript
let person = {
    name: 'zhangsan',
    age: 18
}

const student1_age = person.age;
// 这里person.age其实是一个值而非一个变量, 相当于const student1_age = 18, 与person.age没有引用关系
// 所以修改person.age不会引起因为是const声明的变量所以无法修改的错误

person.age = 19;    // ok
console.log(student1_age);  // 18
console.log(person.age);    // 19

```

使用const声明一个不会被修改的for循环变量, 也就是说每次迭代只是创建一个新的变量, 这对for-in和for-of循环特别有意义
```JavaScript
// 1
for(const key in {a:1, b:2}) {
    console.log(key);
}
// a, b


// 2
for(const value of [1,2,3,4,5]) {
    console.log(value);
}
// 1,2,3,4,5


// 3
for(const i = 0; i < 5; i++){
    //something
}
// 报错
```

其实看到这里疑惑大大的, 但是想了会, 这里说说我的看法
对于上述代码片段3, 执行了5次循环体, 这五次执行使用的作用域应该是一个块, 而对于每次执行, 都再使用另一个块执行逻辑体并传入当时i的值, 也就是一个()对应五个{},对于使用let的循环体参数i, 自然没有影响, 但是使用const会导致i自增, 而const声明的变量不可以再修改, 而报错
但是对于for-of与for-in我还是解释不通, 除非再将()分作几个作用域, 对片段1来说{a:1, b:2}相当于将()再分为两个块, 那么这俩虽然名字都叫i但是也不会引起冲突





### 3.3.4 声明风格及最佳实践

1. 不使用var

使用let与const代替var

2. const优先, let次之
使用const声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。

因此，很多开发者认为应该优先使用const来声明变量，只在提前知道未来会有修改时，再使用let。

这样可以让开发者更有信心地推断某些变量的值永远不会变，同时也能迅速发现因意外赋值导致的非预期行为

当然typescript更好的解决了这些问题


## 3.4 数据类型

六种简单数据类型(原始类型):
* Undefined
* Null
* Boolean
* Number
* String
* Symbol(es6新增)

复杂数据类型:
* Object(对象)

Object是一种无序名值对的集合


### 3.4.1 typeof操作符

确定任意变量的数据类型

对一个值使用typeof操作符会返回下列字符串之一:

* "undefined"   表示值未定义；
* "boolean"     表示值为布尔值；
* "string"      表示值为字符串；
* "number"      表示值为数值；
* "object"      表示值为对象（而不是函数）或null；
* "function"    表示值为函数;
* "symbol"      表示值为符号。

```JavaScript
console.log(typeof "123")       // string
console.log(typeof(123))        // number

const message = false;
console.log(typeof message);    // boolean
console.log(typeof(message));   // boolean
```

typeof是操作符, 不需要参数, 但是也可以使用函数形式

typeof对null使用返回object, 因为特殊值null被认为是一个对空对象的引用

函数在ECMAScript中被认为是对象而不代表一种数据类型

但是函数也有自己的特殊属性, 为此有必要通过typeof操作符来区分函数和其他对象

### 3.4.2 Undefined类型

这个类型只有一个值, 即特殊值undefined

---
声明变量后但没有初始化, 那么变量默认被赋予了undefined值
```JavaScript
let message;
console.log(message)    // undefined
console.log(message === undefined)  // true
```
---
没有必要显式地给某个变量设置undefined值

增加这个特殊值的目的就是为了正式明确空对象指针（null）和未初始化变量的区别。

---

包含undefined值的变量与未声明的变量有区别
```JavaScript
let message
console.log(message);   // undefined
console.log(age);       // 报错
```
对未声明的变量，只能执行一个有用的操作，就是对它调用typeof
(对未声明的变量调用delete也不会报错，但这个操作没什么用，实际上在严格模式下会抛出错误。)
---


对声明后未初始化的变量使用typeof得到undefined

对未声明的变量使用typeof也是得到undefined

虽然都是得到undefined, 但是要注意这两种情况有本质上的差异

```JavaScript
let message;
console.log(typeof message, typeof message1)
// undefined, undefined
```

小技巧:
对每个声明了的值都进行初始化, 这样typeof得到的结果如果是undefined, 那么这个变量就是没用声明过的

---

undefined是个假值, 可以使用简单的方法检测出它

但是很多其他的值也一样是假值, 如false, 所以检测时要明确想要检测的就是undefined

简单的说就是这个值是初始化了的还是没有初始化的, 因为初始化了的是真没初始化是假, 这样的话如果是假那么他就是undefined, 而不是检测出某个值是假, 然后你就认为他是undefined

```JavaScript
let message;
if(message){
    // 不执行
}

if(!message) {
    // 执行
}// !代表非

if(name) {
    // name没有声明, 所以这里报错
}
```


<br>

### 3.4.3 Null类型
<br>


只有一个特殊值: null

表示一个空对象指针

使用typeof传回object的原因
```JavaScript
let book = null;
console.log(typeof book);   // object
```

---


定义之后要存储对象的变量的时候, 使用null来初始化

这样只要检查这个变量的值是不是null就可以知道这个变量在后来被赋予了一个对象的引用
```JavaScript
let book = null;

// ...一些其他的代码

// 检测book是否被赋值
if(book == null) {
    console.log("book未被赋值");
}
else {
    console.log("book已被赋值")
}
// book未被赋值


book = "<<百年孤独>>";

// 检测book是否被赋值
if(book == null) {
    console.log("book未被赋值");
}
else {
    console.log("book已被赋值")
}
// book已被赋值
```

---


undefined 由 null 派生而来, 因此他们被定义为表面上相等
```JavaScript
console.log(null == undefined); // true
```
虽然塔姆有关系但是用途完全不同

前面说不要显式地赋值undefined

但是对于null, 只要变量即将用于保存变量, 那么就要使用null对他进行初始化

这样就可以保持null是空对象指针的语义将其与undefined进一步区分开来

---


null同样是个假值, 使用简单的检测方式时同undefined一样要明确自己检查的就是这个值本身而不仅仅是假值
```JavaScript
let message = null;

if(message) {
    // 不执行
}
if(!message) {
    // 执行
}
```


---

<br>

### 3.4.4 Boolean 类型


Boolean有两个字面值:
* true
* false

这两个值不同于数值,
即true不等于1, false不等于0

区分大小写, True不是布尔值

---


其他类型的值有相应布尔值的等价形式

使用Boolean()转型函数将其他类型的值转化为布尔值

```JavaScript
let message = "hi";
console.log(Boolean(message));  // true
```
Boolean()转型函数可以在任意类型的数据上调用，而且始终返回一个布尔值


---

转换规则:
1. Boolean

    1. true转换为true
    2. false转换为false

2. String

    1. 非空字符串转换为true
    2. "" 空字符串转化为 false

3. Number
   1. 非0数值(包括无穷值)
   2. 0, NaN转换为false

4. Object
   1. 任意对象转换为true
   2. null转换为false

5. Undefined
   1. N/A(不存在)转换为true
   2. undefined转换为false


上述提到的N/A我也不知道是干啥的, 可能是未声明的意思吧, 但是Undefined类型就只有undefined一个值, 那不就转不成true了

if等流控制语句会自动执行其他类型值到布尔值的转换
```JavaScript
let message = 'hi';
if(message) {
    // something
}
```

---


<br>



### 3.4.5 Number类型


Number类型使用IEEE 754格式表示整数与浮点值


#### 八,十,十六 进制数
最基本的数值字面量格式是十进制整数, 直接写出来就行
```JavaScript
let myNumber = 100;     // 整数
```

---


整数也可以用八进制或者十六进制字面量表示

八进制以0开头, 然后接八进制数

如果接的是无效的八进制数, 那么将自动忽略前面的0, 当作十进制处理
```JavaScript
let octalNum1 = 010 // 十进制的8
let octalNum2 = 08  // 无效的八进制数, 当作十进制的8处理
```

<br>

---

<br>

十六进制以0x为前缀, 后接16进制数(字母部分大小写均可)
```JavaScript
let hexNum1 = 0x2a;     // 十进制42
let hexNum2 = 0x1f;     // 十进制31
```

<br>

---
<br>


使用八进制和十六进制格式创建的数值在所以数学操作中都被视为十进制数

由于JavaScript保存数值的方式, 实际中可能存在+0与-0, 
他们在所以的情况下都被认为是相等的


#### 浮点值

带有小数点,  如果小数点前面为0, 可以省略(不推荐)

小数点后面必须至少有一个数字
```JavaScript
let floatNum1 = 10.1;
let floatNum2 = .2;     // 0.2, 不推荐这样写
```

---

存储浮点值的内存空间是存储整数值的两倍, 所以ECMAScript总是设法把值转化为整数

所以当小数点后面没用数字或者数字(全)为0的情况下, 数值就会变成整数
```JavaScript
let num1 = 1.0; // 当作整数1处理
let num2 = 2.;  // 小数点后面没用数字, 当作整数2处理
```

---

使用**科学计数法**表示非常大或者非常小的数值
```JavaScript
let floatNum = 3.1234e5;    // 相当于 3.1234 * 10^5 = 312340
```
同理可以表示非常小的数字

---


精确度问题:
虽然浮点值的精确度高达17位小数, 但是在计算中远不及整数精确

如0.1+0.2得到的不是0.3, 而是0.30000000000000004

这是由于二进制数计算产生的误差, 有兴趣可以去了解一下

这种情况要特别注意:
```JavaScript
let a = 0.1;
let b = 0.2;

if(a+b == 0.3){
    // something
}
// 无法得到你的目的
```
 
这是由于js使用了IEEE 754数值, 其他语言也有这个问题


#### 值的范围

能表示的

最大值:
Number.MAX_VALUE

最小值:
Number.MIN_VALUE

---

无法表示的值会使用:
+Infinity
或
-Infinity
来表示

使用: 

Number.NEGATIVE_INFINITY

Number.POSITIVE_INFINITY

可以获取正、负Infinity

---

判断是否能表示:

使用isFinite()函数

```JavaScript
let num = Number.MAX_VALUE * 2;
console.log(isFinite(num));     // false
```

---

#### NaN

意思为非数值(not a number)

表示返回数值的操作失败了而非抛出错误

js中 

0 除以 非0 : 0

非0 除以 0 : (+-)无穷

0/0 : NaN


---


NaN的独特属性;

1. 任何涉及NaN的操作都会返回NaN(如NaN * 100)
2. NaN不等于任何值, 包括NaN(即NaN不等于NaN)

```JavaScript
console.log(NaN == NaN);    // false
```

由于无法使用上述代码判断一个变量是不是NaN, 

所以ECMAScript提供了判断函数: isNaN()
```JavaScript
console.log(isNaN(0/0));            // true, 0/0得到NaN
console.log(isNaN(Infinity));       // fales, Infinity被看作为数值 
console.log(isNaN(10));             // false, 10当然是数值
```


4. 数值转换

有三个函数可以将非数值转换为数值：

Number()

parseInt()

parseFloat()

    Number():

        1. 布尔值: true:1, false:0
        2. 数值: 直接返回
        3. null: 0
        4. undefined: NaN


        5. 字符串:
          * 如果包含数值字符, 连同+-符合转化为一个十进制数(忽略最前面的0, 如'010'转换为10)
          * 如果包含有效的浮点值格式的字符串, 转换为相应的浮点值(同样忽略最前面的0)
          * 如果字符串包含十六进制格式的数值字符, 则转化为十六进制对应十进制的整数值
          * 空字符串: 0
          * 除上述外: NaN


        6. 对象: 调用valueOf(), 然后按照上述规则, 如果转换结果为NaN, 调用toString(), 按照字符串规则转换

可以自己在控制台试试

---

Number()较为复杂, 可以使用parseInt()

    parseInt()
        从第一个非空格字符开始

        如果第一个有效字符不是数值字符,加号或减号, 直接返回NaN
        
        空字符串返回NaN
        
        如果第一个有效字符(非空格)开始如果是+-/数值, 则继续依次检查知道结束或者碰到非数值字符
        
        只用于整数, 小数点不包括, '22.5'会被转化为22
        
        能够识别八进制与十六进制, 并转化为十进制整数
            (如果字符串以"0x"开头，就会被解释为十六进制整数。
            如果字符串以"0"开头，且紧跟着数值字符，
            在非严格模式下会被某些实现解释为八进制整数)
        
        可以传入第二个参数指定进制数
            (传入16时使用十六进制, 字符串中的0x可以省略)
            不传第二个参数则让parseInt()自己觉得如何解析
            为避免解析出错, 建议始终传入第二个参数 
    例如:
        console.log(parseInt('a', 16));     // 10

可以控制台试试

---


parseFloat()类似于parseInt(), 

都是从位置0开始检测每个字符

解析到字符串末尾或者解析到一个无效的浮点数值字符为止

第二个小数点无效

parseFloat()始终忽略开头的0

只解析十进制格式数据, **十六进制值始终返回0**, 不能指定进制数

如果字符串表示整数（没有小数点或者小数点后面只有一个零），则parseFloat()返回整数。

### 3.4.6 String类型


使用'', "", ``

不可混着用: '",'`,"`

---


**字符字面量**:

如\n, \t, \b等

需要注意的是:

\xnn    以十六进制编码nn表示的字符, n是十六进制数字0~F, 如\x10, 其中10为16进制数, 也就是16(十进制数), 即查找编码表中第16个代表的是什么字符

\unnnn  以十六进制编码nnnn表示的unicode字符

转义序列长度可能很长如: \unnnn一共六个字符, 但是其只表示一个字符, 所以实际上\unnnn本身的六位长度并不代表实际变量的长度, 实际上只算一个字符

使用length属性获取字符串长度:
```js
let str = "hello, world!";
console.log(str.length);    // 13
```

---

**字符串的特点**

一旦创建, 不可更改

```js
// 1
let str = "hello, world";   

// 2
str = "hi";
```

上述代码片段中1处的"hello, world"是无法更改的

你更改的其实是str的引用, 

如2处, 其实是重新找块内存存储了"hi"然后再将str指向它, 

而非将原本的"hello, world"更改为了"hi", 然后再销毁"hello, world"


---

**转换为字符串**

1. toString()方法

返回当前值的字符串等价物

null和undefined没有toString()方法

字符串的toString()方法返回自身的一个副本

对数值使用时可以加入参数, 即以什么进制来解析这个数值然后再转换为字符串
```js
let num = 10;
console.log(num.toString());    // "10"
console.log(num.toString(2));   // "1010"
console.log(num.toString(8));   // "12"
console.log(num.toString(16));  // "a"
```

可以在控制台自己试试其他类型的值的转换

2. String()

如果值有toString()方法, 则调用该方法

如果是null, 返回"null"

如果是undefined, 返回"undefined"

3. 用加号操作符给一个值加上一个空字符串""
   
加号操作符本章后面会介绍


---

**模板字面量**

以``括起来

保留其中的换行符
```js
let str = `hello!
world!`;

console.log(str);
// hello!
// world!
```

在定义模板时特别有用
```js
let myHtml = `
<div>
    <p>
        something here
    </p>
</div>
`
```

---

**字符串插值**

模板字符串支持字符串插值

任何表达式都可以用于插值
```js
let num1 = 10;
let num2 = 10;
let str = `the number is ${num1 * num2}`;
console.log(str);
// the number is 100
```

可以调用函数与方法
```js
function add(a, b){
    return a+b;
}

let num1 = 10;
let num2 = 100;

let str = `%{num1} + ${num2} = ${add(num1, num2)}`;
console.log(str);

// "10 + 100 = 110"
```

将表达式转换为字符串时会调用toString()
```js
let obj = {
    toString: ()=>"this is toString"
}

console.log(`${obj}`);
// this is toString
```

注意, 这里调用的toString()应该是由js引擎重写了的, 其实前面讲到的String()的定义更符合这里的toString(), 但这里调用的确实是toString(), 不过应该是重写了的, 而且你无法更改
```js
console.log(`${null}`); // "null"
// 前面讲到了null和undefined没有toString(), 但是这里却能够输出"null", 所以这里的toString()应该是属于``模板字面量这类的 
// 任何`这里有任意内容`应该都是这类的继承
// 我反正探究了很久这个问题, 但是无奈于知识的浅薄以及信息的匮乏, 只能解释到这里, 有研究v8引擎或者其他什么引擎的大佬了解的可以科普下
// 听说js高级程序设计很np, 不知道后面会不会涉及,但估计也没有源码级别的逐句分析
```

---

**模板字面量标签函数**

