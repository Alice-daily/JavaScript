// ES6中使用const或let声明变量会形成块级作用域
function fn() {
    let a = 1;
    if (true) {
        let a = 2;
    }
    console.log(a);
}
fn(); // 1

// for语句外部无法访问i
for (let i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}
// console.log(i); // ReferenceError: i is not defined

// 父级作用域无法访问子块级作用域中的变量;
// 子块级作用域可以访问父级作用域中的变量
{
    const c = 'C'; {
        console.log(c); // C
    }
}
console.log(c); // ReferenceError: c is not defined