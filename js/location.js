
var $header = $("#header2");
var $menu = $(".gnb > li");
var $subGnb = $(".subGnb");
var speed = 500;
var ht_max = 0; 
var doneClose = true;

getSubMaxHeight();

/*탭이동*/
$("#skipNavi li a").on("focusin",function(){
    $(this).addClass("on"); 
});
$("#skipNavi li a").on("focusout",function(){
    $(this).removeClass("on"); 
});


$header.on("mouseenter focusIn",openSub);
$header.on("mouseleave focusOut",closeSub);

$menu.on("mouseenter focusIn",function(){
    $(this).addClass("on");
});

$menu.on("mouseleave focusOut",function(){
    $menu.removeClass("on");
});

$menu.children("a").on("focusin",openSub);
$menu.last().find("a").last().on("focusout",closeSub);

function openSub() {
    $header.prepend(
        $("<div class='bgGnb'>").css({
            width:"100%",
            height:ht_max,
            background:"#f8f8f8",
            position:"absolute",
            top:150,
            left:0,
            borderBottom: "1px solid #eee",
            zIndex:"1",
        }).append(
            $("<div class='banner'>").append(
                $("<img src='img/menu_report.svg'>").css({
                    width:120,
                    position:"absolute",
                    top:20,
                    left:"50%",
                    transform:"translateX(-50%)",
                }),
                $("<div class='ban_tit'>").text("도메인").css({
                    fontSize:24,
                    fonWeight:"600",
                    textAlign:"center",
                    marginTop:100

                }),
                $("<div class='ban_txt'>").text("도메인은 개인 또는 기업을 대표하는 브랜드이자 첫인상입니다.").css({
                    fontSize:12,
                    color:"#888",
                    textAlign:"center",
                    marginBottom:10
                }),
                $("<div class='btn'>").text("서비스 알아보기").css({
                    width:150,
                    height:40,
                    background:"rgb(86, 141, 237)",
                    color:"#fff",
                    textAlign:"center",
                    lineHeight:"40px",
                    fontSize:13,
                    margin:"0 auto"

                })
            ).css({
                width:260,
                height:"100%",
                position:"absolute",
                boxSizing:"border-box",
                top:0,
                left:300,
                background:"#fff",
                padding:"30px 20px",
                borderLeft:"1px solid #eee",
                borderRight:"1px solid #eee"

            })
        )

    )
    if(doneClose){
        $(".bgGnb").stop().slideDown(speed);
        $subGnb.stop().slideDown(speed);
        doneClose = false;
    }
}


function closeSub() {
    $subGnb.stop().slideUp(speed/2);
    $(".bgGnb").stop().slideUp(speed/2, function(){
        $(this).remove();
        doneClose = true;
    });

}

function getSubMaxHeight(){
    $menu.each(function(index){
        var current_ht = $(this).children("ul").height()+30; 
        ht_max = Math.max(ht_max, current_ht); 
    });



}