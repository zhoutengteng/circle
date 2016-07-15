/**
 * Created by zhoutengteng on 16/6/25.
 */

var upload = require('jquery-file-upload-middleware');
var User = require("../db/user");
var Item = require("../db/item");
var Pic = require("../db/pic");
var File = require("../db/file");
var Complex = require("../db/complex");

exports.getMethod = function (req, res, next) {
    var username = req.url.substr(9);
    console.log(username);
    console.log(req.session);
    console.log(req.cookies);
    if (username == req.cookies) {
        res.render('profile', {title: username, username: req.cookies.name});
    } else {
        res.render('profile', {title: username, username: req.cookies.name});
    }
};

exports.click = function(req, res, next) {
    var data = req.body;
    var itemId = data["itemId"];
    var personId = data["personId"];
    var type = data["type"];
    var need = data["need"];
    Item.selectByIDList([parseInt(itemId)], function(err, result) {
        console.log("LOIN==>post for /count");
        console.info(result);
        var theme = result['item']["0"]['theme'];
        var content = result['item']["0"]['content'];
        var good = result['item']["0"]["good"];
        var bad = result['item']["0"]["bad"];
        var goodfrom = result['item']["0"]["goodfrom"];
        var badfrom = result['item']["0"]["badfrom"];
        var author = result['item']["0"]["author"];
        var buildTime = result['item']["0"]["buildTime"];
        var picList = result['item']["0"]["pics"];
        var fileList = result['item']["0"]["files"];
        if (type == "clickGood") {
            if (need == "toggle") {
                good = parseInt(good) + 1;
                bad = parseInt(bad) - 1;
                if (!goodfrom) {
                    goodfrom = "";
                    goodfrom = goodfrom + personId;
                } else {
                    goodfrom = goodfrom + "\t" + personId;
                }
                var newBadList = [];
                var originBadList = badfrom.split("\t");
                for (var i = 0; i < originBadList.length; i++) {
                    if (personId != parseInt(originBadList[i])) {
                        newBadList.push(originBadList[i]);
                    }
                }
                badfrom = newBadList.join("\t");
            } else if (need == "gooddown") {
                good = parseInt(good) - 1;
                bad = parseInt(bad);
                var newGoodList = [];
                var originGoodList = goodfrom.split("\t");
                for (var i = 0; i < originGoodList.length; i++) {
                    if (personId != parseInt(originGoodList[i])) {
                        newGoodList.push(originGoodList[i]);
                    }
                }
                goodfrom = newGoodList.join("\t");
            } else if (need = "goodup") {
                good = parseInt(good) + 1;
                bad = parseInt(bad);
                if (!goodfrom) {
                    goodfrom = "";
                    goodfrom = goodfrom + personId;
                } else {
                    goodfrom = goodfrom + "\t" + personId;
                }
            }
            Item.update(theme, content, good, bad, goodfrom, badfrom, picList, fileList, itemId, function(err, result) {
                res.json(result);
            });
        } else  if (type == "clickBad") {
                if (need == "toggle") {
                    good = parseInt(good) - 1;
                    bad = parseInt(bad) + 1;
                    if (!badfrom) {
                        badfrom = "";
                        badfrom = badfrom + personId;
                    } else {
                        badfrom = badfrom + "\t" + personId;
                    }
                    var newGoodList = [];
                    var originGoodList = goodfrom.split("\t");
                    for (var i = 0; i < originGoodList.length; i++) {
                        if (personId != parseInt(originGoodList[i])) {
                            newGoodList.push(originGoodList[i]);
                        }
                    }
                    goodfrom = newGoodList.join("\t");
                } else if (need == "baddown") {
                    good = parseInt(good);
                    bad = parseInt(bad) - 1;
                    var newBadList = [];
                    var originBadList = badfrom.split("\t");
                    for (var i = 0; i < originBadList.length; i++) {
                        if (personId != parseInt(originBadList[i])) {
                            newBadList.push(originBadList[i]);
                        }
                    }
                    badfrom = newBadList.join("\t");
                } else if (need = "badup") {
                    good = parseInt(good);
                    bad = parseInt(bad) + 1;
                    if (!badfrom) {
                        badfrom = "";
                        badfrom = badfrom + personId;
                    } else {
                        badfrom = badfrom + "\t" + personId;
                    }
                }
                Item.update(theme, content, good, bad, goodfrom, badfrom, picList, fileList, itemId, function(err, result) {
                    res.json(result);
                });
        } else {
            res.json({"status": "false"});
        }
    })
};


//不需要权限检测，因为公开网页的
exports.postMethod = function (req, res, next) {
    var data = req.body;
    //用url来查询，返回cookie的name
    var username = req.url.substr(9);
    var need = data.need;
    if (need=="个人动态") {
        var myresult = {};
        myresult["author"] = username;
        User.selectByAccount(username, function(err, result) {
            var items = result['item'];
            if (items == null || items.replace(/(^\s*)|(\s*$)/g,'').length == 0) {
                res.json({"status":"true", "number": 0})
            } else {
                if (req.cookies && req.cookies.name) {
                    myresult["username"] = req.cookies.name;
                } else {
                    myresult["username"] = "Guest";
                }
                myresult["personId"] = result['id'];
                var itemList = items.split('\t');
                Item.selectByIDList(itemList, function (err, result) {
                    //console.log(result["item"]["0"]['id'])
                    var picAllSet = new Set();
                    var picAllList = [];
                    myresult["number"] = result["number"];
                    myresult["item"] = result["item"];

                    for (var i = 0; i < result['number']; i++) {
                        var picListStr = result["item"]["" + i]["pics"];
                        if (picListStr) {
                            console.log(picListStr.split('\t')[0]);
                            for (var j in picListStr.split('\t')) {
                                picAllSet.add(parseInt(picListStr.split('\t')[j]));
                            }
                            console.log(picAllSet)
                        }
                    }
                    picAllSet.forEach(function (item) {
                        picAllList.push(item);
                    });
                    console.log(picAllList);
                    Pic.selectByIDList(picAllList, function (err, result) {
                        console.log(result);
                        myresult["pic"] = result["pic"];
                        myresult["status"] = "true";
                        res.json(myresult);
                    });
                })
            }
        });
    } else if (need=="最新动态") {
        User.selectByAccount(username, function(err, result) {
            var personId = result['id'];
            Complex.selectFor1(function (err, result) {
                result["status"] = "true";
                if (req.cookies) {
                    result["username"] = req.cookies.name;
                } else {
                    result["username"] = "Guest";
                }
                result["personId"] = personId;
                res.json(result);
            });
        });
    } else if (need=="top10") {
        User.selectByAccount(username, function(err, result) {
            var personId = result['id'];
            Complex.selectFor6(function (err, result) {
                result["status"] = "true";
                if (req.cookies) {
                    result["username"] = req.cookies.name;
                } else {
                    result["username"] = "Guest";
                }
                result["personId"] = personId;
                res.json(result);
            });
        });
    }else {
        res.json({"status":"false"});
    }

};

