/**
 * Created by wa on 2016/8/25.
 */
var amaldar_stu = '';
var _url = Wsw.utils.GetUrl();

$(function () {

    var funcs={
        func200:fnInit200
    }
    
    if (Wsw.utils.QueryString('status') != null) {
        amaldar_stu = Wsw.utils.QueryString('status');
        $.cookie.json = true;
        $.cookie('user_status', amaldar_stu);
    } else if ($.cookie('user_status') != null && $.cookie('user_status') != undefined) {
        amaldar_stu = $.cookie('user_status');
        amaldar_stu=amaldar_stu.replace(/"/g,'');
    }

    var _urlopt = '?status=' + amaldar_stu;

    //判断是否授权
    Wsw.login.isEmpower(funcs, _urlopt);

});

function fnInit200() {
    $('.wsw-btu-index01').on('click', function () {
        location.href = 'register.html?status=' + amaldar_stu;
    });

    $('.wsw-btu-index02').on('click', function () {
        location.href = 'result.html?status=' + amaldar_stu;
    });

    console.log($.cookie('user_status'));
    _url = _url.replace(/\&/g, "fuck");

    Wsw.utils.shareUrl(_url);
    //微信分享加载--传入0表示分享详情页 传入1表示分享APP地址，即首页
    wx.ready(function () {
        Wsw.utils.shareWeixin(1);
    });

}
