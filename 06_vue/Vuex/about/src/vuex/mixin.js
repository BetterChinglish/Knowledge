
const applyMixin = (Vue) => {
  // 在beforeCreate的时候进行一个混入
  Vue.mixin({
    beforeCreate: vuexInit,
  });
}

// 让每个vnode实例上都挂载$store
function vuexInit() {
  // 这里的this是Vue
  const options = this.$options;
  if (options.store) {  // new Vue（{store}）的时候会将store放入$options里, 如果$options里有store说明是根实例
    // 根实例将store向外层暴露,而不是放在$options
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) { // 如根实例已经触发了在外层添加了$store则这里可以校验出来,说明是子实例
    // 子组件
    this.$store = options.parent.$store;
  }
}

export default applyMixin;