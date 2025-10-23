
// type guide
function getLength(input: string | number): number {
    if(typeof input === 'number') {
        return input.toString().length;
    } else {
        return input.length;
    }
}

console.log(getLength('hello')); // 5
console.log(getLength(12345678)); // 8