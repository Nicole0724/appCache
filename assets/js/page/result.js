/**
 * Created by wa on 2016/8/25.
 */
var amaldar_stu='';
var _url = Wsw.utils.GetUrl();

$(function () {

    if (Wsw.utils.QueryString('status') != null) {
        amaldar_stu = Wsw.utils.QueryString('status');
        $.cookie.json = true;
        $.cookie('user_status', amaldar_stu);
    } else if ($.cookie('user_status') != null && $.cookie('user_status') != undefined) {
        amaldar_stu = $.cookie('user_status');
        amaldar_stu=amaldar_stu.replace(/"/g,'');
    }

    $('.wsw-btu-result01').on('click',function () {
        location.href = 'zsbm.html?status=' + amaldar_stu;
    });


    console.log($.cookie('user_status'));
    _url = _url.replace(/\&/g, "fuck");

    Wsw.utils.shareUrl(_url);
    //微信分享加载--传入0表示分享详情页 传入1表示分享APP地址，即首页 2表示禁用分享
    wx.ready(function () {
        Wsw.utils.shareWeixin(2);
    });
    
    var userInfoCookie=JSON.parse($.cookie('userInfo'));

    // alert('userInfoCookie');

    if(userInfoCookie!=undefined&&userInfoCookie!=''&&userInfoCookie!=null){
        $('.username').text(userInfoCookie.name);
        $('.useridcard').text(userInfoCookie.idcard);
        $('.usertel').text(userInfoCookie.mobile);
        if(userInfoCookie.email!=''){
            $('.useremailP').css('display','block');
            $('.useremail').text(userInfoCookie.email);
        }else {
            $('.useremailP').css('display','none');
        }

    }

});