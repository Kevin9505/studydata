/**
 * ��һ���汾�ĺ���������ˮƽλ��
 * @param element �˶���Ԫ��
 * @param target �˶���Ŀ��
 */
function animate_v1(element,target){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // 1 ��ȡ��ǰֵ
        var current = element.offsetLeft;
        // 2 �޸�һ��
        var step = (target - current) / 10;
        // �жϷ���ȡ��
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        // 3 �޸Ļ�Ԫ�ص���ʽ
        element.style.left = current + 'px';
        // 4 ͣ��
        if(current == target){
            clearInterval(element.timer)
        }
    },20);
}


/*
 *  ϣ�������޸ĳ���left�������������?
 * */
function animate_v2(element,target,attr){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // 1 ��ȡ��ǰֵ
        var current = parseInt(window.getComputedStyle(element)[attr]);
        // 2 �޸�һ��
        var step = (target - current) / 10;
        // �жϷ���ȡ��
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        // 3 �޸Ļ�Ԫ�ص���ʽ
        element.style[attr] = current + 'px';
        // 4 ͣ��
        if(current == target){
            clearInterval(element.timer)
        }
    },20);
}


/*
 *  ϣ������ͬʱ�޸Ķ������?
 * */
function animate_v3(element,obj){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){

        for(var attr in obj){
            // 0 ��targetȡ����
            var target = obj[attr];
            // 1 ��ȡ��ǰֵ
            var current = parseInt(window.getComputedStyle(element)[attr]);
            // 2 �޸�һ��
            var step = (target - current) / 10;
            // �жϷ���ȡ��
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            // 3 �޸Ļ�Ԫ�ص���ʽ
            element.style[attr] = current + 'px';
            // 4 ͣ��
            if(current == target){
                clearInterval(element.timer)
            }
        }

    },20);
}

/*
 *  ϣ�����е����Զ��ܵ���Ŀ��ֵ
 * */
function animate_v4(element,obj){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // ʹ�÷�֤�������������ͬʱ���������
        var flag = true;//�����Ѿ���������
        // �����ҳ�һ������
        for(var attr in obj){
            // 0 ��targetȡ����
            var target = obj[attr];
            // 1 ��ȡ��ǰֵ
            var current = parseInt(window.getComputedStyle(element)[attr]);
            // 2 �޸�һ��
            var step = (target - current) / 10;
            // �жϷ���ȡ��
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            // 3 �޸Ļ�Ԫ�ص���ʽ
            element.style[attr] = current + 'px';
            // �ҷ���
            if(current != target){
                // �Ѽ����Ʒ�
                flag = false;
            }
        }
        // �ж����޷����� �����Ƿ���Ȼ����
        if(flag){
            // ���������Զ������ˣ����Ǹ�ֹͣ��ʱ����ʱ����
            clearInterval(element.timer);
        }
    },20);
}

/*
 *  ϣ�������������޸���pxΪ��λ�����ԣ���ϣ�������޸�͸����
 *
 *       opacity: 0-1
 * */
function animate_v5(element,obj){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // ʹ�÷�֤�������������ͬʱ���������
        var flag = true;//�����Ѿ���������
        // �����ҳ�һ������
        for(var attr in obj){
            // ��Ϊ͸���ȵĴ����߼���һ�������⴦��һ��
            if(attr == 'opacity'){
                // 0 ��ȡĿ��
                var target = obj[attr];
                // 1 ��ȡ��ǰ��͸����
                var current = parseFloat(window.getComputedStyle(element)[attr])
                // *** ��������������
                // *** 1 �ȷŴ�
                target *= 100;
                current *= 100;
                // 2 �޸�һ���?
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 �޸Ļ�ȥ
                element.style[attr] = current / 100;
                // *** 2 ��ȡ��
                target = Math.floor(target);
                current = Math.floor(current);
                if(current != target){
                    flag = false;
                }
            }else{
                // 0 ��targetȡ����
                var target = obj[attr];
                // 1 ��ȡ��ǰֵ
                var current = parseInt(window.getComputedStyle(element)[attr]);
                // 2 �޸�һ��
                var step = (target - current) / 10;
                // �жϷ���ȡ��
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 �޸Ļ�Ԫ�ص���ʽ
                element.style[attr] = current + 'px';
                // �ҷ���
                if(current != target){
                    // �Ѽ����Ʒ�
                    flag = false;
                }
            }
        }
        // �ж����޷����� �����Ƿ���Ȼ����
        if(flag){
            // ���������Զ������ˣ����Ǹ�ֹͣ��ʱ����ʱ����
            clearInterval(element.timer);
        }
    },20);
}

/*
*  �����޸Ĳ㼶
* */
function animate_v6(element,obj){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // ʹ�÷�֤�������������ͬʱ���������
        var flag = true;//�����Ѿ���������
        // �����ҳ�һ������
        for(var attr in obj){
            // ���⴦��㼶���߼�?
            if(attr == 'zIndex'){
                // �㼶�Ķ����ǿ������ģ��Ͳ��������ˣ�ֱ�ӰѲ㼶����ΪĿ��ֵ����
                var target = obj[attr];
                // �޸Ļ�Ԫ������
                element.style[attr] = target;
            }else
            // ��Ϊ͸���ȵĴ����߼���һ�������⴦��һ��
            if(attr == 'opacity'){
                // 0 ��ȡĿ��
                var target = obj[attr];
                // 1 ��ȡ��ǰ��͸����
                var current = parseFloat(window.getComputedStyle(element)[attr])
                // *** ��������������
                // *** 1 �ȷŴ�
                target *= 100;
                current *= 100;
                // 2 �޸�һ���?
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 �޸Ļ�ȥ
                element.style[attr] = current / 100;
                // *** 2 ��ȡ��
                target = Math.floor(target);
                current = Math.floor(current);
                if(current != target){
                    flag = false;
                }
            }else{
                // 0 ��targetȡ����
                var target = obj[attr];
                // 1 ��ȡ��ǰֵ
                var current = parseInt(window.getComputedStyle(element)[attr]);
                // 2 �޸�һ��
                var step = (target - current) / 10;
                // �жϷ���ȡ��
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 �޸Ļ�Ԫ�ص���ʽ
                element.style[attr] = current + 'px';
                // �ҷ���
                if(current != target){
                    // �Ѽ����Ʒ�
                    flag = false;
                }
            }
        }
        // �ж����޷����� �����Ƿ���Ȼ����
        if(flag){
            // ���������Զ������ˣ����Ǹ�ֹͣ��ʱ����ʱ����
            clearInterval(element.timer);
        }
    },20);
}


/*
*  ����˻ص��������ڶ���ִ�����֮�� �������һЩ��Ҫ���߼�?
* */
function animate_v7(element,obj,callback){
    // ��֤��ʱ��ֻ��һ�����Ȱ���һ�εĶ�ʱ�����?
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        // ʹ�÷�֤�������������ͬʱ���������
        var flag = true;//�����Ѿ���������
        // �����ҳ�һ������
        for(var attr in obj){
            // ���⴦��㼶���߼�?
            if(attr == 'zIndex'){
                // �㼶�Ķ����ǿ������ģ��Ͳ��������ˣ�ֱ�ӰѲ㼶����ΪĿ��ֵ����
                var target = obj[attr];
                // �޸Ļ�Ԫ������
                element.style[attr] = target;
            }else
            // ��Ϊ͸���ȵĴ����߼���һ�������⴦��һ��
            if(attr == 'opacity'){
                // 0 ��ȡĿ��
                var target = obj[attr];
                // 1 ��ȡ��ǰ��͸����
                var current = parseFloat(window.getComputedStyle(element)[attr])
                // *** ��������������
                // *** 1 �ȷŴ�
                target *= 100;
                current *= 100;
                // 2 �޸�һ���?
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 �޸Ļ�ȥ
                element.style[attr] = current / 100;
                // *** 2 ��ȡ��
                target = Math.floor(target);
                current = Math.floor(current);
                if(current != target){
                    flag = false;
                }
            }else{
                // 0 ��targetȡ����
                var target = obj[attr];
                // 1 ��ȡ��ǰֵ
                var current = parseInt(window.getComputedStyle(element)[attr]);
                // 2 �޸�һ��
                var step = (target - current) / 10;
                // �жϷ���ȡ��
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                // 3 �޸Ļ�Ԫ�ص���ʽ
                element.style[attr] = current + 'px';
                // �ҷ���
                if(current != target){
                    // �Ѽ����Ʒ�
                    flag = false;
                }
            }
        }
        // �ж����޷����� �����Ƿ���Ȼ����
        if(flag){
            // ���������Զ������ˣ����Ǹ�ֹͣ��ʱ����ʱ����
            clearInterval(element.timer);

            // ��ʱ������ˣ������ͽ�����?,�Ͱ���������Ҫ�ģ�����callback
            //if(typeof callback == 'function'){callback();}
            // callback && callback();
            if(callback){
                callback();
            }
        }
    },20);
}