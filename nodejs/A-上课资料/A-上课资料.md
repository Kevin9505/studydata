# Nodejs

## 1.如何去对待新的事物

##.2.前端的发展史和趋势,

### 1.什么是前端

前端：针对浏览器的开发，代码在浏览器运行
后端：针对服务器的开发，代码在服务器运行

![](F:\广州传智前端-课程资料\课程-Node.js阶段\day-01\A-上课资料\images\frontend.png)

### 2.前后端不分的时代

1.前后端不分的时代
互联网发展的早期，前后端开发是一体的，前端代码是后端代码的一部分。
前端负责后端开发的界面部分

2.前端工程师的角色
那时的前端工程师，实际上是模板工程师，负责编写页面模板。
后端代码读取模板，替换变量，渲染出页面。

3.典型的 PHP 模板

	<body>
		<h1>Car {{ $data->id }}</h1>
	</body>

4.Ajax
前端不再是后端的模板，可以独立得到各种数据。
前端实现动态网页，富交互，负责数据处理

5.前后端分离
前端变成了一个完整的应用，后端提供接口服务

6.新的技术革命 Node.js
2009年，Node 项目诞生，它是服务器上的 JavaScript 运行环境。
Node = JavaScript + 操作系统 API

JavaScript 成为服务器脚本语言，与 Python 和 javascript 一样
JavaScript 成为唯一的浏览器和服务器都支持的语言
前端工程师可以编写后端程序了

## 3.Node.js的起源

**【重点】同步IO和异步IO**

**Node.js作者**
1. Node.js的作者是Ryan Dahl，他的工作是用C/C++写高性能Web服务。对于高性能，异步IO、事件驱动是基本原则，但是用C/C++写就太痛苦了。于是这位仁兄开始设想用高级语言开发Web服务。他评估了很多种高级语言，发现很多语言虽然同时提供了同步IO和异步IO，但是开发人员一旦用了同步IO，他们就再也懒得写异步IO了，所以，最终，Ryan瞄向了JavaScript。


**Node.js运行引擎**

这位仁兄曾考虑过自己写一个javascript运行引擎，不过明智地放弃了，因为V8就是开源的JavaScript引擎。让Google投资去优化V8，咱只负责改造一下拿来用，还不用付钱，这个买卖很划算。

浏览器大战的历史遗留问题

V8是由Google公司开发的一个高性能javascript解析引擎，目前chrome浏览器内置的javascript解析引擎就是V8

**Node.js诞生**
于是在2009年，Ryan正式推出了基于JavaScript语言和V8引擎的开源Web服务器项目，命名为Node.js。虽然名字很土，但是，Node第一次把JavaScript带入到后端服务器开发，加上世界上已经有无数的JavaScript开发人员，所以Node一下子就火了起来。

## 4.大前端

**全栈工程师**
不想成为全栈的前端不是好程序员

为什么呢？随着现代大型互联网应用架构越趋复杂，一个人是很难同时精通
很多领域的，但如果只是开发小型应用，应对不多的流量，借助开源软件和工具，
一个人也可以办到，这是导致全栈工程师出现的根本原因

会一门前端和一门后端就自称是全程工程师了。没错，真的可以。

## 5.node.js使用场景

![](F:\广州传智前端-课程资料\课程-Node.js阶段\day-01\A-上课资料\images\20181108182244.png)

1. 跨平台：覆盖你能想到的面向用户的所有平台，传统的PCWeb端，以及PC
  客户端nw.js/electron、移动端cordova、HTML5、react-native、weex等。
2. Web应用开发：网站、Api、RPC服务等。
3. 前端：三大框架React\Vue\Angular辅助开发，以及工程化演进过程（使
  用Gulp/Webpack构建Web开发工具）。
4. 工具：npm上各种工具模块，包括各种前端预编译、构建工具Grunt/
  Gulp、脚手架，命令行工具，各种奇技淫巧。

## 6.常见的问答


## 7.Node.js的下载安装

1.Node.js下载
Node.js官网地址 		https://nodejs.org/en/
Node.js中文网 		https://nodejs.org/zh-cn/

Node.js下载地址		http://nodejs.cn/download/
下载历史版本 		https://nodejs.org/zh-cn/download/releases/

注意：
每个版本会存在一定的兼容性问题，尽量使用长期支持(LTS)版本	

![](F:\广州传智前端-课程资料\课程-Node.js阶段\day-01\A-上课资料\images\node-install2.png)

2.Node.js安装

3.测试是否安装成功
在cmd窗口输入 `node -v`
成功打印出版本号再输入 `npm -v`

![](F:\广州传智前端-课程资料\课程-Node.js阶段\day-01\A-上课资料\images\node-install.png)

## 9.在Node.js中执行javasccript代码 

在Node.js环境中执行代码两种方法

**1.在cmd窗口输入 `node` 进入node编辑器**

- 输入 `console.log(123)` 查看输入结果
- 输入 `1+2` 查看输出结果

**2.在cmd窗口使用node命令执行js文件**

- 切换到文件目录文件夹下  `cd [文件夹路径]`
- 在cmd窗口输入 `node [js文件名]`

###【重点】浏览器端的javascript和Node.js中的JavaScript

![](F:\广州传智前端-课程资料\课程-Node.js阶段\day-01\A-上课资料\images\20181108172720.png)

1.浏览器中的JavaScript的全局对象是window, 而nodejs中全局对象是global
2.nodejs中的javascript没有DOM和BOM
3.浏览器javascript和nodejs支持的标准不一样,如(Promise)

## 10.关于ECMAScript标准

1.什么是ECMAScript标准?

2.ECMAScript的发展史

3.ECMAScript标准目前支持情况?
目前浏览器只能支持部分ECMAscript6的属性，而最新版本的nodejs能完美支持几乎所有属性

## 11.【重点】ES6-声明变量命令 var、let、const

### 1.let命令
**什么是let命令？**
let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
**let命令的特点**
1.let为javascript新增了块级作用域
2.let声明的变量只在它所在的代码块有效,if和for循环都属于代码块
3.var声明会存在变量提升，let声明不存在变量提升
4.let不允许重复声明变量

### 2.const命令
**什么是const命令**
const声明一个只读的常量。一旦声明，常量的值就不能改变。
**const命令的特点**
1.const声明的变量不得改变值
2.const不能只声明不赋值
3.const的作用域与let命令相同：只在声明所在的块级作用域内有效
**注意**
如果使用const声明一个对象或者数组，该对象和数组是可以内部属性的

## 12.ES6-模板字符串
模板字符串是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

例子：
	// 字符串中嵌入变量
	let name = "Bob";
	`Hello ${name}`

## 13.ES6-函数的扩展
### 1.参数指定默认值
ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

	function log(x = "hello", y = 'World') {
	  console.log(x, y);
	}

注意：参数变量是默认声明的，所以不能用let或const再次声明。
	
	function foo(x = 5) {
	  let x = 1; // error
	  const x = 2; // error
	}

### 2.箭头函数
**1.ES6 允许使用“箭头”（=>）定义函数**

	var f = (v) => { return v };
	
	// 等同于
	var f = function (v) {
	  return v;
	};

**2.如果箭头函数只有一个参数,可以省略小括号**
	
	var f = v => { return v };

**3.如果箭头函数 函数块 的值直接返回，可以省略大括号和return关键字**

	var f = v => v ;

**4.如果箭头函数需要直接返回对象，需要给函数块加上小括号**

	var f = v => ({ a: 1 }) ;

**5.箭头函数作用域**

	function foo() {
	  setTimeout(() => {
	    console.log('id:', this.id);
	  }, 100);
	}
	
	var id = 21;
	
	foo.call({ id: 42 });
	// id: 42

**6.注意**
1.函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
2.不可以当作构造函数，也就是说，不可以使用new命令
3.不可以使用arguments对象，该对象在函数体内不存在


## 14.Node.js模块操作
**1.使用require引入模块**

	var path = require('path');
	console.log(path.resolve(__dirname))

**2.import命令的使用**

	import path from "path";
	console.log(path.resolve(__dirname))

**3.自己编写模块,export命令的使用**
	// profile.js
	var firstName = 'Michael';
	var lastName = 'Jackson';
	var year = 1958;
	export {firstName, lastName, year};
	
	// 也可以写成
	export var firstName = 'Michael';
	export var lastName = 'Jackson';
	export var year = 1958;
	
	// main.js导入模块
	import {firstName, lastName, year} from './profile.js';
	console.log(firstName, lastName, year)

**4.export default 命令**
为模块指定默认输出,可以不用指定的输出变量名

	// export-default.js
	export default function () {
	  console.log('foo');
	}

export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字

	import xxxx from './export-default.js';

**export和export default比较**
	// print.js
	export function print() { 
		console.log(123)
	};
	
	// main.js
	import {print} from 'print'; // 输入
	
	---------------------------------------------------
	
	// print.js
	export default function print() { // 输出
	  console.log(123)
	}
	
	// main.js
	import print from './print.js'; // 输入

## 【重点】Node.js操作本地文件

1.读取本地文件

2.新建本地文件

3.写入本地文件

4.覆盖写入和新增写入

5.拷贝文件


**操作本地文件练习**

写入9*9乘法表

## 请求HTTP服务器响应流程

**客户端 - dns域名解析 - HTTP服务器**

![](F:\广州传智前端-课程资料\课程-Node.js阶段\day-01\A-上课资料\images\7cc829d3gw1f3j8irkkr5j20qo0p0goe.jpg)


## 【重点】构建HTTP服务器
1.导入http模块
2.使用http.createServer创建服务器对象
3.服务器对象监听端口
4.服务器监听并响应请求

## 参考资料

【Nodejs的诞生】	https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501245426ad4b91f2b880464ba876a8e3043fc8ef000




