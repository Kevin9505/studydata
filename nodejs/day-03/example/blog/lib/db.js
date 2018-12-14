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

