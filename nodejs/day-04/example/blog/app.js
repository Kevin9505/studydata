const express = require("express");
const bodyParser = require("body-parser")
const session = require('express-session');
// 自定义模块
const user = require("./lib/middleware/user");
const register = require("./routes/register");
const login = require("./routes/login");
const post = require("./routes/post");
const index = require("./routes/index");

const anth = require("./lib/middleware/auth")

const app = express();

// 注册body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(user)

// 设置模板引擎和模板存放的文件夹
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

app.get("/register", register.form);
app.post("/register", register.submit);

app.get("/login", login.form);
app.post("/login", login.submit);

app.get("/post/edit", anth, post.form);
app.get("/post/:pid", post.detail);
app.post("/post", post.submit);

app.get("/", index.view);

app.listen(3000, () => {
    console.log("服务器启动");
})