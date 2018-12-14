/**
 * ��������
 * @param element  Ҫ�ƶ���Ԫ��
 * @param target     Ҫ�����Ŀ��
 * @param step     ÿ���ƶ��ľ���
 */
function animate(element,target,step){
    // Ҫ��ֻ֤��һ����ʱ������Ԫ�ز���λ��
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        //1 �ȵõ���ǰλ��
        var current = element.offsetLeft;
        //2 ��λ�÷����ƶ�
        // ������һ��Ĭ��ֵ���Ϳ����ڵ��ú�����ʱ�򣬿��Բ��������������
        step = step || 40;
        if(current <= target){
            // ������Ӧ��+=
            current += step;
        }else {
            // ���ҵ���-=
            current -= step;
        }
        //3 ���û�box��left��������
        element.style.left = current +"px";
        //4 �ж��Ƿ�ͣ��
        if(Math.abs(target - current) <= step){
            clearInterval(element.timer);
            // Ϊ�˱�֤�ܵ���Ŀ���λ�ã�ǿ���趨box��λ��ΪĿ��λ��
            element.style.left = target + "px";
        }

    },20);
}
