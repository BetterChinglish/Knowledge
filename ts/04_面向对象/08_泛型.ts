// 类似于c++的模板template
// 当函数的参数类型与返回值类型相同但不确定时可以使用

// 指定一个泛型t
function fn<t>(a:t):t{
    return a;
}

// 可以指定多个
function fn2<a,b>(num:a,str:b):b {
    return str;
}

// 也可以传类或接口
interface inter{
    num:number;
}

function fn3<t extends inter>(a:inter):number{
    return a.num;
}

// 也可以用于类中
class myClass<t>{
    // ...
}

const mc = new myClass<string>();