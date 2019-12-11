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
// ③ 使用constructor属性检测：
// 可以检测出除了Undefined和Null之外的基本数据类型和引用数据类型
console.log(
    '使用constructor属性检测的结果为：',
    // undef.constructor === Undefined, // Cannot read property 'constructor' of undefined
    // nul.constructor === Null, // Cannot read property 'constructor' of null
    num.constructor === Number,
    str.constructor === String,
    bol.constructor === Boolean,
    symbol.constructor === Symbol,
    arr.constructor === Array,
    date.constructor === Date,
    reg.constructor === RegExp,
    fun.constructor === Function,
    bolObj.constructor === Boolean,
    numObj.constructor === Number,
    strObj.constructor === String
);
// 使用constructor属性检测的结果为： 
// true true true true 
// true true true true true true true