/**
 * Created by wa on 2016/9/23.
 */

/*
 * 该文件用于清除缓存，利用改变版本号（即在链接中添加随机参数）
 * */
var pageName = '';
var parameterUrl = '';
var version;
$(function () {

    if (Wsw.utils.QueryString('page') != null) {
        pageName = Wsw.utils.QueryString('page');
    } else if ($.cookie('user_status') != undefined) {
        pageName = 'cache.html?page=index';
    }

    version = date();
    parameterUrl=Wsw.utils.GetUrlAllParam();
    parameterUrl=parameterUrl.substring(1,parameterUrl.length);
    location.href = pageName + '.html?'+ parameterUrl+'&v='+version;

});


/*生成随机数*/
function date() {
    var mydate = new Date();
    return mydate.getTime();
}





























