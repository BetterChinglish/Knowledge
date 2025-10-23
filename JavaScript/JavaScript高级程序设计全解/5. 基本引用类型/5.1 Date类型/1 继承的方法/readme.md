
Date类型重写了 toLocaleString(), toString() 和 valueOf()方法

## toLocaleString()与toString()
toLocaleString():
    返回与浏览器运行的本地环境一直的日期和时间

toString():
    返回带失去信息的日期和时间, 24h制

```JavaScript
let date1 = new Date(2001, 1, 14);      // 调用Date.UTC(), 1 其实代表的是二月
console.log(date1.toLocaleString());    // 2001/2/14 上午12:00:00
console.log(date1.toString());          // Wed Feb 14 2001 00:00:00 GMT+0800 (中国标准时间)

```


较老的浏览器上这两个方法返回的结果可能与现在的浏览器显示的结果不同

所以toLocaleString()与toString()最好不要用于显示

---

## valueOf()

并非返回实际值也就是日期的字符串, 而是返回日期的毫秒表示

大于号与小于号可以直接使用该值

所以可以直接判断日期的先后

```JavaScript
let date1 = new Date(2001, 2, 14);
let date2 = new Date(2002, 12, 27);

console.log(date1 > date2); // false
console.log(date1 < date2); // true
```