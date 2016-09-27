$(function () {
    Wsw.utils.chooseWXPay = function (data,_url) {
        wx.chooseWXPay({
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: function (res) {
                // 支付成功后的回调函数
                if (res.errMsg == "chooseWXPay:ok") {
                    //支付成功
                    // alert('支付成功');
                    location.href=_url+'&ispay=ok';
                } else {
                    alert(res.errMsg);
                }
            },
            cancel: function (res) {
                //支付取消
                alert('支付取消');
            }

        });
    }
});
