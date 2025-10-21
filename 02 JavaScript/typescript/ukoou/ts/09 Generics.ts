
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

// 泛型类
class Queue<t> {
    private data: t[] = [];

    push(item: t) {
        this.data.push(item);
    }

    pop(): t | undefined {
        return this.data.shift();
    }
}

const queue = new Queue<number>();

queue.push(1);
queue.push(2);

const popped = queue.pop(); // 1

console.log(popped);


// 泛型接口
interface IKeyValue<k, v> {
    key: k;
    value: v;
}

const kv1: IKeyValue<number, string> = { key: 1, value: 'hello' };
const kv2: IKeyValue<string, string> = { key: 'id', value: '1001' };

console.log(kv1, kv2);

// 一些默认数据类型中的泛型
const names: Array<string> = ['Alice', 'Bob', 'Charlie'];
const names2: string[] = ['Alice', 'Bob', 'Charlie'];
