/**
 * Created by zhoutengteng on 16/7/5.
 */
var User = require('../db/user');
var async = require("async");
var querystring = require('querystring');
var session = require('express-session');
var bodyParser = require('body-parser');

function isEmptyObject(e) {
    for (var t in e) {
        console.log("not empty");
        return false;
    }
    console.log("empty");
    return true;
}

function hasProperty(e, str) {
    for (var t in e) {
       if (t == str) {
           console.log("对象e有属性" + str);
           return true;
       }
    }
    console.log("对象e没有属性" + str);
    return false;
}

exports.getMethod = function (req, res, next) {
    //to-do 登录不总返回，固定的页面
    if (isEmptyObject(req.cookies)) {
        console.log(req.cookies);
        res.render('signin', {title : "胶圈"});
    } else if (!hasProperty(req.cookies, "name")) {
        console.log(req.cookies);
        res.render('signin', {title : "胶圈"});
    } else {
        console.log("continue");
        next();
    }
};
