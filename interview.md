# javaSctipt 数组操作 整理

### filter的用法
filter用于把Array的某些元素过滤掉，然后返回剩下的元素。
和map()类似，Array的filter()也是接收一个函数。map()不同的是，filter()把传入的函数依次作用于每个元素，
然后根据返回值是true还是false决定保留还是丢弃该元素。
+ 例子 ： 在一个Array中，删除偶数，值保留奇数
```js
var arr = [1,2,3,4,5,6,7,8,9];
var res = arr.filter(function (x) {
  return x % 2 !== 0;
})

console.log(res);  // [1,3,5,7,9]

```
filter() 接收回调函数，可以有多个，通常我们仅使用第一次参数，表示Array的某个元素。回调函数还可以接收另两个参数，
表示元素的位置和数组本身
+ 例子 ： 
```js
var arr = ['A','B','C']
var res = arr.filter(function(element, index, self){
  console.log(element) // 依次打印 'A' 'B' 'C'
  console.log(index) // 0  1  2
  console.log(self)  // self 就是变量本身arr
  return true
})

```
+ 利用filter，可以巧妙地去掉Array的重复元素
```js
'use strict'
var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry']
const res = arr.filter(function(element, index, self){
  return self.indexOf(element) === index
})

console.log(res.toString()) // apple,strawberry,banana,pear,orange

// 去除重复元素依靠的是indexOf()总是返回第一个元素的位置，后续的重复元素位置与indexOf()的位置不相等，因此被filter过滤掉了。
```

### map() 与 forEach() 的用法
+ 相同点
  - 都是遍历数组中的每一项
  - 每次执行匿名函数都支持三个参数，参数分别为item (当前每一项)，index (索引值)，arr (原数组)
  - 匿名函数中的this都是指向window
  - 只能遍历数组
+ 不同点 map()
 - map() 方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值，也就是map()进行处理之后返回一个新的数组
` 注意: map() 方法不会对空数组进行检测 `
` 注意: map() 方法不会改变原始数组 `
```js
var arr = [0,2,4,6,8]
var str = arr.map(function(item, index, arr){
  console.log(this)  // window
  console.log(item)
  console.log(index)
  console.log(arr) // 会执行5次
  return item / 2
},this)
console.log(str) // [0,1,2,3,4]

```
  - forEach()
forEach() 方法用于调用数组的每一个元素，将元素传给回调函数
` forEach() 对于空数组是不会调用回调函数的 `
` 没有返回一个新数组 & 没有返回值 `
应用场景: 为一些相同的元素，绑定事件处理器
```js
var arr = [0,2,4,6,8]
var sum = 0
var str = arr.forEach(item, index, arr){
  sum += item
}
console.log(str)

```








