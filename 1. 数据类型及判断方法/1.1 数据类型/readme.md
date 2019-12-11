ECMAScript中有6种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol，1种引用数据类型：Object。<br/>
##### 1. Undefined
Undefined类型只有一个值：undefined。<br/>

当一个变量已经声明了但是没有初始化时，此时该变量的值为undefined。<br/>

```
    let a;
    console.log(a === undefined); // true
```
##### 2. Null
Null类型只有一个值：null，表示空对象指针。<br/>

当定义的变量将来用于保存对象时，可将该变量初始化为null。<br/>

注意：虽然typeof null 返回的是object，但是null并不是对象，这只是JS的一个历史悠久的BUG。在JS的最初版本中使用的是32位系统，出于性能的考虑而使用低位存储变量的类型信息，000开头的则代表是对象，而null的表示是全零，因此将null误判为对象。<br/>

##### 3. Boolean
Boolean类型有两个值：true和false。<br/>

使用Boolean()函数可以将任何数据类型的值转换为Boolean类型，熟悉转换规则对于理解流程控制语句中自动执行的Boolean类型的转换非常重要。

```
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
```
##### 4. Number
Number类型用来表示数字（整数和浮点数）。<br/>

常用的函数：
- parseInt()：将字符串转换为整数

```
    // parseInt转换规则：
    // 当第一个非空格字符不是数字字符（包含负号）时，返回NaN；
    // 当第一个非空字符是数字字符时，parseInt会继续解析后面的字符，直到遇到非数字字符为止。
    const a = '123.01';
    console.log(parseInt(a)); // 123
    
    const b = 'aa12';
    console.log(parseInt(b)); // NaN
    
    const c = '12aa';
    console.log(parseInt(c)); // 12
```
- parseFloat()：将字符串转换为浮点数

```
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
```
- toFixed()：按指定小数位返回数字的字符串表示

```
    // toFixed接收一个参数，该参数表示小数位数；
    // 使用该方法会对数值进行四舍五入；
    // 对于整数，会自动补0
    const h = 12.789;
    console.log(h.toFixed(2)); // 12.79
    
    const i = 12;
    console.log(i.toFixed(2)); // 12.00
```
- isNaN()：判断 一个值是否“不是数值”

```
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
```
- Number.isInteger()：判断一个数值是否是整数；注意：由于保存浮点数值需要的内存空间是保存整数值的两倍，因此对于那些本身表示的就是整数的浮点数，ECMAScript会将它们转换为整数，比如：10.0会被转换为10，所以10.0和10会被视为同一个值，都会被判断为是整数。

```
    const o = 25;
    console.log(Number.isInteger(o)); // true
    
    const p = 25.00;
    console.log(Number.isInteger(p)); // true
    
    const q = '25';
    console.log(Number.isInteger(q)); // false
    
    const r = 25.1;
    console.log(Number.isInteger(r)); // false
```

- toLocaleString()：将数字转换为本地格式的字符串，常用该函数把数字转换成货币格式。

```
    const s = 1000000.123;
    console.log(s.toLocaleString()); // 1,000,000.123
```
##### 5. String
String类型用来表示字符串。<br/>

常用的函数：

```
    const str1 = 'hello';
    const str2 = 'world';
    
    // 1、charAt()：返回指定位置的字符
    console.log(str1.charAt(1)); // 'e'
    
    // 2、concat：拼接字符串，在实践中更多的使用‘+’来进行字符串的拼接
    console.log(str1.concat(str2)); // 'helloworld'
    console.log(str1 + str2); // 'helloworld'
    
    // 3、slice(start, end)：切割字符串
    // start：表示从start开始截取字符串，end：表示截取到end位置为止，不包含end；
    // end可以省略，如果省略则表示一直截取到字符串的末尾。
    console.log(str1.slice(1, 3)); // 'el'
    console.log(str1); // 'hello，str1的值没有改变，说明slice函数不会改变原始字符串，而是产生新的字符串。
    console.log(str2.slice(1)); // 'orld'
    
    // 如果start/end为负数，slice会将它们与字符串的长度相加
    console.log(str1.slice(-4, -2)); // 'el'，相当于slice(1, 3)
    // 如果end < start，返回空字符串
    console.log(str1.slice(3, 1)); // ''
    
    // 4、substring(start, end)：切割字符串
    // start：表示从start开始截取字符串，end：表示截取到end位置为止，不包含end；
    // end可以省略，如果省略则表示一直截取到字符串的末尾。
    console.log(str1.substring(1, 3)); // 'el'
    console.log(str1); // 'hello'，str1的值没有改变，说明substring函数不会改变原始字符串，而是产生新的字符串。
    console.log(str2.substring(1)); // 'orld'
    
    // 如果start/end为负数，substring会将它们都转换为0
    console.log(str1.substring(-2, -1)); // ''
    // 如果end < start，substring会将start和end的值交换
    console.log(str1.substring(3, 1)); // 'el'，相当于substring(1, 3)
    
    // 5、substr(start, end)：截取字符串
    // start：表示从start开始截取字符串，end：表示要截取的字符串的个数，如果end的值大于字符串的长度，则截取到该字符串的末尾即可。
    // end可以省略，如果省略则表示一直截取到字符串的末尾。
    console.log(str1.substr(2, 1)); // 'l'
    console.log(str1); // 'hello，str1的值没有改变，说明substr函数不会改变原始字符串，而是产生新的字符串。
    console.log(str1.substr(2, 7)); // 'llo'
    console.log(str1.substr(2)); // 'llo'
    
    // 如果start为负数，则将其与字符串的长度相加
    // 如果end为负数，则将其转换为0
    console.log(str1.substr(-2, -4)); // ''，相当于substr(3, 0)
    
    // 6、indexOf(child, pos)：从字符串的开头向后中搜索给定的子字符串，返回子字符串第一次出现的位置，如果不存在该子字符串，则返回-1
    // child：表示待查找的子字符串
    // pos：可选，表示从该位置开始查找，默认为0
    console.log(str1.indexOf('l')); // 2
    console.log(str1.indexOf('l', 3)); // 3
    console.log(str1.indexOf('w')); // -1
    
    // 7、lastIndexOf(child, pos)：从字符串的末尾向前搜索给定的子字符串，返回子字符串第一次出现的位置，如果不存在该子字符串，则返回-1
    // child：表示待查找的子字符串
    // pos：可选，表示从该位置开始查找，默认为0
    console.log(str1.lastIndexOf('l')); // 3
    console.log(str1.lastIndexOf('l', 3)); // 3
    console.log(str1.lastIndexOf('w')); // -1
    
    // 8、trim()：去除字符串开头和末尾的空格，并返回新字符串
    const str3 = '  hello   ';
    console.log(str3.trim()); // 'hello'
    
    // 9、replace(param1, param2)：用某个字符串替换子字符串
    // param1: 表示被替换掉的子字符串
    // 如果param1的值为字符串，则只会替换第一个子字符串；
    // 如果param1的值为一个指定了全局表示的正则表达式，则会替换所有子字符串
    // param2：替代子字符串的新字符串
    const str4 = 'hello world, hello music';
    console.log(str4.replace('hello', 'bye')); // 'bye world, hello music'
    console.log(str4.replace(/hello/g, 'bye')); // 'bye world, bye music'
    
    // 10、split(sep)：基于指定的分隔符将一个字符串分割为多个子字符串，并将子字符串存到数组中返回。
    const str5 = 'a,b,c,d';
    console.log(str5.split(',')); // [ 'a', 'b', 'c', 'd' ]
```
##### 6.Symbol
Symbol类型用来表示独一无二的值，该类型是ES6新增的基本数据类型。<br/>
- Symbol()函数：Symbol()函数用来生成Symbol值。

```
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
    console.log('hello,' + s3); // TypeError: Cannot convert a Symbol value to a string
    // 6)虽然不能与其他值进行运算，但是Symbol值可以转换为字符串和布尔值，不能转换为数值
    console.log(s3.toString()); // 'Symbol(s3)' 
    console.log(String(s3)); // 'Symbol(s3)'
    console.log(Boolean(s3)); // true
```
- Symbol的每一个值都是不相等的，因此可以使用Symbol值来标识对象的属性名，这样可以保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或者覆盖。

```
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
```
- Object.getOwnPropertySymbols()：获取指定对象的所有Symbol属性名

```
    const s1 = Symbol('name1');
    const s2 = Symbol('name2');
    const obj = {
        [s1]: '嘉平十五',
        [s2]: 'Alice',
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
```
- 使用Symbol.for()可以反复使用同一个Symbol值，该函数接收一个字符串作为参数，在调用该方法时，会首先检查是否存在以该参数命名的Symbol值，如果存在则返回这个Symbol值，如果不存在就新建并方法以该字符串命名的Symbol值。

```
    // Symbol()和Symbol.for()都会产生Symbol值，它们的区别是：
    // 使用Symbol()产生的值不会被登记在全局环境中，而Symbol.for()产生的值会被登记在全局环境中以供搜索。
    const s6 = Symbol('age');
    const s7 = Symbol.for('age');
    const s8 = Symbol.for('age');
    console.log(s6 === s7); // false，因为Symbol.for()是查找已被登记在全局环境中的key
    console.log(s7 === s8); // true
    
    // Symbol.keyFor()：返回被登记的Symbol值
    console.log(Symbol.keyFor(s6)); // undefined
    console.log(Symbol.keyFor(s7)); // age
    console.log(Symbol.keyFor(s8)); // age
```
##### 7. Object
Object表示对象，它的范围很广，像常用的Array、Function、Date、RegExp都属于引用类型，此外我们还可以自定义对象。