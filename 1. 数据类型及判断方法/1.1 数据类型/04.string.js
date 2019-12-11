const str1 = 'hello';
const str2 = 'world';

// 1、charAt()：返回指定位置的字符
console.log(str1.charAt(1)); // 'e'

// 2、concat：拼接字符串，在实践中更多的使用‘+’来进行字符串的拼接
console.log(str1.concat(str2)); // 'helloworld'
console.log(str1 + str2); // 'helloworld'

// 3、slice(start, end)：切割字符串
// start：表示从start开始截取字符串，end：表示截取到end位置为止，不包含end；
// end可以省略，如果省略则表示一直截取到字符串的末尾。
console.log(str1.slice(1, 3)); // 'el'
console.log(str1); // 'hello，str1的值没有改变，说明slice函数不会改变原始字符串，而是产生新的字符串。
console.log(str2.slice(1)); // 'orld'

// 如果start/end为负数，slice会将它们与字符串的长度相加
console.log(str1.slice(-4, -2)); // 'el'，相当于slice(1, 3)
// 如果end < start，返回空字符串
console.log(str1.slice(3, 1)); // ''

// 4、substring(start, end)：切割字符串
// start：表示从start开始截取字符串，end：表示截取到end位置为止，不包含end；
// end可以省略，如果省略则表示一直截取到字符串的末尾。
console.log(str1.substring(1, 3)); // 'el'
console.log(str1); // 'hello'，str1的值没有改变，说明substring函数不会改变原始字符串，而是产生新的字符串。
console.log(str2.substring(1)); // 'orld'

// 如果start/end为负数，substring会将它们都转换为0
console.log(str1.substring(-2, -1)); // ''
// 如果end < start，substring会将start和end的值交换
console.log(str1.substring(3, 1)); // 'el'，相当于substring(1, 3)

// 5、substr(start, end)：截取字符串
// start：表示从start开始截取字符串，end：表示要截取的字符串的个数，如果end的值大于字符串的长度，则截取到该字符串的末尾即可。
// end可以省略，如果省略则表示一直截取到字符串的末尾。
console.log(str1.substr(2, 1)); // 'l'
console.log(str1); // 'hello，str1的值没有改变，说明substr函数不会改变原始字符串，而是产生新的字符串。
console.log(str1.substr(2, 7)); // 'llo'
console.log(str1.substr(2)); // 'llo'

// 如果start为负数，则将其与字符串的长度相加
// 如果end为负数，则将其转换为0
console.log(str1.substr(-2, -4)); // ''，相当于substr(3, 0)

// 6、indexOf(child, pos)：从字符串的开头向后中搜索给定的子字符串，返回子字符串第一次出现的位置，如果不存在该子字符串，则返回-1
// child：表示待查找的子字符串
// pos：可选，表示从该位置开始查找，默认为0
console.log(str1.indexOf('l')); // 2
console.log(str1.indexOf('l', 3)); // 3
console.log(str1.indexOf('w')); // -1

// 7、lastIndexOf(child, pos)：从字符串的末尾向前搜索给定的子字符串，返回子字符串第一次出现的位置，如果不存在该子字符串，则返回-1
// child：表示待查找的子字符串
// pos：可选，表示从该位置开始查找，默认为0
console.log(str1.lastIndexOf('l')); // 3
console.log(str1.lastIndexOf('l', 3)); // 3
console.log(str1.lastIndexOf('w')); // -1

// 8、trim()：去除字符串开头和末尾的空格，并返回新字符串
const str3 = '  hello   ';
console.log(str3.trim()); // 'hello'

// 9、replace(param1, param2)：用某个字符串替换子字符串
// param1: 表示被替换掉的子字符串
// 如果param1的值为字符串，则只会替换第一个子字符串；
// 如果param1的值为一个指定了全局表示的正则表达式，则会替换所有子字符串
// param2：替代子字符串的新字符串
const str4 = 'hello world, hello music';
console.log(str4.replace('hello', 'bye')); // 'bye world, hello music'
console.log(str4.replace(/hello/g, 'bye')); // 'bye world, bye music'

// 10、split(sep)：基于指定的分隔符将一个字符串分割为多个子字符串，并将子字符串存到数组中返回。
const str5 = 'a,b,c,d';
console.log(str5.split(',')); // [ 'a', 'b', 'c', 'd' ]