const obj = {
  a: 1,
  b: {
    c: 2
  },
  d: null,
  e: '123',
  f: true,
  g: undefined,
  h: [1, 2, 3]
}

function deepCopy(obj) {
  let newObj = obj instanceof Array ? [] : {}
  Object.keys(obj).forEach(key => {
    let item = obj[key]
    if (item && typeof item === 'object') {
      newObj[key] = deepCopy(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

const newObj = deepCopy(obj)
console.log(newObj)
obj.b.c = 3
console.log(newObj.b.c)
obj.h[1] = 5
console.log(newObj.h)
