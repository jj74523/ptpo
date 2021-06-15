var container = document.querySelector("#mapBox"); //연결할 맵의 선택자
var branch_btns = document.querySelectorAll(".branch li"); //지점보기 버튼 선택자

//처음 로딩완료시 출력될 지도의 경도, 위도
//1.구글맵에서 검색해서 경도,위도값 구함 (위치값이 정밀하지 못함)
//2.카카오맵 api에서 클릭으로 마커표시 샘플코드 (위의 위치값을 적용)
//3.해당 위치에서 우리가 원하는 위치를 정밀하게 마커로 찍어서 표시 (위도, 경도값) 구함
var options = { 
	center: new kakao.maps.LatLng(37.50615938104634,126.75255391880641), 
	level: 3 
};

var map = new kakao.maps.Map(container, options);
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);


//각각의 본점, 지점의 이름, 위도,경도, 마커이미지, 마커수정위치값, 매칭되는 버튼을 등록
var markerOptions = [
    {
        title:"본점", 
        latlng: new kakao.maps.LatLng(37.50615938104634,126.75255391880641),
        imgSrc : 'img/contact/marker1.png', 
        imgSize: new kakao.maps.Size(50,72),
        imgPos : { offset: new kakao.maps.Point(113,99)}, //116, 99
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
    var active_btn = document.querySelector(".branch li.on"); //지점버튼의 활성화 선택자명
    var active_index = active_btn.getAttribute("data-index");  //해당 버튼의 data-index속성값 
    console.log(active_index); 
    map.setCenter(markerOptions[active_index].latlng);
}


function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
}
   

setDraggable(true);
function setDraggable(draggable) {
    // 마우스 드래그로 지도 이동 가능여부를 설정합니다
    map.setDraggable(draggable);    
}


setZoomable(true); //false 
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}

 