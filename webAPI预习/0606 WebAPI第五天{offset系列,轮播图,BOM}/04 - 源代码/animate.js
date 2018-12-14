/**
 * 动画函数
 * @param element  要移动的元素
 * @param target     要到达的目标
 * @param step     每次移动的距离
 */
function animate(element,target,step){
    // 要保证只有一个定时器会让元素产生位移
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        //1 先得到当前位置
        var current = element.offsetLeft;
        //2 让位置发生移动
        // 给步长一个默认值，就可以在调用函数的时候，可以不传递这个参数了
        step = step || 40;
        if(current <= target){
            // 从左到右应该+=
            current += step;
        }else {
            // 从右到左，-=
            current -= step;
        }
        //3 设置回box的left属性身上
        element.style.left = current +"px";
        //4 判断是否停下
        if(Math.abs(target - current) <= step){
            clearInterval(element.timer);
            // 为了保证能到达目标的位置：强制设定box的位置为目标位置
            element.style.left = target + "px";
        }

    },20);
}
