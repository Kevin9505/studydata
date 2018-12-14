## 1.联表查询

~~~js
SELECT * FROM posts  // 只能查询一张表的数据
select * from posts inner join users;
SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id
SELECT * FROM posts LEFT JOIN users on posts.user_id = users.id LEFT JOIN categories on posts.category_id = categories.id;
SELECT posts.id,posts.title,posts.category_id,posts.created,posts.status,users.nickname,
    categories.name FROM posts LEFT JOIN users on posts.user_id = users.id LEFT JOIN categories on  posts.category_id = categories.id;
~~~

## 2.所有文章内容修改

1.到admin/int/postsInt.php页面中,修改sql语句,代码如下:

~~~js
$res = query('SELECT posts.id,posts.title,posts.category_id,posts.created,posts.status,users.nickname,categories.name FROM posts LEFT JOIN users on posts.user_id = users.id LEFT JOIN categories on  posts.category_id = categories.id');

~~~

2.模板内容也要进行改变, 6   7

~~~js
<script type="text/template" id="postsListTmp">
  {{each data as val key}}
      <tr>
        <td class="text-center"><input type="checkbox"></td>
        <td>{{val.title}}</td>
        <td>{{val.nickname}}</td>
        <td>{{val.name}}</td>
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

3.刷新页面,即可看到效果.

## 3.所有文章

### 1.所有文章编辑的实现

1.修改编辑按钮,代码如下:

~~~js
<td class="text-center">
          <a href="/admin/post-add.php?action=editPosts&postsId={{val.id}}" class="btn btn-default btn-xs">编辑</a>
          <button class="btn btn-danger btn-xs btnDel" data-id="{{val.id}}">删除</button>
        </td>
~~~
2.跳转到post-add.php页面后进行如下获取url中的参数,并存到一个对象当中,代码如下:

~~~js
 // 1. 获得地址栏中的参数信息
  var str = location.search; // ?action=editPosts&postsId=4

  //  2. 判断是否有参数
  if(!str){ // 此处是添加的功能 
    renderData();
  }else {  // 此处是编辑的功能
      // 3. 截取?后面的内容 
      str = str.substr(1); //action=editPosts&postsId=4

      // 4. 以&进行切割 
      var arr = str.split('&');
      // console.log(arr); // ["action=editPosts", "postsId=4"]

      // 5. 循环遍历数组,再切割存到对象当中
      var obj = {};
      for(var i=0;i<arr.length;i++){
        var temp = arr[i].split('=');
        obj[temp[0]] = temp[1];
        console.log(obj); // {action: "editPosts", postsId: "4"}
      }
        
  }

~~~
3.把之前发送请求的ajax放在一个函数中封装起来,函数名为renderData

4.发送ajax请求

~~~js
// 1. 获得地址栏中的参数信息
  var str = location.search; // ?action=editPosts&postsId=4

  //  2. 判断是否有参数
  if(str){
    renderData();
  }else { 
      // 3. 截取?后面的内容 
      str = str.substr(1); //action=editPosts&postsId=4

      // 4. 以&进行切割 
      var arr = str.split('&');
      // console.log(arr); // ["action=editPosts", "postsId=4"]

      // 5. 循环遍历数组,再切割存到对象当中
      var obj = {};
      for(var i=0;i<arr.length;i++){
        var temp = arr[i].split('='); // 继续切割字符串
        obj[temp[0]] = temp[1];
        console.log(obj); // {action: "editPosts", postsId: "4"}
      }

      // 6. 发送ajax请求
      $.ajax({
        type:'get',
        url:'/admin/int/post-addInt.php',
        data:{
          action:obj.action,
          id:obj.postsId
        },
        success:function(res){

        }
      })
        
  }
~~~

5.post-addInt.php接收到请求后做如下处理:

~~~js
<?php 
	// 接收请求,进行处理,之后响应回去
	// 1. 引入外部文件
	require('../../functions.php');

	// 如果是get提交过来的数据的话,要执行下面的代码
	if(empty($_POST)){
		 if(!isset($_GET['action'])){ // 普通的查询渲染
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
			 }else { // 编辑的查询

			 	// 1. 获取id
			 	$id = $_GET['id'];//

			 	// 2. 查询数据
			 	$resPosts = query('select * from posts where id = '.$id);
			 	$resCate = query('select * from categories');// 
			 	// 3. 判断查询的数据是否存在
			 	if(!empty($resPosts)&&!empty($resCate)){
			 		$arr2 = array(
			 			'code'=>200,
			 			'msg'=>'查询成功',
			 			'dataPosts'=>$resPosts,
			 			'dataCate'=>$resCate
			 		);
			 	}else {
			 		$arr2 = array(
			 			'code'=>201,
			 			'msg'=>'查询失败'
			 		);
			 	}

			 	// 4. 将数据返回给前台页面
			 	echo json_encode($arr2);
			 }
		}

		// 如果是post提交过来的数据,则要执行下面的代码
		if(!empty($_POST)){

			// 1. 调用方法添加数据
			$res = insert('posts',$_POST);

			// 2. 判断是否添加成功
			if($res){
				$arr1 = array(
					'code'=>200,
					'msg'=>'数据添加成功...'
				);
			}else {
				$arr1 = array(
					'code'=>201,
					'msg'=>'数据添加失败'
				);
			}

			// 3. 返回添加后的结果给前端页面
			echo json_encode($arr1);
		}
 ?>
~~~

6.前端页面需要重新定义模板

~~~js
<script type="text/template" id="cateListTmp1">
  <div class="col-md-9">
          <div class="form-group">
            <label for="title">标题</label>
            <input id="title" value="{{dataPosts[0].title}}" class="form-control input-lg" name="title" type="text" placeholder="文章标题">
            <input type="hidden"  name="user_id" value="{{dataPosts[0].id}}">
          </div>
          <div class="form-group">
            <label for="content">标题</label>
            <textarea id="content" class="form-control input-lg" name="content" cols="30" rows="10" placeholder="内容">{{dataPosts[0].content}}</textarea>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="slug">别名</label>
            <input id="slug" value="{{dataPosts[0].slug}}" class="form-control" name="slug" type="text" placeholder="slug">
            <p class="help-block">https://zce.me/post/<strong>slug</strong></p>
          </div>
          <div class="form-group">
            <label for="feature">特色图像</label>
            <!-- show when image chose -->
            {{if dataPosts[0].feature}}
              <img class="help-block thumbnail" src="{{dataPosts[0].feature}}">
            {{else}}
              <img class="help-block thumbnail" style="display: none">
            {{/if}}
            <input id="feature" class="form-control"  type="file">
            <input  name="feature" type="hidden" id="thumb">
          </div>
          <div class="form-group" id="cateList">
            <label for="category">所属分类</label>
            <select id="category" class="form-control" name="category_id">
              {{each dataCate as val key}}
                <option value="{{val.id}}" {{if val.id==dataPosts[0].category_id}}selected {{/if}}>{{val.name}}</option>
              {{/each}}
            </select>
          </div>
          <div class="form-group">
            <label for="created">发布时间</label>
            <input id="created" value={{dataPosts[0].created.replace(' ','T')}} class="form-control" name="created" type="datetime-local">
          </div>
          <div class="form-group">
            <label for="status">状态</label>
            <select id="status" class="form-control" name="status">
              <option value="drafted">草稿</option>
              <option value="published">已发布</option>
            </select>
          </div>
          <div class="form-group">
            {{if dataPosts[0].id}}
            <button class="btn btn-primary" type="submit" id="btnUdate">修改</button>
            {{else }}
              <button class="btn btn-primary" type="submit" id="btnSave">保存</button>
            {{/if}}
          </div>
        </div>
</script>
~~~

7.接收到服务器返回来的数据之后,要重新渲染页面

~~~js
 // 6. 发送ajax请求
      $.ajax({
        type:'get',
        url:'/admin/int/post-addInt.php',
        data:{
          action:obj.action,
          id:obj.postsId
        },
        dataType:'json',
        success:function(res){
          if(res&&res.code == 200){
            var htmlStr = template('cateListTmp1',res);
            $('form').html(htmlStr);
          }
        }
      })
~~~

8.注意还得重新给上传图片的按钮注册事件,因为是用模板生成的页面

~~~js
  // 6. 发送ajax请求
      $.ajax({
        type:'get',
        url:'/admin/int/post-addInt.php',
        data:{
          action:obj.action,
          id:obj.postsId
        },
        dataType:'json',
        success:function(res){
          if(res&&res.code == 200){
            var htmlStr = template('cateListTmp1',res);
            $('form').html(htmlStr);

            // *****************下面是图片或是文件上传*********************
            // 1. 给按钮注册事件
            $('form').on('change','#feature',function(){
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
                   $('#thumb').val(xhr.responseText);
                 }
               }
            })
          }
        }
      })
~~~
### 2.给更新按钮注册事件

1.给更新按钮注册事件

~~~js
// ************给更新按钮注册事件*******************
            $('form').on('click','#btnUpdate',function(){
              $.ajax({
                type:'post',
                url:'/admin/int/post-addInt.php',
                dataType:'json',
                data:$('form').serialize(),
                success:function(res){
                 
                }
              })
              return false;// 阻止浏览器的默认刷新行为
            })
~~~

2.post-addInt.php接收到请求后处理如下:

~~~js
	// 如果是post提交过来的数据,则要执行下面的代码
		if(!empty($_POST)){

			if(!isset($_POST['id'])){ // 这是添加的操作
				// 1. 调用方法添加数据
				$res = insert('posts',$_POST);

				// 2. 判断是否添加成功
				if($res){
					$arr1 = array(
						'code'=>200,
						'msg'=>'数据添加成功...'
					);
				}else {
					$arr1 = array(
						'code'=>201,
						'msg'=>'数据添加失败'
					);
				}

				// 3. 返回添加后的结果给前端页面
				echo json_encode($arr1);
			}else { // 这是更新的操作
				// 1. 获取id
				$id = $_POST['id'];

				// 2. 调用方法更新数据
				$res = update('posts',$_POST,$id);

				// 3. 判断更新是否成功
				if(!empty($res)){
					$arr3= array(
						'code'=>200,
						'msg'=>'更新成功'
					);
				}else {
					$arr3= array(
						'code'=>201,
						'msg'=>'更新失败'
					);
				}

				// 4. 返回更新结果给前台
				echo json_encode($arr3);
			}
		}
 ?>
~~~
3.前台接收到数据之后做如下处理:

~~~js
// ************给更新按钮注册事件*******************
            $('form').on('click','#btnUpdate',function(){
              $.ajax({
                type:'post',
                url:'/admin/int/post-addInt.php',
                dataType:'json',
                data:$('form').serialize(),
                success:function(res){
                  if(res&&res.code == 200){
                    // 跳转到所有文章的页面
                    location.href='/admin/posts.php';
                  }
                }
              })
              return false;// 阻止浏览器的默认刷新行为
            })
~~~

## 4.导航菜单的删除

1.给删除按钮注册事件

~~~js
// ************这是删除的操作**********************
  // 1. 给删除按钮注册事件
  $('tbody').on('click','.btnDel',function(){
    // 2. 获取当前的id
    var id = $(this).attr('data-id');
    // 3. 发送ajax请求 
    $.ajax({
      type:'get',
      url:'/admin/int/nav-menusInt.php',
      data:{
        index:id
      },
      dataType:'json',
      success:function(res){
        if(res&&res.code == 200){
          // 重新渲染页面
          
        }
      }
    })
  })
~~~

2.后台接收数据进行处理

~~~js
<?php 
	// 1. 引入外部文件
	require('../../functions.php');

	if(empty($_POST)){ // 这是普通的get提交
			if(!isset($_GET['index'])){
				// 2. 调用方法查询数据
				$res = query("SELECT `VALUE` from options where `key` = 'nav_menus'");

				// print_r($res[0]['VALUE']);
				// var_dump($res[0]['VALUE']);

				// 3. 判断数组是否为空
				if(!empty($res)){
					$json = json_decode($res[0]['VALUE'],true);
					// print_r($json);
					$arr = array(
						'code'=>200,
						'msg'=>'查询成功',
						'data'=>$json
					);
				}else {
					$arr = array(
						'code'=>201,
						'msg'=>'查询失败...'
					);
			 }
			 // 4.将查询结果返回给前端页面
			 echo json_encode($arr); // 前后端数据的交互要么是二进制数据要么是字符串
		 }else {
		 		// 1. 获取要删除的那一项的索引
				$index = $_GET['index'];

				// 2. 调用方法查询数据
				$res = query("SELECT `VALUE` from options where `key` = 'nav_menus'");

				// 3. 判断数组是否为空
				if(!empty($res)){
					// 4. 将数据转换为数组
					// print_r($res[0]['VALUE']);
					// exit;
					$arr1 = json_decode($res[0]['VALUE'],true);
					// print_r($arr);
					// exit;
					// 5. 删除数组中的元素
					unset($arr1[$index]);
					// print_r($arr);
					// exit;

					// 6. 将数据转换成字符串,更新回数据库
					$str = json_encode($arr1,JSON_UNESCAPED_UNICODE);
					// var_dump($str);
					// 7. 将数据返回给前台页面
					$arr2 = array(
						'code'=>200,
						'msg'=>'更新成功...',
						'data'=>$arr1
					);
					echo json_encode($arr2);
				}


		 }

	}
 ?>
~~~

