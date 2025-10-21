// 枚举
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
// 按自己的顺序编号
console.log(Direction.Right); // 4
// 默认从0开始编号
var Direction2;
(function (Direction2) {
    Direction2[Direction2["Up"] = 0] = "Up";
    Direction2[Direction2["Down"] = 1] = "Down";
    Direction2[Direction2["Left"] = 2] = "Left";
    Direction2[Direction2["Right"] = 3] = "Right";
})(Direction2 || (Direction2 = {}));
// 默认从0开始编号，遇到指定编号的，从指定编号开始递增
var Direction3;
(function (Direction3) {
    Direction3[Direction3["Up"] = 0] = "Up";
    Direction3[Direction3["Down"] = 4] = "Down";
    Direction3[Direction3["Left"] = 5] = "Left";
    Direction3[Direction3["Right"] = 6] = "Right";
})(Direction3 || (Direction3 = {}));
console.log(Direction3.Left); // 5
console.log(Direction3.Up); // 0
// 字符串枚举
var Direction4;
(function (Direction4) {
    Direction4["Up"] = "UP";
    Direction4["Down"] = "DOWN";
    Direction4["Left"] = "LEFT";
    Direction4["Right"] = "RIGHT";
})(Direction4 || (Direction4 = {}));
console.log(Direction4.Left); // LEFT
// 异构枚举
var BooleanLikeHeterogeneousEnum;
(function (BooleanLikeHeterogeneousEnum) {
    BooleanLikeHeterogeneousEnum[BooleanLikeHeterogeneousEnum["No"] = 0] = "No";
    BooleanLikeHeterogeneousEnum["Yes"] = "YES";
})(BooleanLikeHeterogeneousEnum || (BooleanLikeHeterogeneousEnum = {}));
console.log(BooleanLikeHeterogeneousEnum.Yes); // YES
console.log(BooleanLikeHeterogeneousEnum.No); // 0
var directions = [0 /* Direction5.Up */, 1 /* Direction5.Down */, 2 /* Direction5.Left */, 3 /* Direction5.Right */];
var a = 1 + 2;
if (a === 3 /* Direction5.Right */) {
    console.log('go left');
}
console.log(directions); // [0, 1, 2, 3]
