// 创建对象的两种方式：
// 1. 对象字面量
const student1 = {
  name: 'Lily',
  age: 18,
  sayName: function() {
    console.log(this.name)
  }
}
console.log(student1) // { name: 'Lily', age: 18, sayName: [Function: sayName] }
student1.sayName() // Lily
console.log(student1.constructor) // [Function: Object]

// 2. 构造函数
function Student(name, age) {
  this.name = name
  this.age = age
  this.sayName = function() {
    console.log(this.name)
  }
}

const student2 = new Student('Lucy', 18)
console.log(student2) // Student { name: 'Lucy', age: 18, sayName: [Function] }
student2.sayName() // Lucy
console.log(student2.constructor) // [Function: Student]

const student3 = new Student('Jack', 20)
console.log(student2.sayName === student3.sayName) // false
