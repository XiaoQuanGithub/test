var tipContainerBackgroundColor;
var lastSelectedAnswer;
var lastSelectedAnswerBackgroundColor;
var originAnswers;
var tipElementsDic;
var questionTop;
var currentPage;
document.write("<script src='js/frameJSBridge.js' type='text/javascript'></script>");
function initTemplate() {
    // .html前面对应的是题目
    var numEndIndex = window.location.href.lastIndexOf(".html");
    if (numEndIndex != -1) {
        var i;
        for (i = numEndIndex - 1; i >= 0; i--) {
            var code = window.location.href.charAt(i);
            if (code < "0" || code > "9") {
                break;
            }
        }
        if (i < numEndIndex - 1) {
            currentPage = window.location.href.substring(i + 1, numEndIndex);
        }
    }
    // 锁定场景宽高比
    var containerWidth = $("#scene").width();
    var containerHeight = containerWidth * 2 / 3;
    $("#scene").css("height", containerHeight + "px");
    // 保存原始背景色
    tipContainerBackgroundColor = $("#tip_container").css("background-color");
    // 保存问题的位置
    questionTop = $("#question").offset().top;
    $("#question").css({
        "top": $("body").height() - $("#question").height(),
        "opacity": 0
    });
    // 设置进度
    for (var i = 0; i < 5; ++i) {
        if (i == getCurrentIndex()) {
            $("<img class=\"progress_dot\" src=\"assets/common/progress_current.png\">").appendTo("#quiz_progress");
        } else {
            $("<img class=\"progress_dot\" src=\"assets/common/progress_other.png\">").appendTo("#quiz_progress");
        }
    }
}
function onCloseButtonClick(button) {
    $(".tip_alert").animate({
        translate3d: "" + 0 + "px," + ($("#tip_container").height() - $(".tip_alert").offset().top) + "px," + 0 + "px"
    }, 500, "ease-out");
    $("#tip_container").animate({
        "background-color": "rgba(0, 0, 0, 0)"
    }, 500, "linear", function() {
        $("#tip_container").css("visibility", "hidden");
    });
}
function onRetryButtonClick(button) {
    onCloseButtonClick(button);
}
function onCorrectNextButtonClick() {
    notifyNextQuestion(currentPage);
}
function showTipAlert(answer) {
    var index = parseInt(answer.attr('id'));
    var originAnswer = originAnswers[index];
    var answerTipTitle;
    var tipTitleStyle;
    var tipAlertElement;
    // TipAlert
    $("#tip_container").html("");
    // 根据提示类型生成不同TipAlert
    if (originAnswer["answer_type"] === "wrong") {
        tipAlertElement = $("<div class=\"tip_alert\" style=\"visibility: hidden\">" + "<img class=\"answer_emoji\" src=\"assets/common/answer_wrong.png\">" + "<img class=\"close_button\" src=\"assets/common/close_button.png\">" + "<div class=\"wrong_tip_title\">答错了</div>" + "<div class=\"tip_msg\">" + originAnswer["answer_tip"] + "</div>" + "<div class=\"tip_action_button\" id=\"wrong_retry_button\">再试一次</div>" + "</div>");
        tipAlertElement.children(".close_button").click(onCloseButtonClick);
        tipAlertElement.children("#wrong_retry_button").click(onRetryButtonClick);
    } else if (originAnswer["answer_type"] === "correct") {
        var buttonText;
        if (getCurrentIndex() == getTotalQuestion() - 1) {
            buttonText = "继续";
            tipAlertElement = $("<div class=\"tip_alert\" style=\"visibility: hidden\">" + "<img class=\"answer_emoji\" src=\"assets/common/answer_correct.png\">" + "<img class=\"close_button\" src=\"assets/common/close_button.png\">" + "<div class=\"correct_tip_title\">答对了</div>" + "<div class=\"tip_msg\">" + originAnswer["answer_tip"] + "</div>" + "<div class=\"tip_action_button\" id=\"correct_next_button\">继续</div>" + "</div>");
        } else {
            buttonText = "下一题";
            tipAlertElement = $("<div class=\"tip_alert\" style=\"visibility: hidden\">" + "<img class=\"answer_emoji\" src=\"assets/common/answer_correct.png\">" + "<img class=\"close_button\" src=\"assets/common/close_button.png\">" + "<div class=\"correct_tip_title\">答对了</div>" + "<div class=\"tip_msg\">" + originAnswer["answer_tip"] + "</div>" + "<div class=\"tip_action_button\" id=\"correct_next_button\" style=\"background-color:#3fae59;\">下一题</div>" + "</div>");
        }
        tipAlertElement = $("<div class=\"tip_alert\" style=\"visibility: hidden\">" + "<img class=\"answer_emoji\" src=\"assets/common/answer_correct.png\">" + "<img class=\"close_button\" src=\"assets/common/close_button.png\">" + "<div class=\"correct_tip_title\">答对了</div>" + "<div class=\"tip_msg\">" + originAnswer["answer_tip"] + "</div>" + "<div class=\"tip_action_button\" id=\"correct_next_button\">" + buttonText + "</div>" + "</div>");
        tipAlertElement.children(".close_button").click(onCloseButtonClick);
        tipAlertElement.children("#correct_next_button").click(onCorrectNextButtonClick);
    }
    tipAlertElement.appendTo("#tip_container");
    // 计算正确提示框的位置
    var tipHeight = tipAlertElement.height();
    var tipTop = ($("#tip_container").height() - tipHeight) * 0.4;
    tipAlertElement.css({
        "top": $("#tip_container").height(),
        "visibility": "visible"
    });
    $("#tip_container").css({
        "background-color": "rgba(0, 0, 0, 0)",
        "visibility": "visible"
    });
    $("#tip_container").animate({
        "background-color": tipContainerBackgroundColor
    }, 500, "ease-in-out");
    tipAlertElement.animate({
        translate3d: "" + 0 + "px," + (tipTop - $("#tip_container").height()) + "px," + 0 + "px"
    }, 500, "ease-in-out");
}
function selectAnswer(answer) {
    // 高亮选中项
    if (lastSelectedAnswer !== undefined && lastSelectedAnswer.attr("id") !== answer.attr("id")) {
        lastSelectedAnswer.css({
            "background-color": lastSelectedAnswerBackgroundColor
        });
        lastSelectedAnswer.children(".answer_text").css({
            "color": "#000000"
        });
    };
    if (lastSelectedAnswer == undefined || lastSelectedAnswer.attr("id") !== answer.attr("id")) {
        lastSelectedAnswerBackgroundColor = answer.css("background-color");
        lastSelectedAnswer = answer;
        answer.css({
            "background-color": "#87DED8"
        });
        answer.children(".answer_text").css({
            "color": "#FFFFFF"
        });
    }
    showTipAlert(answer);
}
function onAnswerClick() {
    selectAnswer($(this));
}
function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue = '';
    var randomIndex = '';
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function randomAddAnswers(answers) {
    // 打乱顺序
    shuffle(answers);
    originAnswers = answers;
    tipElementsDic = [];
    $.each(answers, function(key, enumValue) {
        var className;
        if (key % 2 == 0) {
            className = "answer_odd";
        } else {
            className = "answer_even";
        }
        var answerNum = "A".charCodeAt(0) + key;
        var answerNumChar = String.fromCharCode(answerNum);
        var answerElement = $("<div class=\"" + className + " answer_container\" id=\"" + key + "\"><li class=\"answer_num\">" + answerNumChar + "</li><div class=\"answer_text\">" + enumValue["answer_title"] + "</div></div>");
        answerElement.appendTo("#question");
        answerElement.click(onAnswerClick);
    });
}
function showQuestion() {
    $("#question").animate({
        "opacity": 1
    }, 500, "ease-in-out");
    $("#question").animate({
        translate3d: "" + 0 + "," + (questionTop - $("#question").offset().top) + "px," + 0
    }, 500, "ease-in-out");
    $("#quiz_progress").animate({
        "opacity": 1
    }, {
        duration: 1000,
        easing: "ease-in-out"
    });
}