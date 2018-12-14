# Node.js - 第三天

## 复习
1.什么是nodejs
2.nodejs的特点
3.使用express框架创建web应用
3.配置路由中间件
4.使用body-parser解析post请求参数
5.配置访问静态文件

## 学习内容
1.npm命令卸载第三方模块
2.module.export和exports的导出模块的使用
3.能使用nodejs完成数据库连接
4.能使用nodejs操作mysql数据

## npm命令行工具完成安装和卸载

使用 `npm uninstall [包名] [参数]`

注意参数同安装参数

-g 代表从全局卸载
--save 和 --save-dev代表在当前项目中删除

## 模块的导出

除了第三方的模块和核心模块，我们可以创建本地的模块,因为每个模块都有自己的作用域，需要通过module.exports暴露变量,供其他文件使用

nodejs环境下的js文件module代表当前模块, 
module下有一个exports属性, 可以暴露出当前模块的变量

    // test.js
    const a = 123;
    module.exports = a; // 暴露出变量a
    
    // 使用自己创建的模块
    const test = require("./test"); // 注意是相对路径
    console.log(test.a); // 打印出123

一个exports； exports指向module下的exports属性
相当于node为每个模块顶部有一条隐藏的命令 

    module.exports = {}
    const exports = module.exports;

因此exports是一个对象， 注意：切记不能再模块内把exports指向别的值,只能给exports添加属性

    // 错误写法
    const a = 123; 
    exports = a; // 这里修改了exports变量的值，不再指向module.exports,无法暴露变量a；
    
    // 正确写法
    const a = 123;
    export.a = a; // 给exports对象赋值

**注意：** 基本使用参考 example/01-导入模块测试.js; 启动命令: `node 01-导入模块测试`

## 自定义模块的导入

自己创建的模块导入必须要在前面加上相对路径; 如上例的test.js,导入该模块需要在前面加上 "./", 代表当前目录下test.js模块文件

    const test = require("./test");

注意： 导入node_modules的第三方下载模块和核心的模块不需要加绝对路径； 如：

    const express = require("express");

## 博客项目框架搭建

博客项目框架结构(参考example/blog):

    blog // 项目根目录
        - lib //存放封装的模块          
            -db.js //封装数据库操作模块
        - public // 静态文件资源
        - routes // 页面控制器
            - register.js // 注册页的操作文件
        - views // 存放ejs模板页面(ejs类似于art-template模板)
            - register.ejs
        - app.js // 项目启动文件
        - .... // 项目其他文件

注册功能开发流程:

1. **app.js 导入需要的模块(注意第三方模块需要提前安装)**

    ```
    const express = require("express");
    const bodyParser = require("body-parser")
    const register = require("./routes/register") // 该文件未创建
    const app = express();
    ```

2. **app.js 注册bodyParser中间**

    ```
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    ```

3. **app.js 设置模板引擎和模板存放的文件夹**

    ```
    app.set("view engine", "ejs");
    app.set('views', __dirname + '/views'); // 根目录的views文件夹存放ejs模板
    ```

4. **app.js  注册路由**

    ```
    app.get("/register", register.form);
    app.post("/register", register.submit);
    // 启动web应用
    app.listen(3000, () => {
        console.log("服务器启动");
    })
    ```

5. **routes/regster.js 创建注册页控制器**

    ```
    const db = require("../lib/db"); // 该模块未封装
        
    exports.form = function(req, res){
        res.render("register")
    }
    // 处理注册页的注册提交
    exports.submit = function(req, res){
        var data = req.body;
        db.insertUser(data); // 新增用户数据
        res.send("注册成功")
    }
    ```



6. **创建博客项目使用的database仓库**

因为需要创建一个新database，所以在创建模块之前，先在mysql执行以下命令

- 创建blog仓库`create database bolg;`
- 使用该仓库`use bolg;`

7. **lib/db.js 数据库操作模块**

    ```
    // 导入mysql模块
    const mysql = require('mysql');
    
    // 创建数据库链接
    const connection  = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'blog'
    });
    
    // 开启链接
    connection.connect();
    
    // 封装sql执行函数
    let query = function (sql) {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            // connected!
        });
    }
    
    // 用户表结构
    let users =
        `create table if not exists users(
         id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL COMMENT '用户名',
         pass VARCHAR(100) NOT NULL COMMENT '密码',
         avator VARCHAR(100) NOT NULL COMMENT '头像',
         moment VARCHAR(100) NOT NULL COMMENT '注册时间',
         PRIMARY KEY ( id )
        );`
    
    // 封装创建表的方法
    let createTable = ( sql ) => {
        return query( sql, [] )
    }
    
    // 建表
    createTable(users)
    
    // 注册用户
    exports.insertUser = ( value ) => {
    	let _sql = `insert into users set name=${value.username},pass=${value.password},avator="",moment="";`
    	return query( _sql )
    }
    ```



8. **启动项目`node app.js**`


访问： http://lcoalhost:3000/register

注意： 要查看是否注册流程能正常添加数据， 可以在mysql命令行执行 `select * from users;` 命令,  也可以使用navicat等数据库界面软件

## 总结：

1.npm命令卸载第三方模块
2.module.export和exports的导出模块的使用
3.数据库操作模块的链接数据库操作
4.新建用户表
5.插入一条用户数据
6.完成注册流程