# 阅读纪要


## Object、object与{}

ts中可以将对象声明为Object、object与{}类型

```ts

const obj1: Object = {
  toString() {
    return 'obj1'
  }
}

const obj2: object = {
  b: '123'
}

const obj3: {} = {
  toString() {
    return 1
  }
}
```

### object
对于obj2，如若访问b属性，会报错
```ts
console.log(obj2.b)
// Property 'b' does not exist on type 'object'.
```

因为object只表示这是一个非null的对象，而不关注对象的具体属性。

### Object
对于obj1，如若访问toString方法，不会报错
```ts
console.log(obj1.toString())
// obj1
```

但是Object要求声明的类型必须可赋值给Object原型内置的类型
```ts
const obj1: Object = {
  // 这是对的, 因为toString要求返还一个字符串
  toString() {
    return 'obj1'
  }

  // 这是错的
  // toString() {
  //   return 1
  // }
}
```
### {}
{}与Object基本一样，不过{}可以把Object原型内置的方法定义为任何类型，包括number、boolean、symbol等
```ts
const obj3: {} = {
  // 即便toString返回的是一个数字
  toString() {
    return 1
  }
}
```