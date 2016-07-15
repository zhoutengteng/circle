function  creatOneComment(lou, id, author, content, toPeople) {
    var parent = $('div.bs-example .table')[0];
    $(parent).append($('<thead "issueId"='+ id + '></thead>'));
    var tbody = $('<tbody> </tbody>');
    var tr = $('<tr class="active"> </tr>');
    var th = $('<th scope="row">' + lou + "# " + author + '  </th>');
    if (toPeople) {
        var td1 = $('<td> <span>回复</span></td>');
        var span = $('<span>' + toPeople + '</span>');
    } else {
        var td1 = $('<td> <span>评论</span></td>');
        var span = $('<span>' + toPeople + '</span>');
    }
    var td2 = $('<td></td>');
    var p = $('<p  style="word-wrap: break-word; overflow: hidden; max-width:300px">' + content + '</p>');
    var td3 = $('<td></td>');
    var input = $('<input class="btn btn-default" type="button" value="评论">');
    //$(thead).append(tbody);
    $(tbody).append(tr);
    $(tr).append(th);
    $(tr).append(td1);
    $(td1).append(span);
    $(tr).append(td2);
    $(td2).append(p);
    $(tr).append(td3);
    $(td3).append(input);
    $(parent).append(tbody);
    $(input).bind("click", function(){
        $('div.alertDIV').remove();
        var offsettop = $(input).offset().top;
        var offsetleft = $(input).offset().left + $(input).width() + 60;
        if ($(input).hasClass("has")) {
            $(input).removeClass("has");
        } else {
            alertDIV(offsettop, offsetleft, id);
            $(input).addClass("has");
        }
    });
}

function alertDIV(offsettop, offsetleft, issueId) {
    var div = $('<div style="width:300px" class="alertDIV"></div>');
    $(div).css({position: "absolute",'top':offsettop,'left':offsetleft,'z-index':2});
    var texeare = $('<textarea style="height: 180px; width:200px; resize: none"></textarea>');
    $(div).append(texeare);
    var button = $('<button type="button" class="bt btn-default">回复 </button>');
    button.click(function(){
        var itemId = $('div[itemId]').attr("itemId");
        var comment = $(texeare).val();
        if (comment.replace(/(^\s*)|(\s*$)/g,'').length > 0) {
            $.ajax({
                type: 'POST',
                url: "/circle/comment",
                async: true,
                data: {
                    "itemId": itemId,
                    "issueId": issueId,
                    "comment": comment,
                    "type": "2issue"
                },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    //console.log(data)
                    if (data.status == "true") {
                        $('div.alertDIV').remove();
                        console.log(data);
                        $('table.table').empty();
                        pullComment();
                        $(document).scrollTop(0);
                        $('#comment').val("");
                    } else {
                        alert("评论上传失败，请重试");
                        console.log(data)
                    }
                },
                error: function () {
                    alert("服务器问题");
                }
            });
        } else {
            alert("请输入标题或者正文");
        }
    });
    $(div).append(button);
    $('body').append(div);
 }


function  pullComment() {
    var div = $('div[itemId]');
    var itemId = div.attr("itemId");
    var isDigit = /^[0-9]+$/;
    if (isDigit.test(itemId)) {
        $.ajax({
            type: 'POST',
            url: "/circle/comment/" + itemId,
            async: true,
            data: {
                "itemId": itemId
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                //console.log(data)
                if (data.status == "true") {
                    //alert(data.url);
                    console.log(data);
                    for (var i = 0; i < data.number; i++) {
                        creatOneComment(i+1,  data["issue"][i]["id"], data["issue"][i]["author"], data["issue"][i]["content"], data["issue"][i]["toPeople"]);
                    }
                } else {
                    alert("获得评论失败，请重试");
                    console.log(data)
                }
            },
            error: function () {
                alert("服务器问题");
            }
        });
    };
}


$('document').ready(function() {
    $('#comment').bind('keyup', function () {
        var num_txt1 = $('#num');
        var content = $('#comment');
        var txtval = content.val().length;
        var str = parseInt(600 - txtval);
        console.log(str);
        if (str > 0) {
            num_txt1.html('剩余可输入' + str + '字');
        } else {
            num_txt1.html('剩余可输入0字');
            content.val(content.val().substring(0, 700)); //这里意思是当里面的文字小于等于0的时候，那么字数不能再增加，只能是600个字
        }
    });
    $('#give').bind("click", function() {
        var comment = $('#comment').val();
        var div = $('div[itemId]');
        var itemId = div.attr("itemId");
        //console.log(div.attr("itemId"));
        if (comment.replace(/(^\s*)|(\s*$)/g,'').length > 0) {
            $.ajax({
                type: 'POST',
                url: "/circle/comment",
                async: true,
                data: {
                    "itemId": itemId,
                    "comment": comment,
                    "type": "2item"
                },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    //console.log(data)
                    if (data.status == "true") {
                        //alert(data.url);
                        //alert("提交成功");
                        pullComment();
                        $(document).scrollTop(0);
                        $('#comment').val("");
                    } else {
                        alert("评论上传失败，请重试");
                        console.log(data)
                    }
                },
                error: function () {
                    alert("服务器问题");
                }
            });
        } else {
            alert("请输入标题或者正文");
        }
    });

    pullComment();

});

