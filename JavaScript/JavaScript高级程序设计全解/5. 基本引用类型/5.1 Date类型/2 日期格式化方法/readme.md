# toDateString()
周几, 月, 日, 年

(格式特定于实现)

# toTimeString()

时 分 秒 时区

(格式特定于实现)

# toLocaleDateString()
周几 月 日 年

(格式特定于 实现 和 地区)


# toLocaleTimeString()
时 分 秒

(格式特定于 实现 和 地区)

# toUTCString()

完整的UTC日期

(格式特定于实现)


# 例子
```JavaScript
let myBir = new Date(2001, 2, 14);

// toDateString()
console.log(myBir.toDateString());  // Wed Mar 14 2001

// toTimeString()
console.log(myBir.toTimeString());  // 00:00:00 GMT+0800 (中国标准时间)

// toLocaleDateString()
console.log(myBir.toLocaleDateString());    // 2001/3/14

// toLocaleTimeString()
console.log(myBir.toLocaleTimeString());    // 上午12:00:00

// toUTCString()
console.log(myBir.toUTCString());   // Tue, 13 Mar 2001 16:00:00 GMT
```

