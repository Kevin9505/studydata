## 1.所有文章页面的渲染

### 1.引入公共资源文件

1.将公共资源文件引入

~~~
<?php include './inc/css.php' ?>
<?php include './inc/script.php' ?>
<?php include './inc/navBar.php' ?>
<?php include './inc/aside.php' ?>
~~~

### 2.渲染当前页面数据

1.将admin/posts.html页面修改成posts.php

2.检测用户是否登陆

~~~js
<?php 
  // 1. 引入外部文件
  require('../functions.php');

  // 2. 检测用户是否登陆
  checkLogin();// 
 ?>
~~~



3.在posts.php页面底部发送ajax请求,代码如下:

~~~js
<script type="text/javascript">
  // 发送ajax请求渲染页面
  // 1.发送ajax请求
  $.ajax({
    type:'get',
    url:'/admin/int/postsInt.php',
    success:function(res){

    }
  })
</script>
~~~

4.在admin/int新建postsInt.php文件,并写如下代码

~~~js
<?php 
	
	// 1. 引入外部文件
	require('../../functions.php');
	// 2. 查询数据库获取数据
	$arr = query('select * from posts');

	// 3. 判断是否有查询结果
	if(!empty($arr)){
		$arr = array(
			'code'=>200,
			'msg'=>'查询成功',
			'data'=>$arr
		);
	}else {
		$arr=array(
			'code'=>201,
			'msg'=>'查询失败'
		);
	}

	// 4. 返回查询结果
	echo json_encode($arr);
 ?>
~~~

5.前端接收后台数据并处理,代码如下:

~~~js
<script type="text/javascript">
  // 发送ajax请求渲染页面
  // 1.发送ajax请求
  $.ajax({
    type:'get',
    url:'/admin/int/postsInt.php',
    dataType:'json',
    success:function(res){
      if(res&&res.code == 200){
        // 要渲染页面
        var htmlStr = template('PListTmp',res);
        $('#list').html(htmlStr);
      }
    }
  })
</script>
~~~

6.要准备页面模板

~~~
<script type="text/template" id="PListTmp">
  {{each data as val key}}
    <tr>
      <td class="text-center"><input type="checkbox"></td>
      <td>{{val.title}}</td>
      <td>{{val.user_id}}</td>
      <td>{{val.category_id}}</td>
      <td class="text-center">{{val.created}}</td>
      <td class="text-center">{{val.status}}</td>
      <td class="text-center">
        <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
        <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
      </td>
    </tr>
    {{/each}}
</script>
~~~

7.记得给tbody添加一个list的id

~~~js
<tbody id="list">
          
          
</tbody>
~~~

8.显示的文章状态要改变一下,代码如下: 9--13行

~~~js
<script type="text/template" id="PListTmp">
  {{each data as val key}}
    <tr>
      <td class="text-center"><input type="checkbox"></td>
      <td>{{val.title}}</td>
      <td>{{val.user_id}}</td>
      <td>{{val.category_id}}</td>
      <td class="text-center">{{val.created}}</td>
      {{if val.status == 'published'}}
        <td class="text-center">已发布</td>
      {{else if val.status == 'drafted'}}
        <td class="text-center">草稿</td>
      {{/if}}
      <td class="text-center">
        <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
        <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
      </td>
    </tr>
    {{/each}}
</script>
~~~

9.页面显示的作者和分类的数字情况,应该是正常的作者名和分类名,这就要涉及到多表查询.

### 3.删除功能的实现

1.给删除按钮添加一个类,并添加data-id属性

~~~js
<script type="text/template" id="postsListTmp">
  {{each data as val key}}
      <tr>
        <td class="text-center"><input type="checkbox"></td>
        <td>{{val.title}}</td>
        <td>{{val.user_id}}</td>
        <td>{{val.category_id}}</td>
        <td class="text-center">{{val.created}}</td>
        {{if val.status == 'published'}}
          <td class="text-center">已发布</td>
        {{else if val.status == 'drafted'}}
          <td class="text-center">草稿</td>
        {{/if}}
        <td class="text-center">
          <a href="javascript:;" class="btn btn-default btn-xs">编辑</a>
          <button class="btn btn-danger btn-xs btnDel" data-id="{{val.id}}">删除</button>
        </td>
      </tr>
  {{/each}}
</script>
~~~

2.给删除按钮注册事件

~~~js
 // 1. 给删除按钮注册事件
  $('tbody').on('click','.btnDel',function(){
    // 2. 获取当前按钮的id
    var id = $(this).attr('data-id');

    // 3. 发送ajax请求
    $.ajax({
      type:'get',
      url:'/admin/int/postsInt.php',
      data:{
        id:id,
        action:'delPosts'
      },
      dataType:'json',
      success:function(res){
        if(res&&res.code == 200){
          // 重新渲染当前页面，也就是重新刷新 当前页面
          renderData();
        }
      }
    })
  })
~~~



3.因为要重新刷新页面,所以要对之前的代码进行封装

~~~js
 // 发送请求,获取整个页面的数据
  renderData();
  function renderData(){
     $.ajax({
      type:'get',
      url:'/admin/int/postsInt.php',
      dataType:'json',
      success:function(res){
        if(res&&res.code == 200){
          // 将数据渲染在页面上
          var htmlStr = template('postsListTmp',res);// 准备模板字符串
          $('tbody').html(htmlStr); // 渲染页面
        }
      }
    })
  }
~~~



## 2.写文章页面的实现

### 1.引入公共资源文件

1.将admin/post-add.html页面改成post-add.php

2.引入公共资源文件

~~~js
<?php include './inc/css.php' ?>
<?php include './inc/script.php' ?>
<?php include './inc/navBar.php' ?>
<?php include './inc/aside.php' ?>
~~~



### 2.渲染当前页面数据

1.当修改完了以上内容之后,在页面访问的时候,头像和昵称是会报错的,因为没有开启session

2.在post-add.php页面的顶部检测用户是否

~~~js
<?php 
  // 1. 引入外部文件
   require('../functions.php');

  // 2. 检测用户是否登陆
   checkLogin();// 
 ?> 
~~~

3.在post-add.php的页面底部写js代码发送ajax请求渲染当前页面内容

~~~js
<script type="text/javascript">
  $.ajax({
    type:'get',
    url:'/admin/int/post-addInt.php',
    success:function(res){
      
    }
  })
</script>
~~~

4.在admin/int文件夹下面新建post-addInt.php文件,并写代码如下:

~~~js
<?php 
	// 1.引入外部文件
	require('../../functions.php');

	// 2. 调用方法查询数据库
	$res = query('select * from categories');

	// 3. 判断查询结果
	if(!empty($res)){
		$arr = array(
			'code'=>200,
			'msg'=>'查询成功',
			'data'=>$res
		);
	}else {
		$arr = array(
			'code'=>201,
			'msg'=>'查询失败'
		);
	}

	// 4. 返回查询结果
	echo json_encode($res);
 ?>
~~~

5.数据请求回来之后,处理如下：

~~~js
<script type="text/javascript">
  $.ajax({
    type:'get',
    url:'/admin/int/post-addInt.php',
    dataType:'json',
    success:function(res){
      if(res&&res.code == 200){
        // 渲染模板
        var htmlStr = template('cateTmp',res);
        $('#cateList').html(htmlStr);
      }
    }
  })
</script>
~~~

6.准备模板,渲染数据

~~~js
<script type="text/template" id="cateTmp">
  <label for="category">所属分类</label>
       <select id="category" class="form-control" name="category">
        {{each data as val key}}
        <option value="{{val.id}}">{{val.name}}</option>
        {{/each}}
    </select>
</script>
~~~

7.不要忘了给上面的div添加一个id

~~~js
<div class="form-group" id="cateList">
            
</div>
~~~

### 3.上传图片

1.给按钮注册改变的事件

~~~js
  // *****************下面是图片或是文件上传*********************
  // 1. 给按钮注册事件
  $('#feature').on('change',function(){
    // 2. 创建对象 
     var data = new FormData();

     // console.log(this.files[0]); // this.files里面是所有的文件列表
     // 3. 将要上传的文件添加到里面
     data.append('feature',this.files[0]);

     // 4. 创建异步对象
     var xhr = new XMLHttpRequest();

     // 5. 设置请求行
     xhr.open('post','/admin/int/post-addUploadFile.php');

     // 6. 设置请求头  这一步是可以省略的,是不用设置的

     // 7. 设置请求体  就是往后台发送数据
     xhr.send(data);

     // 8. 监视异步对象的变化,注册监听事件
     xhr.onreadystatechange = function () {
       if(xhr.status == 200 && xhr.readyState == 4){
         // 要将上传的图片展示在当前的这个位置
         $('.thumbnail').attr('src',xhr.responseText).show();

         // 将图片在服务器文件中的路径存在当前的表单当中
         
       }
     }
  })
  /**
   * 图片上传的思路:
   * 1. 给文件按钮featurn注册change事件
   * 2. 创建FormData对象
   * 3. 将要上传的文件添加到这个对象当中
   * 4. 创建异步对象
   * 5. 设置请求行   请可以头可以省略
   * 6. 设置请求体
   * 7. 监视异步对象的变化
   * 8. 将服务器返回来的图片路径,设置到img标签,让图片在本地渲染出来
   * 9. 将图片的路径存在一个表单当中
   * 10. 单击保存按钮，上传所有的数据
   */

~~~

2.在admin/int下面新建一个post-addUploadFile.php的文件,写代码如下:

~~~js
<?php 
	// 1. 判断是否有文件上传过来
	if(isset($_FILES['feature'])){
		// 2. 判断目标文件是否存
		if(!file_exists('../../uploads')){
			mkdir('../../uploads');
		}

		// 3. 获取文件的后缀
		$ext = explode('.',$_FILES['feature']['name'])[1];
		// print_r($ext);
			// Array
			// (
			//     [0] => 002
			//     [1] => gif
			// )

		// 4. 拼接路径
		$path = '../../uploads/'.uniqid().'.'.$ext;

		// 5. 将图片移动到指定的目标位置
		move_uploaded_file($_FILES['feature']['tmp_name'],$path);

		// 6. 将路径返回给前台浏览器
		echo $path;
	}
		// print_r($_FILES);
		// exit;
		// Array
		// (
		//     [feature] => Array
		//         (
		//             [name] => 002.gif
		//             [type] => image/gif
		//             [tmp_name] => C:\Windows\php670C.tmp
		//             [error] => 0
		//             [size] => 20567
		//         )
		// )
	/**
	 * 上传文件的思路
	 * 1.判断文件是否上传过来
	 * 2.判断目标目录是否存在
	 * 3.获取上传文件的后缀名
	 * 4.生一个路径和唯一的名称
	 * 5.移动到指定的目标位置
	 * 6.将图片存储的路径返回给前端
	 */
 ?>
~~~

### 4.添加文章

1.在表单中添加两个隐藏域

~~~js
<div class="form-group">
     <label for="title">标题</label>
     <input id="title" class="form-control input-lg" name="title" type="text" placeholder="文章标题">
     <input type="hidden" name="user_id" value="<?php echo $_SESSION['userInfo']['id']?>">
 </div>

<div class="form-group">
      <label for="feature">特色图像</label>
      <!-- show when image chose -->
      <img class="help-block thumbnail" style="display: none">
     <input id="feature" class="form-control" type="file">
    <input id="thumb" name="feature" type="hidden">
</div>
~~~

2.修改一下name的值

~~~js
<script type="text/template" id="cateListTmp">
    <label for="category">所属分类</label>
      <select id="category" class="form-control" name="category_id">
        {{each data as val key}}
          <option value="{{val.id}}">{{val.name}}</option>
        {{/each}}
      </select>
</script>
~~~



3.给保存按钮添加一个id

~~~js
<div class="form-group">
            <button class="btn btn-primary" id="btnSave" type="submit">保存</button>
</div>
~~~



4.给保存按钮注册事件

~~~js
// ***************提交数据到服务器**********************
  $('#btnSave').on('click',function(){
    $.ajax({
      type:'post',
      url:'/admin/int/post-addInt.php',
      data:$('form').serialize(),
      success:function(res){

      }
    });

    return false;// 不要刷新 页面
  })
~~~

5.在后台页面post-addInt.php中书写代码,如下：

~~~js
<?php 
	// 接收请求,进行处理,之后响应回去
	// 1. 引入外部文件
	require('../../functions.php');

	if(empty($_POST)){  // get请求的时候
		// 2. 调用方法,查询数据库
			$res = query('select * from categories');// 虽然当前是添加文章的页面,但是这个分类信息还是来源于分类表中的name

			// 3. 判断查询是否成功
			if(!empty($res)){
				$arr = array(
					'code'=>200,
					'msg'=>'查询成功',
					'data'=>$res
				);
			}else {
				$arr = array(
					'code'=>201,
					'msg'=>'查询失败'
				);
			}

			// 4. 返回结果
			echo json_encode($arr);
			exit;
	}

	// post请求的时候的数据
	if(!empty($_POST)){ // 是post过来的数据
		// 1. 调用方法进行提交
		$res = insert('posts',$_POST);

		// 2. 判断数据是否插入成功
		if($res){
			$arr = array(
				'code'=>200,
				'msg'=>'添加数据成功'
			);
		}else {
			$arr = array(
				'code'=>201,
				'msg'=>'添加数据失败'
			);
		}

		// 3. 将添加结果返回给前端页面
		echo json_encode($arr);
	}

 ?>
~~~



5.刷新页面

~~~js
// ***************提交数据到服务器**********************
  $('#btnSave').on('click',function(){
    $.ajax({
      type:'post',
      url:'/admin/int/post-addInt.php',
      data:$('form').serialize(),
      dataType:'json',
      success:function(res){
        if(res&&res.code == 200){
          location.href='./posts.php';// 跳转到另一个页面
        }
      }
    });

    return false;// 不要刷新 页面
  })
~~~

## 3.评论功能的实现

### 1.改造页面

1.将admin/comments.html页面修改成admin/comments.php

2.引入公共样式文件

~~~js
<?php include './inc/css.php' ?>
<?php include './inc/script.php' ?>
<?php include './inc/navBar.php' ?>
<?php include './inc/aside.php' ?>
~~~

3.此时刷新 页面的话,会发现报错.

4.因此需要在页面的顶部开启用户验证

~~~js
<?php 
  // 1. 引入外部文件
  require('../functions.php');

  // 2. 检测用户是否登陆
  checkLogin();
 ?>
~~~

### 2.渲染当前页面

1.在页面底部发送ajax请求

~~~js
<script type="text/javascript">
  // 发送ajax请求
  $.ajax({
    type:'get',
    url:'/admin/int/commentsInt.php',
    dataType:'json',
    success:function(res){
     
    }
  })
</script>
~~~
2.在admin/int文件夹下新建文件commentsInt.php文件

3.在此文件中写如下代码:

~~~js
<?php 
	// 1. 引入外部文件
	require('../../functions.php');

	// 2. 调用方法查询数据
	$res = query('select * from comments');

	// 3. 判断读取的数据
	if(!empty($res)){
		$arr = array(
			'code'=>200,
			'msg'=>'读取成功',
			'data'=>$res
		);
	}else {
		$arr = array(
			'code'=>201,
			'msg'=>'读取失败'
		);
	}

	// 4. 将结果返回给前端页面
	echo json_encode($arr);
 ?>
~~~
4.前台页面根据返回来的数据进行页面的渲染,首先拼接模板

~~~js
<script type="text/template" id="commListTmp">
  {{each data as val key}}
      <tr class="danger">
        <td class="text-center"><input type="checkbox"></td>
        <td>{{val.author}}</td>
        <td>{{val.content}}</td>
        <td>《Hello world》</td>
        <td>{{val.created}}</td>
        {{if val.status =='approved'}}
          <td>批准</td>
        {{else if val.status =='rejected'}}
          <td>拒绝</td>
        {{else if val.status =='held'}}
          <td>正在审核</td>
        {{/if}}
        <td class="text-center">
          <a href="post-add.html" class="btn btn-info btn-xs">批准</a>
          <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
        </td>
      </tr>
   {{/each}}
</script>
~~~
5.调用函数,渲染页面

~~~js
<script type="text/javascript">
  // 发送ajax请求
  $.ajax({
    type:'get',
    url:'/admin/int/commentsInt.php',
    dataType:'json',
    success:function(res){
      if(res&&res.code == 200){
        // 根据数据渲染页面
        var htmlStr = template('commListTmp',res);

        // 渲染页面
        $('tbody').html(htmlStr);
      }
    }
  })
</script>
~~~
## 4.导航菜单

### 1.引入公共资源文件

1.将admin/nav-munus.html页面改成nav-menus.php

2.引入公共样式

~~~js
<?php include './inc/css.php' ?>
<?php include './inc/script.php' ?>
<?php include './inc/navBar.php' ?>
<?php include './inc/aside.php' ?>
~~~

3.在页面的顶部引入外部文件,并检测用户是否登陆

~~~js
<?php 
  // 1. 引入外部文件
  require('../functions.php');

  // 2. 检测用户是否登陆
  checkLogin();
 ?>
~~~

