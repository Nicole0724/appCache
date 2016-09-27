/**
 * Created by wa on 2016/8/24.
 */
var amaldar_stu = '';
var orderidval;
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


    /*支付成功后返回判断是否报名成功*/
    if (Wsw.utils.QueryString('ispay') != null && Wsw.utils.QueryString('ispay') === 'ok') {
        ispaySucss();
    } else {


    }


});


function fnInit200() {
    console.log($.cookie('user_status'));

    _url = _url.replace(/\&/g, "fuck");

    Wsw.utils.shareUrl(_url);

    //微信分享加载--传入0表示分享详情页 传入1表示分享APP地址，即首页
    wx.ready(function () {
        Wsw.utils.shareWeixin(1);
    });

    // initExamDate();
    fnverify();
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
            var $field = $(validity.field);
            var $group = $field.closest('.am-form-group');
            var $alert = $group.find('.am-alert');
            // 使用自定义的提示信息 或 插件内置的提示信息
            var msg = $field.data('validationMessage') || this.getValidationMessage(validity);
            if (!$alert.length) {
                $alert = $('<div class="am-alert am-alert-danger"></div>').hide().appendTo($group);
            }
            $alert.html(msg).show();
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

/*加载考试时间*/
function initExamDate() {
    var opt = {}
    var funcs = {
        func200: funcInitExamDate200
    }
    Wsw.funs.excuteQuery('/exam/info', opt, true, false, false, funcs);

    function funcInitExamDate200(data) {
        $('#doc-select-1').empty();
        var _html = '';
        _html += '<option value="">选择要考试的事件</option>';
        for (var i = 0; i < data.rows.length; i++) {
            _html += ' <option value="' + data.rows[i].issue + '">' + data.rows[i].title + '</option>';
        }
        $('#doc-select-1').append(_html);
    }
}


/*查询是否已经报名*/
/*参数
 *idcard	身份证号
 name	姓名
 issue	考试期号 (非必传)
 * */

function isRegExam() {
    var userName = $("input[name='userName']").val().trim();
    var userIdcard = $("input[name='userIdcard']").val().trim();
    var opt = {
        name: userName,
        idcard: userIdcard
    }
    var funcs = {
        func200: funcIsRegExam200
    }

    Wsw.funs.excuteQuery('/exam/signup/info/my', opt, true, false, false, funcs);

    function funcIsRegExam200(data) {

        if (data.rows.length == 0) {
            regExam();
        } else {

            $('#my-alert').modal('open');

        }

    }

}


/*报名信息提交*/
function regExam() {

    console.log(amaldar_stu);

    var userName = $("input[name='userName']").val().trim();
    var userIdcard = $("input[name='userIdcard']").val().trim();
    var userTel = $("input[name='userTel']").val().trim();
    var userEmail = $("input[name='userEmail']").val().trim().toString();
    var managerId = $("input[name='managerId']").val().trim();
    /* var issueId = $('#doc-select-1').val().trim();*/

    var opt = {
        issue: 999999, /*虚拟的考试时间编号*/
        name: userName,
        idcard: userIdcard,
        mobile: userTel,
        email: userEmail,
        valicode: '0000',
        publiccode: amaldar_stu
    }

    var funcs = {
        func200: funcReg200,
        func400: funcReg400
    }

    Wsw.funs.excuteQuery('/exam/signup', opt, true, false, false, funcs);

    function funcReg200(data) {

        orderidval = data.rows.orderid;
        $.cookie.json = true;
        $.cookie('user_orderid', orderidval);

        $.cookie('userInfo', data.rows);

        fntck();
    }

    function funcReg400() {
        $('#my-alert-2').modal('open');
        $('#my-alert-2 .am-modal-bd').text('信息提交失败，该身份证已报名，请核对你的报名信息！');
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
