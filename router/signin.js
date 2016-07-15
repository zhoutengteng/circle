/**
 * Created by zhoutengteng on 16/6/25.
 */

var User = require('../db/user');
var async = require("async");
var cookieParser = require('cookie-parser');
var session = require('express-session');

exports.getMethod = function (req, res, next) {
    res.render('signin', {title : "zhoutengteng"});
};


exports.postMethod = function (req, res, next) {
    var data = req.body;
    var account = data.account;
    var password = data.password;
    var remeber = data.remeber;
    User.exist(account, password, function(err, result){
        if(result['status'] == 'true' ) {
            //if (false) {
            //    console.log("exist");
            //} else {
            var hour = 360000;
                //session.cookie.name = account;
                //session.cookie.expires = new Date(Date.now + hour);
                //session.cookie.maxAge = hour;
                //console.log(session.Session);
                //console.log(req.cookies.user + "=");

            res.cookie("name", account, {maxAge: 60 * 60 * 24 * 1000, httpOnly: true, path: '/'});
            //}
            res.json({'status':'true', 'url':'/profile/' + result['username']})
        } else {
            res.json({'status':'false'})
        }

    })

};

