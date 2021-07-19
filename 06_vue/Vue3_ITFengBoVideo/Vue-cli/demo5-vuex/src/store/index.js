import { createStore } from 'vuex'

export default createStore({
  state: {
    num:0,
    dnum:0
  },
  mutations: {
    add(state) {
      state.dnum++;

    },
    sub(state) {
      state.dnum--;
    }
  },
  getters:{
    numpower(state){
      return state.num*state.num
    },
    num3(state, getters) {
      return getters.numpower*state.num
    },
    inputNumber2() {
      return function(n){
        return n*n;
      }
    }


  },
  actions: {

    demo({commit,state}){
      setTimeout(()=>{
        state.num=100;
      },3000)
    }


  },
  modules: {
  }
})
