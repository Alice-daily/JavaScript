const undef = undefined;
const nul = null;
const num = 123;
const str = 'asd';
const bol = true;
const symbol = Symbol();
const arr = [1, 2];
const date = new Date();
const reg = /^{d}$/;
const fun = function() {
    console.log('function')
};
const bolObj = new Boolean(true);
const numObj = new Number(123);
const strObj = new String('asd');
// ② 使用instanceof操作符检测：
// 该操作符适合用于检测引用类型的对象，不能检测使用字面量方式创建的基本数据类型的变量，也不能检测Undefined和Null
console.log(
    '使用instanceof检测的结果为：',
    undef instanceof Object,
    nul instanceof Object,
    num instanceof Number,
    str instanceof String,
    bol instanceof Boolean,
    symbol instanceof Object,
    arr instanceof Array,
    date instanceof Date,
    reg instanceof RegExp,
    fun instanceof Function,
    bolObj instanceof Boolean,
    numObj instanceof Number,
    strObj instanceof String
);
// 使用instanceof检测的结果为： 
// false false false false false false
// true true true true true true true

/**
 * 手动实现instanceof的功能
 * @param {*} inObj：实例对象
 * @param {*} proObj:原型对象
 */
function myInsatnceOf(inObj, proObj) {
    // 基本数据类型直接返回false
    if (typeof inObj !== 'function' && (typeof inObj !== 'object' || inObj === null)) {
        return false;
    }
    let proto = Object.getPrototypeOf(inObj);
    while (true) {
        // 到原型链的尽头还没有查找到时，返回false
        if (proto === null) {
            return false;
        }
        // 找到了
        if (proto === proObj.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
}

console.log(
    myInsatnceOf([1, 2, 3], Array),
    myInsatnceOf([1, 2, 3], Object),
    myInsatnceOf(fun, Function),
    myInsatnceOf('123', String),
    myInsatnceOf(new String('123'), String),
    myInsatnceOf(null, Object)
);
// true true true false true false

/**
 * ES6提供了11个内置的Symbol值，指向语言内部使用的方法。
 * 其中Symbol.hasInstance属性指向一个内部方法，当对象使用instanceof操作符时会调用这个方法。
 * 比如：[1,2,3] instanceof MyArray，内部调用的实际是[Symbol.hasInstance](arr)，如下：
 */
class MyArray {
    static[Symbol.hasInstance](arr) {
        return arr instanceof Array;
    }
}
console.log([1, 2, 3] instanceof MyArray); // true
/**
 * 因此可以使用这种方法自定义instanceof的功能，比如可以实现使用instanceof判断基本数据类型
 */
class myNumber {
    static[Symbol.hasInstance](num) {
        return typeof num === 'number';
    }
}
console.log(12 instanceof myNumber); // true