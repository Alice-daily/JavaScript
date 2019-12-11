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
// ④ 使用Object.prototype.toString.call()检测：
console.log(
    '使用Object.prototype.toString.call()检测的结果为：',
    Object.prototype.toString.call(undef),
    Object.prototype.toString.call(nul),
    Object.prototype.toString.call(num),
    Object.prototype.toString.call(str),
    Object.prototype.toString.call(bol),
    Object.prototype.toString.call(symbol),
    Object.prototype.toString.call(arr),
    Object.prototype.toString.call(date),
    Object.prototype.toString.call(reg),
    Object.prototype.toString.call(fun),
    Object.prototype.toString.call(bolObj),
    Object.prototype.toString.call(numObj),
    Object.prototype.toString.call(strObj)
);
// 使用Object.prototype.toString.call()检测的结果为： 
// [object Undefined] [object Null] [object Number] [object String] [object Boolean] [object Symbol] 
// [object Array] [object Date] [object RegExp] [object Function] [object Boolean] [object Number] [object String]