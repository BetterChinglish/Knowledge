const promiseState = {
    pending: 'pending',
    rejected: 'rejected',
    resolved: 'resolved'
}

// 处理当前promise的所有回调
function flushHandlers(curPromise) {
    if(curPromise._state === promiseState.pending) {
        return;
    }

    const settleHandlers = curPromise._settledHandlers
    
    queueMicrotask(() => {
        while(settleHandlers.length) {
            const handler = settleHandlers.shift();
            const { onFulfilled, onRejected, pm: nextPromise } = handler;
            // 当前promise完成,但是传入的完成回调不是函数, 则下一个promise使用当前promise状态, reject同理
            if(!isFunction(onFulfilled) && nextPromise._state === promiseState.resolved) {
                resolvePromise(nextPromise, curPromise._data);
                return;
            }
            if(!isFunction(onRejected) && nextPromise._state === promiseState.rejected) {
                rejectPromise(nextPromise, curPromise._reason);
                return;
            }
            
            let result;
            
            // onFulfilled与onRejected执行期间出错则返回的promise也错误
            try {
                result = curPromise._state === promiseState.resolved ? onFulfilled(curPromise._data) :
                  onRejected(curPromise._reason);
                
                
            } catch(error) {
                rejectPromise(nextPromise, error);
                continue;
            }
            
            // 否则返回的promise成功, 内容为onFulfilled的执行结果
            resolvePromise(nextPromise, result);
            
        }
    })

}

function rejectPromise(pm, reason) {
    if(pm._state !== promiseState.pending) return;
    pm._state = promiseState.rejected;
    pm._reason = reason;
    flushHandlers(pm);
}

function isObject(x) {
    return typeof x === 'object' && x !== null;
}

function isFunction(x) {
    return typeof x === 'function';
}

function isThenable(x) {
    return (isObject(x) || isFunction(x)) && isFunction(x.then);
}

function resolvePromise(pm, x) {
    if(pm._state !== promiseState.pending) return;
    
    // resolve的x是一个promise对象
    if(isThenable(x)) {
        // 如果x是当前这个promise自身,则抛出错误
        if(x === pm) {
            rejectPromise(pm, new TypeError(`Chaining cycle detected for promise #<MyPromise>`));
            return;
        }
        
        // 如果x是另外一个promise对象, 则需要吸收
        /**
         * If x is a promise, adopt its state:
         * If x is pending, promise must remain pending until x is fulfilled or rejected.
         *  If/when x is fulfilled, fulfill promise with the same value.
         *  If/when x is rejected, reject promise with the same reason.
         * */
        
        // es6的promise将这段操作放入了一个微队列里去完成, promise/A+规范没有要求
        queueMicrotask(() => {
            x.then(data => {
                resolvePromise(pm, data);
            }, err => {
                rejectPromise(pm, err);
            })
        })
    
    } else {
        pm._state = promiseState.resolved;
        pm._data = x;
        flushHandlers(pm);
    }

}

class MyPromise {
    // promise状态
    _state =  promiseState.pending
    
    // 完成状态下的数据
    _data = undefined;
    
    // 失败状态下的原因
    _reason = undefined;
    
    // 已决后要进行的处理
    _settledHandlers = [];
    
    
    constructor(executor) {
        const resolve = (data) => {
            resolvePromise(this, data);
        }
        
        const reject = (error) => {
            rejectPromise(this, error);
        }
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    
    then(onFulfilled, onRejected) {
        const pm = new MyPromise(() => {});
        this._settledHandlers.push({
            onFulfilled,
            onRejected,
            pm
        });
        
        flushHandlers(this);
        return pm;
    }
    
    finally(onFinally) {
        return this.then(
          value => MyPromise.resolve(onFinally()).then(() => value),
          reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
        )
    }
    
    static resolve(data) {
        if(data instanceof MyPromise) {
            return data;
        }
        return new MyPromise((resolve) => {
            resolve(data);
        })
    }
    
    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        })
    }
    
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const results = [];
            let times = 0;
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then((value) => {
                    results[index] = value;
                    times++;
                    if(times === promises.length) {
                        resolve(results);
                    }
                }, reject)
            
            })
        })
    }
    
    
    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    
    race() {
    
    }
}
