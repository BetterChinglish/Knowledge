interface IPerson {
    // 只读属性
    readonly id: number;

    // 必须属性
    name: string;
    age: number;

    // 可选属性
    description?: string;

    // 任意属性
    [propName: string]: any;
}

let Bob: IPerson = {
    id: 1,
    name: 'Bob',
    age: 18,
    description: 'hello',
}

// Bob.id = 3; // 报错，id是只读属性