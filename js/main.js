
var $header = $("#header2");
var $gnb = $(".gnb > li");
var $gnb_ul = $gnb.children("ul");
var $skipNavi_a = $("#skipNavi li a");
var speed = 500;
var doneClose = true;
var $btnCall =$(".btnCall");
var $menuMo = $(".menuMo");

//태블릿-모바일 메뉴

 if($(window).width() < 1179){    
        openSub = false;
        $btnCall.on("click",function(){
            $(".menuMo").addClass("on");
        });
        
        $(".close").on("click",function(){
            $(this).parent(".menuMo").removeClass("on");
        })
}


$header.on("mouseenter focusin", openSub);
$header.on("mouseleave focusout", closeSub);

$gnb.on("mouseenter focusIn",function(){
    $(this).children("a").addClass("on");
    var target = $(this).children("a").attr("data-menu");
    callData(target);

});



$gnb.on("mouseleave focusout",function(){
    $(this).children("a").removeClass("on");
});

/*탭이동*/
$skipNavi_a.on("focusin",function(){
    $(this).addClass("on"); 
});
$skipNavi_a.on("focusout",function(){
    $(this).removeClass("on"); 
});


function getSubMaxHeight(){
    var ht_max = 0;

    $gnb.each(function(index){
        var current_ht = $(this).children("ul").outerHeight(); 
        ht_max = Math.max(ht_max, current_ht); 
    });
    return ht_max;

}

function openSub() {
    var ht = $header.outerHeight();
    
    $header.prepend(
        $("<div class='bgGnb'>").css({
            width:"100%",
            height: getSubMaxHeight(),
            background:"#f8f8f8",
            position:"absolute",
            top:ht,
            left:0,
            borderBottom: "1px solid #eee",
            display:"none"
        }).append(
            $("<div class='banner'>").css({
                width:"30%",
                height:"100%",
                position:"absolute",
                top:0,
                left:0,
                borderRight:"1px solid #efefef",
                borderLeft:"1px solid #efefef"
            }).append(
                $("<h2>").text("무늬지"),
                $("<p>").text("마크롤과 펠트를 사용하여 독특하고"),
                $("<p>").text("다양한 패턴의 무늬를 종이에 새겼습니다."),
                $("<span>").text("#페스티발"),$("<span>").text("#매직펜트"),$("<span>").text("#매직니트"),
                $("<div class='menuImg'>").append(
                    $("<img src='img/menu/menu1.jpg'>")
                )
            )
        )
    ).after(
        $("<div class='allBg'>").css({
            width:"100%",
            height:"100%",
            position:"fixed",
            background:"rgba(0,0,0,0.6)",
            zIndex:10
        })
    )
    if(doneClose){
        $gnb_ul.stop().slideDown(speed);
        $(".bgGnb").stop().slideDown(speed);
        $(".allBg").fadeIn(speed);
        doneClose = false;
    }

}


function callData(target) {
    $.ajax({
        url:target
    })
    .success(function(data){
        $(".bgGnb .banner").html(data);
    })
    .error(function(err){
        console.log(err);
    })
}


function closeSub() {
    $gnb_ul.stop().slideUp(speed/2);
    $(".bgGnb").stop().slideUp(speed/2, function(){
        $(this).remove();
        doneClose = true;
    });
    $(".allBg").fadeOut(speed/2, function(){
        $(this).remove();
    });
}


/* 모바일 */ 



// btnCall.onclick = function(){
//     btnCall.classList.toggle("on");
//     menuMo.classList.toggle("on");
// }


