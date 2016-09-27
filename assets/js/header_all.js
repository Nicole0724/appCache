$(function() {
	addHeader();
	$("body").append("<div class='ui_user_mask hide'></div><div class='ui_tool_mask hide'></div>");
});

function addHeader() {
	var _html = "";
	var header = $("#header");

	_html += '<div class="row clearfix wsw_height_80">';
	_html += '<a class="btu_return" href="javascript:history.go(-1);"><img class=" wsw_width_36 wsw_mt_26" src="assets/images/icon_back.png" /></a>';
	_html += '<a class="logo" href="index_all.html"><img class="wsw_mt_26" src="assets/images/logo_04.png" /></a>';
	_html += '<a class="menu " href="index_all.html"><img class="wsw_mt_26" src="assets/images/icon_home.png" /></a>';
	_html += '</div>';

	header.append(_html);

	if (Wsw.utils.PageName() === 'index_all.html') {
		$('.btu_return').hide();
		$('.menu').hide();
		$('.logo').css('margin-left', '10.4rem');
	}

}

window.onscroll = function() {
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

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	WeixinJSBridge.call('hideOptionMenu'); //禁用微信右上方分享
});