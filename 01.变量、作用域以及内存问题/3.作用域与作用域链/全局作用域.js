// "use strict"
var a1 = 1;

function say1() {
    console.log(a1); // 1 函数内部也可以访问全局变量
    a2 = 2;
    console.log(a2); // 2 a2自动声明为拥有全局作用域，在严格模式下这种写法会报错
}
say1();
console.log(a2); // 2
// 结果为：1 2 2