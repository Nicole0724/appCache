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

    var _urlopt = '?status=' + amaldar_stu;

    //判断是否授权
    Wsw.login.isEmpower(funcs, _urlopt);

    // fnInit200();

    /*支付成功后返回判断是否报名成功*/
    if (Wsw.utils.QueryString('ispay') != null && Wsw.utils.QueryString('ispay') === 'ok') {
        ispaySucss();
    } else {


    }


});


function fnInit200() {
    // $('form').css('display', 'block');
    // $('.none-data').css('display', 'none');


    fnverify();

    saveClickNum();
    console.log('amaldar_stu=' + amaldar_stu);

    _url = _url.replace(/\&/g, "fuck");
    Wsw.utils.shareUrl(_url);
    //微信分享加载--传入0表示分享详情页 传入1表示分享APP地址，即首页
    wx.ready(function () {
        Wsw.utils.shareWeixin(1);
    });

    $('.btn-loading-example').click(function () {

        var userTel = $("input[name='userTel']").val().trim();


        if (userTel != null && Wsw.verify.isMobil(userTel)) {

            getSMSCode(userTel);

            var setTime;
            var time = 60;
            var $btn = $(this);


            $btn.button('loading');
            setTimeout(function () {
                $btn.button('reset');
            }, 60000);

            $(".btn-loading-example").attr('value', "59s后重新获取");
            setTime = setInterval(function () {
                if (time <= 0) {
                    clearInterval(setTime);
                    return;
                }
                time--;
                if (time == 0) {
                    $(".btn-loading-example").attr('value', "重新获取验证码");
                } else {
                    $(".btn-loading-example").attr('value', time + "s后重新获取");
                }

            }, 1000);

        } else {
            $('#my-alert').modal('open');
            $('#my-alert .am-modal-bd').text('手机号码为空或格式错误！')
        }
    });

}


/*表单验证*/
function fnverify() {
    $('#doc-vld-msg').validator({
        validate: function (validity) {/*自定义验证*/
            var s = $(validity.field).val();
            if ($(validity.field).is('.js-pattern-sfz')) {
                var patrn1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
                var patrn2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
                if (!patrn1.exec(s) && !patrn2.exec(s)) {
                    validity.valid = false;
                } else {
                    validity.valid = true;
                }
            }
        },
        onValid: function (validity) {
            $(validity.field).closest('.am-form-group').find('.am-alert').hide();
        },

        onInValid: function (validity) {
            // var $field = $(validity.field);
            // var $group = $field.closest('.am-form-group');
            // var $alert = $group.find('.am-alert');
            // // 使用自定义的提示信息 或 插件内置的提示信息
            // var msg = $field.data('validationMessage') || this.getValidationMessage(validity);
            // if (!$alert.length) {
            //     $alert = $('<div class="am-alert am-alert-danger"></div>').hide().appendTo($group);
            // }
            // $alert.html(msg).show();
        },
        submit: function () {
            var formValidity = this.isFormValid();
            if (formValidity) {
                isRegExam();
            }

            return false;
        }
    });
}


/*获取短信验证码*/
function getSMSCode(userTel) {
    $.ajax({
        type: 'post',
        url: Wsw.config.getApi('/sms/valicode/send'),
        dataType: 'json',
        async: false,
        data: {
            mobile: userTel
        },
        success: function (data) {
            if (data !== 'true') {

            }
        }
    });
}

/*提交信息*/
/*
 function saveInfo() {

 var userName = $("input[name='userName']").val().trim();
 var userTel = $("input[name='userTel']").val().trim();
 var smsCode = $("input[name='smsCode']").val().trim();

 $.ajax({
 type: 'post',
 url: Wsw.config.getApi('/coupon/get'),
 dataType: 'json',
 async: false,
 data: {
 name: userName,
 mobile: userTel,
 valicode: smsCode,
 publiccode: amaldar_stu
 },
 success: function (data) {
 if (data.status == 200) {
 funcIsRegExam200();
 } else {
 funcIsRegExamError(data);
 }
 }
 });

 function funcIsRegExam200() {
 $('#my-alert').modal('open');
 $('#my-alert .am-modal-bd').text('信息提交成功，优惠码我们将以短信的形式发送到你的手机，请注意查收并保存！');

 $('.alert-btu-ok').on('click', function () {
 location.href = 'ybm.html?status=' + amaldar_stu + '&link=1';
 });

 }

 function funcIsRegExamError(data) {
 $('#my-alert').modal('open');
 $('#my-alert .am-modal-bd').text(data.errorMsg);

 }


 }
 */


/*提交浏览数*/
function saveClickNum() {
    $.ajax({
        type: 'post',
        url: Wsw.config.getApi('/coupon/add/click'),
        dataType: 'json',
        async: true,
        data: {
            publiccode: amaldar_stu
        },
        success: function (data) {
            if (data !== 'true') {
                console.log('ok');
            }
        }
    });
}

/*查询是否已经报名*/
/*参数
 *idcard	身份证号
 name	姓名
 issue	考试期号 (非必传)
 * */

function isRegExam() {
    var userType = $('#doc-select-1').val();
    var userName = $("input[name='userName']").val().trim();
    var userIdcard = $("input[name='userIdcard']").val().trim();
    var opt = {
        issue: 999999, /*虚拟的考试时间编号*/
        name: userName,
        idcard: userIdcard,
        type: userType
    }
    var funcs = {
        func200: funcIsRegExam200
    }

    Wsw.funs.excuteQuery('/exam/signup/info/my', opt, true, false, false, funcs);

    function funcIsRegExam200(data) {

        if (data.rows.length == 0) {
            regExam();
        } else {
            $('#my-alert-1').modal('open');

        }

    }

}


/*报名信息提交*/
function regExam() {

    console.log(amaldar_stu);

    var userName = $("input[name='userName']").val().trim();
    var userIdcard = $("input[name='userIdcard']").val().trim();
    var userTel = $("input[name='userTel']").val().trim();
    var userType = $('#doc-select-1').val();
    var userCouponcode = $("input[name='userYhm']").val().trim();
    var userEmail = $("input[name='userEmail']").val().trim().toString();
    var smsCode = $("input[name='smsCode']").val().trim();


    var opt = {
        issue: 999999, /*虚拟的考试时间编号*/
        name: userName,
        idcard: userIdcard,
        mobile: userTel,
        email: userEmail,
        valicode: smsCode,
        couponcode: userCouponcode,
        type: userType,
        publiccode: amaldar_stu
    }

    var funcs = {
        func200: funcReg200,
        func400: funcReg400
    }

    Wsw.funs.excuteQuery('/exam/signup2', opt, true, false, false, funcs);

    function funcReg200(data) {

        orderidval = data.rows.orderid;
        $.cookie.json = true;
        $.cookie('user_orderid', orderidval);

        $.cookie('userInfo', data.rows);

        fntck();
    }

    function funcReg400() {
        $('#my-alert-2').modal('open');
        $('#my-alert-2 .am-modal-bd').text('信息提交失败，请核对你的报名信息！');
    }


}


/*购买*/
function fntck() {
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function (options) {
            weChatPay();
        },
        onCancel: function () {

        }
    });

}


/*WeChat支付*/
/* v.wasowa.cn/apiv1/   type:reg */
function weChatPay() {
    $.ajax({
        type: 'post',
        url: 'http://v.wasowa.cn/apiv1/wechat/userpay',
        dataType: 'json',
        async: false,
        data: {
            cid: orderidval,
            type: 'reg'
        },
        success: function (data) {
            if (data != null) {
                wx.ready(function () {
                    Wsw.utils.chooseWXPay(data.row, Wsw.utils.GetUrl());
                });
            }
        }
    });

}


/*判断是否报名成功*/
/*返回值
 * 0 待支付  1成功  -1 支付失败
 * */

function ispaySucss() {

    var _orderid = '';

    if ($.cookie('user_orderid') != undefined && $.cookie('user_orderid') != null && $.cookie('user_orderid') != '') {
        _orderid = $.cookie('user_orderid');
    }

    $.ajax({
        type: 'post',
        url: Wsw.config.getApi('/exam/pay/status'),
        dataType: 'json',
        async: false,
        data: {
            orderid: _orderid
        },
        success: function (data) {
            if (data == 1) {
                location.href = 'result.html';
            } else {
                $('#my-alert-2').modal('open');
                $('#my-alert-2 .am-modal-bd').text('报名失败，请重新报名！');
            }
        }
    });

}


