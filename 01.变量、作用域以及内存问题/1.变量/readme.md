### 重点：
- [x] JS中只存在**按值传递**

---

JS中的变量可能包含两种不同类型的值：基本类型和引用类型。

#### 1、基本数据类型的值是按值访问的，引用数据类型的值是按引用访问的。
- 如果变量的值是基本数据类型，则保存的是实际的值；如果变量的值是引用数据类型，则保存的是对象在内存中的地址。
- 因此当操作值为基本数据类型的变量的时候，操作的就是保存在变量中的实际的值；当操作值为引用数据类型的变量的时候，实际上操作的是对象的引用而不是实际的对象（这个说法也不是特别严谨，当进行复制操作的时候，操作的是对象的引用，当为对象增删改查属性的时候，操作应该是这个对象本身）。
- 《JS高级程序设计》这本书上说，基本类型的值是按值访问，引用类型的值是按引用访问。个人觉得可以都理解为按值访问，只是基本类型的值是我们理解中的实际的值，而引用类型的值是对象的引用。这样便于理解按值传递，而不会将两者混淆。

#### 2、按值传递
- 当对值为基本类型的变量进行复制操作时，复制的是该变量所保存的值，复制后的变量之间互不影响。

```
var str1 = 'hello world';
var str2 = str1;
str2 = 'bye';
console.log(str1); // hello world
console.log(str2); // bye
```
- 当值为引用类型的变量进行复制操作时，复制的也是该变量所保存的值，只是该值是对象的引用，复制后的变量之间会存在影响。

```
var obj1 = {};
var obj2 = obj1; 
console.log(obj1.name, obj2.name); // undefined undefined

obj2.name = 'Lily';
console.log(obj1.name, obj2.name); // Lily Lily

obj2 = {};
console.log(obj1.name, obj2.name); // Lily undefined
```
![image](https://note.youdao.com/yws/api/personal/file/26F420EF729B4590A5F729F703CB0076?method=download&shareKey=cb63e739fab39cde3cf4083efe90cf27)

- JS中所有函数的参数也都是按值传递。

```
function add(num) {
    num += 10;
    return num;
}
var count = 20
var sum = add(count);
console.log(count, sum); // 20 30
```

```
function setName(obj) {
    obj.name = "Lily";
}
var person = {};
setName(person);
console.log(person.name); // Lily
```

```
function setName(obj) {
    obj.name = 'Lily';
    obj = {};
    obj.name = 'Lucy';
}
var person = {};
setName(person);
console.log(person.name); // Lily
```


<br/>