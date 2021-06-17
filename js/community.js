
//탭이동
$("#tab .tab_tit a").on("click",function(e){
    e.preventDefault();
    var target = $(this).attr("href");

    $("#tab .tab_tit a").removeClass("on");
    $(this).addClass("on");

    $("#tab dd").fadeOut();
    $(target).fadeIn();
});


// 게시판 호출
var url ="data/board1.json";
var resultData = callData(url);

var $frame = $("#news");
var $faq = $("#faq");
var $notice = $("#notice");

createTable($frame, resultData);
createTable($faq, resultData);
createTable($notice, resultData);


function callData(url){
    var result;

        $.ajax({
            url: url,
            dataType: "json",
            async: false
            
        })
        .success(function(data){
            result = data.data;   

        })
        .error(function(err){
            console.log(err);
        });
    
        return result;

}

function createTable(target, items){
    target.append(
        $("<table>")
            .append(
                $("<caption>").text("게시판목록"),
                $("<thead>")
                    .append(
                        $("<tr scope='col'>")
                            .append(
                                "<th>작성일</th>",
                                "<th>제목</th>",
                                "<th>더보기</th>",
                            )
                    ),
                $("<tbody>")
            )
    );

    $(items).each(function(index, data){
        target.find("tbody")
            .prepend(
                $("<tr>")
                    .append(
                        $("<td class='day'>").text(data.date).append(
                            $("<span>").text(data.dateday)
                        ),
                        $("<td class='title'>")
                            .append(
                                $("<a>").attr("href", data.link).append(
                                    $("<strong>").text(data.title),
                                    $("<p>").text(data.txt)
                                )
                            ),
                        $("<td class='more' href='#'>").append(
                            $("<a href='#'>").text("+").append(
                                $("<span>").text("MORE")
                            )
                        )
                        
                    )
            )
    })
}