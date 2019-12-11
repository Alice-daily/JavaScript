function say2(a) {
    console.log(a); // 2
    var b = 1;
    console.log(b); // 1
}
say2(2);
console.log(a); // ReferenceError: a is not defined, 函数的参数也是该函数的局部变量
console.log(b); // ReferenceError: b is not defined, 局部变量不能被外部访问