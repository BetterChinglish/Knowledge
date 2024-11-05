# store
## store最小保存原则
store中的数据用到了接口返回的哪个字段就保存哪个字段

不要保存一个大Object包含许多字段

## store引用名必须与store名保持一致
避免后续找store遗漏，如PersonInfoStore，引用名写为piStore或全名，导致后续查找使用到这个store的地方容易遗漏

## store中尽量不要耦合api

## 必须使用setter更新store中的变量

## store要有初始化方法与reset方法

# js

## 字符串拼接使用join
### 错误的写法
```js
let fullStr = '';
strArr.forEach((subStr, index) => {
  fullStr += subStr;
  if(index !== strArr.length - 1) {
    fullStr += ';'
  }
})
```

### 正确写法
```js
let fullStr = strArr.join(';')
```


## 注意判空与默认值
如下只进行了判空
```js
const res = await queryPersonInfo();
const personInfoArr = res?.data?.map;
if(personInfoArr.length > 0) {
  // ...
}
//...
personInfoArr.push(obj)
```
考虑最后push()方法，如果map返回为null怎么办？

所以在考虑判空的同时，还需要进行数据的一个**保底**默认值
```js
const res = await queryPersonInfo();
const personInfoArr = res?.data?.map || [];
```