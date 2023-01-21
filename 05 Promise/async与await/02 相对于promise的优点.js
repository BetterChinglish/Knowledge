// async + await相对于直接使用promise.then的优点
// 如果多个promise对象p1, p2, p3需要依次使用then输出且保证顺序为p1, p2, p3
// 直接使用promise.then写起来略微麻烦
let p1 = new Promise((resolve, reject) => {
    // 这里应该使用异步操作, 然后resolve返回异步操作得到的结果
    // 为了简化直接返回结果
    resolve('p1');
})

let p2 = new Promise((resolve, reject) => {
    resolve('p2');
})

let p3 = new Promise((resolve, reject) => {
    resolve('p3');
})

p1.then(value => {
    console.log(value);
    return p2;
}).then(value => {
    console.log(value);
    return p3;
}).then(value => {
    console.log(value);
});

// 使用async await
async function test() {
    let as1 = await p1;
    let as2 = await p2;
    let as3 = await p3;

    console.log(p1, p2, p3);
}

// 可见这更方便阅读与书写, 以同步的形式处理异步的操作n

test();
