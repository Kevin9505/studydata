# Node.js - 第四天

## 学习内容
1.实现登录功能
2.使用session模块记录用户id
3.添加用户中间件， 把登录用户信息添加到 res.locals.user
4.文章编辑页添加验证用户是否登录中间件
5.登录页url添加来源页返回功能
6.新增文章提交实现
7.首页显示文章列表

## 1.实现登录功能

**1.预备知识**

1.res.redirect()重定向的使用

该方法可以跳转跳转到网站内部的其他路由， 如跳转到首页 

`res.redirect("/")`

2.req.session的使用，依赖第三方session模块`express-session `

安装：

`npm install express-session`

使用：

```
//所属文件 app.js

const session = require('express-session');

// 注册session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
```

**2.登录页代码实现**

```
// 所属文件 routes/login.js

const db = require("../lib/db");
let returnUrl;

// 登录内容
exports.form = function(req, res){
    returnUrl = req.query.return;
    res.render("login")
}

// 登录逻辑
exports.submit = function(req, res){
    const data = req.body;

	// 根据用户名和密码判断用户是否存在
    db.existUser([data.username, data.password], (result) => {
        if(result.length > 0){
            const user = result[0];
            
            // 把id存到session,用来判断用户是否登录
            req.session.uid = user.id;
			
			// 是否存在需要返回的url,存在即跳转会原页面
			// 改功能和第三点关联 （3.文章编辑页添加验证用户是否登录中间件）
            if(returnUrl){
                res.redirect(returnUrl);
                return;
            }

            res.redirect("/");
        }else{
            res.send("Sorry! invalid credentials.");
        }
    });
}
```



##2. 添加用户中间件， 把登录用户信息添加到 res.locals.user

预备知识：

res.locals的使用，把数据记录到res.locals对象下

```
// 所属文件 lib/middleware/user.js
// 文件主要作用： 主要的作用是把当前用户设置到 res.locals， 所有的请求的res对象都能获取

const db = require("../db");

module.exports = function(req, res, next){
	// 获取session中的id， 登录时设置的
    const uid = req.session.uid;
    if(!uid){
        return next();
    }
	
	// 如果用户已登录， 根据id获取到用户的详细信息
    db.findUserById(uid, (result) => {
        if(result.length > 0){
            const user = result[0];
            
            // 写入到res.locals
            res.locals.user = user;
        }
        next();
    })
}
```

```
// 所属文件 app.js

// 导入自定义的中间件
const user = require("./lib/middleware/user");

// 注册中间件
app.use(user);
```



##  3.文章编辑页添加验证用户是否登录中间件

```
module.exports = function(req, res, next){
	
	// 获取上例的用户中间设置res.locals.user
    const user = res.locals.user;
	
	// 设置需要返回的url给登录页，登录后直接跳转到该原来页面
    const returnUrl = req.url;

    if(!user){
        res.redirect(`/login?return=${returnUrl}`);
        return;
    }
    next();
}
```



## 4.新增文章提交实现



```
// 所属文件： routes/post.js

const db = require("../lib/db");

// 新增文章页
exports.form = function(req, res){
    res.render("post-edit");
}

// 处理表单提交
exports.submit = function(req, res){
    const data = req.body;

	// 调用db的方法写入一篇文章
    db.insertPost([ 
        res.locals.user.name,
        data.title,
        data.content,
        res.locals.user.id,
     ], (result) => {
        res.redirect("/");
    })
}

```



## 5.首页显示文章列表

```
// 所属文件： routes/index.js

const db = require("../lib/db");

exports.view = function(req, res){

	// 查找所有的文章
    db.findAllPosts(result => {
        res.render("index", { posts: result });
    })
}
```



## 6. 最终的 lib/db.js 文件

```
// 导入mysql模块
const mysql = require('mysql');

// 创建数据库链接
const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});

// 开启链接
connection.connect();

// 用户表结构
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`

let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '文章作者',
     title TEXT(0) NOT NULL COMMENT '题目',
     content TEXT(0) NOT NULL COMMENT '内容',
     uid VARCHAR(40) NOT NULL COMMENT '用户id',
     moment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '发表时间',
     comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
     pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
     PRIMARY KEY(id)
    );`

// 封装创建表的方法
let createTable = ( sql ) => {
    return connection.query(sql, function (error, results, fields) {
        if (error) throw error;
    });
}

// 建表
createTable(users)
createTable(posts)

// 注册用户
exports.insertUser = ( value ) => {
    connection.query( 
        "insert into users set name=?,pass=?,avator='',moment='';",
        value,
        function (err, results, fields) {
            if (err) throw err;
            // connected!
        }
    );
}

// 查找用户
exports.findUserByName = ( name, callback ) => {
    connection.query(
        "select * from users where name=?;",
        [name],
        function(err, results, fields){
            if(err) throw err;

            callback(results);
        }
    )
}

// 根据id查找用户
exports.findUserById = (id, callback) => {
    connection.query(
        "select * from users where id=?;",
        [id],
        function(err, results, fields){
            if(err) throw err;

            callback(results);
        }
    )
}

// 用户是否存在
exports.existUser = (value = [], callback) => {
    connection.query(
        "select * from users where name=? and pass=?;",
        value,
        function(err, results, fields){
            if(err) throw err;

            callback(results);
        }
    )
}

// 写入文章
exports.insertPost = (value = [], callback) => {
    connection.query(
        "insert into posts set name=?,title=?,content=?,uid=?",
        value,
        function(err, results, fields){
            if(err) throw err;
            callback(results);
        }
    )
}

// 查找所有的文章
exports.findAllPosts = (callback) => {
    connection.query(
        "select * from posts;",
        function(err, results, fields){
            if(err) throw err;
            callback(results);
        }
    )
}
```

## 总结

1.res.redirect()重定向的使用

2.express-session模块的使用

3.res.locals通过中间件绑定登录用户数据

4.实现文章页的判断用户是否登录逻辑