$(function () {
  $('#fullpage').fullpage({
    verticalCentered: false,
    navigation: true,
    loopBottom:true,
    onLeave: function (index, nextIndex, direction) {
      /* 
      1 背景在第一屏的时候 没有旋转 在其他屏幕都有旋转 
      2 第一屏的时候 移除 s1_main_begin 离开第一屏的时候 重新添加
      3 第二屏的动画   一开始的时候 移除 s2_main_begin 正常 离开的时候 添加 s2_main_end
        s2_main s2_main_end   正确的class s2_main s2_main_begin  
       */

      if (nextIndex != 1) {
        // 2 3 4 
        $("#bg").addClass("rotate_bg");
      } else {
        // 1 
        $("#bg").removeClass("rotate_bg");
      }


      // 在第一屏离开的时候 
      if(index==1){
        $(".s1_main").addClass("s1_main_begin");
      }

      // 第二屏离开的时候
      if(index==2){
        $(".s2_main").addClass("s2_main_end");

        // 结束动画过渡完了之后 手动去改变class 
        setTimeout(function () {
          // 正确的class s2_main s2_main_begin 
          /* 
          链式编程 执行速度很快 
          有可能不是按照我们写代码的顺序线性执行
          如果 出现bug  手动添加 延迟 
           */
          $(".s2_main").css("transition","none").removeClass("s2_main_end").
          addClass("s2_main_begin").css("transition","transform 1s");
          
        },1000);
      }

      // 从第三屏离开的时候
      if(index==3){
        $(".s3_main").addClass("s3_main_begin");
      }
      // 从第四屏离开的时候
      if(index==4){
        $(".s4_main").addClass("s4_main_begin");
      }
    },
    afterLoad:function (linkName,index) {
      // 第一屏加载的时候触发
      if(index==1){
        $(".s1_main").removeClass("s1_main_begin");
      }

      // 第二屏加载的时候 触发 
      if(index==2){
        // $(".s2_main").css("transition","transform 1s").removeClass("s2_main_begin");
        $(".s2_main").removeClass("s2_main_begin");
      }
      if(index==3){
        $(".s3_main").removeClass("s3_main_begin");
      }
      if(index==4){
        $(".s4_main").removeClass("s4_main_begin");
      }
    }
  });
});