
var items = ["data/board1.json", "data/board2.json", "data/board3.json"];
var item_data =callData(items[0]);
var target = $("#tab dd").eq(0);

createTable(target, item_data);

$("#tab dt").on("click",function(e){
    e.preventDefault();
    var i = $(this).index();

    $("#tab dl dt a").removeClass("on");
    $("#tab dl dt").eq(i).children("a").addClass("on");

    $("#tab dl dd").removeClass("on");
    $("#tab dl dd").html("");

    $("#tab dl dd").eq(i).addClass("on");

    var item_data = callData(items[i]);
    var target = $("#tab dl dd").eq(i);
    createTable(target, item_data);

});




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