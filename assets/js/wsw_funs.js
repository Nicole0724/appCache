// 全局函数定义-通用方法
Wsw.funs = function (name) {

}

// 取得当前Userinfo状态及信息  参数：cookieNameAll 表示像userinfo这样的大key值

/*使用方法
 * var userInfo = Wsw.funs.getCookieAll('userinfo');
 console.log(decodeURIComponent(userInfo.think.nickname));
 //Jquery字符UrlEncode 编码、解码
 Jquery解码：decodeURIComponent(url);
 Jquery编码：encodeURIComponent(url);
 * */

Wsw.funs.getCookieAll = function (cookieNameAll) {
    var strCookieAll = document.cookie;
    // console.log(strCookieAll);
    var arrCookieAll = strCookieAll.split("; ");
    for (var i = 0; i < arrCookieAll.length; i++) {
        var arrAll = arrCookieAll[i].split("=");
        if (cookieNameAll == arrAll[0]) {
            var strCookie = '{' + decodeURIComponent(arrAll[1]) + '}';
            //				return $.parseJSON(strCookie); /**/
            return eval("(" + strCookie + ")");
        }
    }
    return "";
}

// 执行ajax, 参数:
// apiUrl 	接口地址(相对路径)
// opt 		参数
// sync 	是否同步(bool/true异步、false同步),
// lock 	锁定(bool, sync 同一时间仅允许一次操作),
// loadBar	加载提示(bool/true加载、false不加载),
// funcs	回调函数对象
// 失败方法
Wsw.funs.excuteQuery = function (apiUrl, opt, sync, lock, loadBar, funcs) {

    //禁止重复提交
    if ($('input[name="disableSubmit"]').val() == '0' || !lock) {

        //标记禁止提交
        $('input[name="disableSubmit"]').val('1');

        $.ajax({
            type: 'post',
            url: Wsw.config.getApi(apiUrl),
            dataType: 'json',
            async: sync,
            data: opt,
            beforeSend: function (XMLHttpRequest) {
                if (loadBar) $('.wsw_loading').slideDown('fast');
            },
            success: function (data) {
                if (loadBar) $('.wsw_loading').slideUp('fast');

                //状态200
                if (parseInt(data.status) == 200) {
                    funcs.func200(data);
                }
                //状态303 脏词拒绝提交
                else if (parseInt(data.status) == 303) {
                    Wsw.tips.open(Wsw.msg.dataFaile, 'notice');
                }

                //状态400
                else if (parseInt(data.status) == 400 && funcs.func400 != null && typeof(funcs.func400) != 'undefined') {
                    funcs.func400(data);
                }

                //状态401
                else if (parseInt(data.status) == 401 && funcs.func401 != null && typeof(funcs.func401) != 'undefined') {
                    funcs.func401(data);
                }

                //状态403
                else if (parseInt(data.status) == 403 && funcs.func403 != null && typeof(funcs.func403) != 'undefined') {
                    funcs.func403(data);
                }
                //状态404
                else if (parseInt(data.status) == 404 && funcs.func404 != null && typeof(funcs.func404) != 'undefined') {
                    funcs.func404(data);
                }
                //状态405
                else if (parseInt(data.status) == 405 && funcs.func405 != null && typeof(funcs.func405) != 'undefined') {
                    funcs.func405(data);
                }

                //状态409
                else if (parseInt(data.status) == 409 && funcs.func409 != null && typeof(funcs.func409) != 'undefined') {
                    funcs.func409(data);
                }
                //状态409
                else if (parseInt(data.status) == 500 && funcs.func500 != null && typeof(funcs.func500) != 'undefined') {
                    funcs.func500(data);
                }
                //模式(失败)
                else {
                    if (typeof(funcs.funcFail) != 'undefined' && funcs.funcFail != null) {
                        funcs.funcFail(data);
                    } else {
                        //						Wsw.tips.open(Wsw.msg.systemFail, 'notice');
                    }
                }

                //标记为允许提交
                $('input[name="disableSubmit"]').val('0');
            }
        });

    }
}