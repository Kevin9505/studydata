# Node.js - 第四天

## 复习

1.什么是commonjs模块标准 

2.express-session的使用

## 学习内容

1.文章分页展示
2.编辑文章
3.删除文章
4.掌握增删改查的SQL语句
5.Navicat掌握查看数据库

## 1.文章分页展示

**分页思路：**

分页按照每页返回5条数据， 第一页返回数据库列表的第1-5条数据， 第二页返回第6-10条数据，以此类推，需要显示当前页数和总页数，

**1.添加分页按钮**

当前页数和总页数由后台模板的渲染数据返回

```
// 所属文件: views/index.ejs
<div class="page-ctrl">
            <span>当前页数 <%= page %>/<%= Math.ceil(count/5) %></span>
            <div>
            	 <!--如果是第一页，隐藏上一页按钮-->
                <% if(page != 1){ %>
                    <button class="mui-btn mui-btn--primary prev">上一页</button>
                <% } %>
                <!--如果是最后一页，隐藏下一页按钮-->
                <% if(page != Math.ceil(count/5)){ %>
                    <button class="mui-btn mui-btn--primary next" >下一页</button>
                <% } %>
            </div>
        </div>
```

```
// 所属文件： routes/index.js
exports.view = function(req, res){
	// 通过url获取当前页page
    // 如果url没有page参数，默认值是1
    const page = req.query.page || 1;

    // 根据当前页数查找文章列表
    db.findPostByPage(page, result => {
        // 查找总的文章条数
        db.findPostCount((count) => {
            res.render("index", { 
                posts: result,
                count: count[0].count,
                page: page
            });
        })
    })
}
```

**2.db新增了findPostByPage和findPostCount**

```
// 所属文件 lib/db.js

// 查看分頁文章
exports.findPostByPage = (page,callback) => {
    connection.query(
        `select * from posts limit ${ (page-1) * 5 },5;`,
        function(err, results){
            if(err) throw err;
            callback(results);
        }
    )
}

// 查看所有文章的数量
exports.findPostCount = (callback = () => {}) => {
    connection.query(
        "select count(*) as count from posts",
        function(err, results){
            if(err) throw err;
            callback(results);
        }
    )
}
```



## 编辑文章

思路：

通过文章id查找出该文章，渲染到编辑的表单上， 修改完后调用数据库的更新数据方法,

重点：

- 掌握路由动态参数，通过req.params获取路由动态参数
- 区别路由动态参数和url参数，后者使用req.query获取参数

1.新建路由

```
// 文件： app.js

// /:pid是路由的动态参数
app.get("/post/edit/:pid", anth, post.editPostView); // 需要登录
```

2.页面逻辑

```
// 文件： routes/post.js

// 文章编辑页渲染
exports.editPostView = function(req, res){
	
	// 获取路由动态参数
    const pid = req.params.pid;
	
	// 更新数据库内容
    db.findPostById(pid, (result) => {
    
    	// edit-post.js同add-post.js,只需渲染当前文章的标题和内容
        res.render("edit-post", {
            post: result[0]
        });
    })
}

//  文章编辑页提交
exports.editPostForm = function(req, res){
    const data = req.body;

    db.updatePost(data, (result) => {
        res.redirect("/");
    })
}
```

3.数据库新增操作

```
// 文件： lib/db.js

// 通过id查找文章详情
exports.findPostById = (id, callback) => {
    connection.query(
        `select * from posts where id=${id}`,
        function(err, results){
            if(err) throw err;
            callback(results)
        }
    )
}

// 编辑文章
exports.updatePost = (data, callback) => {
    connection.query(
        `update posts set title='${data.title}',content='${data.content}' where id=${data.id}`,
        function(err, results){
            if(err) throw err;
            callback(results)
        }
    )
}
```



## 3.删除文章

* 软删除

* 物理删除

  

## 4.总结

1.分页的实现

2.区分路由动态参数和url参数

3.掌握数据库的增删改查