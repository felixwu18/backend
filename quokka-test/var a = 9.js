// 测试1
var a = 9
a
console.log(new Array(6).fill(1));
console.log('a'.repeat(7));

// 测试2
let classType = {
    a: 7,
    fn(b) {
        return this.a + b
    }
}

const { fn } = classType

var tt = () => fn.bind(classType)

console.log(tt());
console.log(tt()(3));



