// 全局函数定义-基础设置

// 接口根路径
// var WSW_Server = 'http://imece.wasowa.cn/imece';
// var WSW_Server='http://192.168.0.216:8088/imece';
var WSW_Server='http://imece-test.wasowa.cn/imece';
var WSW_FileUrl = 'http://img.wasowa.cn/'

Wsw.config = function(name) {

}

// 接口地址
Wsw.config.server = WSW_Server;

Wsw.config.fileUrl = function(url) {
	return WSW_FileUrl + url;
}

// 获得完成API地址
Wsw.config.getApi = function(url) {
	return WSW_Server + url;
}