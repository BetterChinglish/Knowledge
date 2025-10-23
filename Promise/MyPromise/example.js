
// 4. 定义状态常量（成功fulfilled 失败rejected 等待pending），初始化为pending。
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
 
// 1 创建MyPromise类 
class MyPromise {
  // 2 通过构造函数constructor，在执行这个类的时候需要传递一个执行器进去并立即调用
  constructor(executor) {
    // 13 Promise实现捕获错误
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  status = PENDING
  //  6. MyPromise类中定义value和reason，用来储存执行器执行成功和失败的返回值
  value = null
  reason = null
  // 9. 实现then方法多次调用添加多个处理函数 初始化回调为数组依次执行
  successCallback = []
  failCallback = []
  // 3. 定义resolve和reject（定义为箭头函数：避免直接调用时this指向全局window问题）
  resolve = value => {
    // 5. 完成resolve函数的状态改变（注意：需判断当前状态是否可以改变）
    // 判断当前状态是否可改变
    if(this.status !== PENDING) return
    // 改变当前状态
    this.status = FULFILLED
    // 保存返回值
    this.value = value
    // 执行成功回调
    while(this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }
  reject = reason => {
    // 5. 完成reject函数的状态改变（注意：需判断当前状态是否可以改变）
    // 判断当前状态是否可改变
    if(this.status !== PENDING) return
    // 改变当前状态
    this.status = REJECTED
    // 保存返回值
    this.reason = reason
    // 执行失败回调
    while(this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }
  // 7. MyPromise类中添加then方法，成功回调有一个参数 表示成功之后的值；失败回调有一个参数 表示失败后的原因
  then(successCallback, failCallback) {
    // 14 将then方法的参数变为可选参数
    successCallback = successCallback ? successCallback : value => this.value
    failCallback = failCallback ? failCallback : reason => {throw this.reason}
    // 10. 实现then方法链式调用（写一个函数方法专门判断回调的结果是普通值还是promise，then方法返回的仍然是一个promise）
    let promise2 = new MyPromise((resolve, reject) => {
        // 判断当前状态 执行对应回调 异步情况下存储当前回调等待执行
        if(this.status === FULFILLED) {
           // 异步
           setTimeout(() => {
            // 13 then方法捕获错误
            try {
              // 异步获取到promise2
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        } else if(this.status === REJECTED) {
          // 异步
          setTimeout(() => {
            // 13 then方法捕获错误
            try {
              // 异步获取到promise2
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        } else {
          // 8. 处理异步逻辑（pending状态下在then中将回调存起来）
          this.successCallback.push(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
          this.failCallback.push(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        }
    })
    return promise2
  }
  // 17. finally方法 不管成功失败都会执行一次
  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.reject(callback()).then(() => { throw reason })
    })
  }
  // 18. catch
  catch(failCallback) {
    return this.then(undefined, failCallback)
  }
  // 15. Promise.all
  static all (array) {
    let result = []
    let index
    return new Promise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if(index === array.length) {
          resolve(result)
        }
      }
      for(let i = 0; i < array.length; i++) {
        let current = array[i]
        if(current instanceof MyPromise) {
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          addData(i, array[i])
        }
      }
    })
  }
  // 16. Promise.resolve 返回一个promise
  static resolve(value) {
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}
 
// 处理promise返回值各种类型情况（普通值，promise）
function resolvePromise(promise2, x, resolve, reject) {
    // then方法没传入成功或失败回调时则用默认的，返回this.value || this.reason；
    // then方法有传入成功或失败回调时则执行回调获取返回值，返回值如果是promise则继续执行then方法，不是promise则作为value传给新的promise2
    if(promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}
