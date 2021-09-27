import { createStore } from 'vuex'

export default createStore({
  state: {
    num:0,
    dnum:0
  },
  mutations: {

    // functionName(state, payload){}
    // 第一个参数为state, 第二个则为payload(载荷), 也就是你要传入的参数(自己想要传入进行计算的参数)
    // 只能提交一个载荷, 所以你的载荷应该是一个对象, 可以把你要传入的参数全部放入一个对象里然后这个对象作为载荷传入

    // 调用mutations里的函数时应该使用提交函数进行调用, 而不能直接调用
    // store.commit('functionName',{
        // 这个对象作为载荷, 你要传入的参数写入这个对象之中
    // })

    // 例
    addN(state, scores){
      state.dnum+=scores.math
    },

    // 另一种提交方式
    // store.commit({
    //   type:'mutationFunctionName',
    //   // 你要传入的参数
    // })

    add(state) {
      state.dnum++;

    },
    sub(state) {
      state.dnum--;
    }

    

    
  },
  getters:{

    // 第一个参数是state, 接受state里的数据
    numpower(state){
      return state.num*state.num
    },

    // 第二个参数是getters, 使用getters里的其他getter
    num3(state, getters) {
      return getters.numpower*state.num
    },

    // 给一个getter返回一个函数, 达到给一个getter传递参数的目的
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
