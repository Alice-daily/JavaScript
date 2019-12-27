function Student(name, age) {
  this.name = name
  this.age = age
}
Student.prototype.sayName = function() {
  console.log(this.name)
}
const student1 = new Student('Lucy', 18)
console.log(student1) // Student { name: 'Lucy', age: 18 }
student1.sayName() // Lucy

const student2 = new Student('Lily', 20)
console.log(student2) // Student { name: 'Lily', age: 20 }
student2.sayName() // Lily

console.log(student1.sayName === student2.sayName) // true
