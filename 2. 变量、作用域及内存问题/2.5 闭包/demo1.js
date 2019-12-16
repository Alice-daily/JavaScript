function foo() {
    var a = 1;

    function bar() {
        console.log(a)
    }
    return bar;
}

var baz = foo();
baz(); // 1