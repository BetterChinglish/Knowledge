// 枚举
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

// 按自己的顺序编号
console.log(Direction.Right); // 4

// 默认从0开始编号
enum Direction2 {
    Up,
    Down,
    Left,
    Right,
}

// 默认从0开始编号，遇到指定编号的，从指定编号开始递增
enum Direction3 {
    Up,
    Down = 4,
    Left,
    Right,
}

console.log(Direction3.Left); // 5
console.log(Direction3.Up); // 0

// 字符串枚举
enum Direction4 {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

console.log(Direction4.Left); // LEFT

// 异构枚举
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = 'YES',
}
console.log(BooleanLikeHeterogeneousEnum.Yes); // YES
console.log(BooleanLikeHeterogeneousEnum.No); // 0

// 常量枚举
const enum Direction5 {
    Up,
    Down,
    Left,
    Right,
}

let directions = [Direction5.Up, Direction5.Down, Direction5.Left, Direction5.Right];
let a = 1 + 2;
if (a === Direction5.Right) {
    console.log('go left');
}
console.log(directions); // [0, 1, 2, 3]