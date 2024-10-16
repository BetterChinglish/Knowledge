import applyMixin from './mixin';
import { objForEach } from "@/vuex/util";
import ModuleCollection from './module/module-collection';

let Vue;

// 将vuex的东西放到Vue上
const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue)
};

/*
* @store: store实例
* @rootState: 当根state
* @path: 子module的深度路径
* @module: 模块
*/
function installModule(store, rootState, path, module) {
  // 命名空间
  const namespace = store._modules.getNamespace(path);
  
  // 子模块，找到父元素，将子模块的状态定义到父模块的state上
  if (path.length > 0) {
    // 将子模块的状态定义到根模块上
    // 找父元素
    const parent = path.slice(0, -1).reduce((state, current) => {
      return state[current];
    }, rootState)
    Vue.set(parent, path[path.length - 1], module.state) // 非响应式数据直接赋值
    /*state = {
      age: xxx,
      aStore: {
        aAge: xxx,
        abStore: xxx
      }
    }*/
  }
  
  module.forEachMutation((mutationName, mutationFn) => {
    // 发布订阅，以数组存储所有mutationFn，后续commit的时候直接遍历数组全部执行
    // 如果已经存储过则用已有的，没的时候创建新的数组存放
    store._mutations[namespace + mutationName] = store._mutations[namespace + mutationName] || [];
    store._mutations[namespace + mutationName].push((payload) => {
      // 注意修改this指针的指向
      // 传入当前mutation所在的模块的state
      mutationFn.call( store, module.state, payload );
    })
  })
  
  module.forEachAction((actionName, actionFn) => {
    store._actions[namespace + actionName] = store._actions[namespace + actionName] || [];
    store._actions[namespace + actionName].push((payload) => {
      actionFn.call( store, store, payload )
    })
  })
  
  // getters重名的会被覆盖
  module.forEachGetters((getterName, getterFn) => {
    store._wrappedGetters[namespace + getterName] = function() {
      return getterFn(module.state)
    }
  })
  
  module.forEachChild((childName, childModule) => {
    installModule(store, rootState, path.concat(childName), childModule)
  })
}

function resetStoreVm(store, state) {
  const wrappedGetters = store._wrappedGetters;
  const computed = {};
  store.getters = {};
  
  objForEach(wrappedGetters, (getterName, getterFn) => {
    // 创建computed变量，将getters全部放入，然后将computed变量作为Vue参数创建一个vue实例
    // 这样getters全部转化为了computed
    computed[getterName] = function () {
      return getterFn()
    }
    
    // 同时，后续调用$store.getters.xxx时,需要返回vue实例的computed
    // 那么可以用definedProperty来实现
    Object.defineProperty(store.getters, getterName, {
      get: () => store._vm[getterName]
    })
  })
  
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}

// Vuex的东西如何进行的初始化以及提供的功能
class Store{
  _modules = null;
  
  constructor(options) {
    // 存放所有模块中的mutations
    this._mutations = {};
    
    // 存放所有模块中的action
    this._actions = {};
    
    // 存放所有模块中的getters
    this._wrappedGetters = {};
    
    // 格式化用户传入的参数
    this._modules = new ModuleCollection(options);
    
    let state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    
    // 将状态放到vue的实例中
    resetStoreVm(this, state)
    
    /*输出测试*/
    console.log('install-----');
    console.log(state);
    console.log(this._wrappedGetters);
    console.log(this._mutations);
    console.log(this._actions);
    console.log('installed-----');
    
    
  }
  // 用户调用commit时传入需要调用mutations对应的方法，type确定是哪个方法，payload是传入的参数
  commit = (type, payload) => {
    this._mutations[type].forEach(mutationFn => {
      mutationFn(payload);
    })
  }
  dispatch = (type, payload) => {
    this._actions[type].forEach(action => {
      action(payload);
    })
  }
  get state() {
    // resetStoreVm中设置的_vm, 其实是一个Vue实例, 通过_data获取到state
    return this._vm._data.$$state;
  }
}

/* 无modules的简单原理描述写法如下 */
// Vuex的东西如何进行的初始化以及提供的功能
/*class Store{
  constructor(options) {
    let state = options.state;
    this.getters = {};

    // 构建计算属性配置对象
    const computed = {};

    // getValue即为store定义的getter方法
    objForEach(options.getters, (key, getValue) => {
      computed[key] = () => {
        return getValue(state)
      }
      // 后续获取store.getters的时候其实就是访问_vm的computed, 这样就实现了getters与computed一样的效果n
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })

    this._vm = new Vue({
      data: {
        // 以$开头的变量不会代理到vue的实例上,而是在_data上
        $$state: state
      },
      // 计算属性设置
      computed,
    });

    // 用户构建的store配置项的mutations
    this._mutations = {};
    objForEach(options.mutations, (key, mutation) => {
      this._mutations[key] = (payload) => {
        // 注意this让this指针指向Store实例，并传入state和payload（mutation方法默认入参）
        mutation.call(this, this.state, payload)
      }
    });

    this._actions = {};
    objForEach(options.actions, (key, action) => {
      this._actions[key] = (payload) => {
        // call指向store实例，后面第一个参数是上下文也还是store实例，第二个参数是传入的参数
        action.call(this, this, payload)
      }
    });
  }

  // 用户调用commit时传入需要调用mutations对应的方法，type确定是哪个方法，payload是传入的参数
  commit = (type, payload) => {
    this._mutations[type](payload)
  }

  dispatch = (type, payload) => {
    this._actions[type](payload)
  }

  get state() {
    return this._vm._data.$$state;
  }
}*/

export {
  Store,
  install
}