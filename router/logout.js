/**
 * Created by zhoutengteng on 16/7/10.
 */
exports.postMethod = function (req, res, next) {
            var hour = 360000;
            //session.cookie.name = account;
            //session.cookie.expires = new Date(Date.now + hour);
            //session.cookie.maxAge = hour;
            //console.log(session.Session);
            //console.log(req.cookies.user + "=");
    var account = req.cookies.name;
    var date=new Date();
    res.cookie("name", account, {maxAge: -1, httpOnly: true, path: '/', expires:date.toGMTString()});
    res.json({"status": "true", "url":"/signin"})

};

