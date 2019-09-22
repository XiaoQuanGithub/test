function handleNextQuestion(func) {
    window.document.addEventListener("onNextQuestion", func, false);
}
function notifyNextQuestion(currentPage) {
    var e = document.createEvent('Event');
    e.initEvent("onNextQuestion", false, false);
    e.currentPage = currentPage;
    parent.window.document.dispatchEvent(e);
}
function handleQuestionStart(func) {
    window.document.addEventListener("onQuestionStart", func, false);
}
function notifyQuestionStart() {
    var e = document.createEvent('Event');
    e.initEvent("onQuestionStart", false, false);
    parent.window.document.dispatchEvent(e);
}
function trim(str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return null;
}
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function setPartProgress(part, currentIndex) {
    part = part - 1;
    var cookie = getCookie("json");
    var jsonStr = decodeURI(cookie);
    if (jsonStr == "null" || jsonStr == "") {
        jsonStr = '{"progress":[0,0,0,0]}';
    }
    var jsonObj = JSON.parse(jsonStr);
    jsonObj.progress[part] = currentIndex;
    jsonStr = JSON.stringify(jsonObj);
    jsonStr = encodeURI(jsonStr);
    setCookie("json", jsonStr, 14);
}
function getPartProgress(part) {
    part = part - 1;
    var cookie = getCookie("json");
    var jsonStr = decodeURI(cookie);
    var jsonObj = JSON.parse(jsonStr);
    if (jsonObj != null) {
        return jsonObj.progress[part];
    };
    // 返回负数，表示未找到
    return -1;
}
function notifyOpenPart(partNum) {
    setPartProgress(partNum, 0);
    parent.window.location.href = "part" + partNum + "_index.html";
}
function fadeBounceIn(obj, duration, completeHandler) {
    obj.animate({
        scale: 1,
        "opacity": 1
    }, {
        duration: duration,
        easing: "ease-in-out",
        complete: completeHandler
    });
}
function getCurrentIndex() {
    return parent.window.currentIndex;
}
function getTotalQuestion() {
    return parent.window.totalQuestion;
}
var emptyArray = [];
function inArray(element, array, fromIndex) {
    return emptyArray.indexOf.call(array, element, fromIndex);
}