////获取缩放比例值
var offWidth, offHeight, scrollTop;
var proportionNum;

$(function() {
});

Wsw.selfadaption = function(el, el_attribute, num) {
	offWidth = $(window).width();
	proportionNum = offWidth / 750;
	$(el).css(el_attribute, proportionNum * num + "px");
}