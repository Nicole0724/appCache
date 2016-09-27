//定义全局常量

//定义全局变量

// 全局函数定义
// -------------------------

// 全局函数命名
function Wsw(name) {

}

// 判断是否IE6-8
Wsw.isLowerIE = function() {
	return !$.support.leadingWhitespace;
}

//生成范围内随机数n=最小,m=最大
Wsw.random = function(n, m) {
	var c = m - n + 1;
	return Math.floor(Math.random() * c + n);
}