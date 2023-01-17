// 没有全局变量window
// console.log(window);    // window is not defined

// 全局的this指向其实就是当前js文件模块
console.log(this === exports);  // true

// 但是node有全局对象global
console.log(global);    // object