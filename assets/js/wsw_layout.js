// 全局函数定义-框架控制

$(function(){
	if ($('.siderSilde').length > 0)
	{
		var sTop = $('.siderSilde').position().top;

		$(window).scroll(function(event) {
			$('.siderSilde').css('top', sTop + $(document).scrollTop() + 'px');
			// console.log($(document).scrollTop());
		});
	}
});