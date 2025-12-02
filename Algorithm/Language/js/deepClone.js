let cachedMap = new WeakMap();
function deepClone(obj) {
    // 1 基本常量与null----不处理
    if(typeof obj !== 'object' || !obj) {
        return obj;
    }

    if(cachedMap.has(obj)) return cachedMap.get(obj);


    let constructor = obj.constructor;
    let tmp, params;
    // 2 无元素RegExp,Date， 可以直接new出来
    if( obj instanceof RegExp || obj instanceof Date) {

        // 使用其构造函数constructor
        params = obj;
    }
    tmp = new constructor(params);

    cachedMap.set(obj, tmp);

    // 3 新结构Map, Set    Map使用set(key, value), Set使用add(value)
    if(obj instanceof Map) {
        for(let [key, value] of obj) {
            tmp.set(deepClone(key), deepClone(value))
        }
    }
    else if( obj instanceof Set) {
        for(let value of obj) {
            tmp.add(deepClone(value));
        }
    }
    // 4 键值对(数组，类似json的对象)
    if(Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]') {
        for(let key in obj) {
            tmp[key] = deepClone(obj[key]);
        }
    }

    return tmp;
}

module.exports = {
    deepClone,
}