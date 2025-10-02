
function echo<t>(input: t): t {
    return input;
}

console.log(echo('hello')); // hello

function swap<t, u>(tuple: [t, u]): [u, t] {
    return [tuple[1], tuple[0]];
}

console.log(swap([1, 'hello'])); // ['hello', 1]


// 约束泛型
function echoWithArr<t>(input: t[]): t[] {
    console.log(input.length); // 可以访问length属性
    return input;
}

console.log(echoWithArr([1, 2, 3])); // [1, 2, 3]

// 泛型接口
interface IWithLength {
    length: number;
}

// duck typing
function echoWithLength<t extends IWithLength>(input: t): t {
    console.log(input.length); // 可以访问length属性
    return input;
}

console.log(echoWithLength('hello')); // hello
console.log(echoWithLength([1, 2, 3])); // [1, 2, 3]
console.log(echoWithLength({ length: 10, value: 'hello' })); // { length: 10, value: 'hello' }