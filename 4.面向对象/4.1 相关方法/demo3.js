function Person(name) {
  this.name = name
}
Person.prototype.sayName = function() {
  return this.name
}
let person1 = new Person('Lily')
const name = person1.sayName()
console.log(name) // Lily

console.log(Person.prototype.isPrototypeOf(person1)) //true
console.log(Object.prototype.isPrototypeOf(person1)) // true

console.log(Function.prototype.isPrototypeOf(Person)) // true
console.log(Object.prototype.isPrototypeOf(Function)) // true
console.log(Object.prototype.isPrototypeOf(Person)) // true
