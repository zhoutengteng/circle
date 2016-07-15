/**
 * Created by zhoutengteng on 16/6/21.
 */
/**
 * Created by zhoutengteng on 16/6/20.
 */

exports.getMethod = function (req, res, next) {
    res.render('welcome', {title : "zhoutengteng"});
};
exports.postMethod = function (req, res, next) {
    //res.send("index 页面22 post");
    var json_data = {"name":"amita","pass":"12345"};
    res.json(json_data);
};