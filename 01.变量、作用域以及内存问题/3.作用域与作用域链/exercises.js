/**
 * exercises1
 */
var a1 = 1;

function fn1() {
    console.log('1:' + a1);

    function bar1() {
        console.log('2:' + a1)
    }
    var a1 = 2;
    bar1();
    console.log('3:' + a1);
}

fn1();

/**
 * exercise2
 */
var a2 = 1;

function fn2() {
    console.log('1:' + a2);
    var a2 = 2;
    bar2();
    console.log('2:' + a2);
}

function bar2() {
    console.log('3:' + a2);
}

fn2();

/**
 * exercise3
 */
var a3 = 1;

function fn3() {
    console.log('1:' + a3);
    a3 = 2;
}
a3 = 3;

function bar3() {
    console.log('2:' + a3);
}

fn3();
bar3();

/**
 * exercise4
 */
var a4 = 1;

function fn4(f) {
    var a4 = 2;
    return f;
}

function bar4() {
    console.log(a4)
}

var f1 = fn4(bar4);
f1();

/**
 * exercise5
 */
var a5 = 1;

function fn5(f) {
    var a5 = 2;
    return function() {
        console.log(a5)
    }
}

var f2 = fn5();
f2();