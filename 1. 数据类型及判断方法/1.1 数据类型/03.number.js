 // parseInt转换规则：
 // 当第一个非空格字符不是数字字符（包含负号）时，返回NaN；
 // 当第一个非空字符是数字字符时，parseInt会继续解析后面的字符，直到遇到非数字字符为止。
 const a = '123.01';
 console.log(parseInt(a)); // 123

 const b = 'aa12';
 console.log(parseInt(b)); // NaN

 const c = '12aa';
 console.log(parseInt(c)); // 12


 // parseFloat转换规则与parseInt类似，只有两点不同：
 // 字符串中的小数点只有第一个是有效的；
 // 如果字符串中的第一个非空格字符是0，这个0会被忽略。
 // 另外还需要注意，如果字符串可以使用整数表示，那么使用parseFloat函数后输入的也是整数
 const d = '12.12';
 console.log(parseFloat(d)); // 12.12

 const e = '12.12.12';
 console.log(parseFloat(e)); // 12.12

 const f = '12.00';
 console.log(parseFloat(f)); // 12

 const g = '012.12';
 console.log(parseFloat(g)); // 12.12


 // toFixed接收一个参数，该参数表示小数位数；
 // 使用该方法会对数值进行四舍五入；
 // 对于整数，会自动补0
 const h = 12.789;
 console.log(h.toFixed(2)); // 12.79

 const i = 12;
 console.log(i.toFixed(2)); // 12.00


 // NaN：非数值，是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况。
 // NaN有两个特点：1）任何涉及到NaN的操作都会返回NaN；2）NaN与任何值都不相等，包括NaN本身。
 const j = NaN;
 console.log(isNaN(j)); // true

 const k = 12;
 console.log(isNaN(k)); // false

 const l = '12aa';
 console.log(isNaN(l)); // true

 const m = 'blue';
 console.log(isNaN(m)); // true


 //  Number.isInteger()：判断一个数值是否是整数
 const o = 25;
 console.log(Number.isInteger(o)); // true

 const p = 25.00;
 console.log(Number.isInteger(p)); // true

 const q = '25';
 console.log(Number.isInteger(q)); // false

 const r = 25.1;
 console.log(Number.isInteger(r)); // false

 // toLocaleString()：将数字转换为本地格式的字符串
 const s = 1000000.123;
 console.log(s.toLocaleString()); // 1,000,000.123