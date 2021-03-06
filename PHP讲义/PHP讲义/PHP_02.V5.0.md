# GET与POST

## 每日目标 
- 能够进行服务端渲染操作
- 能够说出GET与POST请求方式的区别
- 能够在服务端分别接收GET与POST的请求参数
- 能够处理复选按钮的请求参数
- 能够进行文件上传并使用$_FILES处理
- 综合案例：**能够完成注册案例**

## GET请求

请求在网站的访问过程中很常见，并且请求分为多种方式：GET、POST、PUT、DELETE、OPTIONS等。其中GET和POST最常用。

#### 什么是GET请求？

GET从字面上理解为'获取'，通常用于获取服务端的数据。

#### 常见的发起GET请求的方式

- 地址栏访问
- src/href
- 表单

网页中有许多效果使用的就是GET请求：

- 各种搜索框
- 各种详情页面
- 大部分超链接

#### GET方式提交数据的格式

1. 格式:index.php?userName=jack&password=123
2. 参数名与参数值之间**没有空格**
3. 参数值不需要使用单双引号包括

#### GET方式提交数据的特点：

1. get方式在url后面拼接参数，只能以文本的形式传递数据
2. 传递的数据量小，4KB左右（不同浏览器会有差异）
3. 安全性低，会将数据显示在地址栏
4. 速度快，通常用于对安全性要求不高的请求

## POST请求

####什么是post请求

字面上理解，post就是指`发送，提交`,它可以向指定的资源提交要被处理的数据

#### 为什么需要POST请求       

GET方式提交数据通过URL传递到请求的页面，提交的数据量一般较小，用于请求页面数据。此外，GET方式传递的数据安全性低, 对于密码等隐私信息、文件上传必须使用POST方式提交。

![post请求示例](media/post请求示例.png)

​      要求：如果使用表单方式进行提交，表单的method必须设置为POST。

#### 特点

1-post 方式 安全性比较高

2-传递数据量大，请求对数据长度没有要求

3-请求不会被缓存，也不会保留在浏览器历史记录中

用于：密码等安全性要求比较高的场合，提交的数据量比较大：发布文章，上传文件。

> POST方式提交数据上限默认为8M（可以在PHP的配置文件post_max_size选项中修改）

## 表单处理

表单的概念在生活中很常见，就像是问卷调查表一样，别人先把问卷发给你，你照着问卷的要求填写，完事过后再将填完的问卷发给别人，从而达到一个将别人需要的信息传递给别人的一种方式。

传统的网页大多数的作用都是展示数据，就是将信息传递给用户。而在现代化的 Web 开发中，非常注重信息交互，所以表单也随处可见，只是形式上变成网页，性质上还是一模一样的。主要的作用任然是**收集指定的用户信息**。

> 信息交互：例如 [简书](http://www.jianshu.com) 这个平台，除了展示文章（展示信息），还可以发布文章（收集信息）

### 表单基本使用

HTML 中有一个专门用于提交数据的标签：`<form>`，通过这个标签可以很容易的收集用户输入。

> form 标签有两个必要属性：
>
> - action：表单提交地址（填完了，交给谁）
> - method：表单以什么方式提交

例如，我们需要在登录界面上收集用户输入的用户名和密码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>登录</title>
</head>
<body>
  <form action="login.php" method="post">
    <div>
      <label for="username">用户名</label>
      <input type="text" id="username" name="username">
    </div>
    <div>
      <label for="password">密码</label>
      <input type="password" id="password" name="password">
    </div>
    <button type="submit">登录</button>
  </form>
</body>
</html>
```

按照目前的情况，用户第一次请求得到这个表单页面，填写完表单内容，点击登录，表单会自动发送到 `login.php`，剩下的问题就是要考虑如何在 `login.php` 中获取到用户提交过来的内容。

> PHP 中有三个超全局变量专门用来获取表单提交内容：
>
> - `$_GET`：用于获取以 GET 方式提交的内容，更标准的说法：接收 URL 地址问号参数中的数据
> - `$_POST`：用于获取以 POST 方式提交的内容，更标准的说法：接收 请求体 中的数据
> - `$_REQUEST`：用于获取 GET 或 POST 方式提交的内容

借助 `$_POST` 或者 `$_REQUEST` 就可以获取到表单提交的内容：

```php
<?php
// 获取表单提交的用户名和密码
echo '用户名：' . $_REQUEST['username'];
echo '密码：' . $_REQUEST['password'];
```

#### 提交地址

`action` 提交地址指的是这个表单填写完成过后点击提交，发送请求的请求地址是什么。

从便于维护的角度考虑，一般我们最常见的都是提交给当前文件，然后在当前文件中判断是否是表单提交请求：

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 表单提交请求
}
```

另外，建议使用 `$_SERVER['PHP_SELF']` 动态获取当前页面访问路径，这样就不用因为文件重命名或者网站目录结构调整而修改代码了：

```php
<!-- 这样写死 action 地址，当文件重命名就需要修改代码 -->
<form action="/foo/login.php">
  <!-- ... -->
</form>
<!-- 通过 `$_SERVER['PHP_SELF']` 获取路径，可以轻松避免这个问题 -->
<form action="<?php echo $_SERVER['PHP_SELF']; ?>">
  <!-- ... -->
</form>
```

#### 提交方式

`method` 可以用于设置表单提交的方式，目前我们所认识的就是最常见两种表单提交方式：`GET` 和 `POST`。

从效果上来看，两者都可以将数据提交到服务端，但是从实现提交的原理上两者有很大的不同：

- GET
  - **表单数据是通过 URL 中的 ? 参数传递到服务端的**
  - 可以在地址栏中看到提交的内容
  - 数据长度有限制，因为 URL 地址长度有限（2000个字符）
- POST
  - **表单数据是通过请求体传递到服务端的**，我们在界面上看不到
  - 可以提交任何类型的数据，包括文件
  - 由于界面上看不见，浏览器也不储存，所以更安全

至于什么情况下应该选用哪种方式，这个需要结合业务场景和这两种方式各自的特点来决定，没有绝对的答案，只能给出一些原则：

- 绝不能使用 GET 来发送密码或其他敏感信息！！！
- **应该想清楚这次请求到底主要是去拿东西，还是去送东西**

### 常见表单元素处理

至于表单元素中的文本框文本域一类的元素，都是直接将元素的 `name` 属性值作为键，用户填写的信息作为值，发送到服务端。

但是表单元素中还有一些比较特殊的表单元素需要单独考虑：

#### 单选按钮

```html
<!-- 最终只会提交选中的那一项的 value -->
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">
```

#### 复选按钮

```html
<!-- 没有设置 value 的 checkbox 选中提交的 value 是 on -->
<input type="checkbox" name="agree">
<!-- 设置了 value 的 checkbox 选中提交的是 value 值 -->
<input type="checkbox" name="agree" value="true">
```

如果需要同时提交多个选中项，可以在 `name` 属性后面 跟上 `[]`：

> http://php.net/manual/zh/faq.html.php#faq.html.arrays

```html
<input type="checkbox" name="funs[]" value="football">
<input type="checkbox" name="funs[]" value="basketball">
<input type="checkbox" name="funs[]" value="world peace">
```

最终提交到服务端，通过 `$_POST` 接收到的是一个索引数组。

#### 选择框

```html
<select name="subject">
  <!-- 设置 value 提交 value -->
  <option value="1">语文</option>
  <!-- 没有设置 value 提交 innerText -->
  <option>数学</option>
</select>
```

### 文件上传

> http://php.net/manual/zh/features.file-upload.php
>
> **注意：**
>
> - 修改 `php.ini` 中的 `post_max_size` 配置，让服务端可以接受更大的请求体体积
> - 修改 `php.ini` 中的 `upload_max_filesize` 配置，让服务端支持更大的单个上传文件
>

### 表单注意事项

1. form 表单数据的编码类型由enctype决定，默认为application/x-www-form-urlencoded方式编码。文件上传时属性值必须设置为multipart/form-data

   > application/x-www-form-urlencoded：会把表单中发送的数据编码为名称/值对，标准编码格式
   >
   > multipart/form-data，这个是专门用来传输特殊类型数据的，比如文件、mp3

2. 数据提交方式：POST方式

3. 文件域：<input type=file” name=”属性值”/>

   ![文件上传表单设置](media/文件上传表单设置.png)

   

### $_FILES数组详解

`type` 属性为 `file` 的 `input` 元素可以通过表单提交文件（上传文件），服务端 PHP 可以通过 `$_FILES` 获取上传的文件信息。

 ![FILES数组详解](media/FILES数组详解.png)

`$_FILES` 同样也是一个关联数组，键为表单的 `name`，内容如下：

```
array(1) {
  ["avatar"]=>
  array(5) {
    ["name"]=>
    string(17) "demo.jpg"
    ["type"]=>
    string(10) "image/jpeg"
    ["tmp_name"]=>
    string(27) "C:\Windows\Temp\php786C.tmp"
    ["error"]=>
    int(0)
    ["size"]=>
    int(29501)
  }
}
```

文件上传后，文件信息自动保存在预定义变量$_FILES数组中。假设myFile为文件域的name属性值。

##### 1)  [$_FILES[‘myFile’\][‘name’]]()

​         文件的原始名称。
##### 2)   $_FILES[‘myFile’\][‘tmp_name’]
​         文件的临时路径，默认为c:/windows/temp（运行窗口—>temp）。没有直接将文件上传至Apache服务器的根目录
##### [3)   $_FILES[‘myFile’\][‘type’]]()
​       文件的内容类型。
​         常见的文件类型： image/jpeg,image/png,image/gif,text/html，text/javascript
##### [4)  $_FILES[‘myFile’\]’[‘]()error’]
​         文件上传的错误代号。0代表没有发生错误。
##### [5)   $_FILES[‘myFile’\][‘]()size’]
​       文件大小（单位为byte，字节）

### 文件上传的完整步骤

1. 设计表单

2. 接收数据：判断$_FILES是否为空

3.  判断错误：$_FILES[‘myFile’][‘error’].出错提示错误信息

4. 此时文件在临时路径，如果需要将上传后的文件移动到某个指定位置，需要使用move_uploaded_file()函数移动到网站永久路径：

   > move_upload_file(临时路径$_FILES[‘myFile’][‘tmp_name]，永久路径);   

### 代码示例：

```php
<?php
// 如果选择了文件 $_FILES['file']['error'] => 0
// 详细的错误码说明：http://php.net/manual/zh/features.file-upload.errors.php
if ($_FILES['file']['error'] === 0) {
  // PHP 在会自动接收客户端上传的文件到一个临时的目录
  $temp_file = $_FILES['file']['tmp_name'];
  // 我们只需要把文件保存到我们指定上传目录
  $target_file = '../static/uploads/' . $_FILES['file']['name'];
  if (move_uploaded_file($temp_file, $target_file)) {
    $image_file = '/static/uploads/' . $_FILES['file']['name'];
  }
}
```

### 案例

#### 基于文件的注册

分析

1. 用户请求一个注册页面
2. 服务端返回一个注册表单
3. 用户填写表单并提交
4. 服务端接收用户提交的信息
5. 判断是否正确填写内容以及是否勾选同意
6. 如果出现异常界面给出提示，并返回表单
7. 如果都正常，则保存到文件中（每个用户一行）

### 参考链接

- HTML 中的 form 标签：http://www.w3school.com.cn/html/html_forms.asp
- PHP 中处理表单：http://www.w3school.com.cn/php/php_forms.asp
- Emmet 手册：https://docs.emmet.io/cheat-sheet/


