/**
 * Created by zhoutengteng on 16/6/20.
 */

var upload = require('jquery-file-upload-middleware');
var User = require("../db/user");
var Item = require("../db/item");
var Pic = require("../db/pic");
var File = require("../db/file");
var Issue = require("../db/issue");

exports.getMethod = function (req, res, next) {
    var username = req.cookies.name;
    var itemId = parseInt(req.url.substr(16));
    var myresult = {};
    User.selectByAccount(username, function(err, result) {
        var personId = result['id'];
        Item.updateReadByid(itemId, function(err, result) {
            Item.selectByIDList([itemId], function(err, result) {
                var picAllSet = new Set();
                var picAllList = [];
                myresult["item"] = result["item"]["" + 0];
                myresult["itemId"] = itemId;
                myresult["title"] = "胶圈";
                myresult["username"] = username;
                myresult["content"] = result["item"][""+0]["content"];
                myresult["theme"] = result["item"][""+0]["theme"];
                for (var i = 0; i < result['number']; i++) {
                    var picListStr = result["item"]["" + i]["pics"];
                    console.log(picListStr.split('\t')[0]);
                    for (var j in picListStr.split('\t')) {
                        picAllSet.add(parseInt(picListStr.split('\t')[j]));
                    }
                    console.log(picAllSet)
                }
                picAllSet.forEach(function (item) {
                    picAllList.push(item);
                });
                User.selectByid(result["item"][""+0]["author"], function(err, result) {
                    myresult["author"] = result['username'];
                    if (picAllList.length > 0) {
                        Pic.selectByIDList(picAllList, function (err, result) {
                            console.log(result);
                            myresult["pic"] = [];
                            for (var pic in  result["pic"]) {
                                myresult["pic"].push(result["pic"][pic]);
                            }
                            myresult["status"] = "true";
                            myresult["number"] = result["number"];
                            console.log(myresult);
                            //res.render('detail', {
                            //    title: "胶圈",
                            //    username: "zhoutengteng",
                            //    theme: "theme",
                            //    content: "content",
                            //    author: "zhoutengteng",
                            //    pics: [{
                            //        name: "语文",
                            //        author: "张三"
                            //    }, {
                            //        name: "数学",
                            //        author: "李四"
                            //    }, {
                            //        name: "英语",
                            //        author: "王五"
                            //    }]
                            //});
                            if (myresult["author"] == myresult["username"]) {
                                res.render('modify', myresult);
                            } else {
                                res.render('detail', myresult);
                            }

                        });
                    } else {
                        myresult["status"] = "true";
                        myresult["number"] = result["number"];
                        console.log(myresult);
                        if (myresult["author"] == myresult["username"]) {
                            res.render('modify', myresult);
                        } else {
                            res.render('detail', myresult);
                        }
                    }

                });

            })
        })
    })
};


exports.getComment = function(req, res, next) {
    var username = req.cookies.name;
    var data = req.body;
    var itemId = data.itemId;
    var myresult = {};
    Item.selectByIDList([itemId], function(err, result) {
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
        var issuesStr = result["item"]["0"]["issues"];
        if (issuesStr) {
            var issuesList = issuesStr.split("\t");
            Issue.selectByIDList(issuesList, function(err, result) {
                myresult["number"] = result["number"];
                myresult["issue"] = {};
                var peopleSet = new Set();
                var peopleList = [];
                for (var i = 0; i < result["number"]; i++) {
                    myresult["issue"][i] = result["issue"][""+i];
                    peopleSet.add(result["issue"][""+i]["peopleId"]);
                }
                peopleSet.forEach(function (item) {
                    peopleList.push(item);
                });
                User.selectByIDList(peopleList, function(err, result){
                    myresult["user"] = {};
                    for (var i = 0; i < result["number"]; i++) {
                        myresult["user"][result["user"][""+i]["id"]] = result["user"][""+i]["username"];
                    }
                    myresult["status"] = result["status"];

                    myresult2 = {};
                    myresult2["number"] = myresult["number"];
                    myresult2["status"] = myresult["status"];
                    myresult2["issue"] = {};
                    for (var i = 0; i < myresult2["number"]; i++) {
                        myresult2["issue"][i] = {};
                        myresult2["issue"][i]["id"] = myresult["issue"][i]["id"];
                        myresult2["issue"][i]["content"] = myresult["issue"][i]["content"];
                        myresult2["issue"][i]["author"] = myresult["user"][myresult["issue"][i]["peopleId"]];
                        myresult2["issue"][i]["toPeople"] = "";
                        if (myresult["issue"][i]["issueId"] == -1) {

                        } else {
                            var toissueId = myresult["issue"][i]["issueId"];
                            for (var j = 0; j < myresult2["number"]; j++) {
                                console.log(toissueId + " " + myresult["issue"][j]["id"])
                                if (toissueId == myresult["issue"][j]["id"]) {
                                    myresult2["issue"][i]["toPeople"] = myresult["user"][myresult["issue"][j]["peopleId"]];
                                }
                            }
                        }
                    }

                    res.json(myresult2)
                })
            });
        } else {
            res.json({"status":"true", "number":0});
        }
    });

};


exports.postComment = function (req, res, next) {
    var username = req.cookies.name;
    var data = req.body;
    var itemId = data.itemId;
    var comment = data.comment;
    var type = data.type;
    var buildTime = new Date();
    if (type == "2item") {
        User.selectByAccount(username, function (err, result) {
            var personId = result['id'];
            var issueId = -1;
            Issue.insert(itemId,personId,comment, issueId, buildTime, function(err, result) {
                var issueID = result['id'];
                console.log("=======" + issueID);
                Item.selectByIDList([itemId], function(err, result) {
                    var issuesStr = result["item"]["" + 0]["issues"];
                    if (!issuesStr || issuesStr.length == 0) {
                        issuesStr = issueID;
                    } else {
                        issuesStr = issuesStr + "\t" + issueID;
                    }
                    console.log(issuesStr);
                    Item.updateCommentByid(itemId, issuesStr, function(err, result) {
                        res.json(result);
                    });

                });
            })
        })
    } else if (type="2issue") {
        var issueId = data.issueId;
        User.selectByAccount(username, function (err, result) {
            var personId = result['id'];
            Issue.insert(itemId,personId,comment, issueId, buildTime, function(err, result) {
                var issueID = result['id'];
                console.log("=======" + issueID);
                Item.selectByIDList([itemId], function(err, result) {
                    var issuesStr = result["item"]["" + 0]["issues"];
                    if (!issuesStr || issuesStr.length == 0) {
                        issuesStr = issueID;
                    } else {
                        issuesStr = issuesStr + "\t" + issueID;
                    }
                    console.log(issuesStr);
                    Item.updateCommentByid(itemId, issuesStr, function(err, result) {
                        res.json(result);
                    });

                });
            })
        })
    }
};
