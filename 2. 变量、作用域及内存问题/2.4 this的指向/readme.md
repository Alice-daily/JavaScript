**重点：**
- [x] this的指向是函数被调用的时候确定的；
- [x] 箭头函数中this的指向来自它定义时所处的外部环境。

---
> 写在前面：非严格模式下，在浏览器环境中全局对象为window对象，在Node环境中全局对象为global对象，严格模式下，全局对象为undefined。<br/> 以下代码运行环境为浏览器，因此全局对象为window对象，使用var和function命令声明的全局变量会变成全局对象的属性。

### 一、分类讨论
#### 1. 函数名调用模式
- ##### 如果一个函数中存在this，且直接以函数名的形式调用，那么this指向全局对象；

```
    var a1 = 1;

    function fn1() {
        var a1 = 2;
        console.log(this.a1);
        console.log(this);
    }
    fn1();
    
    // 输出结果为：
    // 1 => 以函数名的形式直接调用fn1，此时fn中的this指向全局对象Window，因此this.a1等于1
    // Window
    
```

```
    function fn2() {
        var a2 = 2;
        console.log(this.a2);
        console.log(this);
    }
    fn2();
    
    // 输出结果为：
    // undefined => 此时fn中的this指向全局对象Window，而Window中没有定义变量a，因此返回undefined
    // Window
```

```
    function fn3() {
        var a3 = 3;

        function foo() {
            console.log(this.a3);
            console.log(this);
        }
        foo();

    }
    fn3();
    
    // 输出结果为：
    // undefined => this的指向是在调用时确定的，因此这里指向全局环境
    // Window
```

```
    let a4 = 4;

    function fn4() {
        let a4 = 4;
        console.log(this.a4); // undefined
        console.log(this); // Window
    }
    fn4();
    
    // 输出结果为：
    // undefined
    // Window
    // 为什么这里this.a3返回的是undefined呢？全局作用域中明明也定义了变量a3的呀？
    // ES6中规定：使用let、const、class声明的全局变量不属于全局对象的属性，这样的好处是将全局变量与全局对象的属性隔离了。
```

#### 2. 对象方法调用模式
- ##### 如果一个函数中存在this，并且它是以对象方法的形式调用的，那么this指向调用该函数的对象；

```
    var a = 1;
    var obj = {
        a: 2,
        fn: function () {
            console.log(this.a)
        }
    }
    obj.fn();
    
    // 输出结果为：
    // 2 => 此时this指向obj对象
```

```
    var a = 1;
    var obj = {
        a: 2,
        fn: function () {
            return this.a;
        }
    }
    var f1 = obj.fn;
    console.log(f1());
    
    // 输出结果为：
    // 1 => 此时this指向Window对象，this永远指向的是最后调用它的对象，虽然fn是对象obj中的方法，但是var f1 = obj.fn这句话将obj.fn赋值给了全局变量f1，赋值的时候并没有执行函数fn，因此最终调用fn的是全局对象。
```

```
    var a = 1;
    var obj = {
        a: 2,
        fn: function () {
            return this.a;
        }
    }
    var f1 = obj.fn();
    console.log(f1);
    
    // 输出结果为：
    // 2 => 调用fn的是对象obj
```

- ##### 如果一个函数中存在this，并且包含该函数的对象同时也被另一个对象所包含，尽管这个函数是被最外层对象所调用的，但是this指向该函数的上一级对象；

```
    var a = 1;
    var obj = {
        a: 2,
        b: {
            a: 3,
            fn: function () {
                console.log(this.a);
            }
        }

    }
    obj.b.fn();
    
    // 输出结果为：
    // 3 => this指向对象b
```

```
    var a = 1;
    var obj = {
        a: 2,
        b: {
            fn: function () {
                console.log(this.a);
            }
        }

    }
    obj.b.fn();
    
    // 输出结果为：
    // undefined => this指向对象b，b中没有定义变量a，因此返回undefined
```

#### 3. 构造函数调用模式
- ##### 如果一个构造函数或者类方法中存在this，那么this指向由构造函数或者类方法创建出来的实例对象

```
    function Person() {
        this.name = 'Lily';
    }
    var person = new Person();
    console.log(person.name); // Lily
```

```
    class Person2 {
        constructor() {
            this.name = 'Lucy';
        }
    }
    var person2 = new Person2();
    console.log(person2.name); // Lucy
```
- ##### 如果一个构造函数或者类方法中存在this，且显示返回了引用类型的数据，那么this指向函数返回值

```
    // 显示返回基本类型的数据，this仍然指向实例对象
    function Person3() {
        this.name = 'Lily';
        return null;
        // return undefined;
        // return ''; 
    }
    var person3 = new Person3();
    console.log(person3.name); // Lily 
```

```
    function Person4() {
        this.name = 'Lily';
        return function() {}
    }
    var person4 = new Person4();
    console.log(person4.name); // '' => 这里返回的是一个匿名函数，函数本身具有name属性，表示函数名，因此person4.name为空字符串

    class Person5 {
        constructor() {
            this.name = 'Lucy';
            return {};
        }
    }
    var person5 = new Person5();
    console.log(person5.name); // undefined => 显示返回{}，该对象中没有name属性，因此person5.name为undefined
```

#### 4. call/apply调用模式
- ##### func.call(thisVal, arg1, arg2, ...)：该方法可以给函数配置特定的执行上下文。
> 参数thisVal：可选，表示调用函数func时的执行上下文；<br/>
> 在非严格模式下：<br/>
> 如果该参数的值为null或者undefined或者不传参，则this指向全局对象；<br/>
> 如果该参数的值为基本数据类型，如字符串、数字、布尔型等，则this指向对应的包装类String/Number/Boolean；<br/>
> 如果该参数的值是一个对象，则this指向该对象；<br/>
> 如果该参数的值是一个函数，则this指向这个函数的引用。
> <br/>
> 参数arg1, arg2, ...：可选，传入被调用函数func中的参数列表

- ##### func.apply(thisVal, [argsArray])：与call方法类似，区别在于call接收的是参数列表，apply接收的是一个类似于数组的对象。<br/>
> 参数[argsArray]：可选，值为一个数组或者伪数组，会将（伪）数组中的元素作为单独的参数传递给func函数。

```
    var obj = {
            name: 'Lily',
            age: 1
        },
        name = 'Lucy',
        age = 2;

    function fn(province, city) {
        console.log(this.name, this.age, province, city)
    }
    fn('安徽', '合肥'); // Lucy 2 安徽 合肥 => this指向全局对象
    fn.call(obj, '浙江', '杭州'); // Lily 1 浙江 杭州 => this指向obj
    fn.call(null, '安徽', '合肥'); // Lucy 2 安徽 合肥 => this指向全局对象
    fn.apply(obj, ['浙江', '杭州']); // this指向obj
    fn.apply(undefined, ['安徽', '合肥']); // Lucy 2 安徽 合肥 => this指向全局对象
```

```
    function Person(name) {
        this.name = name;
        console.log(this instanceof Student); // true
    }

    function Student(name, age) {
        Person.call(this, name); // this指向Student的实例对象
        this.age = age;
        console.log(this instanceof Student); // true
    }

    var student = new Student('Jack', 18);
    console.log(student); // Student {name: "Jack", age: 18}
```
#### 5. bind调用模式
- ##### func.bind(thisVal, arg1, arg2, ...)：该函数会创建一个新的绑定函数，绑定函数与原始函数(func)具有相同的代码和作用域，但是执行上下文可能不同。
> 参数thisVal：绑定函数执行时的上下文<br/>
参数arg1, arg2, ...：绑定函数参数列表中的预置参数

```
    var obj = {
        a: 2,
        fn: function () {
            console.log(this.a)
        }
    };
    obj.fn(); // 2 => this指向obj
    var foo = obj.fn;
    foo(); // undefined => this指向window，严格模式下会报错
    var foo2 = obj.fn.bind(obj);
    foo2(); // 2 => this指向obj
    
    // 使用apply或者call函数无法改变一个绑定函数的上下文，甚至是再次使用bind进行绑定也不会改变。
    var obj2 = {
        a: 3
    };
    foo2.call(obj2); // 2 => this指向obj
    foo2.apply(obj2); // 2 => this指向obj
    foo2.bind(obj2)(); // 2 => this指向obj
    
    // 只有绑定函数的构造函数调用才能改变绑定函数的上下文，但是不推荐这种做法
    new foo2(obj2); // undefined
```
#### 6. 箭头函数中的this
箭头函数没有自己的this，它的this从定义它的代码块中获取，因此箭头函数的this是固定的，无法通过bind()、call()、apply()这些方法去改变this的指向。

```
    function Timer() {
        this.s1 = 0; // this指向实例对象
        this.s2 = 0; // this指向实例对象
        setInterval(() => {
            this.s1++; // this绑定定义时所在的环境，即Timer函数
        }, 1000);
        setInterval(function () {
            this.s2++; // this指向运行时所处的环境，这里指向全局对象
        }, 1000)
    }

    var timer = new Timer();
    setTimeout(() => {
        console.log(timer.s1); // 3
    }, 3100);
    setTimeout(() => {
        console.log(timer.s2); // 0
    }, 3100);
```

``` 
    // 箭头函数的this是固定的，无法通过bind()、call()、apply()这些方法去改变this的指向
    var val = (function () {
        return (() => this.x).bind({
            x: 'inner'
        })();
    }).call({
        x: 'outer'
    });
    console.log(val); // outer => this指向外层的{ x: 'outer' }
```
### 二、总结<br/>
下次遇到有关this指向的问题时，如果是普通函数，思考是谁调用了它，如果是箭头函数，思考它是定义在哪个环境中的。
![image](https://note.youdao.com/yws/api/personal/file/25AA8F6AED014D24AC01DFD4FC6697DE?method=download&shareKey=c540aca3bfdfba949a82a4f6e43e280a)