Wsw.alert = function (name) {

}
Wsw.alert.plain = function (obj, _msg) {
    $(obj).modal('open');
    $(obj).empty();

    var html = '';
    html += '<div class="am-modal-dialog">';
    // html += '<div class="am-modal-hd">温馨提示</div>';
    html += '<div class="am-modal-bd wsw_text_default wsw_text_lightorange">' + _msg + '</div>';
    html += '<div class="am-modal-footer">';
    html += '<span class="am-modal-btn">确定</span>';
    html += '</div>';
    html += '</div>';
    $(obj).append(html);
}
Wsw.alert.plainHaveClassName = function (obj, className,_msg) {
    $(obj).modal('open');
    $(obj).empty();

    var html = '';
    html += '<div class="am-modal-dialog">';
    // html += '<div class="am-modal-hd">温馨提示</div>';
    html += '<div class="am-modal-bd wsw_text_default wsw_text_lightorange">' + _msg + '</div>';
    html += '<div class="am-modal-footer">';
    html += '<span class="am-modal-btn '+className+'">确定</span>';
    html += '</div>';
    html += '</div>';
    $(obj).append(html);
}