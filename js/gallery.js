(function($){
    $.defaults = {
        key : undefined,
        gallery : "#gallery",
        search : "#search",
        count : 50
    }

    $.fn.myFlickr = function(opt){
        opt = $.extend({}, $.defaults, opt);
        if(opt.key == undefined) {
            console.error("key는 필수 입력 사항입니다.");
        }
        new Flickr(this, opt);
        return this;
    }

    function Flickr(el, opt){
        this.init(el, opt);
        this.bindingEvent();
    }

    Flickr.prototype.init = function(el, opt){     
        this.url = "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList";
        this.url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
        this.url_user = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
        this.key = opt.key;
        this.count = opt.count;
        this.gallery = el.find(opt.gallery); //$("#wrap").find("#gallery")
        this.search = el.find(opt.search);   
    }

    Flickr.prototype.bindingEvent = function(){
        this.getList({
            type: "user"
        });
        
        //"#search"

        var btn = $(this.search.selector).children("button");

        btn.on("click", function(e){
            e.preventDefault();
            this.searchTag();
        }.bind(this));

        $(window).on("keypress", function(e){
            if(e.keyCode == 13 ) this.searchTag();
        }.bind(this));

        $("body").on("click", "#gallery li a", function(e){
            e.preventDefault();

            var imgSrc = $(e.currentTarget).attr("href");
            this.createPop(imgSrc);
        }.bind(this));

        $("body").on("click", ".pop span", function(){
            $(".pop").fadeOut(500,function(){
                $(".pop").remove();
            })
        })
        
    }

    Flickr.prototype.getList = function(opt){
        //type에 따라 ajax호출구문 변경
        var result_opt;

        if(opt.type == "search"){
            result_opt = {
                url: this.url_search,
                dataType: "json",
                data: {
                    api_key: this.key,
                    per_page: this.count,
                    format: "json",
                    nojsoncallback: 1,
                    tagmode: "any",
                    privacy_filter: 5,
                    tags: opt.tag
                }
            }
        }

        if(opt.type == "user"){
            result_opt = {
                url: this.url_user,
                dataType: "json",
                data: {
                    api_key: this.key,
                    per_page: this.count,
                    format: "json",
                    nojsoncallback: 1,
                    tagmode: "any",
                    privacy_filter: 5,
                    user_id: "192914894@N07"
                }
            }
        }

        $.ajax(result_opt)
        .success(function(data){   
            var item = data.photos.photo;  
            this.createList(item);
            console.log(data);

        }.bind(this))
        .error(function(err){
            console.error(err);
        })
    }

    Flickr.prototype.createList = function(data){    
        var $gallery = $(this.gallery.selector);     
     
        $gallery.empty();
        $gallery.append("<ul>");

        //무조건 첫번쨰 li를 item-sizer클래스 지정해서 동적 생성
        $gallery.children("ul").append("<li class='item-sizer'>");
        
        $(data).each(function(index, data){
            var text = data.title;   
            if(!data.title) text = "No description in this photo.";
            if(text.length>16) text = text.substr(0,16)+'...';
            console.log(data.tags);


            $gallery.children("ul").append(
                $("<li class='item'>").append(
                    $("<div class='inner'>")
                        .append(
                            $("<a>").attr({
                                href : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_b.jpg"
                            }).append(
                                $("<img>").attr({
                                    src : "https://live.staticflickr.com/"+data.server+"/"+data.id+"_"+data.secret+"_w.jpg",
                                    onerror : "javascript:this.parentNode.parentNode.parentNode.style='display:none;'"
                                })
                            )
                        )

                        .append(
                            $("<div class='itemInfo'>").append(
                                $("<p>").text(text)
                            ).append(
                                $("<p>").text()
                            )
                            .append(
                                $("<div class='profile'>")
                                    .append(
                                        $("<img>").attr({src: "https://www.flickr.com/buddyicons/"+data.owner+".jpg"}),
                                        $("<span>").text(data.owner)
                                    )                        
                            )

                        )

                )
            )
        }.bind(this));       
        
        //리스트 생성 완료시 isotope레이아웃 적용
        this.isoLayout();
    }

    Flickr.prototype.isoLayout = function(){  
        var $gallery = $(this.gallery.selector);   
        var frame = $gallery.find("ul").selector; 
        var imgs = $gallery.find("img");  
        var imgNum = 0;  
        
    
        $(imgs).each(function(index, data){          
            data.onload = function(){         
                imgNum++;
   
                if(imgNum === imgs.length) {                 
                    new Isotope( frame, {
                        itemSelector : ".item",
                        percentPosition: true,
                        transitionDuration: "0.8s",
                        masonry : {
                            columnWidth: ".item-sizer"
                        }                      
                    });
                    
                    $gallery.addClass("on");                   
                    $(".loading").removeClass("on");
                }
            }  
        }.bind(this));
    }

    Flickr.prototype.searchTag = function(){
        var inputs = $(this.search.selector).children("input").val();
        if(inputs == "") {
            alert("검색어를 입력해주세요.");
            return;
        }

        $("#gallery").removeClass("on");
        $(".loading").addClass("on");

        this.getList({
            type: "search",
            tag: inputs
        });
        $(this.search.selector).children("input").val("");
    }

    Flickr.prototype.createPop = function(imgSrc){
        $("body").append(
            $("<aside class='pop'>")
                .css({
                    width: '100%', height: "100%", position: "fixed", top: 0, left: 0, zIndex: 10,
                    boxSizing: "border-box", padding: "5vw", background: "rgba(0,0,0,0.9)", display: "none"
                })
                .append(
                    $("<img>").attr("src", imgSrc).css({
                        width: "100%", height:"100%", objectFit: "cover"
                    }),
                    $("<span>").text("close").css({
                        cursor:"pointer", color:"#fff", position: "absolute", top: 20, right: 20
                    })
                ).fadeIn()
        )
    }
   

})(jQuery);