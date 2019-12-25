var person = {
  _firstName: 'jingjing',
  _lastName: 'you'
}
Object.defineProperties(person, {
  name: {
    set(val) {
      this._firstName = val.split(' ')[0]
      this._lastName = val.split(' ')[1]
    },
    get() {
      return this._firstName + ' ' + this._lastName
    },
    enumerable: true
  },
  age: {
    value: 18,
    writable: false,
    enumerable: true
  }
})
console.log(person.name) // jingjing you
console.log(person.age) // 18

var descriptor = Object.getOwnPropertyDescriptor(person, 'age')
console.log(descriptor.value, descriptor.writable) // 18 false
