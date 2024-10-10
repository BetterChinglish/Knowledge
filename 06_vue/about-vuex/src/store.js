import Vue from 'vue'
import Vuex from 'vuex'

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
    changeAgeAsync({ commit }, payload) {
      setTimeout(() => {
        commit('changeAge', payload)
      }, 3000)
    }
  },

  /**
   * 1 默认模块没有作用域问题
   * 2 状态不要和模块名字相同，相同模块会覆盖掉state导致无法取值
   * 3 getter默认会合并到根的getter中, 可以直接$store.getters.getterName取值
   * 4 增加namespace会从当前层级开始添加作用域,
   *  即如果父模块fModule没有namespace但是子模块sModule有namespace,
   *  那么sModule的mutations的访问应该是/sModule/mutationName
   *  而不是/fModule/sModule/mutationName
   * 
   * 5 根module相当于一个默认的命名空间, 后续的子module都会合并在根module下
   *  除非后续的子module设置了namespace, 则子module的module会合并到子module下
   *  以此类推
  */
  modules: {
    aStore: {
      state: {
        nameA: 'a store name',
        ageA: 20
      },
      mutations: {
        changeAge(state,payload) {
          state.ageA += payload;
          console.log('a changeAge');
          
        }
      }
    },
    bStore: {
      state: {
        nameB: 'b store',
        ageB: 20,
        baStore: 'hello'
      },
      // store.js:6 [vuex] state field "baStore" was overridden by a module with the same name at "bStore.baStore"
      // modules: {
      //   baStore: {
      //     state: {
      //     }
      //   }
      // }
    }
  }
})
