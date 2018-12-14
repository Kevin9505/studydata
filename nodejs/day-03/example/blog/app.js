const express = require("express");
const bodyParser = require("body-parser")
// 自定义模块
const register = require("./routes/register")

const app = express();

// 注册body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置模板引擎和模板存放的文件夹
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.get("/register", register.form);
app.post("/register", register.submit);

app.listen(3000, () => {
    console.log("服务器启动");
})