##### 1. typeof操作符：能对使用字面量方式赋值的基本数据类型（除Null之外）做出准确判断，另外对于Function类型也能做出判断。该操作符返回小写的字符串。

```
    const undef = undefined;
    const nul = null;
    const num = 123;
    const str = 'asd';
    const bol = true;
    const symbol = Symbol();
    const arr = [1, 2];
    const date = new Date();
    const reg = /^{d}$/;
    const fun = function () {
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
    )
    // 使用typeof检测的结果为： 
    // undefined object number string boolean symbol 
    // object object object function object object object
```
##### 2. instanceof操作符：用于检测引用类型的变量

```
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
    )
    // 使用instanceof检测的结果为： 
    // false false false false false false
    // true true true true true true true
```
手动实现instanceof的功能：<br/>


```
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
        myInsatnceOf(test, Function),
        myInsatnceOf('123', String),
        myInsatnceOf(new String('123'), String),
        myInsatnceOf(null, Object)
    );
    // true true true false true false
```
如何重写insatnceof操作符的功能？<br/>

```
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
```

##### 3. constructor属性：不管是使用字面量还是构造函数创建的基本数据类型，都可以通过constructor检测出来（除了Null和Undefined），并且也可以检测出引用数据类型。

```
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
```
##### 4. Object.prototype.toSting.call()：能对基本数据类型和引用数据类型做出准确的检测

```
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
```
该方法的返回值为[object XXX]，所以为了方便使用我们可以做一下处理:<br/>

```
    function judgeType(r) {
        return Object.prototype.toString.call(r).slice(8, -1).toLowerCase();
    }
```
