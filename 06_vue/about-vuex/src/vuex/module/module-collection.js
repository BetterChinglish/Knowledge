/* 模板数据结构如下 */
// this.root = {
//   raw: xxx,
//   state: xxx.state,
//   children: {
//     a: {
//       raw: xxx,
//       state: a.state,
//     },
//     b: {
//       raw: xxx,
//       children: {
//         c: {
//           raw: xxx,
//         },
//       },
//     },
//   },
// };

import { objForEach } from '../util';
import Module from './module';

export default class ModuleCollection {
  root = null;
  constructor(options) {
    this.register([], options);
  }

  // 递归注册模块
  register(path, rootModule) {
    let newModule = new Module(rootModule);

    if(path.length === 0) {
      this.root = newModule;
    } else {
      // 此处为递归后走到的位置, 先跳过这个块级看下面的代码, 看到递归后再回来看这个块级
      // 找到用reduce找到父元素
      // slice(0, -1)将path最后一项排除, 也就是走到倒数第二项的时候就找到了当前递归层次的父元素
      // 从this.root开始找每次找到的父元素的_children中的对应的path的子元素即可到达当前递归层次的父元素
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current);
      }, this.root);
      parent.addChild(path[path.length - 1], newModule);
    }

    if(rootModule.modules) {
      objForEach(rootModule.modules, (moduleName, module) => {
        // 这里的每次递归都是对一个module的子module, path相当于深度路径
        // 例如:
        // store = {
        //   state: xxx,
        //   modules: {
        //     a: {
        //       state: xxx,
        //       modules: {
        //         b: {
        //           state: xxx,
        //           modules: {
        //             c: {
        //               state: xxx
        //             }
        //           }
        //         }
        //       }
        //     },
        //     a1: {
        //       // ...
        //     }
        //   }
        // }
        // 则第一次进入的递归是a.modules, path为['a']
        // 然后进入a.modules.b, path为['a', 'b']
        // 最后进入a.modules.b.modules.c, path为['a', 'b', 'c']
        this.register([...path, moduleName], module);
      }) 
    }

  }
  
  getNamespace(path) {
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.getChild(key);
      return namespace + (module._raw.namespaced ? key + '/' : '');
    }, '');
  }
}
