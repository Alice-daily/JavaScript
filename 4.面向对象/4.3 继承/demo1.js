function SuperClass(name) {
  this.name = name
}
SuperClass.prototype.sayHello = function() {
  console.log(`hello,${this.name}`)
}

function SubClass(age) {
  this.age = age
}
// 实现继承
SubClass.prototype = new SuperClass('subClass')
SubClass.prototype.sayHello = function() {
  console.log(`hello,${this.name},${this.age}`)
}

let sub = new SubClass(18)
sub.sayHello() // hello,subClass,18

console.log(sub instanceof SubClass)
console.log(sub instanceof SuperClass)
console.log(SubClass.prototype instanceof SuperClass)
console.log(sub instanceof Object)
