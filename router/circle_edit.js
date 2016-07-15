/**
 * Created by zhoutengteng on 16/6/20.
 */


var upload = require('jquery-file-upload-middleware');
var User = require("../db/user");
var Item = require("../db/item");
var Pic = require("../db/pic");
var File = require("../db/file");

exports.getMethod = function (req, res, next) {
    var username = req.cookies.name;
    res.render('circle_edit', {title : "胶圈", username:username});
};



exports.updateMethod = function (req, res, next) {
    var data = req.body;
    var itemId = data.itemId;
    var theme = data.theme;
    var content = data.content;
    var picJson = data.pic;
    var author = data.author;
    var buildTime = new Date();
    var username = req.cookies.name;
    var url =  '/profile/' + req.cookies.name;
    if (username == author) {
        console.log(req.body);
        if (picJson.number > 0) {
            Pic.insertByJson(picJson, function (err, result) {
                var picList = result['ids'].join("\t");
                User.selectByAccount(username, function (err, result) {
                    if (result['status'] == 'true') {
                        var authorId = result['id'];
                        console.log(theme + " ------  " + content);
                        Item.updateBylittle(theme, content, buildTime, picList, "", itemId, function (err, result) {
                            result['url'] = url;
                            console.log(result);
                            res.json(result);
                        });
                    } else {
                        res.json({"status": "false"});
                    }
                });
            });
        } else {
            res.json({"status": "false"});
        }
    } else {
        res.json({"status":"false"})
    }
};



exports.postMethod = function (req, res, next) {
    var data = req.body;
    var theme = data.theme;
    var content = data.content;
    var picJson = data.pic;
    var buildTime = new Date();
    var author = req.cookies.name;
    var url =  '/profile/' + req.cookies.name;
    console.log(req.body);
    if (picJson.number > 0) {
        Pic.insertByJson(picJson, function (err, result) {
            var picList = result['ids'].join("\t");
            User.selectByAccount(author, function(err, result) {
                if (result['status'] == 'true') {
                    var authorId = result['id'];
                    var item = result['item'];
                    console.log(theme + " ------  " + content);
                    Item.insert(theme, content, authorId, buildTime, picList, "", function (err, result) {
                        if (item) {
                            item = item + "\t" + result['id'];
                        } else {
                            item = result['id']
                        }

                        User.updateItem(authorId, item, function(err, result) {
                            result['url'] = url;
                            console.log(result);
                            res.json(result);
                        })
                    });
                } else {
                    res.json({"status": "false"});
                }
            });
        });
    } else {
        var picList = "";
        User.selectByAccount(author, function(err, result) {
            if (result['status'] == 'true') {
                var authorId = result['id'];
                var item = result['item'];
                console.log(theme + " ------  " + content);
                Item.insert(theme, content, authorId, buildTime, picList, "", function (err, result) {
                    if (item) {
                        item = item + "\t" + result['id'];
                    } else {
                        item = result['id']
                    }
                    console.log('item变为'+ item);
                    User.updateItem(authorId, item, function(err, result) {
                        result['url'] = url;
                        console.log(result);
                        res.json(result);
                    })
                });
            } else {
                res.json({"status": "false"});
            }
        });
    }
    //User.exist(account, password, function(err, result){
    //    if(result['status'] == 'true' ) {
    //        //if (false) {
    //        //    console.log("exist");
    //        //} else {
    //        var hour = 360000;
    //        //session.cookie.name = account;
    //        //session.cookie.expires = new Date(Date.now + hour);
    //        //session.cookie.maxAge = hour;
    //        //console.log(session.Session);
    //        //console.log(req.cookies.user + "=");
    //
    //        res.cookie("name", account, {maxAge: 60 * 60 * 24 * 1000, httpOnly: true, path: '/'});
    //        //}
    //        res.json({'status':'true', 'url':'/profile/' + result['username']})
    //    } else {
    //        res.json({'status':'false'})
    //    }
    //
    //})

};