
import applyMixin from './mixin';
import { objForEach } from "@/vuex/util";


let Vue;

// 将vuex的东西放到Vue上
const install = (_Vue) => {
  Vue = _Vue;
  applyMixin(Vue)
};

// Vuex的东西如何进行的初始化以及提供的功能
class Store{
  constructor(options) {
    // console.log(options);
    let state = options.state;
    this._vm = new Vue({
      data: {
        // 以$开头的变量不会代理到vue的实例上,而是在_data上
        $$state: options.state
      }
    });   
    // console.log(this._vm);
    
    
  }
  
  get state() {
    return this._vm._data.$$state;
  }
}

export {
  Store,
  install
}