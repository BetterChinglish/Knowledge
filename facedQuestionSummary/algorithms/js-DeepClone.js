
function deepClone(obj, keyMap = new WeakMap()) {
    // 循环处理
    if (keyMap.has(obj)) {
        return keyMap.get(obj);
    }


    // 日期
    if (obj instanceof Date) {
        return new Date(obj);
    }

    
    // 正则
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags);
    }


    // // 方法
    // if (typeof obj === 'function') { // typeof function不会返回 'function' 而是 'object'
    //     return obj;
    // }

    // 常量、null、undefined、function
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }


    // 数组
    if (Array.isArray(obj)) {
        const copyArr = [];
        keyMap.set(obj, copyArr);

        for (let i = 0; i < obj.length; i++) {
            copyArr.push(deepClone(obj[i], keyMap));
        }

        return copyArr;

    }



    // 对象
    const copyObj = {}
    keyMap.set(obj, copyObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = deepClone(obj[key])
        }
    }
    return copyObj;
}

var obj1 = {
    attr: myObj,
    // attr2:3
}

var myObj = {
    a: 1,
    b: '123',
    c: false,
    d: new Date(),
    e: () => { console.log(123) },
    f: [1, 2, 3, {
        g: obj1
    }],
    h: {
        i: 123
    },
    i: undefined
}
console.dir(deepClone(myObj));
