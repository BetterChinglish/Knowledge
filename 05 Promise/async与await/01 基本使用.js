// 书写形式
async function myFunc1() {
    let number1 = await 1;
}

// 调用
myFunc1();

// async作用
// async表明该函数为异步函数
// 其中的js语句顺序执行
// 直到执行到一个await

// await作用
// 执行到await后会处理await当前语句, 并等待其返回结果
// 还没返回结果则交给其处理, 退出当前函数, 执行其他代码
// 直到结果返回, 唤醒当前函数, 从刚才的位置继续执行
// await只会返回promise对象(后续继续探讨)


// await只能在async函数中使用
// let number1 = await 1;  // await is only valid in async functions


// await返回的数据
// 如果是promise则返回promise, 如果是基本数据类型则将其包装为promise对象
async function myFunc2() {
    let number1 = await 123;
    return number1;
}
let test1 = myFunc2();
console.log('test1: ', test1);  //Promise { <pending> }
// 为pengding的原因:
// 同步先执行, 执行 let test1 = myFunc2(); 时await并没有返回数据

test1.then(value => {
    console.log('test1 then value', value);
    console.log('test1 await返回后: ', test1);
})


// await返回rejected状态
async function myFunc3() {
    let test = await new Promise((rs, rj) => {
        rj('wrong');
    });

    return test;
}
// 外部错误处理
let test2 = myFunc3();
console.log('test2: ', test2);
test2.catch(reason => {
    console.log('rejected promise返回给await: ',reason);    
})

async function myFunc4() {
    try {
        let test = await new Promise((rs, rj) => {
            rj('wrong');
        });
    
        return test;
    } catch (err) {
        console.log('内部错误处理: ', err);
    }
    
}
// 外部错误处理
let test4 = myFunc4();
console.log('test4: ', test4);


