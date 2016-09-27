// 全局函数定义-通用方法
Wsw.login = function(name) {

}

Wsw.login.isEmpower = function(funcs, opt) {
	$.post('http://v.wasowa.cn/apiv1/login/islogin', {},
		function(data) {
			switch (parseInt(data.status)) {
				case 200:
					console.log("授权成功");
					funcs.func200();
					break;
				case 403:
					if (opt != '' && opt != undefined && opt != null) {
						location.href = 'http://v.wasowa.cn/apiv1/?url=/marketingPromotion-test/' + Wsw.utils.PageName() + opt;
					} else {
						location.href = 'http://v.wasowa.cn/apiv1/?url=/marketingPromotion-test/' + Wsw.utils.PageName();
					}
					break;
				default:
					break;
			}
		}, "json");
}