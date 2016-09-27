// 全局函数定义-验证类
// -------------------------

Wsw.verify = function(name) {

}

// 检查必填(输入元素, 提示信息(可选))
Wsw.verify.checkRequired = function(el, msg) {
	if (el.val() == '') {
		if (typeof(msg) != 'undefined') {
			Wsw.tips.open(msg);
		}
		return false;
	} else {
		return true;
	}
	return false;
}

Wsw.verify.checkFormat = function(el, msg, fun) {
	if (typeof(msg) != 'undefined') {
		if (typeof(fun) != 'undefined') {
			bool = fun(el.val());
			if (!bool) {
				Wsw.tips.open(msg);
			} else {
				return true;
			}
		}
	}
	return false;
}

Wsw.verify.checkDefault = function(el, rqMsg, rgMsg, rgFun) {
	var bool = false;


	// 验证必填
	if (typeof(rqMsg) != 'undefined') {
		if (rqMsg != null) {
			bool = Wsw.verify.checkRequired(el, rqMsg);
			if (!bool) {
				Wsw.form.setRowClass(el.parent('div').parent('div'));
				return bool;
			}
		} else {
			bool = true;
		}
	}

	// 验证格式
	if (typeof(rgMsg) != 'undefined' && typeof(rgFun) != 'undefined' && el.val() != '' && bool) {
		bool = Wsw.verify.checkFormat(el, rgMsg, rgFun);

		if (!bool) {
			Wsw.form.setRowClass(el.parent('div').parent('div'));
			return bool;
		}
	}

	Wsw.form.clearRowClass(el.parent('div').parent('div'));
	return bool;
}

// 验证文本框
Wsw.verify.checkTextArea = function(el, rqMsg, lowMsg, highMsg) {
	parentEl = el.parent('div').parent('div');

	if (el.val() == '' && rqMsg != null) {
		Wsw.tips.open(rqMsg);

		Wsw.form.setRowClass(parentEl);
		return false;
	} else if (el.val().length < 20 && (el.val() != '' || rqMsg != null)) {
		Wsw.tips.open(lowMsg);

		Wsw.form.setRowClass(parentEl);
		return false;
	} else if (el.val().length > 2000) {
		Wsw.tips.open(highMsg);

		Wsw.form.setRowClass(parentEl);
		return false;
	}

	Wsw.form.clearRowClass(parentEl);
	return true;
}

// 用户名
Wsw.verify.isUName = function(s) {
	var patrn = /[0-9a-zA-Z_]{4,12}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 密码
Wsw.verify.isPwd = function(s) {
	var patrn = /[0-9a-zA-Z_]{6,12}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 验证码
Wsw.verify.isVcode = function(s) {
	var patrn = /^[0-9a-zA-Z]{4}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 数字
Wsw.verify.isDigit = function(s) {
	var patrn = /^[0-9]{1,20}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 邮编
Wsw.verify.isZip = function(s) {
	var patrn = /^[0-9]{3,6}$/;
	if (!patrn.exec(s)) return false
	return true
}

// 中文
Wsw.verify.isChinese = function(s) {
	var patrn = /^[\u4e00-\u9fa5]+$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// IP地址
Wsw.verify.isIp = function(s) {
	var patrn = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 座机号码
Wsw.verify.isTelAndMobile = function(s) {
	var patrn1 = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	var patrn2 = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	if (!patrn1.exec(s) || !patrn2.exec(s)) return false;
	return true;
}

// 座机号码
Wsw.verify.isTel = function(s) {
	var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 手机号码
Wsw.verify.isMobil = function(s) {
	var patrn = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

//座机和手机
Wsw.verify.isTelAndMobil = function(s) {
	var patrn = /^((0\d{2,3}-?\d{7,8})|(1[34578]\d{9}))$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// QQ号码
Wsw.verify.isQQ = function(s) {
	var patrn = /^[1-9][0-9]{4,}$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 邮箱
Wsw.verify.isEmail = function(s) {
	var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 大陆身份证,包括15位、18位两种
Wsw.verify.isChineseIDCard = function(s) {
	var patrn1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	var patrn2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
	if (!patrn1.exec(s) && !patrn2.exec(s)) return false;
	return true;
}

// 短日期,如:2015-10-08
Wsw.verify.isShortDate = function(s) {
	var patrn = /^(\d{4})[-](\d{2})[-](\d{2})$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 数字
Wsw.verify.isNum = function(s) {
	var patrn = /[0-9]+$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 价格(带小数点)
Wsw.verify.isPrice = function(s) {
	if (isNaN(s)) return false;
	return true;
}

// Url地址
Wsw.verify.isUrl = function(s) {
	var patrn = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)((\w+)\.)+(\S)+$/;
	if (!patrn.exec(s)) return false;
	return true;
}

// 任意数（实数）
Wsw.verify.isNumeric = function(s) {
	var newPar = /^(-     |\+)?\d+(\.\d+)?$/;
	return newPar.test(s);
}

// 正数
Wsw.verify.isUnsignedNumeric = function(s) {
	var newPar = /^\d+(\.\d+)?$/;
	return newPar.test(s);
}

// 整数
Wsw.verify.isInteger = function(s) {
	var newPar = /^(-     |\+)?\d+$/;
	return newPar.test(s);
}

// 正整数
Wsw.verify.isUnsignedInteger = function(s) {
	var newPar = /^\d+$/;
	return newPar.test(s);
}