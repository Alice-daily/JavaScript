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

// ① 使用typeof操作符检测：
// 基本数据类型：能准确检测出除Null类型之外的其他基本数据类型的变量，Null类型使用typeof返回的是object
// 引用类型：可以检测出Function类型，其他的引用类型都返回object
console.log(
    '使用typeof检测的结果为：',
    typeof undef,
    typeof nul,
    typeof num,
    typeof str,
    typeof bol,
    typeof symbol,
    typeof arr,
    typeof date,
    typeof reg,
    typeof fun,
    typeof bolObj,
    typeof numObj,
    typeof strObj
);
// 使用typeof检测的结果为： 
// undefined object number string boolean symbol 
// object object object function object object object