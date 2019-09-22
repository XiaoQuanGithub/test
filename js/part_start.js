var questionConfig;
var currentPart;
function openQuestion(questionNum) {
    window.frames["content"].location.href = "question" + questionNum + ".html";
}
function openPartEnd() {
    window.frames["content"].location.href = "part_end.html";
}
function onQuestionStart(e) {
    var questionNum = questionConfig[0];
    window.currentIndex = 0;
    setPartProgress(currentPart, window.currentIndex);
    openQuestion(questionNum);
}
function onNextQuestion(e) {
    var currentIndex = inArray(e.currentPage, questionConfig);
    if (currentIndex >= 0) {
        setPartProgress(currentPart, currentIndex + 1);
        if (currentIndex + 1 >= questionConfig.length) {
            openPartEnd();
        } else {
            window.currentIndex = currentIndex + 1;
            openQuestion(questionConfig[currentIndex + 1]);
        }
    }
}
function initQuestion(questionArray) {
    questionConfig = questionArray;
    // 乱序，随机出题
    shuffle(questionConfig);
}
function initFrameSrc(part) {
    currentPart = part;
    var currentIndex = getPartProgress(currentPart);
    if (currentIndex >= 5) {
        openPartEnd();
    } else {
        window.totalQuestion = questionConfig.length;
        window.frames["content"].location.href = "part" + currentPart + "_cover.html";
    }
}