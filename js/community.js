

$("#tab .tab_tit a").on("click",function(e){
    e.preventDefault();
    
    var target = $(this).attr("href");

    $("#tab .tab_tit a").removeClass("on");
    $(this).addClass("on");

    $("#tab dd").hide(500);
    $(target).show(500);
});




