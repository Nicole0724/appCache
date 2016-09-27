/*

 * footer 插入
 * */
$(function() {
	var _html = "";

	_html+='<input type="hidden" name="allowloading" /><input type="hidden" name="index" />';
	_html += '<img class="wsw_mt_50" src="assets/images/logo_03.png"  />';
	_html += '<p class="wsw_text_blackGrey6 wsw_text_lg wsw_mt_20 wsw_text_lighter">400-702-1588</p>';
	_html += '<p class="wsw_text_blackGrey9 wsw_text_xxs wsw_mt_20">2015-2016 WASOWA.CN 蜀ICP备12030361号-1</p>';

	$(".wsw_footer").append(_html);
});