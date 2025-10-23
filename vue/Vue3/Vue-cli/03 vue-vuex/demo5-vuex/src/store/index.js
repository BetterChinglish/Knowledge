import { createStore } from 'vuex'

export default createStore({
  state: {
    num:0,
    dnum:0
  },


  // mutation必须是同步函数
  mutations: {

    // functionName(state, payload){}
    // 第一个参数为state, 第二个则为payload(载荷), 也就是你要传入的参数(自己想要传入进行计算的参数)
    // 只能提交一个载荷, 所以你的载荷应该是一个对象, 可以把你要传入的参数全部放入一个对象里然后这个对象作为载荷传入

    // 调用mutations里的函数时应该使用提交函数进行调用, 而不能直接调用
    // store.commit('functionName',{
        // 这个对象作为载荷, 你要传入的参数写入这个对象之中
    // })

    // 例
    addN(state, mathScores){
      state.dnum=state.dnum + mathScores;
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


    // 使用常量代替mutation事件类型
    // mutation-type.js:
    // export const mutationFunction = 'mutationFunctionName'    
    // 此文件引入mutation-type.js中的mutationFunction
    // [mutationFunction](state){}
    // 也就是把名字全部提出来单独形成一个文件, 便于多人协作或者其他插件对文件的扫描


    // 提交mutation: 看About.vue
    
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

    // action类似于mutation
    // 但是
    // action是提交mutation, 而不是直接变更状态
    // action可以使用异步操作

    // 结构如下:
    // functionName(context){}
    // context是与store具有相同方法和属性的context对象
    // 例如可以使用context.commit()

    // 但是如上使用太麻烦, 因为每次使用都要使用context对象来访问其中的方法与属性
    // 可以使用解构赋值, 如下:
    // functionName({commit, state....}){
    //  // commit('...')
    //  // state.property...
    // }

    // 异步操作
    demo({commit,state}){
      setTimeout(()=>{
        state.num=100;
      },3000)
    }

    // 分发action使用store.dispatch('functionName', payload), 支持载荷发送或者对象发送
    // 也可以在methods中使用mapActions进行映射, 和之前的类似

  },
  modules: {
  }
})
