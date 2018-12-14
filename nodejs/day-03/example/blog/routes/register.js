const db = require("../lib/db");

// 处理注册页的页面返回
exports.form = function(req, res){
    res.render("register")
}

// 处理注册页的注册提交
exports.submit = function(req, res){
    var data = req.body;

    console.log(data)

    // 新增用户数据
    db.insertUser(data)

    res.send("注册成功")
}