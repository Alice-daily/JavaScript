/**
 * 模拟new运算符的实现：
 * 第一个参数为构造函数名
 * 后面的参数为传递到构造函数中的参数
 */
function create() {
  // 1.创建一个新对象
  var obj = new Object(),
    // 2.获得构造函数，arguments去除第一个参数
    Con = [].shift.call(arguments)
  // 链接到原型，obj可以访问到构造函数原型中的属性
  obj._proto_ = Con.prototype
  // 绑定this实现继承，obj可以访问构造函数中的属性
  var res = Con.apply(obj, arguments)
  // 如果构造函数返回了一个对象，则优先返回这个对象；反之，则返回新创建的这个对象。
  return res instanceof Object ? res : obj
}

// 测试一下
function Student(name, age) {
  this.name = name
  this.age = age
  this.sayName = function() {
    console.log(this.name)
  }
}

const student = create(Student, 'Lily', 18)
student.sayName() // Lily
