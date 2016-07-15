/**
 * Created by zhoutengteng on 16/6/20.
 */
var express = require('express');
var router = express.Router();


module.exports = {
    start: router.get('/', function (req, res, next) {
            console.log('执行过滤 ...');
        //var json_data = {"name":"amita","pass":"12345"};
        //res.json(json_data);
        //    next(); // pass control to the next handler
        //
         }),
    end: function(){
        //console.log('未开启过滤');
        var json_data = {"name":"amita","pass":"12345"};
        res.json(json_data);
    }
};
