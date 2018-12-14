# Nodejs-第二天
##复习

##今天学习内容
1.学习使用nodejs的express框架快速搭建web应用

2.npm的使用

2.学习路由中间件

# Node.js框架介绍
1.Express
2.Koa
3.Fastify
4.Egg
5.Meteor
.......

### Express
Express中文官网地址: http://www.expressjs.com.cn/
Express 是一个简洁而灵活的 Node.js Web应用框架, 提供一系列强大特性帮助你创建各种 Web 应用

## Npm的使用
Npm是Node默认的模块管理器，Npm不需要单独安装。在安装Node的时候，会连带一起安装npm

**1.初始化项目**
`npm init`生成package.json文件

**2.package.json的作用**
管理本地安装 npm 包，描述了你的项目依赖哪些包

**3.使用Npm安装包**
`npm install [安装参数] [包名]`

`--save`安装参数
使用 `npm install` 时增加 `--save`
`npm install --save <package_name>`  表示将这个包名及对应的版本添加到 package.json的 dependencies

下载后包会添加到项目根目录的`node_modules`文件夹中

**4.卸载Npm包**
`npm uninstall [安装参数] [包名]`

## 下载并创建Express应用
1.下载express
`npm install --save express`

2.创建第一个Express应用

	const express = require('express')
	const app = express()
	
	app.get('/', (req, res) => res.send('Hello World!'))
	app.listen(3000, () => console.log('Example app listening on port 3000!'))

## 【重点】使用router中间件响应不同的页面
文档地址： http://www.expressjs.com.cn/4x/api.html#router

## 返回html静态页面

调用express response对象下sendFile方法

文档地址:  http://www.expressjs.com.cn/4x/api.html#res.sendFile

## 编写api接口

调用express response对象下json方法

文档地址：http://www.expressjs.com.cn/4x/api.html#res.json

## body-parser模块的使用

用于解析post请求的参数 

导入中间件

`const bodyParser = require('body-parser')`

注册body-parser中间件

```
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
```

通过 `res.body`获取post请求的参数

```
router.post("/api/add", (req, res) => {
    console.log(req.body);
    res.json({status: "success"})
})
```

## Express响应静态资源

设置静态文件目录到public文件夹下

`app.use(express.static('public'))`

## art-template模板引擎的使用




## 项目介绍


## 参考资料
【NPM的起源故事】  https://blog.csdn.net/qq_37696120/article/details/80507178
【NPM介绍】	https://blog.csdn.net/u011240877/article/details/76582670#%E4%BB%80%E4%B9%88%E6%98%AF-npm


