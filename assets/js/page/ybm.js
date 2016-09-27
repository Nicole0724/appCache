/**
 * Created by wa on 2016/9/08.
 */
var amaldar_stu = '';
var _url = Wsw.utils.GetUrl();
$(function () {

    var funcs = {
        func200: fnInit200
    }

      if (Wsw.utils.QueryString('status') != null) {
        amaldar_stu = Wsw.utils.QueryString('status');
        $.cookie.json = true;
        $.cookie('user_status', amaldar_stu);
    } else if ($.cookie('user_status') != null && $.cookie('user_status') != undefined) {
        amaldar_stu = $.cookie('user_status');
        amaldar_stu = amaldar_stu.replace(/"/g, '');
    }

    //判断是否授权
    var _urlopt = '?status=' + amaldar_stu;
    Wsw.login.isEmpower(funcs, _urlopt);

    _url = _url.replace(/\&/g, "fuck");
    Wsw.utils.shareUrl(_url);
    //微信分享加载--传入0表示分享详情页 传入1表示分享APP地址，即首页
    wx.ready(function () {
        Wsw.utils.shareWeixin(2);
    });

});


function fnInit200() {
    // showTime();

    $('.wsw-btu-submit-zsbm').on('click',function () {
        location.href = 'zsbm.html?status=' + amaldar_stu;
    });

}


/*
//设定倒数秒数
var t = 5;
//显示倒数秒数
function showTime() {
    t -= 1;
    $('#timeOut').html('预报名已结束，' + t + '秒后跳转到报名页面！');
    if (t == 0) {
        location.href = 'zsbm.html?status=' + amaldar_stu;
    }
    //每秒执行一次,showTime()
    setTimeout('showTime()', 1000);
}*/


