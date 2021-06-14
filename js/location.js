
var targetEl = "#comInfo article";


function isoLayout() {
    new Isotope(targetEl, { //첫번째는 선택자, ㄷ번째는 옵션값으로 넣어야 함
        itemSelector : "#comInfo article .box",
        columnWidth :"#comInfo article .box",
        transitionDuration:"0.5s"
    })
}

isoLayout();
