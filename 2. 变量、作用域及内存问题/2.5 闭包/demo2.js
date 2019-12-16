function foo() {
    for (var i = 0; i < 5; i++) {
        setTimeout(function timer() {
            console.log(i);
        }, i * 1000)
    }
}
foo();

function foo2() {
    for (var i = 0; i < 5; i++) {
        (function(j) {
            setTimeout(function timer() {
                console.log(j);
            }, j * 1000);
        })(i);
    }
}
foo2();

function foo3() {
    for (let i = 0; i < 5; i++) {
        setTimeout(function timer() {
            console.log(i);
        }, i * 1000)
    }
}

foo3();