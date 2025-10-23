// 类型断言
function getLength(input: string | number): number {
    // 方式一：使用尖括号语法
    if ((<string>input).length) {
        // 方式二：使用as语法
        return (input as string).length;
    } else {
        return input.toString().length;
    }
}

console.log(getLength('hello')); // 5
console.log(getLength(12345678)); // 8