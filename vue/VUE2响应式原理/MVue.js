const compileUtil = {
    /* 
        @param node 当前节点
        @param expr 表达式
        @param vm 当前实例
        @param eventName 事件名称
    */
    text(node, expr, vm) {
        const value = this.getVal(expr, vm);
        this.updater.textUpdater(node, value);
    },

    html(node, expr, vm) {
        const value = this.getVal(expr, vm);
        // 首次compile时，会将v-html转换，此时创建watcher
        new Watcher(vm, expr, (newVal) => {
            this.updater.htmlUpdater(node, newVal);
        })
        this.updater.htmlUpdater(node, value);
    },

    model(node, expr, vm) {
        const value = this.getVal(expr, vm);
        new Watcher(vm, expr, newVal => {
            this.updater.modelUpdater(node, newVal);
        })
        this.updater.modelUpdater(node, value);
    },
    on(node, expr, vm, eventName) {
        const fn = vm.$options.methods && vm.$options.methods[expr.trim()];
        fn && node.addEventListener(eventName, fn.bind(vm), false);
    },

    // 针对v-text="person.a.b"中的person.a.b这种形式的访问进行数据的处理
    getVal(expr, vm) {
        return expr.split('.').reduce((data, currentKey) => {
            return data[currentKey];
        }, vm.$data);
    },

    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        htmlUpdater(node, value) {
            node.innerHTML = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        }
    },
    // 多个 {{}} 如 <div>{{msg1}} --- {{msg2}}</div>, 需要整个都重新进行渲染
    getContentVal(expr, vm) {
        const newVal = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(args[1], vm)
        })
        return newVal;
    }

}

class Compile{
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        // 1 进行大量dom操作需要将其放入文档碎片中，文档碎片会保存在内存中，不会引起页面的回流和重绘
        const fragment = this.node2Fragment(this.el);

        // 2 编译模板
        this.compile(fragment);

        // 3 最后再将文档碎片中的节点进行编译
        this.el.appendChild(fragment);
        
    }

    compile(fragment) {
        // 获取每个子节点
        const kids = fragment.childNodes;
        [...kids].forEach(kid => {
            if(this.isElementNode(kid)) {
                // 是元素节点
                this.compileElement(kid);
            } 
            else {
                // 是文本节点
                this.compileText(kid);
            }

            if(kid.childNodes && kid.childNodes.length > 0) {
                this.compile(kid);
            }
        })
    }

    compileElement(elementNode) {
        // <div v-text="msg"></div>
        const attrs = elementNode.attributes;
        [...attrs].forEach(attr => {
            // v-text msg
            const {name, value} = attr;
            // 判断是否为vue自定义指令
            if(this.isDirective(name)) {
                // 两种 v-text v-on:click -> text on:click
                const [, directive] = name.split('-');
                // text on:click -> [text] [on, click]
                const [dirName, eventName] = directive.split(':');
                // 更新数据
                compileUtil[dirName](elementNode, value, this.vm, eventName);
                // 删除指令
                elementNode.removeAttribute('v-' + directive);
            } else if(name.includes('@')) {
                // @click="handleClick"
                console.log();
                const [, eventName] = name.split('@');
                compileUtil['on'](elementNode, value, this.vm, eventName);
            }
            
        })
    }

    compileText(textNode) {
        const content = textNode.textContent;
        const testExp = /\{\{(.+?)\}\}/g;
        // 判断是否包含{{}}
        if(testExp.test(content)) {
            content.replace(testExp, (...args) => {
                console.log(args);
                const expr = args[1].trim();
                const notNeedGetValue = expr.length === 0
                const value =  notNeedGetValue? "" : compileUtil.getVal(expr, this.vm);
                notNeedGetValue ? null : new Watcher(this.vm, expr, newVal => {
                    // data发生改变则对应watcher的node整行都需要重新修改, 多个 {{}} 如 <div>{{msg1}} --- {{msg2}}</div>, 需要整个都重新进行渲染
                    const newData = compileUtil.getContentVal(content, this.vm)
                    compileUtil.updater.textUpdater(textNode, newData);
                })
                compileUtil.updater.textUpdater(textNode, value);
            })
        }
    }

    isDirective(attrName) {
        return attrName.startsWith('v-');
    }

    node2Fragment(el) {
        // 创建文档碎片
        const fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }

    isElementNode(e) {
        return e.nodeType === 1;
    }
}


class MVue{
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;

        if(!this.$el) {
            return;
        }

        // 实现数据观察者
        new Observer(this.$data)

        // 实现指令解析器
        new Compile(this.$el, this);

    }
}