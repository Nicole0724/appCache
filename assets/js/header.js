$(function () {
    addHeader();
    $("body").append("<div class='ui_user_mask hide'></div><div class='ui_tool_mask hide'></div>");

});

function addHeader() {
    var _html = "";
    var header = $("#header");

    var userInfo = Wsw.funs.getCookieAll('userinfo');

    _html += '<div class="row clearfix wsw_height_80">';
    _html += '<a class="btu_return" href="javascript:history.go(-1);"><img class=" wsw_width_36 wsw_mt_26" src="assets/images/icon_back.png" /></a>';
    _html += '<a class="logo" href="index.html"><img class="wsw_mt_26" src="assets/images/logo_04.png" /></a>';
    _html += '<a class="menu el_hmenu " href="javascript:;"><img class="wsw_mt_26" src="assets/images/icon_user.png" /></a>';
    _html += '<a class="return" href="index.html"><img class="wsw_mt_26" src="assets/images/icon_home.png" /></a>';
    _html += '</div>';
    _html += '<!--个人-->';
    _html += '<nav data-am-widget="menu1" class="am-menu am-menu-dropdown1">';
    _html += '<a href="javascript: void(0)" class="am-menu-toggle btu_user"></a>';
    _html += '<div class="am-menu-nav am-avg-sm-1 am-collapse">';
    _html += '<div class="row">';
    _html += '<div class="user_info">';
    if (userInfo != null && userInfo != undefined && userInfo != '' && isUserLogin) {
        _html += '<img src="' + decodeURIComponent(userInfo.think.headimgurl) + '" />';
        _html += '<p><span class="wsw_text_s wsw_text_white">' + decodeURIComponent(userInfo.think.nickname) + '</span>';
    } else {
        _html += '<img class="btu_login_user" src="assets/images/user_default.png" />';
        _html += '<p><span class="wsw_text_s wsw_text_white btu_login_user">请登录</span>';
    }
    _html += '</p>';
    _html += '</div>';
    _html += '<ul class="wsw_text_s">';
    _html += '<li class="clearfix icon_more my_lesson"><span class="sp1">个人课程</span></li>';
    _html += '<li class="clearfix icon_more com_lesson"><span class="sp1">企业课程</span></li>';
    _html += '<li class="clearfix icon_more buy_history"><span class="sp1">购买记录</span></li>';
    _html += '<li class="clearfix icon_more rest_pwd"><span class="sp1">修改密码</span></li>';
    _html += '</ul>';
    //	_html += '<div class="btu_logout clearfix"><a class="btu_logout_a wsw_text_default wsw_fr" href="javascript:;">退出登录</a></div>';
    _html += '</div>';
    _html += '</div>';
    _html += '</nav>';

    header.append(_html);

    if (isUserLogin) {
        /*已登录*/

        $("ul li.my_lesson").on('click', function () {
            location.href = 'buy_lesson.html?tab=1';
        });
        $("ul li.com_lesson").on('click', function () {
            location.href = 'buy_lesson.html?tab=2';
        });
        $("ul li.buy_history").on('click', function () {
            location.href = 'buy_history.html';
        });
        $("ul li.rest_pwd").on('click', function () {
            location.href = 'rest_password.html';
        });
    } else {
        /*未登录*/

        // $("ul li.my_lesson").hide();
        // $("ul li.com_lesson").hide();
        // $("ul li.buy_history").hide();
        // $("ul li.rest_pwd").hide();

        $("ul li.my_lesson").on('click', function () {
            $('#wsw_login_reg').modal('open');
            $('.widget-box').removeClass('visible');
            $('#login_box').addClass('visible');
            nowUserClick = 'buy_lesson.html?tab=1';
        });
        $("ul li.com_lesson").on('click', function () {
            $('#wsw_login_reg').modal('open');
            $('.widget-box').removeClass('visible');
            $('#login_box').addClass('visible');
            nowUserClick = 'buy_lesson.html?tab=2';
        });
        $("ul li.buy_history").on('click', function () {
            $('#wsw_login_reg').modal('open');
            $('.widget-box').removeClass('visible');
            $('#login_box').addClass('visible');
            nowUserClick = 'buy_history.html';
        });
        $("ul li.rest_pwd").on('click', function () {
            $('#wsw_login_reg').modal('open');
            $('.widget-box').removeClass('visible');
            $('#login_box').addClass('visible');
            nowUserClick = 'rest_password.html';
        });
        $('.btu_login_user').on('click', function () {
            $('#wsw_login_reg').modal('open');
            $('.widget-box').removeClass('visible');
            $('#login_box').addClass('visible');
            if (Wsw.utils.QueryStringAll() == null) {
                nowUserClick = Wsw.utils.PageName() + '?mark=1';
            } else {
                nowUserClick = Wsw.utils.PageName() + "?" + Wsw.utils.QueryStringAll() + '&mark=1';
            }
        });

    }

    if (Wsw.utils.PageName() === 'index.html') {
        $('.btu_return').hide();
        $('.return').hide();
        $('.logo').css('margin-left', '10.4rem');
    }

    /*绑定点击用户icon触发的事件*/
    $(".btu_user").on("click", function () {
        $(this).parent().children(".am-menu-nav").slideToggle(200);
        $('.ui_user_mask').toggleClass('hide');

        //用于判断弹框显示和未显示下相应的操作
        if ($('.ui_user_mask').css("display") == 'block') {
            $('.el_hmenu img').attr('src', "assets/images/icon_user_h.png");
            $('.wsw_header').addClass('wsw_bg_green');

            //			header.css({
            //				"background-color": "rgba( 22, 175, 123,0.9)"
            //			});
            //			$('html body').css("overflow", 'hidden');

            //			$('body').on('touchmove', function(event) {
            //				event.preventDefault();
            //			});
            $('.ui_user_mask').on('click', function () {
                $('.btu_user').parent().children(".am-menu-nav").slideUp(20);
                $('.ui_user_mask').addClass('hide');
                $('.el_hmenu img').attr('src', "assets/images/icon_user.png");
                $('.wsw_header').removeClass('wsw_bg_green');
            });

        } else if ($('.ui_user_mask').css("display") == 'none') {
            $('.el_hmenu img').attr('src', "assets/images/icon_user.png");
            $('.wsw_header').removeClass('wsw_bg_green');
            //			header.css({
            //				"background-color": "rgba( 22, 175, 123,0)"
            //			});
            //			$('html body').css("overflow", 'auto');

            //			$('body').unbind('touchmove');
        }

        $('.ui_tool_mask').addClass('hide');
        //		$('.btu_tool').parent().children(".am-menu-nav").slideUp(20);
    });

    /*绑定点击工具icon触发的事件*/
    //	$(".btu_tool").on("click", function() {
    //		$(this).parent().children(".am-menu-nav").slideToggle(200);
    //		$('.ui_tool_mask').toggleClass('hide');
    //
    //		//用于判断弹框显示和未显示下相应的操作
    //		if ($('.ui_tool_mask').css("display") == 'block') {
    //			//			header.css({
    //			//				"background-color": "rgba( 22, 175, 123,0.9)"
    //			//			});
    //		} else if ($('.ui_tool_mask').css("display") == 'none') {
    //			//			header.css({
    //			//				"background-color": "rgba( 22, 175, 123,0)"
    //			//			});
    //		}
    //
    //		$('.ui_user_mask').addClass('hide');
    //		$('.btu_user').parent().children(".am-menu-nav").slideUp(20);
    //	});
}

window.onscroll = function () {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    var header = $("#header"); //要显示或者隐藏的元素
    if (t <= 30) {
        //		header.removeClass("wsw_header_2");
        header.css({
            "background-color": "rgba( 22, 175, 123,0)"
        });
    } else {
        //		header.addClass("wsw_header_2");
        header.css({
            "background-color": "rgba( 22, 175, 123,0.9)"
        });
    }
}
