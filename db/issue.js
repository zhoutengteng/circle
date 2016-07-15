/**
 * Created by zhoutengteng on 16/7/12.
 */
var connection = require('../config/dbconfig.js');

module.exports = {
    insert: function (itemId, personId, comment, issueId, buildTime, callback) {
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
                //相当于转译了connection.escape(id)
                //为项目添加一张默认的图片
                var query = tempCont.query('insert into  issues_tb(`itemId`,  `content`, `peopleId`, `issueId`, `buildTime`) values(?,?,?,?,?)', [itemId, comment, personId, issueId, buildTime], function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        console.log(result);
                        myresult["status"] = "true";
                        myresult['id'] = result.insertId;
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    },
    selectByItemId: function (itemId, callback) {
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
                //相当于转译了connection.escape(id)
                //为项目添加一张默认的图片
                var query = tempCont.query('select  * from  issues_tb where id = ? ', itemId,  function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        console.log(result);
                        myresult = {};
                        myresult["status"] = "true";
                        myresult["number"] = 0;
                        myresult["issues"] = {};
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["issues"][i] = result[i];
                        }
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    },
    selectByIDList: function (idList, callback) {
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
                var queryStatement = 'select * from issues_tb  where';
                for (var i = 0; i <  idList.length; i++) {
                    if (i != idList.length - 1) {
                        queryStatement += ' id = ? or '
                    } else {
                        queryStatement += ' id = ?'
                    }
                }
                queryStatement += " order by buildTime";
                console.log(queryStatement);
                var query = tempCont.query(queryStatement, idList, function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        console.log(result);
                        myresult = {};
                        myresult["status"] = "true";
                        myresult["number"] = 0;
                        myresult["issue"] = {};
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["issue"][i] = result[i];
                        }
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    }

};