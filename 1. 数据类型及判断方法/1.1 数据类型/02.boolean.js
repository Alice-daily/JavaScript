// String类型的值：任何非空字符串都会被转换为true，空字符串转换为false
const a = 'string';
const b = '';
console.log(Boolean(a), Boolean(b)); // true false

// Number类型的值：任何非0的数值都会被转换为true，0和NaN转换为false
const c = 123;
const d = 0;
const e = NaN;
console.log(Boolean(c), Boolean(d), Boolean(e)); // true false false

// undefined：转换为false
let f;
console.log(Boolean(f)); // false

// null：转换为false
const g = null;
console.log(Boolean(g)); // false

// Object：转换为true
const h = {};
console.log(Boolean(h)); // true

// Symbol：转换为true
const i = Symbol();
console.log(Boolean(i)); // true