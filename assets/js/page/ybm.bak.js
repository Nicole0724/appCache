/**
 * Created by wa on 2016/9/08.
 */
var amaldar_stu = '';
var _url = Wsw.utils.GetUrl();
$(function () {
    fnverify();


    if (Wsw.utils.QueryString('status') != null) {
        amaldar_stu = Wsw.utils.QueryString('status');
        $.cookie.json = true;
        $.cookie('user_status', amaldar_stu);
    } else if ($.cookie('user_status') != null && $.cookie('user_status') != undefined) {
        amaldar_stu = $.cookie('user_status');
        amaldar_stu = amaldar_stu.replace(/"/g, '');
    }

    saveClickNum();
    console.log('amaldar_stu='+amaldar_stu);

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


});


/*表单验证*/
function fnverify() {
    $('#doc-vld-msg').validator({
        validate: function (validity) {/*自定义验证*/
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
                saveInfo();
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



