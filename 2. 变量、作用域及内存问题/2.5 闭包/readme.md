**重点：**
- [x] 当函数可以记住并访问所在的词法作用域，即使是在所在词法作用域之外执行的，这时就产生了闭包

---
### 一. 闭包的概念
> 当函数可以记住并访问所在的词法作用域，即使函数是在所在词法作用域之外执行，这时就产生了闭包。<br/>
词法作用域：指定义在词法阶段的作用域，通俗点说，词法作用域是由我们写代码时，将变量和块作用域写在哪里决定的。

闭包最常见的创建方式是在函数内部返回另一个函数：
```
    function foo() {
        var a = 1;
        function bar() {
            console.log(a)
        }
        return bar;
    }

    var baz = foo();
    baz(); // 1
    
    // 解除对内部函数bar()的引用（以便释放内存）
    baz = null;
```
**分析：** 以上代码先定义了foo()函数，然后又在全局作用域中调用了它，并将返回值赋值给了变量baz，之后又调用了baz();
- 当程序开始执行的时候，会先创建全局上下文的变量对象，该变量对象包含foo和baz；
- 当调用foo()时，会创建一个包含arguments、a、bar的活动对象，因此对于foo()函数的执行上下文而言，其作用域链包含两个对象：foo函数上下文活动对象和全局上下文变量对象；
- 当调用baz()的时候，实际上就是通过不同的标识符调用了foo()函数内部的bar()，**在函数内部定义的函数会将包含函数的活动对象添加到它的作用域链中**，因此，内部函数bar的作用域链中会包含外部函数foo()的活动对象。当内部函数bar()从foo()中被返回后，其作用域链会被初始化为外部函数的活动对象和全局上下文变量对象；
- 当foo()函数执行完后，其执行上下文的作用域链会被销毁，但是它的活动对象仍然会留在内存中，因为内部函数bar的作用域链仍然在引用这个活动对象，直到内部函数bar被销毁后，foo()的活动对象才会被销毁。

**提示：** 
- 在函数内部返回另一个函数会形成闭包，但是不表示这个就是闭包的语法规则，闭包应该是一种现象，我们要做的是理解这种现象产生的原因，而不是固化的认为某种写法是闭包的语法。
- 由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存，过度使用闭包可能会导致内存占用过多，因此需要慎重使用。

### 二. 循环与闭包
```
    function foo() {
        for (var i = 0; i < 5; i++) {
            setTimeout(function timer() {
                console.log(i);
            }, i * 1000)
        }
    }
    foo(); // 5 5 5 5 5 ，每隔1s输出一个5
```
**分析：** 函数foo()的执行结果为：5 5 5 5 5，每隔1s输出一个5，为什么不是预期中的0, 1, 2, 3, 4呢？<br/>
- 延迟函数setTimeout的回调函数timer()会在for循环结束时才会执行，当定时器运行时，即便每个迭代中是setTimeout(..., 0)，所有的回调函数依然是在循环结束后才会被执行；
- 循环结束的条件是i>=5，因此当i=5时，循环结束，执行setTimeout中的回调函数timer()，此时执行栈中有5个timer()，每个timer()的作用域链上包含三个对象：timer()函数执行上下文活动对象、foo()执行上下文活动对象、全局执行上下文变量对象；
- 函数timer()中需要访问变量i，而其函数作用域中没有声明变量i，因此继续沿其作用域链查找，在timer()的外部函数foo()中查找到了变量i，此时循环已经结束，i的值为5，因此timer()执行会输出5。


```
    function foo2() {
        for (var i = 0; i < 5; i++) {
            (function (j) {
                setTimeout(function timer() {
                    console.log(j);
                }, j * 1000);
            })(i);
        }
    }
    foo2(); // 0 1 2 3 4
```
**分析：** 函数foo2()的执行结果为0，1，2，3，4。<br/>
- 函数foo2()与函数foo()的不同之处在于：foo2()的for循环内部使用立即执行函数表达式（(function(){...})()，后面使用IIFE表示）为每个迭代生成了一个新的作用域，因此执行栈中的每个回调函数timer()的作用域链都包含了四个对象：timer()函数执行上下文活动对象、IIFE执行上下文活动对象、foo()执行上下文活动对象、全局执行上下文变量对象。
- 函数timer()中需要访问变量j，而其函数作用域中没有声明变量j，因此继续沿着其作用域链查找，在IIFE中查找到了变量j，变量j保存了每次迭代时i的值（因为IIFE将i的值传递给了参数j），因此5条作用域链中IIFE执行上下文的活动对象中的j的值分别为0，1，2，3，4。

使用ES6中的let声明变量i也可以达到foo2()的执行结果。

```
    function foo3() {
        for (let i = 0; i < 5; i++) {
            setTimeout(function timer() {
                console.log(i);
            }, i * 1000)
        }
    }
    
    foo3(); // 0 1 2 3 4
```
**分析：** 函数foo3()的执行结果为0，1，2，3，4。<br/>
使用let声明变量会形成块级作用域，因此执行栈中的每个回调函数timer()的作用域链都包含了四个对象：timer()函数执行上下文活动对象、let块执行上下文活动对象、foo()执行上下文活动对象、全局执行上下文变量对象。

### 三、用闭包模拟私有方法
> 编程语言中，比如Java，是支持将方法声明为私有的，即它们只能被同一个类中的其他方法所调用。而JavaScript没有这种原生支持，但是我们可以使用闭包来模拟私有方法，私有方法不仅仅有利于限制对代码的访问，还提供了管理全局命名空间的强大能力，避免非核心的代码弄乱了代码的公共接口部分。

```
    var createCounter = function () {
        var privateCount = 0;
    
        function changeBy(step) {
            privateCount += step;
        }
        return {
            increment: function () {
                changeBy(1);
            },
            decrement: function () {
                changeBy(-1);
            },
            getValue: function () {
                return privateCount;
            }
        }
    }
    
    var counter1 = createCounter();
    var counter2 = createCounter();
    console.log(counter1.getValue()); // 0
    console.log(counter2.getValue()); // 0
    counter1.increment();
    counter1.increment();
    console.log(counter1.getValue()); // 2
    console.log(counter2.getValue()); // 0
```
上面的代码创建了一个叫做createCounter的计数器，该计数器可以被调用任意多次，每次调用都会创建一个新的计数器实例，每个计数器实例之间互不影响。<br/>
<br/>
当我们只需要一个实例的时候，可以对这个模式进行简单的改进来实现单例模式：
```
    var createCounter = (function () {
        var privateCount = 0;
    
        function changeBy(step) {
            privateCount += step;
        }
        return {
            increment: function () {
                changeBy(1);
            },
            decrement: function () {
                changeBy(-1);
            },
            getValue: function () {
                return privateCount;
            }
        }
    })();
    
    var counter1 = createCounter;
    var counter2 = createCounter;
    console.log(counter1.getValue()); // 0
    console.log(counter2.getValue()); // 0
    counter1.increment();
    counter1.increment();
    console.log(counter1.getValue()); // 2
    console.log(counter2.getValue()); // 2
```
