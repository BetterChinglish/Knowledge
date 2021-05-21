// import {name, add} from './1.js';   
// // 注意这里使用了解构赋值,相当于:
// // let {name, add} = {name:name, add:add} (这个对象来自./1.js文件的export)

// // 接下来我们便可以直接使用name与add
// console.log(name);  // zhangsan
// console.log(add(3, 9)); // 12


// import {name1} from './1.js'
// import {name2} from './2.js'
// console.log(name1, name2)

import add from './1.js'
import mul from './1.js'

console.log(add(10,20), mul(10,20))