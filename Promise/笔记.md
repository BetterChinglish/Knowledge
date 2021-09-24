## promise的好处
1. 链式结构, 解决回调地狱
2. 方便阅读


## promise的基本操作

```JavaScript
// 随机函数
function rand(m, n) {
    return Math.ceil(Math.random()*(n-m+1) + m-1);
}

// 使用new创建Promise
const p = new Promise((resolve, reject) => {    // Promise接收一个函数类型的参数值, 这个函数还有俩形参, 第一个为异步任务成功时调用, 第二个为失败时调用(这里resolve和reject名字任意取, 只与位置有关)

    // 异步操作
    let n = rand(1,100);
    if(n<30){
        resolve(n);  // 使用后可以将Promise的状态设为成功(即p的状态), 同时可以传一个成功的结果传给resolve
    }else{
        reject(n);   // 使用后可以将Promise的状态设为失败(即p的状态), 同时可以传一个失败的原因传给reject

        // 这里都是传入n
    }            
})

// then接收两个参数, 
// 如果p为成功状态则调用第一个函数(即异步成功时调用的函数),
// 如果p为失败状态则调用第二个函数(即异步失败时调用的函数)
// 这两个函数都有一个形参, 即为前面resolve与reject传进来的值(value名字任取)
p.then((value)=>{
    console.log('中奖了! 您的号码为 ' + value)
},(value)=>{
    console.log('差一点就中奖了!!! 您的号码为 ' + value)
})
```

## fs读取文件
```JavaScript

const fs = require('fs')

// 回调函数形式
// fs.readFile('url/txt', (err, data)=>{
//     if(err) throw err;
//     console.log(data.toString())
// })

// Promise形式
let p = new Promise((resolve, reject)=>{
    fs.readFile('url',(err, data)=>{
        if(err) {
            reject(err)
        }
        else {
        resolve(data);

        }
    })
})

p.then(value=>{
    console.log(value.toString())
}, reason=>{
    console.log(reason.toString())
})

```

## ajax
```javascript






```


## util.promisify()
```javascript

const util = require('util')
const fs = require('fs')

let myReadFile = util.promisify(fs.readFile)

myReadFile('./book.txt').then(value=>{
    console.log(value.toString())
}, reaason=>{
    console.log(reason)
})

```

## 封装ajax请求

## Promise的状态改变

前面提到resolve()和reject()可以改变promise的状态
这状态其实是promise实例对象中的一个属性(PromiseState)
pending 默认值
resolved / fulfilled   成功
rejected    失败

PromiseState只能改变一次,只能由pending变为resolved或由pending变为rejected

## promise对象结果值属性介绍
1. PromiseResult
保存的是对象成功/失败的结果
resolve() 或 reject() 可以改变这个值, 即resolve(n)的这个n


## promise流程

new Promise()
    1. 成功:resolve
        promise对象(resolved状态)
            then()回调onResolved()
                新promise对象

    2. 失败:reject
        promise对象(rejected状态)
            then()回调onRejected()
                新promise对象

## API

1. Promise构造函数: Promise(excutor){}
excutor会立刻执行而不会进入队列等待执行, 即同步调用

2. Promise.prototype.then方法:(onResolved, onRejected)=>{}
指定用于得到value的成功回调和用于得到失败reason的失败回调
返回一个新的promise对象


3. Promise.prototype.catch方法:(onRejected)=>{}
只能用于失败的回调
    
```JavaScript
let p = new Promise((resolve, reject)=>{
    reject('something error')
});

p.catch(reason=>{
    console.log(reason)
})

```

catch是then(null, ()=>{})的简写

4. Promise.resolve:(value)=>{}
```JavaScript
let p = Promise.resolve(something)
// 如果传入的参数something为非promise类型的对象, 则返回的结果为成功的promise对象, 即p为resolved或fulfilled, 其PromiseResult为something
// 如果传入的参数something为promise类型的对象, 则p的PromiseState和传入的promise对象something的PromiseState的相同, PromiseResult也相同
```

5. Promise.reject()

返回一个Promise对象, 结果为rejected, 无论传入的是Promise对象还是普通数据

```JavaScript
let p1 = Promise.reject('p1 is rejected')

let p = new Promise((resolve, reject) => {
    resolve('p is success')
})
let p2 = Promise.reject(p)  

console.log(p1)     // rejected 'p1 is rejected'
console.log(p2)     // rejected Promise(p)
```


6. Promise.all()

接收一个由Promise对象组成的数组, 返回结果为这些Promise对象的结果的 与运算, 即全为resolve则返回结果为resolved, 否则为rejected 
如果返回结果为resolved/fulfilled则返回的PromiseResult也为一个数组, 是这些Promise对象的PromiseResult拼接而成
如果返回结果为rejected, 则返回数组中错误的那个Promise对象的PromiseResult
```javascript
let p1 = Promise.resolve('ok p1')
let p2 = Promise.resolve('ok p2')
let p3 = Promise.resolve('ok p3')
let p4 = Promise.reject('false p4')

let result1 = Promise.all([p1, p2, p3])
let result2 = Promise.all([p1, p2, p4])

console.log(result1)    // resolved Array(3)['ok p1', 'ok p2', 'okp3']
console.log(result2)    // rejected false p4

```

7. Promise.race()
传入一个由Promise对象组成的数组, 返回第一个改变状态的Promise对象的PromiseState与PromiseResult

```javascript
let p1 = Promise.resolve('ok p1')
let p2 = Promise.resolve('ok p2')
let p3 = Promise.resolve('ok p3')  

let p4 = new Promise((resolve, reject)=>{
    setTimeout(() => {
        resolve()
    }, 1000);
})

let result1 = Promise.race([p1, p2, p3])
console.log(result1)     // resolved 'ok p1'

let result2 = Promise.race([p4, p1, p2, p3])
console.log(result2)    // resolvedd 'ok p1'

```


## 改变Promise对象的状态的方式
1. resolved()

2. rejected()

3. 抛出错误

```javascript
let p = new Promise((resolve, reject) => {
    throw 'something wrong'
})

console.log(p)  // rejected 'something wrong'

```

## 某个Promise有多个then时, 是否都执行

当Promise的状态改变为resolve时, 对应resolve的都会执行, reject同

```javascript
        let p1 = new Promise((resolve, reject) => {

        })
        // 下面俩都不执行
        p1.then(value => {
            console.log(value + '1')
        })
        p1.then(value => {
            console.log(value + '2')
        })


        let p2 = new Promise((resolve, reject) => {
            resolve()
        })
        // 下面俩都执行
        p2.then(value => {
            console.log(value + '1')
        })
        p2.then(value => {
            console.log(value + '2')
        })

        let p3 = new Promise((resolve, reject) => {
            resolve()
        })
        // 执行
        p3.then(value => {
            console.log(value + '1')
        })
        // 不执行
        p3.then(null, value => {
            console.log(value + '2')
        })
```



## 改变Promise的状态与指定回调函数谁先谁后

即 resolve/reject先还是then先执行

两种情况都也可能发生

1. resolve()/reject()先, then()后
```JavaScript
let p = new Promise((resolve, reject) => {
    // 当这里是同步任务的时候, resolve()/reject()先执行, 然后再执行回调函数
    resolve();

})

p.then(value=>{},reason=>{})

```


2. then()先执行, 然后再执行resolve()/reject()改变状态

```JavaScript

let p = new Promise((resolve, reject) => {
    // 当这里为异步任务时，先执行then()编译完后再调用resolve()/reject()改变状态

    setTimeout(function(){
        resolve();
    },3000)
})

p.then(value=>{}, reason=>{})


```

3. 说明

以上两种只是有这两种情况， 其实还是看谁先执行， 谁先执行就谁在前， 可能resolve()由于异步操作后执行， 但then()也可能在一个setTimeout之中，比异步的resolve()还要晚执行，这时候仍然是resolve()/reject()先执行, 然后再执行then()

## then方法的返回结果
then方法返回一个Promise对象，其结果受里面的两个函数影响

1. 抛出错误
```javascript

let p = new Promise((resolve, reject)=>{
    resolve('ok')
})

let result = p.then(value=>{
    throw 'something error'

},reason=>{
    console.log(reason)
})

console.log(result)     // PromiseState：rejected， PromiseResult：something error（即抛出的错误）

```

2. 返回结果为非Promise对象
```javascript

let p = new Promise((resolve, reject)=>{
    resolve('ok')
})

let result = p.then(value=>{
    return 'something'
},reason=>{
    console.log(reason)
})

console.log(result)     // PromiseState: fulfilled, PromiseResult: something(即返回结果)

```

3. 返回Promise对象
```javascript

let p = new Promise((resolve, reject)=>{
    resolve('ok')
})

let result = p.then(value=>{

    return new Promise((resolve, reject) => {
        resolve('something')
    })

},reason=>{
    console.log(reason)
})

console.log(result)     // PromiseState：fulfilled， PromiseResult：something
// 状态与返回Promise对象状态相同， PromiseResult与返回Promise对象的PromiseResult也相同

```

4. 啥都没有
```javascript

        let p = new Promise((resolve, reject) => {

            resolve('ok')
        })

        let result = p.then(value=>{
            console.log(value)
        }, reason=>{})

        console.log(result)     // PromiseState:fulfilled, PromiseResult:undefined


```

5. 注意
then方法返回的是一个新的Promise对象
```javascript

        let p = new Promise((resolve, reject) => {

            resolve('ok')
        })

        let result = p.then(value=>{
            console.log(value)
        }, reason=>{})

        console.log(result)     // PromiseState:fulfilled, PromiseResult:undefined
        console.log(p)          // PromiseState:fulfilled, PromiseResult:ok

        // 俩个Promise是不相同的

```
## 串联多个任务

```JavaScript
        let p = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve('ok');
            },2000)
        });

        p.then(value=>{
            return new Promise((resolve, reject)=>{
                resolve('right');
            });
        }).then(value=>{
            console.log(value)
        })

```

## 异常穿透

```javascript

        let p = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve('ok');
            },2000)
        });

        p.then(value=>{
            console.log(111)
        }).then(value=>{
            console.log(222)
        }).then(value=>{
            console.log(333)
        }).catch(reason=>{
            console.log(reason)
        })
        // 上面如若有错，则会调用最后的catch


```


## 中断Promise链

出现如上一个异常穿透的.then.then这种链时，有时想在其中某一个如果达成了某种条件或正常执行完毕时不想继续执行下面的链，这时需要终端这个Promise链

```JavaScript

 let p = new Promise((resolve, reject) => {
            setTimeout(()=>{
                resolve('ok');
            },2000)
        });

        p.then(value=>{
            console.log(111)

            // 如在此中断
            return new Promise(()=>{})
            // 实际上就是返回了一个状态为pending的Promise对象
            // 如果为pending，也就是状态没有发生改变，那么就不会执行then()或catch()等，是中断Promise链的唯一方法

        }).then(value=>{
            console.log(222)
        }).then(value=>{
            console.log(333)
        }).catch(reason=>{
            console.log(reason)
        })


```

# Promise 配合 Ajax 使用

一般Promise中使用Ajax进行请求
let p = new Promise((resolve, reject)=>{
    
    // 使用ajax进行请求

})