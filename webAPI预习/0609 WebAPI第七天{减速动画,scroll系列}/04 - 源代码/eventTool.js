/*
*  ��װ�Ĵ��룬һ���ǲ�����Ϊȫ�ֱ�������ȫ�ֺ������ڵģ����ǻ�ʹ��һ���������Ѽ��ݵĴ��뱣������
*   ������ô���ĺô��ǣ�
*       �Ͳ��ᱻ���˶���ĺ�����������
*
*
* */
var eventTool = {
    // ���ݵĻ�ȡ�¼�����ĺ���
    getEvent:function(e){
        return e || window.event;
    },
    //���ݵĻ�ȡpageX
    getPageX:function(e){
        //�ȼ��ݵĻ�ȡ�¼�����
        e = this.getEvent(e);
        // ����pageX
        // �������������֧��pageX���Ͳ��ü��ݵĻ�ȡ��
        return e.pageX || e.clientX + document.documentElement.scrollLeft;
    },
    //���ݵĻ�ȡpageY
    getPageY:function(e){
        //�ȼ��ݵĻ�ȡ�¼�����
        e = this.getEvent(e);
        // ����pageY
        // �������������֧��pageY���Ͳ��ü��ݵĻ�ȡ��
        return e.pageY || e.clientY + document.documentElement.scrollTop;
    }
};