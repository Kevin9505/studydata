# 1.部署项目文件

- 1.将下发的pages里面的文件，拷贝到项目文件夹中,比如 D:/www/baixiu
- 2.在浏览器中输出baixiu.com，验证是否可以访问到页面

# 2.提取公共样式

- 1.因为页面当中,侧边栏，顶部，还有css和js文件都是一样的，为了后期维护的方便性,因此需要提取公共样式

- 2.在admin当中新建inc文件夹,把那些公共的文件内容放在各自的文件当中

  ~~~php
  css.php
  script.php
  aside.php
  nav.php
  ~~~

- 3.在index.php中引入之前抽掉的公共文件

  ~~~php
  <?php include './inc/css.php'?>
   <?php include './inc/script.php'?>
   <?php include './inc/nav.php'?>
   <?php include './inc/aside.php' ?>
  ~~~

- 4.在浏览器中输入baixiu.com/admin可以看到整个页面,说明改造成功

# 3.登陆的做法

- 1.把login.html改成login.php,因为php文件里面，可以运行html和php等代码
- 2.login.php文件中，给两个输入框添加name属性，，添加了action,method,将a标签修改为submit按钮，代码修改如下

~~~javascript
 <form action="./login.php" method="post" class="login-wrap">
      <img class="avatar" src="../assets/img/default.png">
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong> 用户名或密码错误！
      </div> -->
      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" type="email" name="email" class="form-control" placeholder="邮箱" autofocus>
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" type="password" name="password" class="form-control" placeholder="密码">
      </div>
      <input type="submit" value="登陆" class="btn btn-primary btn-block">
    </form>
~~~

- 2.接收提交过来的信息，做登陆的判断

~~~php
<?php
    
    //接收用户提交过来的数据
    // $_POST
    if(!empty($_POST)){  //说明$_POST这个数组有内容，不为空，是post过来的数据
      $email = $_POST['email'];
      $password = $_POST['password'];

      //接收到用户提交过来的数据之后，要到数据库中先查询一下有无此用户名
      //1. 先连接数据库服务器  返回一个连接信息
       $connect = mysqli_connect('localhost','root','123456');

       //2.连接具体的数据库
       mysqli_select_db($connect,'baixiu');//

       //3. 设置编码集
       mysqli_set_charset($connect,'utf8');//

       //4.查询数据信息
       // select * from users where email ='';
       // $sql = "SELECT * FROM users where email = 'admin@baixiu.com'";
       $sql = "SELECT * FROM users where email = '" . $email . "'";
       $result = mysqli_query($connect,$sql);  //根据sql语句查询信息，返回结果集

      // print_r($result);
      // exit;  //
       $row = mysqli_fetch_assoc($result);//从查询的结果集中，先获取第一条数据

       // print_r($row);
       // exit;
       if(!empty($row)){
          //此处说明用户名是已经真实存在的了
         // 要去判断密码了
       }else {
          //说明 用户名是不存在的
       }
    }
 ?>
~~~

- 3.完整的判断信息

~~~php
<?php
    
    header('Content-type:text/html;charset=utf-8');
    //接收用户提交过来的数据
    // $_POST
    $msg = '' ;//定义了一个提示信息的变量
    if(!empty($_POST)){  //说明$_POST这个数组有内容，不为空，是post过来的数据
      $email = $_POST['email'];
      $password = $_POST['password'];

      //接收到用户提交过来的数据之后，要到数据库中先查询一下有无此用户名
      //1. 先连接数据库服务器  返回一个连接信息
       $connect = mysqli_connect('localhost','root','123456');

       //2.连接具体的数据库
       mysqli_select_db($connect,'baixiu');//

       //3. 设置编码集
       mysqli_set_charset($connect,'utf8');//

       //4.查询数据信息
       // select * from users where email ='';
       // $sql = "SELECT * FROM users where email = 'admin@baixiu.com'";
       $sql = "SELECT * FROM users where email = '" . $email . "'";
       $result = mysqli_query($connect,$sql);  //根据sql语句查询信息，返回结果集

      // print_r($result);
      // exit;  //
       $row = mysqli_fetch_assoc($result);//从查询的结果集中，先获取第一条数据

       // print_r($row);
       // exit;
       if(!empty($row)){
          //此处说明用户名是已经真实存在的了
         // 要去判断密码了
        if($row['password'] == $password ){
          // echo '用户名和密码正确，登陆成功。。。';
          // exit;
          header('location:/admin');  //php中页面跳转
          exit;
          // window.location.href= 'admin/index.html';  这是js下面的页面跳转
        }else {
          //到了这一步的时候，说明用户名是对的，但是密码错了
          $msg = '用户名或是密码错误...';
        }
         
       }else {
          //说明 用户名是不存在的
        $msg = '用户名不存在...';
       }
    }
 ?>
~~~

# 4.当前登陆的账号或是密码不正确提示

- 1.把login.php页面当中的错误提示代码展示出来,进行一个判断，是否输出

~~~php
 <!-- 有错误信息时展示 -->
      <?php if(!empty($msg)){?>
      	<div class="alert alert-danger">
        	<strong>错误！</strong> <?php echo $msg?>
      	</div>
      <?php }?>
~~~

# 5.登陆的验证

- 1.如果登陆成功的话，在服务器端要设置一个用户的session

  ~~~php 
  if(!empty($row)){
            //此处说明用户名是已经真实存在的了
           // 要去判断密码了
          if($row['password'] == $password ){
            // echo '用户名和密码正确，登陆成功。。。';
            // exit;
            session_start();//使用session之前一定要先启用session
            $_SESSION['user_info'] = $row; //把用户的登陆信息存到session当中,随响应头发送给浏览器，存到浏览器的cookie当中
            header('location:/admin');  //php中页面跳转
            exit;
            // window.location.href= 'admin/index.html';  这是js下面的页面跳转
          }else {
            //到了这一步的时候，说明用户名是对的，但是密码错了
            $msg = '用户名或是密码错误...';
          }
           
         }else {
            //说明 用户名是不存在的
          $msg = '用户名不存在...';
         }
  ~~~

- 2.在index.php页面中，设置如下代码

  ~~~php
  <?php
      
      //判断用户是否登陆,只有登陆了才可以进行页面的访问
      //判断cookie里面有没有session的信息 
      session_start();
      // print_r($_SESSION['user_info']);
      if(!isset($_SESSION['user_info'])){
          //如果不存在，说明 还没有登陆，应该跳转到登陆页面
        header('location:/admin/login.php');
        exit;
      }
      
  ?>
  ~~~

  ​