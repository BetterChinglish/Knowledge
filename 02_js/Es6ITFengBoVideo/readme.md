# let and const 

## let

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


## const

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

# 箭头函数

## 使用方法

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


# 数组新增的高级方法
三个方法:
1. filter()
2. map()
3. reduce()
他们都会接收一个函数,然后数组有多长,就执行多少次函数
相当于循环这个数组并每次对数组元素使用这个函数
## filter() 过滤
 
```JavaScript
    // 接受一个函数,函数有一个参数,此参数代表循环这个数组时的每个元素
    let myArray=[1,2,3,4,5,6,7,8,9];

    // filter() 过滤
    let array1 = myArray.filter(function(n){
        return n>5; // n相当于循环了这个数组, 如果n大于5则返回,否则忽略
    })
    console.log(array1) // 6,7,8,9
```




## map()
```JavaScript
    // 接受一个函数,同样的也有一个参数,相当于对数组元素每个都应用这个函数的规则

    // map() 映射
    let array2 = array1.map(function(n){
        return 2*n;     // 相当于对每个元素*2然后合在一起返回一个数组
    })
    console.log(array2)     // 12, 14, 16, 18

```

## reduce()
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
    


# 字符串新增方法与模板字符串

## 字符串新增方法

### startswith(string)
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

### endswith(string)
String.endswith(string)
判断String是否以string结尾

```JavaScript
if(url.endsWith('.com')){
    console.log(url)
    }else{
        console.log('不是以.com结尾的url')
    }
```



