/*
*  封装的代码，一般是不会作为全局变量或者全局函数存在的，而是会使用一个对象，来把兼容的代码保护起来
*   我们这么做的好处是：
*       就不会被别人定义的函数给覆盖了
*
*
* */
var eventTool = {
    // 兼容的获取事件对象的函数
    getEvent:function(e){
        return e || window.event;
    },
    //兼容的获取pageX
    getPageX:function(e){
        //先兼容的获取事件对象
        e = this.getEvent(e);
        // 计算pageX
        // 如果浏览器本身就支持pageX，就不用兼容的获取了
        return e.pageX || e.clientX + document.documentElement.scrollLeft;
    },
    //兼容的获取pageY
    getPageY:function(e){
        //先兼容的获取事件对象
        e = this.getEvent(e);
        // 计算pageY
        // 如果浏览器本身就支持pageY，就不用兼容的获取了
        return e.pageY || e.clientY + document.documentElement.scrollTop;
    }
};