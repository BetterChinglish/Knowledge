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


    


    







