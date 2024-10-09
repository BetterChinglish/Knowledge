import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'zhangsan',
    age: 18
  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload;
    }
  },
  actions: {

  }
})
