//判断浏览器是否支持html5   window.applicationCache
Wsw.utils.browser = function (name) {

}

//判断访问终端
Wsw.utils.browser._baseinfo = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

//获得浏览器完整信息
Wsw.utils.browser.getFullInfo = function () {

    var _types = Wsw.utils.browser._baseinfo.versions;
    var _core = 'unknown';
    var _equip = 'unknown';
    var _tempArr = Object.keys(_types);

    //取得内核名称
    for (var i = 0; i < 4; i++) {
        if (_types[_tempArr[i]]) _core = _tempArr[i];
    }

    //取得设备名称
    if (_types['ios'] || _types['iPhone'] || _types['iPad'] || _types['android']) {
        if (_types['iPhone'] || _types['iPad']) {
            _equip = _types['iPhone'] ? 'iPhone' : 'iPad';
        }
        else if (_types['android']) {
            _equip = 'android';
        }
        else {
            _equip = 'ios';
        }
    }

    //	组装完整json信息
    var _info = {
        core: _core,
        mobile: _types['mobile'],
        equipment: _equip,
        browser: Wsw.utils.browser.versions().type,
        version: Wsw.utils.browser.versions().version,
        language: Wsw.utils.browser._baseinfo.language,
        html5: Wsw.utils.browser.isHtml5Browser(),
        weixin: _types['weixin']
    }

    return _info;
}

//获取浏览器类型以及版本号
Wsw.utils.browser.versions = function () {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    var _browserType, _browserVersions, _browser_data_val;

    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (Sys.ie) {
        _browserType = "ie";
        _browserVersions = Sys.ie;
    }
    if (Sys.firefox) {
        _browserType = "firefox";
        _browserVersions = Sys.firefox;
    }
    if (Sys.chrome) {
        _browserType = "chrome";
        _browserVersions = Sys.chrome;
    }
    if (Sys.opera) {
        _browserType = "chrome";
        _browserVersions = Sys.opera;
    }
    if (Sys.safari) {
        _browserType = "safari";
        _browserVersions = Sys.safari;
    }

    var _browser_data_val = {
        type: _browserType,
        version: _browserVersions
    }

    return _browser_data_val;
}

//判断是否是微信
Wsw.utils.browser.isWeixin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//判断是否移动端
Wsw.utils.browser.isMobileBrowser = function () {
    if (Wsw.utils.browser._baseinfo.versions.mobile || Wsw.utils.browser._baseinfo.versions.android || Wsw.utils.browser._baseinfo.versions.ios) {
        return true; //是移动端
    } else {
        return false;
    }
}

//判断设备，true为IOS，false为安卓
Wsw.utils.browser.isEquipment = function () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return true; //iso
    } else if (/(Android)/i.test(navigator.userAgent)) {
        return false;
    }
}

Wsw.utils.browser.isAndroid = function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    return isAndroid;
}

Wsw.utils.browser.isiOS = function () {
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isiOS;
}

//判断是否IE内核
Wsw.utils.browser.isIE = function () {
    if (Wsw.utils.browser._baseinfo.versions.trident) {
        return true;
    } else {
        return false;
    }
}

//判断是否webKit内核
Wsw.utils.browser.isWebkit = function () {
    if (Wsw.utils.browser._baseinfo.versions.webKit) {
        return true;
    } else {
        return false;
    }
}

//判断是否支持HTML5
Wsw.utils.browser.isHtml5Browser = function () {
    if (window.applicationCache) {
        return true;
    } else {
        return false;
    }
}