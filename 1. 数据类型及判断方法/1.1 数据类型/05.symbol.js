// Symbol()函数：Symbol()函数用来生成Symbol值。
// 1）Symbol值通过Symbol()函数来生成。
const s1 = Symbol();
console.log(s1); // 'Symbol()'
const s2 = Symbol();
console.log(s2); // 'Symbol()'
// 2）Symbol()函数生成的值是不相等的，尽管它们在控制台的输出都是Symbol()
console.log(s1 === s2); // false
// 3）Symbol()函数也可以传入一个字符串作为参数，表示对Symbol()实例的描述，这样比较好区分。
const s3 = Symbol('s3');
console.log(s3); // Symbol(s3)
const s4 = Symbol('s3');
console.log(s4); // Symbol(s3)
// 4)虽然传入Symbol()函数中的参数值相等，但是Symbol()函数生成的值仍然是不相等的。
console.log(s3 === s4); // flase
// 5）Symbol值不能与其他值进行运算，否则会报错
// console.log('hello,' + s3); // TypeError: Cannot convert a Symbol value to a string
// 6)虽然不能与其他值进行运算，但是Symbol值可以转换为字符串和布尔值，不能转换为数值
console.log(s3.toString()); // 'Symbol(s3)' 
console.log(String(s3)); // 'Symbol(s3)'
console.log(Boolean(s3)); // true

// Symbol的每一个值都是不相等的，因此可以使用Symbol值来标识对象的属性名，这样可以保证不会出现同名的属性
let s5 = Symbol('name');
// 写法一：
let obj1 = {
    [s5]: 'yjj'
};
console.log(obj1[s5]); // yjj
// 写法二：
let obj2 = {};
obj2[s5] = 'yjj';
console.log(obj2[s5]); // yjj
// 写法三：
let obj3 = {};
Object.defineProperty(obj3, s5, {
    value: 'yjj'
});
console.log(obj3[s5]); // yjj

// Object.getOwnPropertySymbols()：获取指定对象的所有Symbol属性名
const s6 = Symbol('name1');
const s7 = Symbol('name2');
const obj = {
    [s6]: '嘉平十五',
    [s7]: 'Alice',
    age: 18,
    sex: 'female'
};
// ① 当Symbol作为一个属性的属性名时，该属性不会出现在for...in语句、Object.keys()以及Object.getOwnPropertyNames()函数的返回结果中。
for (const key in obj) {
    console.log(key); // age  sex
}
console.log(Object.keys(obj)); // ['age', 'sex']
console.log(Object.getOwnPropertyNames(obj)); // ['age', 'sex']

// ② Object.getOwnPropertySymbols()：返回由指定对象中所有用作属性名的Symbol值构成的数组
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(name1), Symbol(name2) ]

// ③ Reflect.ownKeys()：返回指定对象中的所有属性的属性名，包括常规属性名和Symbol值的属性名
console.log(Reflect.ownKeys(obj)); // [ 'age', 'sex', Symbol(name1), Symbol(name2) ]


// Symbol()和Symbol.for()都会产生Symbol值，它们的区别是：
// 使用Symbol()产生的值不会被登记在全局环境中，而Symbol.for()产生的值会被登记在全局环境中以供搜索。
const s8 = Symbol('age');
const s9 = Symbol.for('age');
const s10 = Symbol.for('age');
console.log(s8 === s9); // false，因为Symbol.for()是查找已被登记在全局环境中的key
console.log(s9 === s10); // true

// Symbol.keyFor()：返回被登记的Symbol值
console.log(Symbol.keyFor(s8)); // undefined
console.log(Symbol.keyFor(s9)); // age
console.log(Symbol.keyFor(s10)); // age