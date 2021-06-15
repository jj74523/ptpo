
(function($){ 

    $.defaults = { 
        
        count : 10
    }

    $.fn.myYoutube = function(option){ 

        var result_opt = $.extend({}, $.defaults, option) ; 
        

        if(result_opt.key == undefined || result_opt.playList == undefined) {
            console.error("key와 playList는 필수 입력사항입니다.");
        }

        new Youtube(this, result_opt); 
        
        return this;
    }

    function Youtube(el, option) {
        this.init(el, option);
        this.bindingEvent();
    }
    
    Youtube.prototype.init = function(el, opt) {
        this.frame = el; 
        this.key = opt.key;
        this.playList = opt.playList;
        this.count = opt.count;
        this.Main = $("#galMain");
        this.list = $(".list");

    }
    
    Youtube.prototype.bindingEvent= function() {
        this.callData();
    
        $("body").on("click","article a",function(e) {
            e.preventDefault();
            var vidID = $(e.currentTarget).attr("href"); 
            this.createPop(vidID);
        }.bind(this));
    
        $("body").on("click",".pop .close",function(e) {
            e.preventDefault();
            this.removePop();
        }.bind(this));
    }
    
    Youtube.prototype.callData = function() {
        $.ajax({
            url:"https://www.googleapis.com/youtube/v3/playlistItems",
            dataType:"jsonp",
            data : {
                part: "snippet",
                key : this.key,
                playlistId : this.playList,
                maxResults : this.count
            }
        })
        .success(function(data){
            var items = data.items;
            this.createMain(items);
            this.createList(items);
        }.bind(this))
    
        .error(function(err){
            console.error(err);
        })
    }
    

    Youtube.prototype.createMain = function (items) {

        var tit = items[0].snippet.title;
        var txt = items[0].snippet.description;
        // var imgSrc = items[0].snippet.thumbnails.high.url;
        var vidId = items[0].snippet.resourceId.videoId;
        var imgSrc = "https://i1.ytimg.com/vi/"+vidId+"/sddefault.jpg";
        var profileId = items[0].snippet.videoOwnerChannelId; 
        var profileName = items[0].snippet.videoOwnerChannelTitle; 

        console.log(profileId);

        if (tit.length>35) {tit = tit.substr(0,35)+"...";}
        if (txt.length > 55) { txt = txt.substr(0,55)+"...";}

       this.Main.append(
                $("<article class='artMain'>").append(
                    $("<a class='pic'>").attr({
                        href:vidId
                    }).css({
                        backgroundImage:"url("+imgSrc+")"
                    }),
                    $("<div class='con'>").append(
                        $("<h2>").text(tit),
                        $("<p>").text(txt),
                        $("<span>").text(profileName),
                        $("<div class='profile'>")
                    )
                )
            )
    }

    Youtube.prototype.createList = function (items) {
   
        $(items).each(function(index,data){
            var tit = data.snippet.title;
            var txt = data.snippet.description;
            var date = data.snippet.publishedAt.split("T")[0];
            var vidId = data.snippet.resourceId.videoId;
            var imgSrc = "https://i1.ytimg.com/vi/"+vidId+"/sddefault.jpg";
            var profileId = data.snippet.videoOwnerChannelId; 
            var profileName = data.snippet.videoOwnerChannelTitle; 
            if (tit.length>20) {tit = tit.substr(0,20)+"...";}
            if (txt.length > 25) { txt = txt.substr(0,25)+"...";}
    
            this.list.append(
                    $("<article>").append(
                        $("<a class='pic'>").attr({
                            href:vidId
                        }).css({
                            backgroundImage:"url("+imgSrc+")"
                        }),
                        $("<div class='con'>").append(
                            $("<h2>").text(tit),
                            $("<p>").text(txt),
                            $("<span>").text(profileName),
                            $("<div class='profile'>")
    
                        )
                    )
            )
        }.bind(this));
    }
    
    Youtube.prototype.createPop = function (vidID) {
        $("body").append(
            $("<aside class='pop'>").css({
                width:"100%",
                height:"100%",
                position:"fixed",
                top:0,
                left:0,
                backgroundColor:"rgba(0,0,0,0.9)",
                display:"none",
                boxSizing:"border-box",
                padding:100
            })
            .append(
                $("<img src='img/loading.gif'>").css({
                    width:80,
                    position:"absolute",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)"
                })
            )
            .append(
                $("<div class='con'>").css({
                    width:"100%",
                    height:"100%",
                    position:"relative",
                    display:"none"
                }).append(
                    $("<iframe>").attr({
                        src:"https://www.youtube.com/embed/"+vidID,
                        width:"100%",
                        height:"100%",
                        frameborder:0,
                        allowfullscreen:true
                    })
                )
            )
            .append(
                $("<a href='#' class='close'>").css({
                    position:"absolute",
                    top:20,
                    right:20,
                    color:"#fff"
                }).append($("<img src='../img/youtube/cancel_icon.png'>"))
            ).fadeIn()
        );
    
        setTimeout(function(){
            $(".pop .con").fadeIn(500, function(){
                $(".pop > img").remove();
            });
        },1000);
    }
    
    Youtube.prototype.removePop = function() {
        $(".pop").fadeOut(500, function(){
            $(this).remove();
        })
    }
})(jQuery);


