// ES5只有全局作用域和局部作用域,没有块级作用域,因此会导致以下两种情况
// 1.内层变量可能覆盖外层变量
var a = 1;

function fn() {
    console.log(a); // 本意是在if的外部使用全局变量a
    if (false) {
        var a = 2; // 在if内部使用局部变量a
    }
}
fn(); // undefined

// 2.用来计数的循环变量会被泄漏为全局变量
for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}
console.log(i); // 5