// 类型别名

type StrOrNum = string | number;
const var1: StrOrNum = 123;
console.log(var1); // 123

interface IPerson {
    name: string;
    age: number;
}
const var2: IPerson = { name: 'Alice', age: 25 };
console.log(var2); // { name: 'Alice', age: 25 }

type IPersonAlias = {
    name: string;
    age: number;
}
const var3: IPersonAlias = { name: 'Bob', age: 30 };
console.log(var3); // { name: 'Bob', age: 30 }

// interface支持类型合并
interface IAnimal {
    name: string;
}
interface IAnimal {
    age: number;
}
// const var4: IAnimal = { name: 'Dog' };  // 报错，缺少age属性
const var4: IAnimal = { name: 'Dog', age: 3 };
console.log(var4); // { name: 'Dog', age: 3 }

// type别名不支持类型合并
type IAnimalAlias = {
    name: string;
}

// type IAnimalAlias = {
//     age: number;
// }   // 报错，重复定义IAnimalAlias

// type支持联合类型和交叉类型，能形容基本类型，interface不支持基本类型，只能表示对象类型（或类）或方法
type StrOrNumAlias = string | number;
const var5: StrOrNumAlias = 'hello';
console.log(var5); // hello

interface IStrOrNumInterface {
    // 报错，接口不能表示基本类型
    // (string | number);
    key: string | number;
}
// 只能表示对象类型
const var6: IStrOrNumInterface = { key: 456 };


// interface支持extends继承与实现implements
interface IShape {
    color: string;
}
interface ICircle extends IShape {
    radius: number;
}
const var7: ICircle = { color: 'red', radius: 10 };
console.log(var7); // { color: 'red', radius: 10 }
class Square implements IShape {
    color: string;
    sideLength: number;
    constructor(color: string, sideLength: number) {
        this.color = color;
        this.sideLength = sideLength;
    }
}
const var8 = new Square('blue', 5);
console.log(var8); // Square { color: 'blue', sideLength: 5 }