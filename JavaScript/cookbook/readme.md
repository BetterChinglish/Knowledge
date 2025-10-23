
# 0. 前言
## 1. 关于文章内容
本教程根据作者观看B站Up主 @IT峰播 后由自己总结得来, 视频地址: [Vue3.x IT峰播](https://www.bilibili.com/video/BV1Pz4y1S7Uv)

自定义为扫盲文章,其内容并不全(当然除了官方文档或者全部照着官方文档写出来的其他都不能叫全)

涵盖了较为常用的知识点,您可以在全面系统学习es6之前进行阅读,或不是很熟悉es6的人进行学习补充

由于内容绝大多数由作者手打, 无法避免的会有些错误或瑕疵,或因理解方向不同等造成失误,还请斧正


    
## 2. 关于文章主题
为方便阅读, 本文使用juejin主题, 如有不适, 敬请谅解



# 1. let and const 

## 1. let

1. let用于声明**变量**
2. 有局部作用域

    ```JavaScript
    {
        let a = 10;
    }
    console.log(a);// 无法访问到a
    ```    

3. let声明的变量不会提升

    ```JavaScript
    console.log(a); // 无法访问到a
    let a = 10;
    ```


## 2. const

1. const用于声明**常量**

    ```JavaScript
    const name = '张三';
    // name = '李四';  // 错误,const声明常量,无法再次修改
    ```

2. const声明的常量也不会提升
    ```JavaScript
    console.log(name); // 无法访问到name
    const name = '张三';
    ```

3. const声明对象时,该对象不可以更换,但是对象里的内容可以更改

    ```JavaScript
    const person = {
        name:'张三',
        age:18
    };
    console.log(person);
    // person = {} // 错误,无法更换对象
    person.age = 19;
    console.log(person);    // 发现不报错且age更改为19
    ```
----------------------------
# 2. 箭头函数

## 1. 使用方法

1. 理解为一般函数去掉function关键字再在参数和函数语句块中间加上=>

    ```JavaScript
    function myfunction(x){
          return x*x
      }
      console.log(myfunction(3))    // 输出9

      const myFunc =(x)=>{return x * x}
      console.log(myFunc(3))    // 输出9

      ```

2. 如果只有一个参数,可以去掉括号(注意没有参数时也要加上()占位)
    ```JavaScript
    const myFunc = x =>{return x * x}
    console.log(myFunc(3))  // 输出9
    ```
3. 如果只有一条返回语句,可以再去掉return和{ }

    ```JavaScript
    const myFunc = x => x * x
    console.log(myFunc(3))  // 输出9
    ```

4. 箭头函数在返回对象时必须在对象外层多加一个()

    ```JavaScript
    const fun = id=>{({id:id, name:'张三'})}
    console.log(fun(10).name)
    
    // 相当于:
    //const fun = id=>{ 
    //    return ({id:id, name:'张三'})
    //}
    // 因为对象有{},如果不括起来无法识别这是一个对象(变量)还是函数体内容
    ```

5. this
    与普通函数的this不同,
    普通函数谁调用这个函数,this就是指向谁
    箭头函数没有自己的this,它的this继承于父级,
    也就是箭头函数的this指向箭头函数所处对象

-----------------------
# 3. 数组新增的高级方法
三个方法:
1. filter()
2. map()
3. reduce()
他们都会接收一个函数,然后数组有多长,就执行多少次函数
相当于循环这个数组并每次对数组元素使用这个函数
## 1. filter() 过滤
 
```JavaScript
    // 接受一个函数,函数有一个参数,此参数代表循环这个数组时的每个元素
    let myArray=[1,2,3,4,5,6,7,8,9];

    // filter() 过滤
    let array1 = myArray.filter(function(n){
        return n>5; // n相当于循环了这个数组, 如果n大于5则返回,否则忽略
    })
    console.log(array1) // 6,7,8,9
```




## 2. map()
```JavaScript
    // 接受一个函数,同样的也有一个参数,相当于对数组元素每个都应用这个函数的规则

    // map() 映射
    let array2 = array1.map(function(n){
        return 2*n;     // 相当于对每个元素*2然后合在一起返回一个数组
    })
    console.log(array2)     // 12, 14, 16, 18

```

## 3. reduce()
```JavaScript
// 接受两个参数,
// 第一个参数为函数,函数有两个参数(s,n),第一个参数代表起始值,第二个参数代表循环数组的每个元素
// 第二个参数指定第一个函数参数的第一个参数的起始值s
// s指上一次的返回值
// n每次代表这次循环的数组的值

// 汇总
let sum = 0;
sum = array2.reduce(function(s,n){
    return s+n;
},0)    // 起始值为0,也就是s=0

// 第一次执行, s=0, n为数组第一个值12, 返回0+12,
// 第二次执行, s为上次的返回值,也就是0+12=12, n为数组第二个值14, 返回12+14
// 第三次执行, s为12+14=26, n为数组第三个值16, 返回26+16
// ...以此类推
console.log(sum)

```
---------------------------
# 4. Map 与 Set 数据结构
    暂未更新
-----------------------
# 5. 字符串新增方法与模板字符串

## 1. 字符串新增方法

### 1. startswith(string)
String.startswith(string)
判断String是否以string开头
返回true或false
```JavaScript
let url='www.baidu.com';
if(url.startsWith('https')){
    console.log(url)
}else{
    console.log('不是以https开头的url')
}
```

### 2. endswith(string)
String.endswith(string)
判断String是否以string结尾

```JavaScript
if(url.endsWith('.com')){
    console.log(url)
    }else{
        console.log('不是以.com结尾的url')
    }
```

## 2. 模板字符串
即字符串的增强版

1. 可以在其中随意书写, 所写即所得,不像普通的字符串一样换行需要特殊符号,换行书写需要多加引号
```JavaScript
// 注意: 模板字符串使用的不是引号(单引号或双引号), 而是键盘左上角tab键上面那个按键
let str = `
    first
    second
    third
    something 
    anything 
`
```

2. 可以在字符串中引入其他变量,而不必像普通字符串一样写为 string + 变量 + string
```javascript
let name = 'zhangsan';
let age = 10;

// 下面两个都得到: zhangsan is 10 years old
let normalStr = name+ ' is ' + age + ' years old';
let templateStr = `${name} is ${age} years old`

```

----------------
# 6. 解构赋值

1. 对于普通数组
```javascript

let arr = [1,2,3];

// 如果要把这个数组的三个值分别给三个变量:
{
    let a = arr[0];
    let b = arr[1];
    let c = arr[2];
}
// 这样很麻烦

// 新增简单方法:
{
    let [a, b, c] = [1, 2 ,3];
}
// 或写成:
{
    let [a, b, c] = arr;
}
```

2. 对于对象
```JavaScript
let person = {
    name:'zhangsan',
    age:10,
    gender:'male'
}
{
    let {name, age, gender} = person;
    console.log(name, age, gender)
    // 输出 zhangsan 10 male
}
```

3. 如果是对象的话,左边的变量名称必须和右边的名字相同,否则失败,仍为undefined
```JavaScript
{
    let {anotherName, age, gender} = {name:'zhangsan', age:10, gender:'male'};
    console.log(anotherName, age, gender)
    // undefined 10, male
}
```

4. 普通值左边的值可以少于右边的值,会按顺序赋值
```JavaScript
let arr = [1,2,3];
{
    let [a, b] = arr;
    console.log(a,b);   // 1 2
}
```

5. 对象左值也可以少于右边的,且顺序可以改变,因为对象按键名来赋值
```JavaScript
let person = {
    name:'zhangsan',
    age:10,
    gender:'boy'
}
{
    let {gender, age} = person;
    console.log(gender, age)    // boy 10
}
```

6. 复合赋值
```JavaScript
let arr = [{name:'zhangsan', age:10}, [1,2,3], 'hello', 9 ];
{
    let [a,b,c,d] = arr;
    console.log(a);
    console.log(b,c,d);
}
```

7. 分解赋值
```javascript
let arr = [{name:'zhangsan', age:10}, [1,2,3], 'hello', 9 ];
{
    let[{name,age},[a,b,c],d,e] = arr;
    console.log(name,age);  // zhangsan 10
    console.log(a,b,c);     // 1 2 3 
    console.log(d,e);       // hello 9

}
```

8. 声明与赋值不可分开
```JavaScript
let [a,b];  // 报错 let [a,b] = arr;

```
---------------
# 7. 三点拓展运算符
## 1. 拓展数组
1. 将array1数组放入myArray最前端, 将array2数组放入myArray最后端

```JavaScript
let array1 = [1,2,3];
let array2 = [7,8,9];
let myArray = [...array1, 4, 5, 6, ...array2] ;
console.log(myArray)    // 1, 2, 3, 4, 5, 6, 7, 8, 9
```

2. 数组各元素作为参数时,可以使用三点拓展运算符对数组进行解构传入
```JavaScript
function myFunction(a, b, c) {
    console.log(a,b,c);     
    return a+b+c;
}
let arr = [1,2,3];
console.log(myFunction(...arr));    
// 1 2 3 
// 6 
```

3. 利用三点拓展运算符将参数列表转化为一个数组
通过2中我们知道,传入实参时使用三点运算符,会把数组各个元素转化为单独的变量
那如果形参使用三点运算符,实参传入单独的变量,那么在函数中是不是就成了一个数组呢?
```JavaScript
function myFunction(...arr) {
    for(let i = 0; i <arr.length; i++)
    {
        console.log(arr[i]);
    }
    console.log(arr);
}
myFunction(3,12,45,123);
// 3
// 12
// 45
// 123
// 3 12 45 123
// 由此可见,猜测正确
```

4. 参数中部分使用三点拓展运算符
```JavaScript
function myFunction(a,b, ...arr){
    console.log(arr);
}
myFunction(1,2,3,4,5,6,7);  // 3 4 5 6 7
// 1 2 被赋值给了a, b, 剩下的生成了数组arr
```

-----------------
# 8. 对象的新语法

## 1. 新增类的概念

1. 使用class创建类,使用constructor创建构造函数

```javascript
// 创建类
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
```


2. 类中方法不需要关键词function
```javascript
// 创建类
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    // 创建类方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}
    
```


3. 使用new来创建类的实例,并传入参数(如果有的话)
```javascript
// 创建类
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    // 创建类方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}

// 创建类的实例
let person1 = new Person('zhangsan', 18, 'male')
    
```

4. 使用对象里的方法等使用 . 运算符
```javascript
// 创建类
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    // 创建类中方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}

// 创建实例
let person1 = new Person('zhangsan', 18, 'male');
// 调用say()函数
person1.say();  // zhangsan 18 male
```

5. 使用extends继承父类, 继承后所有父类属性和方法都会被继承过来

```JavaScript
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    // 创建类中方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}
class Students extends Person {

}
student1 = new Students('lisi', 19, 'male', '8003119501')
console.log(student1.name)  // lisi
student1.say();             // lisi 19 male
student1.age = 20;          // 修改年龄
student1.say();             // lisi 20 male
```

6. 子类中super()可以使用父类的构造方法, 默认使用父类的构造方法, 如果自己加入constructor(){}则会覆盖父类的构造函数
```JavaScript
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    // 创建类中方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}
class Students extends Person {
    construtor(){
        // 给出子类构造函数却没有任何实现,仍会覆盖父类的构造函数
    }
}

// 错误, Students中给出了自己的构造函数却没有实现
student1 = new Students('lisi', 19, 'male', '8003119501')
     
```

7. 使用super()简化子类的构造函数
```JavaScript
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    // 创建类中方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}
class Students extends Person {
    construtor(name, age, gender, id){
        super(name, age, gender);   // 使用父类的方法给name,age,gender赋值
        // 这里相当于:
        // this.name = name;
        // this.age = age;
        // this.gender = gender;
        // 这种情况下直接使用super()可以达到简化的目的

        // 再加上新入的id属性
        this.id = id;
    }
}

student1 = new Students('lisi', 19, 'male', '8003119501')
console.log(student1);
// 输出如下,发现四个属性都被创建并传入了初值
// Students
// age: 19
// gender: "male"
// id: "8003119501"
// name: "lisi"
// __proto__: Person

// 但是调用继承过来的say()方法只会输出前三个属性,因为继承过来的方法和父类相同,父类的say()方法中并没有输出id
student1.say();     // lisi 19 male
```


8. 重写父类方法
```JavaScript
class Person {
    // 创建构造函数
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    // 创建类中方法
    say() {
        console.log(this.name+' '+this.age+' '+this.gender);
    }
}
class Students extends Person {
    construtor(name, age, gender, id){
        super(name, age, gender);   // 使用父类的方法给name,age,gender赋值
        // 这里相当于:
        // this.name = name;
        // this.age = age;
        // this.gender = gender;
        // 这种情况下直接使用super()可以达到简化的目的

        // 再加上新入的id属性
        this.id = id;
    }

    // 重写父类的say()方法以达到输出四个属性
    say(){
        // 如果不写任何内容,也会覆盖掉继承过来的父类的say()方法
        console.log(this.name, this.age, this.gender, this.id);
    }
}

student1 = new Students('lisi', 19, 'male', '8003119')
student1.say(); // lisi 19 male 8003119
```


## 2. json

1. 简写变量,值使用变量的时候,如果键名与变量名相同,那么可以写作一个

```JavaScript

// 一般写法
// let obj = {
//     name:'zhangsan',
//     age:14,
//     gender:'male'
// }

// 特殊情况的简写:
name = 'lisi';
age = 14;
sex = 'male';
let obj = {
    name,   // 即name:name, 变量名与键名相同,简写为一个, 下面age相同
    age,
    gender:sex      // 键名gender,变量名sex,不同,不可以简写为一个,如果你定义过一个变量为gender, 那么你本想用sex,却使用了gender,如果gender未定义,则报错undefined
}
```

2. 简写方法, 方法也可以简写,不必function_name:function(){}
```JavaScript
    name = 'zhangsan';
    age = 15;
    let obj = {
        name,
        age,
        say(){
            console.log(this.name, this.age)
        }
    }

    obj.say();  // zhangsan 15
```

3. 使用JSON.stringify()进行串行化
```JavaScript
name = 'zhangsan';
age = 15;
let obj = {
    name,
    age
}
let str = JSON.stringify(obj);
console.log(str.name)   // undefined
console.log(str)    // {"name":"zhangsan","age":15}
```

4. 使用JSON.parse()进行反串行化
```JavaScript
let obj = JSON.parse('{"name":"lisi","age":19}')
console.log(obj.name, obj.age)    // lisi 19
```


# 9. 模块化编程

## 1. module的引入
在编写html文件时,我们通常会引入许多js文件,如下:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./1.js"></script>
    <script src="./2.js"></script>
    <script src="./3.js"></script>
</head>
<body>
    
</body>
</html>

```

当这些js文件中有重复命名时,便会报错
如1.js和2.js都定义一个变量name
```JavaScript
// 1.js
let name = 'zhangsan';
```

```javascript
// 2.js
let name = 'lisi';
```

那么我们在最开始那样引入三个js文件会导致变量名冲突,报错如下:
Uncaught SyntaxError: Identifier 'name' has already been declared
因为这样引入js会导致浏览器不知道解析那个name变量

我们可以给script标签的type属性赋值为module
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./1.js" type='module'></script>
    <script src="./2.js" type='module'></script>
    <script src="./3.js" type='module'></script> 
</head>
<body>
    
</body>
</html>
```

这样相当于让每个js文件属于一个模块,这样便不会报错
相同的变量name属于不同的模块,就有了区分的标准

## 2. 如何访问不同js文件下相同的变量

每个module都是封闭的,但我们可以将它的属性暴露出去
```JavaScript
// 1.js

let name = 'zhangsan';
function add(a, b){return a+b}

export {name, add};  // 注意这里是json的简化写法,相当于 export {name:name};
```

这样在1.js中就将name暴露出去了
但为了防止一暴露出去其他js文件就都可以访问,我们还有个引入功能import

```JavaScript
// 3.js

import {name, add} from './1.js';   
// 注意这里使用了解构赋值,相当于:
// let {name, add} = {name:name, add:add} (这个对象来自./1.js文件的export)

// 接下来我们便可以直接使用name与add
console.log(name);  // zhangsan
console.log(add(3, 9)); // 12
```

## 3. 如何解决引入后的命名冲突
当我们从其他文件引入变量后,也可能出现命名重复
```JavaScript
// 3.js
import {name} from './1.js';
import {name} from './2.js';
```
这时候我们可以采用取别名的方法
```JavaScript
// 3.js
import {name as name1} from './1.js';
import {name as name2} from './2.js';
// 接下来使用name1或者name2即可
```
同样的你也可以在1.js或者2.js暴露属性时取别名
```JavaScript
// 1.js

let name = 'zhangsan';

export {name as name1};
```
```JavaScript
// 2.js

let name = 'lisi';

export {name as name2};
```
```JavaScript
// 3.js
import {name1} from './1.js';
import {name2} from './2.js';

console.log(name1, name2);  // zhangsan lisi
```

## 4. 定义属性时暴露
我们可以在定义属性时就将他暴露出去
```javascript
// 1.js
export let name = 'zhangsan';
```
这样暴露出去的属性在本文件中仍能使用
```javascript
// 1.js
export let name = 'zhangsan';
console.log(name);  // zhangsan
```

## 5. 缺少名字的暴露属性
函数或类等可以不用取名字就直接暴露
```JavaScript
// 1.js
export default function(a){
    console.log(a)
}
```
接收时名字不需要{}
```JavaScript
// 3.js
import printa from './1.js'
// 这里的printa是自己定义的
```
每个js文件只能定义这样的一个export default, 
```javascript
// 1.js
export default function(a){
    console.log(a)
}
export default function(a){
    return b;
}
```
如果出现两个及以上, 那么像
```JavaScript
// 3.js
import printa from './1.js'
import printb from './1.js'
// 报错:
// Uncaught SyntaxError: Identifier '.default' has already been declared

```
这样的引入方法便不知道引入哪个未命名的暴露了


## 6. 接收暴露的所有属性
你可以将某个js文件暴露的属性全部导入,并将其放入一个对象中以便访问
```JavaScript
export * as name from 'url';   // 创建一个对象接收暴露的所有属性
// name.attr;
```

