/**
 * Created by zhoutengteng on 16/6/26.
 */

var connection = require('../config/dbconfig.js');
var Pic = require('../db/pic.js');

module.exports = {
    selectFor1: function (callback) {
        connection.getConnection(function (error, tempCont) {
            if (error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    connect();
                } else {
                    console.error(error.stack || error);
                }
                tempCont.release();
                tempCont.end();
                console.error('Connection Error');
                var result = {
                    "status": "false",
                    "error": "true"
                };
                callback(err, result);
            } else {
                console.log('Connected');
                var queryStatement = 'select users_tb.id as personId ,username,  items_tb.* from users_tb left join  items_tb on users_tb.id =  items_tb.author where users_tb.item != "" order by buildTime DESC';
                var query = tempCont.query(queryStatement, function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        console.log(result);
                        var myresult = {};
                        myresult["status"] = "true";
                        myresult["number"] = 0;
                        myresult["item"] = {};
                        var picAllSet = new Set();
                        var picAllList = [];
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["item"][i] = result[i];
                            //console.log(result[i]);
                            var picListStr = result[i]["pics"];
                            //console.log(picListStr);
                            if (picListStr == null || picListStr.replace(/(^\s*)|(\s*$)/g,'').length == 0) continue;
                            for (var j in picListStr.split('\t')) {
                                picAllSet.add(parseInt(picListStr.split('\t')[j]));
                            }
                        }
                        picAllSet.forEach(function (item){
                            picAllList.push(item);
                        });
                        //console.log(picAllList);
                        //console.log(myresult);
                        tempCont.release();
                        Pic.selectByIDList(picAllList, function(err, result) {
                            //console.log(result);
                            myresult["pic"] = result["pic"];
                            myresult["status"] = "true";
                            //释放资源
                            callback(err, myresult);
                        });

                    }
                })
            }
        });
    },
    selectFor6: function (callback) {
        connection.getConnection(function (error, tempCont) {
            if (error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    connect();
                } else {
                    console.error(error.stack || error);
                }
                tempCont.release();
                tempCont.end();
                console.error('Connection Error');
                var result = {
                    "status": "false",
                    "error": "true"
                };
                callback(err, result);
            } else {
                console.log('Connected');
                var queryStatement = 'select users_tb.id as personId ,username,  items_tb.* from users_tb left join  items_tb on users_tb.id =  items_tb.author where users_tb.item != "" order by readNum DESC limit 10';
                var query = tempCont.query(queryStatement, function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        console.log(result);
                        var myresult = {};
                        myresult["status"] = "true";
                        myresult["number"] = 0;
                        myresult["item"] = {};
                        var picAllSet = new Set();
                        var picAllList = [];
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["item"][i] = result[i];
                            //console.log(result[i]);
                            var picListStr = result[i]["pics"];
                            //console.log(picListStr);
                            if (picListStr == null || picListStr.replace(/(^\s*)|(\s*$)/g,'').length == 0) continue;
                            for (var j in picListStr.split('\t')) {
                                picAllSet.add(parseInt(picListStr.split('\t')[j]));
                            }
                        }
                        picAllSet.forEach(function (item){
                            picAllList.push(item);
                        });
                        //console.log(picAllList);
                        //console.log(myresult);
                        tempCont.release();
                        Pic.selectByIDList(picAllList, function(err, result) {
                            //console.log(result);
                            myresult["pic"] = result["pic"];
                            myresult["status"] = "true";
                            //释放资源
                            callback(err, myresult);
                        });

                    }
                })
            }
        });
    }
};