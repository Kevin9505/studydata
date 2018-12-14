## 1.分类页面的内容实现

### 1.引入公共资源文件

1.将admin/categories.html页面修改成admin/categories.php

2.引入公共资源文件，代码如下:

~~~js
<?php include './inc/css.php' ?>
<?php include './inc/script.php' ?>
<?php include './inc/navBar.php' ?>
<?php include './inc/aside.php' ?>
~~~

3.到inc/aside.php页面中修改链接,代码如下

~~~js
<ul id="menu-posts" class="collapse">
  <li><a href="/admin/posts.php">所有文章</a></li>
  <li><a href="/admin/post-add.php">写文章</a></li>
  <li><a href="/admin/categories.php">分类目录</a></li>
</ul>
~~~

### 2.判断用户是否登陆

1.在完成上面的操作的时候,当再次刷新页面,会发现头像和昵称都没有了,还报错,因为此时没有开启session.

2.在admin/categories.php页面中判断用户是否登陆,代码如下:

~~~js
<?php 
  // 1.引入外部文件
  require('../functions.php');

  // 2.调用方法判断用户是否登陆
  checkLogin();
 ?>
~~~
3.此时再次刷新页面,发现昵称和头像信息都成功渲染了,都能正常显示.

### 3.渲染页面

1.在admin/categories.php页面的最下面,发送ajax请求,获取数据

~~~js
<script type="text/javascript">
  // 1. 发送ajax请求,获取当前页面需要渲染的数据
  $.ajax({
    type:'get',
    url:'/admin/int/categoriesInt.php',
    success:function(res){
      // 2.如果成功会有数据返回来,渲染页面
    }
  })
</script>
~~~

2.在admin文件夹下面新建一个int的文件夹,并新建 文件categoriesInt.php文件

3.在admin/int/categoriesInt.php文件中书写如下代码:

~~~js
<?php 
	// 1. 引入外部文件
	require('../../functions.php');

	// 2. 获取当前的分类信息
	$res = query('select * from categories');

	// print_r($res);
	// echo json_encode($res);
	// 3. 判断是否有数据,并存在数组当中
	if(!empty($res)){
		$arr = array(
			'code'=>200,
			'msg'=>'查询成功',
			'data'=>$res
		);
	}else {
		$arr = array(
			'code'=>201,
			'msg'=>'查询失败...'
		);
	}
	
	// 4. 返回当前的数据信息给前台
	echo json_encode($arr);
 ?>
~~~
4.在前台接收数据,代码如下:

~~~js
<script type="text/javascript">
  // 1. 发送ajax请求,获取当前页面需要渲染的数据
  $.ajax({
    type:'get',
    url:'/admin/int/categoriesInt.php',
    dataType:'json',
    success:function(res){
      // 2.如果成功会有数据返回来,渲染页面
      // console.log(typeof res);
      if(res&&res.code == 200){
        // 3.使用模板渲染页面
      }
    }
  })
</script>
~~~

5.准备模板

~~~js
<script type="text/template" id="categoriesTmp">
    {{each data as val key}}
      <tr>
        <td class="text-center"><input type="checkbox"></td>
        <td>{{val.slug}}</td>
        <td>{{val.name}}</td>
        <td class="text-center">
          <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
          <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
        </td>
      </tr>
     {{/each}} 
</script>
~~~

6.在ajax里面的操作代码如下:

~~~js
<script type="text/javascript">
  // 1. 发送ajax请求,获取当前页面需要渲染的数据
  $.ajax({
    type:'get',
    url:'/admin/int/categoriesInt.php',
    dataType:'json',
    success:function(res){
      // 2.如果成功会有数据返回来,渲染页面
      // console.log(typeof res);
      if(res&&res.code == 200){
        // 3.使用模板渲染页面
        var htmlStr = template('categoriesTmp',res);
        $('tbody').html(htmlStr);
      }
    }
  })
</script>
~~~
7.此时页面会报错,因为没有引入模板

8.在assets/vendors文件夹下面,新建template文件夹,并添加相应的文件

9.在inc/script.php文件中引入模板文件

~~~js
<script src="../assets/vendors/jquery/jquery.js"></script>
<script src="../assets/vendors/bootstrap/js/bootstrap.js"></script>
<script src="../assets/vendors/nprogress/nprogress.js"></script>
<script src="../assets/vendors/template/template.js"></script>
~~~

10.刷新页面,查看效果.

### 4.添加数据的操作

1.给按钮添加一个id,代码如下:

~~~js
<div class="form-group">
      <button class="btn btn-primary" type="submit" id="btnAdd">添加</button>
</div>
~~~

2.给按钮注册事件并发送ajax请求

~~~js
 // 1. 给单击按钮注册事件
  $('#btnAdd').on('click',function(){
    // 2.调用ajax方法,发送请求
    $.ajax({
      type:'post',
      url:'/admin/int/categoriesInt.php',
      data:$('#formData').serialize(),
      success:function(res){
        
      }
    })
  })
~~~

3.在int/categoriesInt.php文件中写代码如下:

~~~js
// 1. 判断是不是post过来的数据
	if(!empty($_POST)){
		// print_r($_POST);
		// exit;
		$res = insert('categories',$_POST);
		if($res){
			$arr1 = array(
				'code'=>200,
				'msg'=>'添加成功...'
			);
		}else {
			$arr1 = array(
				'code'=>201,
				'msg'=>'添加失败...'
			);
		}
		
		// 2. 返回结果
		echo json_encode($arr1);
	}
~~~

4.此时会发现在响应数据中多传回来了一些数据，原因是将之前的查询操作又执行了一次

~~~js
{"code":200,"msg":"\u67e5\u8be2\u6210\u529f","data":[{"id":"1","slug":"uncategorized","name":"\u672a\u5206\u7c7b"},{"id":"2","slug":"funny","name":"\u5947\u8da3\u4e8b"},{"id":"3","slug":"living","name":"\u4f1a\u751f\u6d3b"},{"id":"4","slug":"travel","name":"\u7231\u65c5\u884c"},{"id":"5","slug":"ccccccc","name":"aaaaa"},{"id":"6","slug":"cccccccc","name":"aaaaaaaaaaaa"},{"id":"7","slug":"aaaaaa","name":"aabbcc"},{"id":"8","slug":"dfasdfasfd","name":"aafdsfda"},{"id":"9","slug":"dASDsd","name":"DSasd"}]}

{"code":200,"msg":"\u6dfb\u52a0\u6210\u529f..."}
~~~

5.我们只要再加一个判断即可 : 4   27

~~~js
<?php 
	// 1. 引入外部文件
	require('../../functions.php');
	if(empty($_POST)){ // 添加操作的判断
		// 2. 获取当前的分类信息
		$res = query('select * from categories');

		// print_r($res);
		// echo json_encode($res);
		// 3. 判断是否有数据,并存在数组当中
		if(!empty($res)){
			$arr = array(
				'code'=>200,
				'msg'=>'查询成功',
				'data'=>$res
			);
		}else {
			$arr = array(
				'code'=>201,
				'msg'=>'查询失败...'
			);
		}
		
		// 4. 返回当前的数据信息给前台
		echo json_encode($arr);
		// echo 'abc';
	}


	//******************下面是添加操作***********************
	// 1. 判断是不是post过来的数据
	if(!empty($_POST)){
		// print_r($_POST);
		// exit;
		$res = insert('categories',$_POST);
		if($res){
			$arr1 = array(
				'code'=>200,
				'msg'=>'添加成功...'
			);
		}else {
			$arr1 = array(
				'code'=>201,
				'msg'=>'添加失败...'
			);
		}
		
		// 2. 返回结果
		echo json_encode($arr1);
	}
 ?>
~~~
6.此时你会发现返回来的数据正常了

7.在前台页面中处理请求回来的数据,添加成功之后应该刷新渲染当前最新信息

~~~js
// 1. 给单击按钮注册事件
  $('#btnAdd').on('click',function(){
    // 2.调用ajax方法,发送请求
    $.ajax({
      type:'post',
      url:'/admin/int/categoriesInt.php',
      data:$('#formData').serialize(),
      dataType:'json',
      success:function(res){
        if(res&&res.code==200){
          // 添加成功
          renderData();
        }
      }
    })

    return false;// 不要刷新页面
  })
~~~

8.将之前的get请求的ajax稍微封装一下

~~~js
 renderData(); // 先调用函数渲染页面
  // 封装一个数据的渲染函数
  function renderData(){
    // 1. 发送ajax请求,获取当前页面需要渲染的数据
    $.ajax({
      type:'get',
      url:'/admin/int/categoriesInt.php',
      dataType:'json',
      success:function(res){
        // 2.如果成功会有数据返回来,渲染页面
        // console.log(typeof res);
        if(res&&res.code == 200){
          // 3.使用模板渲染页面
          var htmlStr = template('categoriesTmp',res);
          $('tbody').html(htmlStr);
        }
      },
      error:function(){
        console.log(112233);
      }

    })
  }
~~~

### 5.删除数据

1.将模板里面的编辑和删除按钮进行修改,将a标签修改成button,并添加属性data-id

~~~js
<td class="text-center">
          <button class="btn btn-info btn-xs" data-id="{{val.id}}" id='btnEdit'>编辑</button>
          <button class="btn btn-danger btn-xs" data-id="{{val.id}}" id='btnDel'>删除</button>
</td>
~~~



2.给删除按钮注册事件,并发送ajax请求,注意得用委托的方式注册事件,就是将事件注册给父级元素,通过子级元素来触发,代码如下:

~~~js
$('tbody').on('click','#btnDel',function(){
    console.log("112233445566");
    var id = $(this).attr('data-id');
    $.ajax({
      type:'get',
      url:'/admin/int/categoriesInt.php',
      dataType:'json',
      data:{
        action:'delCtg',
        id:id
      },
      success:function(res){
        if(res&&res.code == 200){
          renderData();
        }
      }
    })
  })
~~~

3.在admin/int/categoriesInt.php文件中,先判断是删除操作还是编辑操作,代码如下: 4   27

~~~js
if(empty($_POST)){ // 添加操作的判断
		// 这里面都是get过来的请求
		// 1.获取get过来的action的值 进行判断
		if(!isset($_GET['action'])){
			// 2. 获取当前的分类信息
			$res = query('select * from categories');

			// print_r($res);
			// echo json_encode($res);
			// 3. 判断是否有数据,并存在数组当中
			if(!empty($res)){
				$arr = array(
					'code'=>200,
					'msg'=>'查询成功',
					'data'=>$res
				);
			}else {
				$arr = array(
					'code'=>201,
					'msg'=>'查询失败...'
				);
			}
			
			// 4. 返回当前的数据信息给前台
			echo json_encode($arr);
			// echo 'abc';
			}else if($_GET['action']=='delCtg'){
				// 这是删除的操作
				$id = $_GET['id']; // 获取传递过来的id
				$res = del('delete from categories where id ='.$id);

				if($res){
					$arr = array(
						'code'=>200,
						'msg'=>'删除成功'
					);
				}else {
					$arr = array(
						'code'=>200,
						'msg'=>'删除失败'
					);
				}

				echo json_encode($arr);
			}
		
	}
~~~

4.前台页面,接收到数据,进行处理,也就是重新渲染局部页面

~~~js
//********************删除操作的处理********************************
  $('tbody').on('click','#btnDel',function(){
    console.log("112233445566");
    var id = $(this).attr('data-id');
    $.ajax({
      type:'get',
      url:'/admin/int/categoriesInt.php',
      dataType:'json',
      data:{
        action:'delCtg',
        id:id
      },
      success:function(res){
        if(res&&res.code == 200){
          renderData();
        }
      }
    })
  })
~~~

### 6.编辑数据

1.给编辑按钮注册事件,并发送ajax请求

~~~js
// 1. 给编辑按钮注册事件
  $('tbody').on('click','#btnDel',function(){
    var id = $(this).attr('data-id');
    $.ajax({
      type:'get',
      url:'/admin/int/categoriesInt.php',
      data:{
        action:'edit',
        id:id
      },
      success:function(res){
        
      }
    })
  })
~~~

2.后台接收请求并做处理,在admin/int/categoriesInt.php中的代码如下: 45行往后

~~~js
if(empty($_POST)){ // 添加操作的判断
		// 这里面都是get过来的请求
		// 1.获取get过来的action的值 进行判断
		if(!isset($_GET['action'])){
			// 2. 获取当前的分类信息
			$res = query('select * from categories');

			// print_r($res);
			// echo json_encode($res);
			// 3. 判断是否有数据,并存在数组当中
			if(!empty($res)){
				$arr = array(
					'code'=>200,
					'msg'=>'查询成功',
					'data'=>$res
				);
			}else {
				$arr = array(
					'code'=>201,
					'msg'=>'查询失败...'
				);
			}
			
			// 4. 返回当前的数据信息给前台
			echo json_encode($arr);
			// echo 'abc';
			}else if($_GET['action']=='delCtg'){
				// 这是删除的操作
				$id = $_GET['id']; // 获取传递过来的id
				$res = del('delete from categories where id ='.$id);

				if($res){
					$arr = array(
						'code'=>200,
						'msg'=>'删除成功'
					);
				}else {
					$arr = array(
						'code'=>200,
						'msg'=>'删除失败'
					);
				}

				echo json_encode($arr);
			}else if($_GET['action']=='edit'){
				// 1. 获取传递过来的id
				$id = $_GET['id'];

				// 2. 执行查询语句
				$res = query('select * from categories where id ='.$id);

				// 3.判断查询结果
				if(!empty($res)){
					$arr2 = array(
						'code'=>200,
						'msg'=>'查询成功',
						'data'=>$res
					);
				}else {
					$arr2 = array(
						'code'=>201,
						'msg'=>'查询成功'
					);
				}

				// 4.返回查询结果
				echo json_encode($arr2);
			}
		
	}
~~~

3.前台接收到数据之后做如下处理,代码如下：13行往后

~~~js
// 1. 给编辑按钮注册事件
  $('tbody').on('click','#btnEdit',function(){
    var id = $(this).attr('data-id');
    $.ajax({
      type:'get',
      url:'/admin/int/categoriesInt.php',
      data:{
        action:'edit',
        id:id
      },
      dataType:'json',
      success:function(res){
        if(res&&res.code == 200){
          $('#name').val(res.data[0].name);
          $('#slug').val(res.data[0].slug);
          $('#btnAdd').html('修改').attr('id','btnUpdate');
          var str = "<input type='hidden' value="+res.data[0].id+" name='id'>";
          $('#formData').prepend(str); // 添加一个隐藏域
        }
      }
    })
  })
~~~



4.给修改按钮注册事件,再次发送ajax请求,更新数据

~~~js
// 1. 给修改按钮注册事件
  $('#btnUpdate').on('click',function(){
    // 2. 发送ajax请求
    $.ajax({
      type:'post',
      url:'/admin/int/categoriesInt.php',
      data:$('#formData').serialize(),
      dataType:'json',
      success:function(res){
        if(res&&res.code == 200){
          renderData();// 渲染页面
        }
      }
    })
  })
~~~

5.在后台在如下处理：因为都是post请求过来的数据,一个有id,一个没有,所以:

~~~js
//******************下面是添加和编辑的操作***********************
	// 1. 判断是不是post过来的数据
	if(!empty($_POST)){
		// print_r($_POST);
		// exit;
		if(!isset($_POST['id'])){ // 没有id就是添加
			$res = insert('categories',$_POST);
			if($res){
				$arr1 = array(
					'code'=>200,
					'msg'=>'添加成功...'
				);
			}else {
				$arr1 = array(
					'code'=>201,
					'msg'=>'添加失败...'
				);
			}
			
			// 2. 返回结果
			echo json_encode($arr1);
		}else { // 有的话则为编辑
			$id = $_POST['id'];// 获取传递过来的id

			$res = update('categories',$_POST,$id); // 调用方法进行更新

			// 判断是否更新成功
			if($res){
				$arr3 = array(
					'code'=>200,
					'msg'=>'更新成功'
				);
			}else {
				$arr3 = array(
					'code'=>200,
					'msg'=>'更新失败'
				);
			}

			// 返回更新后的数据到前台

			echo json_encode($arr3);
		}
	}
~~~

