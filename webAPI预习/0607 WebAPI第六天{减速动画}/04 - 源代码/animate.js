
/*
*  第一个版本的函数
*       只能左右位移
*
* */
function animate_v1(element,target){
    // 清空上一次的定时器
    clearInterval(element.timer);
    //开启这一次的定时器
    element.timer = setInterval(function(){
        // 1 获取当前位置
        var current = element.offsetLeft;
        // 2 移动一点点
        // 2.1 计算步长： 每次移动剩下距离的1/10
        var step = (target - current) / 10;
        // 2.2 判断方向取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 2.3 把步长加到current上
        current += step;//步长已经自带方向了
        // 3 修改回对象身上
        element.style.left = current+'px';
        // 4 停下 -- 因为必然能到达，直接判断是否到达即可
        if(target == current){
            clearInterval(element.timer);
        }
    },20);
}


/*
*  第二个版本
*       相比之前的版本：
*           可以修改任意以px为单位的属性
*
*       对比上版本：
*           window.getComputedStyle
*           把属性也作为参数
*           设置属性的时候： element.style[attr] = current + 'px'
*
* */
function animate_v2(element,target,attr){
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // 1 获取要修改的属性的当前值
        var current = parseInt(window.getComputedStyle(element)[attr]);
        //console.log(current);
        // 2 变宽一点
        // 每次改变剩下宽度的1/10
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        // 3 修改回去 -- 跟上一个版本相比，设置的属性就是动态得到的
        element.style[attr] = current +'px';
        // 4 停下
        if(current == target){
            clearInterval(element.timer);
        }

    },20);
}


/*
*  第三个版本：
*       可以将多个属性同时修改
*       问题是： 无法让多个熟悉同时到达
*
*       对比：
*           参数变成对象
*           要遍历对象，执行循环，循环里面就是之前每个单个属性的修改的过程
*
* */
function animate_v3(element,obj){
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // 一个属性要做的事情，多个属性，做多次就可以了
        // 做多次-->循环的做--->多个键值对就存储了多个属性和目标值，只要遍历对象，就能得到所有的属性和目标值

        for(var attr in obj){

            //------------- 这部分是我们修改单个属性的代码----------
            var target = obj[attr];
            var current = parseInt(window.getComputedStyle(element)[attr]);
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            element.style[attr] = current +'px';
            if(current == target){
                //发现，当某个一属性到达目标值之后，就把定时器停止了，导致其他的属性没有到达目标值
                clearInterval(element.timer);
            }
            // ----------------------------------------------------

        }
    },20);
}


/*
*  可以将多个属性同时修改，可以同时到达
*
*       对比：
*           使用了反证法，保证多个属性同时成立
* */
function animate_v4(element,obj){
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // 1 在循环的外面假设： 假设都到达了目标值
        var flag = true;
        // 2 在循环内部尝试找到一个反例： 没有到达目标值的一个属性
        for(var attr in obj){
            //------------- 这部分是我们修改单个属性的代码----------
            var target = obj[attr];
            var current = parseInt(window.getComputedStyle(element)[attr]);
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            element.style[attr] = current +'px';
            // 如果满足条件，就是找到了一个没有到达目标值的反例
            if(current != target){
                // 找到反例，推翻假设
                flag = false;
                // 需要break？不！！！！以为动画还要继续做
            }
            // ----------------------------------------------------
        }

        // 3 在循环外面，判断假设是否仍然成立，如果成立，就都到达目标值了，就可以停下来了
        if(flag){
            clearInterval(element.timer);
        }
    },20);
}

/*
*
*  可以修改透明度
*       透明度的逻辑：
*           在第10个页面有过程
*
*           对比：
*               需要特殊处理
*                   判断是否是透明度
*
*                   1 小数  单位
*
*                       小数运算： 先放大再取整，再比较
* */
function animate_v5(element,obj){
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // 1 在循环的外面假设： 假设都到达了目标值
        var flag = true;
        // 2 在循环内部尝试找到一个反例： 没有到达目标值的一个属性
        for(var attr in obj){
            //修改透明度也是要遍历对象的，所以修改透明度的逻辑也在遍历中完成
            // 因为修改透明度跟修改px为单位的属性逻辑不一样特殊处理
            if(attr == 'opacity'){
                //修改透明度的逻辑
                var target = obj[attr];
                // 1 获取当前值
                var current = parseFloat(window.getComputedStyle(element).opacity);
                current = current * 100;
                target = target * 100;
                var step = (target - current) / 10;
                // 根据方向取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 修改回对象身上
                element.style.opacity = current/100;//因为放大了一百倍，赋值回去的时候，要变回原来的倍数
                current = Math.floor(current);
                target = Math.floor(target);

            }else{
                //就是修改以px为单位的逻辑

                //------------- 这部分是我们修改单个属性的代码----------
                var target = obj[attr];
                var current = parseInt(window.getComputedStyle(element)[attr]);
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current +'px';
                // 如果满足条件，就是找到了一个没有到达目标值的反例
                if(current != target){
                    // 找到反例，推翻假设
                    flag = false;
                    // 需要break？不！！！！以为动画还要继续做
                }
                // ----------------------------------------------------
            }


        }

        // 3 在循环外面，判断假设是否仍然成立，如果成立，就都到达目标值了，就可以停下来了
        if(flag){
            clearInterval(element.timer);
        }
    },20);
}