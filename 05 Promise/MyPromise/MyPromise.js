class PromiseStatus {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
}



class MyPromise {

    status = PromiseStatus.PENDING;

    value = null;
    reason = null;

    successCallbackFns = [];
    failedCallbackFns = [];


    constructor(exec) {
        try {
            exec(this.resolve, this.reject);
        } catch(e) {
            this.reject(e);
        }
    }

    resolve = val => {
        if(this.status === PromiseStatus.PENDING) {
            return;
        }

        this.status = PromiseStatus.FULFILLED
        this.value = val;
        
        while(this.successCallbackFns.length) {
            this.successCallbackFns.shift()(this.value);
        }
    }

    reject = err =>  {
        if(this.status === PromiseStatus.PENDING) {
            return;
        }

        this.status = PromiseStatus.REJECTED
        this.reason = err;
        
        while(this.failedCallbackFns.length) {
            this.failedCallbackFns.shift()(this.reason);
        }
    }

    then(onSuccess, onFail) {
        onSuccess = typeof onSuccess === 'function' ? onSuccess : (val) => this.value;
        onFail = typeof onSuccess === 'function' ? onFail : (val) => {
            throw(this.reason)
        };

        let promise2 = new MyPromise((resolve, reject) => {
            // not pending
            if(this.status !== PromiseStatus.PENDING) {
                setTimeout(() => {
                    const result = this.status === PromiseStatus.FULFILLED ? onSuccess(this.value) : onFail(this.reason);
                    resolvePromise(promise2, result, resolve, reject);
                }, 0);
            }

            // pending-push event to callback list
            




        })



    }


}


function resolvePromise(promise2, result, resolve, reject) {
    if(promise2 === result) {
        reject(new TypeError('循环了'));
    }

    if(result instanceof MyPromise) {
        result.then(resolve, reject);
    } else {
        resolve(result); 
    }

}
