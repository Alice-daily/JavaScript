function MyVue(options) {
  var data = options.data
  if (data) {
    var keys = Object.keys(data)
    keys.forEach(key => {
      // 在MyVue实例对象上添加data中自定义的属性
      Object.defineProperty(this, key, {
        set(val) {
          data[key] = val
        },
        get() {
          return data[key]
        }
      })
    })
  }
}
var vm = new MyVue({
  data: {
    name: 'yjj'
  }
})
console.log(vm.name) // yjj
vm.name = 'jjyou'
console.log(vm.name) //jjyou
