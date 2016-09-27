// 全局函数定义-工具类

Wsw.utils = function(name) {

}

// 获得指定querystring返回值, 空为null
Wsw.utils.QueryString = function(fieldName) {
	var urlString = document.location.search;
	if (urlString != null) {
		var typeQu = fieldName + "=";
		var urlEnd = urlString.indexOf(typeQu);
		if (urlEnd != -1) {
			var paramsUrl = urlString.substring(urlEnd + typeQu.length);
			var isEnd = paramsUrl.indexOf('&');
			if (isEnd != -1) {
				return paramsUrl.substring(0, isEnd);
			} else {
				return paramsUrl;
			}
		} else
			return null;
	} else
		return null;
}

// 获得全部url querystring返回值
Wsw.utils.QueryStringAll = function() {
	var url = document.location.search;
	if (url.indexOf("?") != -1) {
		strs = url.split("?");
		return strs[1];
	}
	return null;
}

// 获得除指定值以外的querystring
Wsw.utils.QueryStringElse = function(thiselse) {
	var newstr = '';
	if (QueryStringAll() != null) {
		strs = QueryStringAll().split('&');
		for (var i = 0; i < strs.length; i++) {
			if (strs[i].indexOf(thiselse + '=') == -1) {
				if (newstr != '') {
					newstr += '&';
				}
				newstr += strs[i];
			}
		}
	}
	if (newstr != '') return newstr;
	return null;
}

// 获得完整url
Wsw.utils.GetUrl = function() {
	var url = document.URL;
	return url;
}

// 获得指定值以外的url
Wsw.utils.GetUrlElse = function(thiselse) {
	//var url = GetUrl();
	if (QueryStringElse(thiselse) != null) {
		return PageName() + '?' + QueryStringElse(thiselse);
	}
	return PageName();
}

// 获得指定值以外的url + 新值
Wsw.utils.GetUrlElseWithNew = function(thiselse, thisnew) {
	var url = GetUrlElse(thiselse);
	if (url.indexOf('?') != -1) {
		return url + '&' + thisnew;
	}
	return url + '?' + thisnew;
}

// 获得从第一个&到最后的所有参数
Wsw.utils.GetUrlAllParam = function() {
	var url = document.location.search;
	if (url.indexOf("&") != -1) {
		strs = url.substring(url.indexOf('&'),url.length);
		return strs;
	}
	return '';
}

// 获得页面名称
Wsw.utils.PageName = function() {
	var sSeparator = "/";

	if (location.protocol.indexOf("file ") > -1) {
		sSeparator = "\\";
	}
	var url = document.URL;
	var ar = url.split(sSeparator);
	var FileName = ar[ar.length - 1];
	var PageName = FileName.replace(/^(.*)\..*/, "$1");
	FileName = FileName.replace(/\?.*$/, " ");

	FileName = FileName.replace(" ", "");
	return FileName;
	//return   [PageName,FileName];
}

// html替换
Wsw.utils.htmlReplace = function(msg) {
	return msg.replace(/\<br\>/g, "\n").replace(/\&nbsp\;/g, " ").replace(/\<BR\>/g, "\n").replace(/\<BR \/\>/g, "\n").replace(/\<br \/\>/g, "\n");
}

// 格式化日期
Wsw.utils.FormatDate = function(date) {
	date = date.substring(0, date.indexOf("."));
	date = date.substring(0, date.lastIndexOf(":"));
	date = date.replace(/-/g, ".");
	date = date.replace("T", " ");
	return date;
}

// 建立并打开遮罩
Wsw.utils.shadowMaskOpen = function() {
	// 检查是否有遮罩
	if ($('.wsw_shadowMask').length < 1) {
		$('body').append('<div class="wsw_shadowMask"></div>');
	} else {
		$('.wsw_shadowMask').removeClass('wsw_shadowMask_close');
	}
}

// 关闭并打开的遮罩
Wsw.utils.shadowMaskClose = function() {
	// 检查是否有遮罩
	if ($('.wsw_shadowMask').length > 0) {
		$('.wsw_shadowMask').addClass('wsw_shadowMask_close');
	}
}

// 元素垂直居中定位相对
Wsw.utils.verticalCenter = function(el) {
	// var mar = ($(document).height() - el.height()) / 2 - (el.height() / 2);
	var mar = ($(window).height() - el.height()) / 2 - 50;
	if (mar < 0) mar = 0;
	el.css('margin-top', mar + 'px');
}

// 元素垂直居中定位绝对
Wsw.utils.verticalCenterFixed = function(el) {
	// var mar = ($(document).height() - el.height()) / 2 - (el.height() / 2);
	var mar = ($(window).height() - el.height()) / 2;
	if (mar < 0) mar = 0;
	el.css('top', mar + 'px');
}

// 元素水平定位相对
Wsw.utils.horizontalCenter = function(el) {
	// var mar = ($(document).width() - el.width()) / 2 - (el.width() / 2);
	var mar = ($(window).width() - el.width()) / 2 - 50;
	if (mar < 0) mar = 0;
	el.css('margin-left', mar + 'px');
}

// 元素水平定位绝对
Wsw.utils.horizontalCenterFixed = function(el) {
	// var mar = ($(document).width() - el.width()) / 2 - (el.width() / 2);
	var mar = ($(window).width() - el.width()) / 2 - 10;
	if (mar < 0) mar = 0;
	el.css('left', mar + 'px');
}

// 元素增加值
Wsw.utils.elAddVal = function(el, val) {
	var arr = new Array();
	// 如果有值
	if (el.val() != '') {
		arr = el.val().split(',');
		// 如果数组里没有这个值
		if ($.inArray(val, arr) < 0) {
			el.val(el.val() + ',' + val);
		}
	}
	// 如果没有值
	else {
		el.val(val);
	}
}

// 元素减少值
Wsw.utils.elDelVal = function(el, val) {
	var arr = new Array();
	// 如果有值
	if (el.val() != '') {
		arr = el.val().split(',');
		// 如果数组里有这个值
		if ($.inArray(val, arr) > -1) {

			// 清空值
			el.val('');

			// 清除选定并重组值
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] != val) {
					Wsw.utils.elAddVal(el, arr[i]);
				}
			}
		}
	}
}

// 格式化日期方法
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

//按约定格式化日期
Wsw.utils.formatDateTime = function(d, format) {
	d = d.replace("-", "/").replace("-", "/");
	var dd = new Date(d);
	return dd.format(format);
}

//人性话时间设置--(刚刚，1分钟前，1小时前等)
Wsw.utils.diffDateTime = function(dateStr) {
	dateTimeStamp = Date.parse(dateStr.replace(/-/gi, "/"));
	//JavaScript函数：
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var year = month * 12;

	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if (diffValue < 0) {
		//若日期不符则弹出窗口告之
		//alert("结束日期不能小于开始日期！");
	}
	var yearC = diffValue / year;
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if (yearC >= 1) {
		//		result = parseInt(yearC) + "年前";
		result = Wsw.utils.formatDateTime(dateStr, 'yyyy年MM月dd日');
	} else if (monthC >= 1) {
		//		result = parseInt(monthC) + "月前";
		result = Wsw.utils.formatDateTime(dateStr, 'MM月dd日');
	} else if (weekC >= 1) {
		//		result = parseInt(weekC) + "周前";
		result = Wsw.utils.formatDateTime(dateStr, 'MM月dd日');
	} else if (dayC >= 1) {
		//		result = parseInt(dayC) + "天前";
		result = Wsw.utils.formatDateTime(dateStr, 'MM月dd日');
	} else if (hourC >= 1) {
		//		result = parseInt(hourC) + "小时前";
		result = Wsw.utils.formatDateTime(dateStr, 'hh:mm:ss');
	} else if (minC >= 1) {
		result = parseInt(minC) + "分钟前";
	} else
		result = "刚刚";
	return result;
}

//字符串补0
Wsw.utils.addZero = function(str, length) {
	return new Array(length - str.length + 1).join("0") + str;
}

//替换特殊字符为html字符
Wsw.utils.revertHtml = function(str) {
	return str.replace(/\n/g, "<br />");
}

//Wsw.utils.isWebkit = function(){
//    return document.body.style.WebkitBoxShadow !== undefined;
//}

Wsw.utils.htmlDecodeByRegExp = function (str) {
	var c = document.createElement('div');
	c.innerHTML = str;
	str = c.innerText || c.textContent;
	c = null;
	return str;
}