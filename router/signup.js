/**
 * Created by zhoutengteng on 16/6/25.
 */

var User = require('../db/user');
var async = require("async");



exports.postMethod = function (req, res, next) {
    var data = req.body;
    var username = data.username;
    var password = data.password;
    var password_repeat = data.password_repeat;
    var email = data.email;
    var sex = data.sex;
    var telphone = data.telephone;
    User.insert(username, sex, password, email, telphone, function(err, result){
        res.json(result)
    });

};



exports.getMethod = function (req, res, next) {
    res.render('signup', {title : "胶圈"});
};



//var promise = new Promise(function (username, sex, password, email, telphone) {
//    console.log(password);
//    //return mysql.insert(username, sex, password, email, telphone);
//});
//promise.then(function(result) {
//    console.log(result)
//    res.json(
//        {
//            "result": "true"
//        }
//    );
//});
//  async.series([
//        function() {
//            result =
//        }
//    ], function() {
//        console.log(result);
//        res.json ({
//            "result": "true"
//        })
//    })