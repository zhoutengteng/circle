//author 表示出item的人
function createOneBlockForLeft(itemId, theme, content, readNum,  personId, personName, author, picidList, piccontentJson, good, goodfrom, bad, badfrom) {
    var parent = $('<div> </div>');
    $(parent).attr("itemId", itemId);
    var div1 = $('<div class="bg-success"> </div>');
    var div2 = $('<div class="thumbnail text-center"> </div>');
    var imageIDlist = picidList.split("\t");
    for (var i = 0; i < imageIDlist.length; i++ ) {
        //i是序号，和python不一样
        var id =  imageIDlist[i];
        console.log(";;;" + imageIDlist.length +";;" + id);
        var name = piccontentJson["" + id]["name"];
        var type = piccontentJson["" + id]["type"];
        var con = piccontentJson["" + id]["content"];
        var image = $('<img src="#" alt="picture" data-holder-rendered="true" style="height: 150px; padding:4px" class="col-xs-3 img-thumbnail">');
        $(image).attr("src", con);
        $(image).attr("alt", name + '\t' + id);
        $(image).addClass("hidden");
        $(div2).append(image);
        if (i == imageIDlist.length - 1) {
            $(image).removeClass("hidden");
        }
    }
    var div3 = $('<div class="caption col-xs-9"> </div>');
    var title = $('<h4 class="text-center">' + theme  + '</h4>');
    var p1 = $('<p class="text-center " style="word-wrap: break-word; overflow: hidden; min-height: 60px; max-height:63px" >' + content +  '</p>');
    var div4 = $('<div class="text-center"> </div>');
    var a1 = $('<a href ="detail/' +  itemId + '" role="button" class="btn btn-primary pull-left">阅读全文&nbsp; </a>');
    var span1 = $('<span class="badge"> 4</span>');
    $(span1).html(readNum);
    var a2 = $('<a href="' + author + '" style="margin-top:10px" class=" pull-right"> </a>');
    var span2 = $('<span class="glyphicon glyphicon-user">&nbsp;' + author + '</span>');
    var a3 = $('<a style="margin-right:30px; margin-top:10px" class="pull-right"> </a>');
    var span3 = $('<span class="glyphicon glyphicon-thumbs-up">'+ good + '</span>');
    var a4 = $('<a style="margin-right:30px;margin-top:10px" class="pull-right"> </a>');
    var span4 = $('<span class="glyphicon glyphicon-thumbs-down">' + bad + '</span>');
    if (goodfrom) {
        var goodList = goodfrom.split("\t");
        for (var i = 0; i < goodList.length; i++) {
            console.log(goodList[i] + " " + personId);
            if ("" + goodList[i]  ==  "" + personId) {
                console.log("right");
                $(span3).removeClass("text-muted");
                $(span3).addClass("text-danger");
                $(span4).removeClass("text-danger");
                $(span4).addClass("text-muted");
                break;
            }
        }
    }
    //$(span2).bind("click", function() {
    //    var text = $(span2).text().replace(/(^\s*)|(\s*$)/g,'');
    //    window.href = "/profile/" + text;
    //});
    $(span3).bind("click", function() {
        console.log(personId);
        var need;
        if ($(span3).hasClass("text-muted")) {
            need = "toggle";
        } else if ($(span3).hasClass("text-danger")) {
            need = "gooddown";
        } else {
            need = "goodup";
        }
        $.ajax({
            type: 'POST',
            url: "/count",
            async: true,
            data: {
                "itemId": itemId,
                "personId":personId,
                "type": "clickGood",
                "need": need
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                //console.log("===>" + data);
                if (data.status == "true") {
                    console.log("pull finished");
                    if (need == "toggle") {
                        //alert("dd")
                        $(span3).removeClass("text-muted");
                        $(span3).addClass("text-danger");
                        $(span3).html(parseInt($(span3).html()) + 1);
                        $(span4).removeClass("text-danger");
                        $(span4).addClass("text-muted");
                        $(span4).html(parseInt($(span4).html()) - 1);
                    } else if (need == "gooddown") {
                        $(span3).removeClass("text-danger");
                        $(span3).html(parseInt($(span3).html()) - 1);
                        $(span4).removeClass("text-muted");
                    } else if (need == "goodup") {
                        $(span3).addClass("text-danger");
                        $(span3).html(parseInt($(span3).html()) + 1);
                        $(span4).addClass("text-muted");
                    }
                } else {
                    console.log(data);
                    console.log("出现异常");
                }
            },
            error: function () {
                alert("服务器 error！");
            }
        });
    });
    $(span4).bind("click", function() {
        console.log(personId);
        var need;
        if ($(span4).hasClass("text-muted")) {
            need = "toggle";
        } else if ($(span4).hasClass("text-danger")) {
            need = "baddown";
        } else {
            need = "badup";
        }
        $.ajax({
            type: 'POST',
            url: "/count",
            async: true,
            data: {
                "itemId": itemId,
                "personId":personId,
                "type": "clickBad",
                "need": need
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                //console.log("===>" + data);
                if (data.status == "true") {
                    console.log("pull finished");
                    if (need == "toggle") {
                        //alert("dd");
                        $(span4).removeClass("text-muted");
                        $(span4).addClass("text-danger");
                        $(span4).html(parseInt($(span4).html()) + 1);
                        $(span3).removeClass("text-danger");
                        $(span3).addClass("text-muted");
                        $(span3).html(parseInt($(span3).html()) - 1);
                    } else if (need == "baddown") {
                        $(span4).removeClass("text-danger");
                        $(span4).html(parseInt($(span4).html()) - 1);
                        $(span3).removeClass("text-muted");
                    } else if (need == "badup") {
                        console.log("badup")
                        console.log($(span4).html(parseInt($(span4).html())))
                        $(span4).addClass("text-danger");
                        $(span4).html(parseInt($(span4).html()) + 1);
                        $(span3).addClass("text-muted");
                    }
                    //console.log(data);
                } else {
                    console.log(data);
                    console.log("出现异常");
                }
            },
            error: function () {
                alert("服务器 error！");
            }
        });
    });
    if (badfrom) {
        var badList = badfrom.split("\t");
        for (var i = 0; i < badList.length; i++) {
            console.log(badList[i] + " " + personId);
            if ("" + badList[i]  ==  "" + personId) {
                console.log("right");
                $(span4).removeClass("text-muted");
                $(span4).addClass("text-danger");
                $(span3).removeClass("text-danger");
                $(span3).addClass("text-muted");
                break;
            }
        }
    }
    var div5 = $('<div class="clearfix"></div>');
    var div6 = $('<div class="clearfix"></div>');
    $(parent).append(div1);
    $(div1).append(div2);
    $(div2).append(div3);
    $(div2).append(div6);
    $(div3).append(title);
    $(div3).append(p1);
    $(div3).append(div4);
    $(div4).append(a1);
    $(div4).append(a2);
    $(div4).append(a3);
    $(div4).append(a4);
    $(div4).append(div5);
    $(a1).append(span1);
    $(a2).append(span2);
    $(a3).append(span3);
    $(a4).append(span4);
    return parent;
}




function createOneBlockForRight(itemId, theme, content, readNum, personId, personName, author, picidList, piccontentJson, good, goodfrom, bad, badfrom) {
    var parent = $('<div> </div>');
    $(parent).attr("itemId", itemId);
    var div1 = $('<div class="bg-success"> </div>');
    var div2 = $('<div class="thumbnail text-center"> </div>');
    var imageIDlist = picidList.split("\t");
    for (var i = 0; i < imageIDlist.length; i++ ) {
        //i是序号，和python不一样
        var id =  imageIDlist[i];
        console.log(";;;" + imageIDlist.length +";;" + id);
        var name = piccontentJson["" + id]["name"];
        var type = piccontentJson["" + id]["type"];
        var con = piccontentJson["" + id]["content"];
        var image = $('<img src="#" alt="picture" data-holder-rendered="true" style="height: 150px;  width:50%; padding:4px" class="img-thumbnail">');
        $(image).attr("src", con);
        $(image).attr("alt", name + '\t' + id);
        $(image).addClass("hidden");
        $(div2).append(image);
        if (i == imageIDlist.length - 1) {
            $(image).removeClass("hidden");
        }
    }
    var div3 = $('<div class="caption"> </div>');
    var title = $('<h4 class="text-center">' + theme  + '</h4>');
    var p1 = $('<p class="text-center " style="word-wrap: break-word; overflow: hidden; min-height: 60px; max-height:63px" >' + content +  '</p>');
    var div4 = $('<div class="text-center"> </div>');
    var a1 = $('<a href ="detail/' +  itemId + '" role="button" class="btn btn-primary pull-left">阅读全文&nbsp; </a>');
    var span1 = $('<span class="badge"> 4</span>');
    $(span1).html(readNum);
    var a2 = $('<a href="' + author + '" style="margin-top:10px" class=" pull-right"> </a>');
    var span2 = $('<span class="glyphicon glyphicon-user">&nbsp;' + author + '</span>');
    var a3 = $('<a style="margin-right:25px; margin-top:10px" class="pull-right"> </a>');
    var span3 = $('<span class="glyphicon glyphicon-thumbs-up">'+ good + '</span>');
    var a4 = $('<a style="margin-right:25px;margin-top:10px" class="pull-right"> </a>');
    var span4 = $('<span class="glyphicon glyphicon-thumbs-down">' + bad + '</span>');
    if (goodfrom) {
        var goodList = goodfrom.split("\t");
        for (var i = 0; i < goodList.length; i++) {
            console.log(goodList[i] + " " + personId);
            if ("" + goodList[i]  ==  "" + personId) {
                console.log("right");
                $(span3).removeClass("text-muted");
                $(span3).addClass("text-danger");
                $(span4).removeClass("text-danger");
                $(span4).addClass("text-muted");
                break;
            }
        }
    }
    //$(span2).bind("click", function() {
    //    var text = $(span2).text().replace(/(^\s*)|(\s*$)/g,'');
    //    window.href = "/profile/" + text;
    //});
    $(span3).bind("click", function() {
        console.log(personId);
        var need;
        if ($(span3).hasClass("text-muted")) {
            need = "toggle";
        } else if ($(span3).hasClass("text-danger")) {
            need = "gooddown";
        } else {
            need = "goodup";
        }
        $.ajax({
            type: 'POST',
            url: "/count",
            async: true,
            data: {
                "itemId": itemId,
                "personId":personId,
                "type": "clickGood",
                "need": need
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                //console.log("===>" + data);
                if (data.status == "true") {
                    console.log("pull finished");
                    if (need == "toggle") {
                        //alert("dd")
                        $(span3).removeClass("text-muted");
                        $(span3).addClass("text-danger");
                        $(span3).html(parseInt($(span3).html()) + 1);
                        $(span4).removeClass("text-danger");
                        $(span4).addClass("text-muted");
                        $(span4).html(parseInt($(span4).html()) - 1);
                    } else if (need == "gooddown") {
                        $(span3).removeClass("text-danger");
                        $(span3).html(parseInt($(span3).html()) - 1);
                        $(span4).removeClass("text-muted");
                    } else if (need == "goodup") {
                        $(span3).addClass("text-danger");
                        $(span3).html(parseInt($(span3).html()) + 1);
                        $(span4).addClass("text-muted");
                    }
                } else {
                    console.log(data);
                    console.log("出现异常");
                }
            },
            error: function () {
                alert("服务器 error！");
            }
        });
    });
    $(span4).bind("click", function() {
        console.log(personId);
        var need;
        if ($(span4).hasClass("text-muted")) {
            need = "toggle";
        } else if ($(span4).hasClass("text-danger")) {
            need = "baddown";
        } else {
            need = "badup";
        }
        $.ajax({
            type: 'POST',
            url: "/count",
            async: true,
            data: {
                "itemId": itemId,
                "personId":personId,
                "type": "clickBad",
                "need": need
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                //console.log("===>" + data);
                if (data.status == "true") {
                    console.log("pull finished");
                    if (need == "toggle") {
                        //alert("dd");
                        $(span4).removeClass("text-muted");
                        $(span4).addClass("text-danger");
                        $(span4).html(parseInt($(span4).html()) + 1);
                        $(span3).removeClass("text-danger");
                        $(span3).addClass("text-muted");
                        $(span3).html(parseInt($(span3).html()) - 1);
                    } else if (need == "baddown") {
                        $(span4).removeClass("text-danger");
                        $(span4).html(parseInt($(span4).html()) - 1);
                        $(span3).removeClass("text-muted");
                    } else if (need == "badup") {
                        console.log("badup")
                        console.log($(span4).html(parseInt($(span4).html())))
                        $(span4).addClass("text-danger");
                        $(span4).html(parseInt($(span4).html()) + 1);
                        $(span3).addClass("text-muted");
                    }
                    //console.log(data);
                } else {
                    console.log(data);
                    console.log("出现异常");
                }
            },
            error: function () {
                alert("服务器 error！");
            }
        });
    });
    if (badfrom) {
        var badList = badfrom.split("\t");
        for (var i = 0; i < badList.length; i++) {
            console.log(badList[i] + " " + personId);
            if ("" + badList[i]  ==  "" + personId) {
                console.log("right");
                $(span4).removeClass("text-muted");
                $(span4).addClass("text-danger");
                $(span3).removeClass("text-danger");
                $(span3).addClass("text-muted");
                break;
            }
        }
    }
    var div5 = $('<div class="text-center"></div>');
    var div6 = $('<div class="clearfix"></div>');
    var div7 = $('<div class="clearfix"></div>');
    var div8 = $('<div class="clearfix"></div>');

    $(parent).append(div1);
    $(div1).append(div2);
    $(div2).append(div3);
    $(div2).append(div6);
    $(div3).append(title);
    $(div3).append(p1);
    $(div3).append(div4);
    $(div3).append(div5);
    $(div3).append(div6);
    $(div4).append(a1);
    $(div4).append(a3);
    $(div4).append(a4);
    $(div4).append(div8);
    $(div5).append(a2);
    $(div3).append(div7);
    $(a1).append(span1);
    $(a2).append(span2);
    $(a3).append(span3);
    $(a4).append(span4);
    return parent;
}


function pageTurn() {
    var div1 = $('<div class="clearfix"> </div>');
    var nav = $('<nav class="text-center"> </nav>');
    var ul = $('<ul class="pagination" style="padding-left: 0"> </ul>');
    $(div1).append(nav);
    $(nav).append(ul);
    var left = $('<li> </li>');
    var a1 = $('<a href="#" aria-label="Previous"> </a>');
    var span1 = $('<span aria-hidden="true"> &laquo </span>');
    $(ul).append(left);
    $(left).append(a1);
    $(a1).append(span1);
    for (var i =0 ; i  < 4; i++) {
        var ll = $('<li> </li>');
        var aa = $('<a href="#">' + (i + 1) + '</a>');
        $(ll).append(aa);
        $(ul).append(ll);
    }
    var right = $('<li> </li>');
    var a2 = $('<a href="#" aria-label="Next"> </a>');
    var span2 = $('<span aria-hidden="true"> &laquo </span>');
    $(ul).append(right);
    $(right).append(a2);
    $(a2).append(span2);
    return div1;
}


function  fill2(data) {
    var leftDiv_1 = $('div.leftSide');
    leftDiv_1.empty();
    for (var i = 0; i < data["number"]; i++) {
        var id = data["item"][""+i]["id"];
        var personId = data["personId"];
        var person = data["username"];
        var author = data["author"];
        var theme = data["item"]["" + i]["theme"];
        var content = data["item"]["" + i]["content"];
        var readNum = data["item"]["" + i]["readNum"];
        var picidList = data["item"][""+i]["pics"];
        var piccontentJson = data["pic"];
        var good = data["item"][""+i]["good"];
        var goodfrom = data["item"][""+i]["goodfrom"];
        var bad = data["item"][""+i]["bad"];
        var badfrom = data["item"][""+i]["badfrom"];
        leftDiv_1.append(createOneBlockForLeft(id, theme, content, readNum, personId, person, author, picidList, piccontentJson, good, goodfrom, bad, badfrom));
    }

    //$(leftDiv_1).append(createOneBlockForLeft());
    //$(leftDiv_1).append(createOneBlockForLeft());
    //$(leftDiv_1).append(createOneBlockForLeft());
    //var navul = $('ul.navSide');
    //navul.append(pageTurn());
    //var rightDiv_2 = $('div.rightSide');
    //$(rightDiv_2).append(createOneBlockForRight());
    //$(rightDiv_2).append(createOneBlockForRight());
    //$(rightDiv_2).append(createOneBlockForRight());
}


function  fill1(data) {
    var leftDiv_1 = $('div.leftSide');
    leftDiv_1.empty();
    for (var i = 0; i < data["number"]; i++) {
        var id = data["item"][""+i]["id"];
        var personId = data["personId"];
        var person = data["username"];
        var author = data["item"]["" + i]["username"];
        var theme = data["item"]["" + i]["theme"];
        var content = data["item"]["" + i]["content"];
        var readNum = data["item"]["" + i]["readNum"];
        var picidList = data["item"][""+ i]["pics"];
        var piccontentJson = data["pic"];
        var good = data["item"][""+i]["good"];
        var goodfrom = data["item"][""+i]["goodfrom"];
        var bad = data["item"][""+i]["bad"];
        var badfrom = data["item"][""+i]["badfrom"];
        leftDiv_1.append(createOneBlockForLeft(id , theme, content,readNum, personId, person, author, picidList, piccontentJson, good, goodfrom, bad, badfrom));
    }
}

function  fill6(data) {
    var rightDiv_2 = $('div.rightSide');
    rightDiv_2.empty();
    for (var i = 0; i < data["number"]; i++) {
        var id = data["item"][""+i]["id"];
        var personId = data["personId"];
        var person = data["username"];
        var author = data["item"]["" + i]["username"];
        var theme = data["item"]["" + i]["theme"];
        var content = data["item"]["" + i]["content"];
        var readNum = data["item"]["" + i]["readNum"];
        var picidList = data["item"][""+ i]["pics"];
        var piccontentJson = data["pic"];
        var good = data["item"][""+i]["good"];
        var goodfrom = data["item"][""+i]["goodfrom"];
        var bad = data["item"][""+i]["bad"];
        var badfrom = data["item"][""+i]["badfrom"];
        rightDiv_2.append(createOneBlockForRight(id , theme, content, readNum, personId, person, author, picidList, piccontentJson, good, goodfrom, bad, badfrom));
    }
}





$('document').ready(function () {
    //console.log($('ul li[role="presentation"]').length)
    $('ul li[role="presentation"]').bind("click", function(e) {
        var lis = $('ul li[role="presentation"]');
        for (var i = 0; i <  lis.length; i++) {
            $(lis[i]).removeClass('active')
        }
        var target = e.target;
        $($(target).parent().parent()).addClass('active');
        console.log(target);
        var need = $(target).text().replace(/(^\s*)|(\s*$)/g,'');
        $.ajax({
            type: 'POST',
            url: "/profile/" + $('#username').text() ,
            async: true,
            data: {
                "need": need
            },
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log("===>" + data);
                if (data.status == "true") {
                    console.log("pull finished");
                    console.log(data);
                    if (need == "个人动态") {
                        fill2(data);
                    } else if (need == "最新动态") {
                        fill1(data);
                    }
                    //window.location.href = data.url;
                } else {
                    console.log(data);
                    console.log("出现异常");
                }
            },
            error: function () {
                alert("服务器 error！");
            }
        });
        //console.log($($($(target).children("a")[0]).children()[1]).html())
    });
    //default
    //var username = location.url.substr(9);
    var ss = window.location.href.split("/");
    var username = ss[ss.length-1];
    $.ajax({
        type: 'POST',
        url: "/profile/" + username ,
        async: true,
        data: {
            "need":"个人动态"
        },
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log("===>" + data);
            if (data.status == "true") {
                console.log("pull finished");
                console.log(data);
                fill2(data);
                $.ajax({
                    type: 'POST',
                    url: "/profile/" + username ,
                    async: true,
                    data: {
                        "need":"top10"
                    },
                    cache: false,
                    dataType: 'json',
                    success: function (data) {
                        console.log("===>" + data);
                        if (data.status == "true") {
                            console.log("pull finished");
                            console.log(data);
                            fill6(data);
                            //window.location.href = data.url;
                        } else {
                            alert("出现异常");
                        }
                    },
                    error: function () {
                        alert("服务器 error！");
                    }
                });
            } else {
                alert("出现异常");
            }
        },
        error: function () {
            alert("服务器 error！");
        }
    });

});