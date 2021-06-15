

// 폼 적용
(function($){

    $.fn.myValidation = function(opt){
        new MyValidation(this, opt);
        return this;
    }

    function MyValidation(el,opt){
        this.init(el);  
        this.bindingEvent(opt);
    }
    MyValidation.prototype.init = function(el){
        this.submit = el.find("input[type=submit]");
    }
    MyValidation.prototype.bindingEvent = function(opt){
        this.submit.on("click", function(e){  
          
            if(opt.isTxt){      
                for(var i=0; i<opt.isTxt.length; i++){
                    if( !this.isTxt(opt.isTxt[i]) ) e.preventDefault();
                }
            }        

            if(opt.isSelect){     
                for(var i=0; i<opt.isSelect.length; i++){
                    if( !this.isSelect(opt.isSelect[i]) ) e.preventDefault();
                }
            }  
          
        }.bind(this));
    }
    MyValidation.prototype.isTxt = function(name){
        var len = 5;    
        var txt = $("[name="+name+"]").val();
    
        if(txt==""){
            $("input[name="+name+"]").parent().find("p").css({opacity:"1"});
            $("[name="+name+"]").addClass("error");
            return false;
        }else{
            if(txt.length < len){
                $("input[name="+name+"]").parent().find("p").text("최소 "+len+"글자 이상 입력하세요.").css({opacity:"1"});
                $("[name="+name+"]").addClass("error");
                return false;
            }else {
                $("[name="+name+"]").removeClass("error");
                return true;
            }
        }
    }


    MyValidation.prototype.isSelect = function(name){
        var sel = $("select[name="+name+"]").children("option:selected").val();
    
        if(sel == ""){
            $("select[name="+name+"]").addClass("error");
            return false;
        }else{
            $("select[name="+name+"]").removeClass("error");
            return true;
        }
    }
    
})(jQuery);







var container = document.querySelector("#mapBox");
var branch_btns = document.querySelectorAll(".branch li");


var options = { 
	center: new kakao.maps.LatLng(37.50615938104634,126.75255391880641), 
	level: 3 
};

var map = new kakao.maps.Map(container, options);
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);


var markerOptions = [
    {
        title:"본점", 
        latlng: new kakao.maps.LatLng(37.50615938104634,126.75255391880641),
        imgSrc : 'img/contact/marker1.png', 
        imgSize: new kakao.maps.Size(50,72),
        imgPos : { offset: new kakao.maps.Point(113,99)}, 
        button: branch_btns[0]
    },
    {
        title:"지점1", 
        latlng: new kakao.maps.LatLng(37.507025,126.7541541),
        imgSrc : 'img/contact/marker2.png', 
        imgSize: new kakao.maps.Size(50,72),
        imgPos : { offset: new kakao.maps.Point(116,99)},
        button: branch_btns[1]
    },
    {
        title:"지점2", 
        latlng: new kakao.maps.LatLng(38.1195495,128.4567819),
        imgSrc : 'img/contact/marker3.png', 
        imgSize: new kakao.maps.Size(50,72),
        imgPos : { offset: new kakao.maps.Point(116,99)},
        button: branch_btns[2]
    }
]; 

for(var i=0; i< markerOptions.length; i++){
    new kakao.maps.Marker({
        map:map,
        position:markerOptions[i].latlng,
        title: markerOptions[i].title, 
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    (function(index){
        markerOptions[index].button.onclick = function(e){         
             e.preventDefault(); 
                        
            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].button.classList.remove("on"); 
            }
            markerOptions[index].button.classList.add("on"); 
            moveTo(markerOptions[index].latlng); 
        }
    })(i);   
}

window.onresize = function(){
    var active_btn = document.querySelector(".branch li.on"); 
    var active_index = active_btn.getAttribute("data-index"); 
    console.log(active_index); 
    map.setCenter(markerOptions[active_index].latlng);
}


function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
}
   

setDraggable(true);
function setDraggable(draggable) {
    map.setDraggable(draggable);    
}


setZoomable(true); //false 
function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
}

 

