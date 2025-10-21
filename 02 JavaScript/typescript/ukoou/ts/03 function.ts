
// 约束函数参数和返回值的类型
function add(x: number, y: number): number {
    return x + y;
}

// 使用箭头函数定义函数类型
const arrowAdd: (x:number, y:number) => number =
    (x: number, y: number): number => x + y;

console.log(add(1, 2)); // 3
console.log(arrowAdd(3, 4)); // 7

// 使用interface定义函数类型
interface IAdd {
    (x: number, y: number): number;
}
const interfaceAdd: IAdd = (x: number, y: number): number => x + y;

console.log(interfaceAdd(5, 6)); // 11


// 可选参数和默认参数
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
console.log(buildName('Bob')); // Bob
console.log(buildName('Bob', 'Smith')); // Bob Smith