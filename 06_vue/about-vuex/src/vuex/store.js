import applyMixin from './mixin';
import { objForEach } from "@/vuex/util";
import ModuleCollection from './module/module-collection';

let Vue;

// 将vuex的东西放到Vue上
const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue)
};

function installModule(store, rootState, path, module) {
  console.log(path)
  module.forEachMutation((mutationName, mutationFn) => {
    console.log(mutationFn, mutationName)
  })
  
  module.forEachAction((actionName, actionFn) => {
    console.log(actionFn, actionName)
  })
  
  module.forEachGetters((getterName, getterFn) => {
    console.log(getterFn, getterName)
  })
  
  module.forEachChild((childName, childModule) => {
    installModule(store, rootState, path.concat(childName), childModule)
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
    














    // let state = options.state;
    // this.getters = {};
    
    // // 构建计算属性配置对象
    // const computed = {};
    
    // // getValue即为store定义的getter方法
    // objForEach(options.getters, (key, getValue) => {
    //   computed[key] = () => {
    //     return getValue(state)
    //   }
    //   // 后续获取store.getters的时候其实就是访问_vm的computed, 这样就实现了getters与computed一样的效果n
    //   Object.defineProperty(this.getters, key, {
    //     get: () => this._vm[key]
    //   })
    // })
    
    // this._vm = new Vue({
    //   data: {
    //     // 以$开头的变量不会代理到vue的实例上,而是在_data上
    //     $$state: state
    //   },
    //   // 计算属性设置
    //   computed,
    // });
    
    // // 用户构建的store配置项的mutations
    // this._mutations = {};
    // objForEach(options.mutations, (key, mutation) => {
    //   this._mutations[key] = (payload) => {
    //     // 注意this让this指针指向Store实例，并传入state和payload（mutation方法默认入参）
    //     mutation.call(this, this.state, payload)
    //   }
    // });
    
    // this._actions = {};
    // objForEach(options.actions, (key, action) => {
    //   this._actions[key] = (payload) => {
    //     // call指向store实例，后面第一个参数是上下文也还是store实例，第二个参数是传入的参数
    //     action.call(this, this, payload)
    //   }
    // });
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
}

export {
  Store,
  install
}