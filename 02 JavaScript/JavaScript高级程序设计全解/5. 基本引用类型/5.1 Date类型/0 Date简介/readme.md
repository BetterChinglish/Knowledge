## Date类型简介

保存为 **自协调世界时**(UTC)

即1970年1月1日物业零时至今经过的毫秒数

## 创建日期对象

```javascript
let now = new Date();   // 不传参数, 保存现在的日期和时间
```

## 自定义日期对象存储的时间

使用Date.parse() 或 Date.UTC()

### Date.parse()

支持:
    1. 月/日/年                              例如: 1/1/2021
    2. 月名 日, 年                           例如: May 1, 2021
    3. 周几 月名 日 年 时:分:秒 时区          例如: Tue May 1 2021 17:30:30 GMT-0700
    4. 'YYYY-MM-DDTHH:mm:ss.ssZ'            例如: 2021-01-01T00:00:00

上述第四点只适用于兼容ES5的实现

```javascript
let date1 = new Date(Date.parse('2/14/2022'));
console.log(date1);
```

如果传给Date.parse()的字符串不表示日期, 也就是他无法识别, 则该方法返回NaN
```JavaScript
console.log(Date.parse('不表示时间的字符串'));  // NaN
```

把NaN作为new Date()的参数传入返回错误信息: 错误的时间(Invalid date)
```JavaScript
console.log(new Date(NaN))  // Invalid Date
```

如果直接把表示时间的字符串传入new Date()中, 则会后台调用Date.parse()进行转化

对于越界时间有些浏览器会使用现在的时间代替越界时间, 有些则进行递进如将9月31日解释为10月1日, 还有些则使用当前月的当前日, 如今天12月12日, 传入了9月31日, 则被替换为9月12日, 这与浏览器有关系

### Date.UTC()
Date.UTC(年, 月, 日, 时, 分, 秒, 毫秒)

只有年月是必须的

月从0开始(0代表1月)

如果直接传入如下:
```JavaScript
let date3 = new Date(2021, 9);
```
则会隐式对 2021, 9 调用 Date.UTC()


这两个方法创建的时区都是系统设置决定的

## Date.now()

返回方法执行时日期和时间的毫秒数

```javascript
let date1 = Date.now();

// 2000ms后输出date2 - date1, 也就是两个的时间间隔
setTimeout(() => {
    let date2 = Date.now();
    console.log(date2 - date1);
}, 2000);
```



