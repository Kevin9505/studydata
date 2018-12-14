## 1.封装函数

### 1.1封装判断登陆的函数

1.在项目的根目录(baixiu)下,新建一个functions.php文件

2.代码如下:

~~~js
<?php 
	// 1.封装一个判断是否登陆的函数
		function checkLogin(){
		  session_start();// 如果要使用session的话,得先开启session
		 
		  if(!isset($_SESSION['userInfo'])){
		    header('Location:/admin/login.php');
		  }
		}
 ?>
~~~

3.在index.php页面中进行引用和调用 

~~~js
<?php 
      // session_start();// 如果要使用session的话,得先开启session
      // // print_r($_SESSION);
      // // exit;
      // // 判断是否有之前服务器设置给浏览器的sessionId,如果有的话,则可以正常的访问这个页面,如果没有,则跳转到登陆页面
      // if(!isset($_SESSION['userInfo'])){
      //   header('Location:/admin/login.php');
      // }
      require('../functions.php');
      checkLogin();
 ?>
~~~
4.在users.php页面中进行引入和调用,代码如下:

~~~js
<?php 
      // session_start();// 如果要使用session的话,得先开启session
      // // print_r($_SESSION);
      // // exit;
      // // 判断是否有之前服务器设置给浏览器的sessionId,如果有的话,则可以正常的访问这个页面,如果没有,则跳转到登陆页面
      // if(!isset($_SESSION['userInfo'])){
      //   header('Location:/admin/login.php');
      // }
      require('../functions.php');
      checkLogin();
...
~~~

### 1.2创建文件定义常量

1.在项目根目录(baixiu)下新建一个文件名为:config.php

2.在里面书写代码如下:

~~~js
<?php 
	// 此文件中,定义一些常量,这些常量不经常被改动
	// 1.定义常量存储数据库的地址
	define('DB_HOST','127.0.0.1');

	// 2.定义常量存储数据库的登陆用户名
	define('DB_NAME','root');

	// 3.定义常量存储数据库的登陆密码
	define('DB_PASSWORD','root');

	// 4.定义常量存储数据库的名称
	define('DB_DATABASE','baixiu');

	// 5.定义常量存储数据库的编码格式 
	define('DB_SET_CHARSET','utf-8');
 ?>
~~~

### 1.3封装操作数据库的函数

1.在functions.php中先引入config.php文件 3

~~~js
<?php 
		// 引入外部配置文件
		require '../config.php' ;

	// 1.封装一个判断是否登陆的函数
		function checkLogin(){
			session_start();// 如果要使用session的话,得先开启session
		 
		  if(!isset($_SESSION['userInfo'])){
		    header('Location:/admin/login.php');
		  }
		}

	// 2.	
 ?>
~~~

2.在functions.php中封装连接数据库的函数

~~~js
// 2.	封装连接数据库的函数
		function connect(){
			// 2.1  连接数据库服务器
			$conn = mysqli_connect(DB_HOST,DB_NAME,DB_PASSWORD,DB_DATABASE);

			// 2.2 判断登陆是否成功
			if(!$conn){
				die('数据库连接失败...');
			}

			// 2.3 设置数据库编码格式
			mysqli_set_charset($conn,DB_SET_CHARSET);

			// 2.4 返回连接状态
			return $conn;
		}
~~~

3.封装一个查询的函数

~~~js
// 3.封装查询数据库的函数
		function query($sql){
			$conn = connect(); // 调用函数获取连接对象
			$result = mysqli_query($conn,$sql);

			return $result; // 返回查询到的结果集
		}
~~~

4.封装一个获取结果集中所有的数据的函数

~~~js
function fetch($result){
			// 循环遍历这个结果集,取到每一条数据存入数组当中
			while($row = mysqli_fetch_assoc($result)){
				$arr[] = $row;
			}

			return $arr;// 返回存有所有的数据的数组
 }
~~~

5.重新更新query函数

~~~js
// 3.封装查询数据库的函数
		function query($sql){
			$conn = connect(); // 调用函数获取连接对象
			$result = mysqli_query($conn,$sql);

			// return $result; // 返回结果集
			$rows = fetch($result);

			return $rows;//返回具有查询到的每一条数据的数组
		}
~~~

6.封装一个添加数据的函数,在functions.php页面中添加如下代码

~~~js
// 5.封装一个插入数据的函数
		function insert($sql){
			// 5.1调用函数,获取连接状态
			$conn = connect();

			// 5.2 调用方法插入数据 
			$res =mysqli_query($conn,$sql);

			// 5.3 判断是否插入数据成功
			// if($res){
			// 	return $res;
			// }else {
			// 	die('插入数据失败...');
			// }
			if(!$res){
				die('插入数据失败...');
			}

			return $res; // 返回成功的结果 是一个boolean类型的值
		}
~~~

7.到users.php页面中修改原来的代码，最终代码如下: 29

~~~js
// 2.是否是post提交  现在要插入数据
  if(!empty($_POST) && $_POST['id']=='') {  // add按钮的提交
    // 因为这里不需要id

    // 3.获取提交过来的数据

    print_r($_POST);
    $email = $_POST['email']; // 邮箱
    $slug = $_POST['slug'];
    $nickname = $_POST['nickname'];
    $userPwd = isset($_POST['password'])?$_POST['password']:'';
    // $status = 'activated';
    // 4. 往数据库中添加数据
    // 4.1 先连接数据库
    // $conn = mysqli_connect('127.0.0.1','root','root','baixiu');

    // if(!$conn){ // 如果失败, 则提示用户,并且代码不要往下执行了
    //   die('数据库连接失败...');
    // }
    
    // // 4.2 设置编码格式
    // mysqli_set_charset($conn,'utf-8');

    // 4.3 将数据插入到数据库中
    // $sql = 'insert into users (email,slug,nickname,password) values ()'
    //INSERT INTO users (email,slug,nickname,password,status) values ("aa.com","abc","普通用户","123","activated");
    $sql = 'INSERT INTO users (email,slug,nickname,password,status) values ("'.$email.'","'.$slug.'","'.$nickname.'","'.$userPwd.'","activated")';
    // $res = mysqli_query($conn,$sql);
    $res = insert($sql);
    // var_dump($res);
    // exit; // 阻止代码的向下运行
    if($res){
      // 添加成功的话,应该要刷新 当前的页面
      header('Location:/admin/users.php');
    }else {
      die('添加失败...');
    }
    // 如果要是成功的话,则跳转到当前页面,相当于刷新
  }
~~~

8.封装完善的添加数据的代码

~~~js
// 5.封装一个插入数据的函数
		// function insert($sql){  //不这么判断了
		function insert($table,$arr){
			// 5.1调用函数,获取连接状态
			$conn = connect();
			// print_r($arr);
			if(isset($arr['id'])){
				unset($arr['id']);
			}
			// print_r($arr);
			$keys = array_keys($arr); // 获取关联数组中所有的属性
			$values = array_values($arr); // 获取关联数组中所有的属性值
			// print_r($keys);
			// print_r($values);
			// $str = implode(',',$keys);  // 将索引数组中的值以,连接成字符串
			// echo $str;
			// echo '<hr/>';
			// echo implode(',',$values);
			// $sql = 'INSERT INTO users (email,slug,nickname,password,status) values ("'.$email.'","'.$slug.'","'.$nickname.'","'.$userPwd.'","activated")';
			$sql = 'INSERT INTO users ('.implode(',',$keys).') values ("'.implode('","',$values).'")';
			// echo $sql;
			// exit;  // 代码中断,不会往下执行了
			// array_keys  array_values   implode   join
			// 5.2 调用方法插入数据 
			$res =mysqli_query($conn,$sql);

			// 5.3 判断是否插入数据成功
			// if($res){
			// 	return $res;
			// }else {
			// 	die('插入数据失败...');
			// }
			if(!$res){
				die('插入数据失败...'); // 还有return的功能,只要执行了die,代码不会往下执行
			}

			return $res; // 返回成功的结果 是一个boolean类型的值
		}

~~~

9.在users.php中进行调用,代码如下:

~~~js
// 2.是否是post提交  现在要插入数据
  if(!empty($_POST) && $_POST['id']=='') {  // add按钮的提交
    // 因为这里不需要id

    // 3.获取提交过来的数据

    // print_r($_POST);
    // $email = $_POST['email']; // 邮箱
    // $slug = $_POST['slug'];
    // $nickname = $_POST['nickname'];
    // $userPwd = isset($_POST['password'])?$_POST['password']:'';
    // // $status = 'activated';
    $_POST['status'] = 'activated';
    // 4. 往数据库中添加数据
    // 4.1 先连接数据库
    // $conn = mysqli_connect('127.0.0.1','root','root','baixiu');

    // if(!$conn){ // 如果失败, 则提示用户,并且代码不要往下执行了
    //   die('数据库连接失败...');
    // }
    
    // // 4.2 设置编码格式
    // mysqli_set_charset($conn,'utf-8');

    // 4.3 将数据插入到数据库中
    // $sql = 'insert into users (email,slug,nickname,password) values ()'
    //INSERT INTO users (email,slug,nickname,password,status) values ("aa.com","abc","普通用户","123","activated");
    // $sql = 'INSERT INTO users (email,slug,nickname,password,status) values ("'.$email.'","'.$slug.'","'.$nickname.'","'.$userPwd.'","activated")';
    // $res = mysqli_query($conn,$sql);
    // $res = insert($sql);
    $res = insert('users',$_POST);
    // var_dump($res);
    // exit; // 阻止代码的向下运行
    if($res){
      // 添加成功的话,应该要刷新 当前的页面
      header('Location:/admin/users.php');
    }else {
      die('添加失败...');
    }
    // 如果要是成功的话,则跳转到当前页面,相当于刷新
  }
~~~

10.封装一个删除数据的函数,在functions.php文件中,代码如下:

~~~js
 // 6.封装一个删除数据的函数
    function del($sql){
        // 6.1 获取连接状态
        $conn = connect();
        // 6.2 执行删除语句
        $res = mysqli_query($conn,$sql);

        // 6.3 返回删除结果
        return $res;
    }
~~~

11.在delUers.php页面中进行调用,代码如下:

~~~js
<?php 
	// 先引入文件
	require('../functions.php');

	// 1.先判断是否是get过来的,而且是否有user_id
	if(isset($_GET['user_id'])){
		// 获取用户id
		$userId = $_GET['user_id'];

		// // 2.连接数据库
		// $conn = mysqli_connect('127.0.0.1','root','root','baixiu');

		// // 3.判断是否连接成功
		// if(!$conn){
		// 	die('数据库连接失败...');
		// }

		// // 4.设置编码
		// mysqli_set_charset($conn,'utf-8');

		// // 5.调用方法删除对应id的数据
		// $res = mysqli_query($conn,'delete from users where id = '.$userId);

		$res = del('delete from users where id = '.$userId);
		// 6.判断是否删除成功
		if($res){ // 删除成功则进行跳转...
			header('Location:/admin/users.php');
		}else {
			die('删除此条用户数据失败...');
		}
	}
 ?>
~~~

12.单击编辑按钮,渲染页面数据,在users.php页面中的代码如下:

~~~js
 // 第4大步 编辑的操作
  if(isset($_GET['action'])){ // 是否是编辑
    $userId = $_GET['user_id']; // 获取当前的id

   //  // 4.1 连接数据库
   // $conn = mysqli_connect('127.0.0.1','root','root','baixiu');

   // // 4.2 判断是否连接
   // if(!$conn){
   //  die('数据库连接失败...');
   // }

   // // 4.3 查询数据库中的数据
   // $res = mysqli_query($conn,"select * from users where id = ".$userId);
   // // print_r($res);
   // // exit;

   // // 4.4 从结果集中取出数据
   // $row = mysqli_fetch_assoc($res); 
   // print_r($row);
   // exit;
   // 4.4 断开数据库
   // mysqli_close($conn);
   // print_r($row);
   //   Array
   //    (
   //        [id] => 2
   //        [slug] => zce
   //        [email] => w@zce.me
   //        [password] => 123456
   //        [nickname] => 汪磊
   //        [avatar] => /static/uploads/avatar.jpg
   //        [bio] => 
   //        [status] => activated
   //    )
     $row = query("select * from users where id = ".$userId)[0];
   // 原来查询到的结果变成了如下结果:
        //  Array
        // (
        //     [0] => Array
        //         (
        //             [id] => 18
        //             [slug] => ppaaaaaaaa
        //             [email] => pp@aa.com
        //             [password] => 123
        //             [nickname] => pppaaaaaaaa
        //             [avatar] => 
        //             [bio] => 
        //             [status] => activated
        //         )

        // )
   //  exit;


  } // edit

~~~

13.封装编辑的函数,代码如下:

~~~js
// 7.封装一个修改数据的函数
		function update($table,$arr,$id){
			// 7.1 连接数据库
			$conn = connect();

			// print_r($arr);
			// exit;
			// 7.2 拼接sql语句
			// 因为在更新数据的时候,id是不需要更新的,所以先把id从$arr中删除掉
			unset($arr['id']); 

			$sql = 'UPDATE users set ';  //  定义一个变量
			foreach($arr as $key => $val){  // 遍历数组,拼接成key=value, key=value的格式
				$sql .= $key.'="'.$val.'", ';
			}
			// print_r($sql);
			// $sql = 'UPDATE users set email="qq@qq.com",slug="qq",nickname="aaadfa",';
			// exit;
			$sql = substr($sql,0,-2);
			// print_r($sql);
			$sql .= ' where id = '.$id;
			// print_r($sql);
			// exit;
			// $sql='update users set email= "'.$email.'",slug = "'.$slug.'",nickname = "'.$nickname.'" where id = '.$id;
	  // $sql =	"UPDATE users set email ='".$email."',slug='".$slug."',nickname = '".$nickname."' where id = ".$id;

			// 7.2 调用方法进行更新
		  $res =	mysqli_query($conn,$sql);

		  // 7.3 返回更新后的结果
		  return $res;
		}
~~~

14.在editUser.php的页面中调用,代码如下: 

~~~js
<?php 
		// 先引入外部文件
		require('../functions.php');
	// 1.获取提交过来的数据
	  // $_POST
		$id = $_POST['id'];
		// $email = $_POST['email'];
		// $slug = $_POST['slug'];
		// $nickname = $_POST['nickname'];

		// print_r($_POST);
		// exit;

		// // 2. 先连接数据库
		// $conn = mysqli_connect('127.0.0.1','root','root','baixiu');

		// // 3.判断是否连接成功
		// if(!$conn){
		// 	die('数据库连接失败...');
		// }

		// // 4.设置编码集
		// mysqli_set_charset($conn,'utf-8');

		// 5.修改数据

		// $sql='update users set email= "'.$email.'",slug = "'.$slug.'",nickname = "'.$nickname.'" where id = '.$id;
	  // $sql =	"UPDATE users set email ='".$email."',slug='".$slug."',nickname = '".$nickname."' where id = ".$id;
	 // $res =	mysqli_query($conn,$sql);
		$res = update('users',$_POST,$id);
	 if($res){
	 	 $arr = array(
	 	 	"code"=>200,
	 	 	"msg"=>"修改成功"
	 	 );
	 }else {
	 	$arr = array(
	 	 	"code"=>201,
	 	 	"msg"=>"修改失败"
	 	 );
	 }

	 echo json_encode($arr);
 ?>
~~~

