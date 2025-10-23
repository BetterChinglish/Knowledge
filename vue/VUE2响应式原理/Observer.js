class Watcher{
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;

        // 先把旧的值保存起来
        this.oldVal = this.getOldVal();
    }

    getOldVal() {
        // 先将实例化的watcher放到Dep的target中（compile之前已经进行了$data的observe）
        Dep.target = this;
        // 然后使用getVal访问值时，会触发Observer的get方法，在get方法中拿到当前实例化watcher并加入对应的dep实例中
        const oldVal = compileUtil.getVal(this.expr, this.vm)   // 这里会访问$data对应的expr，其实就相当于这里触发了他的get方法
        Dep.target = null;  // 注意访问完后置空
        return oldVal;
    }

    update() {
        const newVal = compileUtil.getVal(this.expr, this.vm)
        if(newVal !== this.oldVal) {
            this.cb(newVal);
        }
    }
}


class Dep{
    constructor() {
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        console.log('观察者', this.subs);
        // 收集到的watcher就是所有使用了data的地方, 触发所有watcher的update
        this.subs.forEach(w => {
            w.update();
        })
    }
}

class Observer{
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        // 只对对象操作，将对象的属性劫持
        if(data && typeof data === 'object') {
            // console.log('observe', data);
            
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
            })
        }
    }

    defineReactive(obj, key, value) {
        this.observe(value);
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                // 访问$data中的数据时, 收集对应的watcher
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set: (newVal) => {
                // 直接修改vm.$data.XX = {}赋值新对象，加上此行对新对象进行一个监控
                this.observe(newVal);
                
                if(newVal !== value) {
                    value = newVal;
                }

                // 通知变化
                dep.notify();
            }
        })
    }
}