/**
 * Created by zhoutengteng on 16/6/26.
 */

var connection = require('../config/dbconfig.js');

module.exports = {
    select: function(id, callback) {
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
                    "status": "false"
                };
                callback(err, result);
            } else {
                console.log('Connected');
                //相当于转译了connection.escape(id)
                var query = tempCont.query('select * from pics_tb where `id` = ? ', id,  function (err, result, filed) {
                    if (err) {
                        console.log("mysql==>" + err);
                        result = {};
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        myresult = {};
                        if (result.length > 0) {
                            myresult['status'] = "true";
                            myresult['id'] = result[0]['id'];
                            myresult['type'] = result[0]['type'];
                            myresult['content'] = result[0]['content'];
                        } else {
                            myresult['status'] = 'false';
                        }
                        console.log(result);
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
                var queryStatement = 'select * from pics_tb where';
                for (var i = 0; i <  idList.length; i++) {
                    if (i != idList.length - 1) {
                        queryStatement += ' id = ? or '
                    } else {
                        queryStatement += ' id = ?'
                    }
                }
                var query = tempCont.query(queryStatement, idList, function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        //console.log(result);
                        myresult = {};
                        myresult["status"] = "true";
                        myresult["number"] = 0;
                        myresult["pic"] = {};
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["pic"][result[i]["id"]] = result[i];
                        }
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    },
    insert: function (type, content, callback) {
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
                var query = tempCont.query('insert into  pics_tb(`type`, `content`) values(?,?)', [type, content], function (err, result, filed) {
                    if (err) {
                        console.log("mysql==>" + err);
                        result = {};
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        //console.log(result);
                        result["status"] = "true";
                        //释放资源
                        tempCont.release();
                        callback(err, result);
                    }
                })
            }
        });
    },
    insertByJson: function (picJson, callback) {
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
                var myresult = {
                    "number": 0,
                    "ids": new Array()
                };
                var i = 1;
                diguiForInsert(tempCont, i, myresult, picJson, callback)

            }
        });
    }
};


function diguiForInsert(tempCont, i, myresult, picJson, callback) {
    var name = "circle";
    var type = "png";
    var content = "dddd";
    var count = 0;
    console.log("待插入的图片");
    //console.log(picJson);
    for (var onePicName in picJson) {
        console.log("==>" + onePicName);
        if (count == i) {
            name = onePicName;
            content = picJson[onePicName];
            type = content.split(";base64,")[0].split("/")[1];
            count += 1;
            console.log("匹配  " + name + "  " + "  " + type);
        } else {
            count += 1;
        }
    }
    console.log(i +  "  " + count);
    var query = tempCont.query('insert into  pics_tb(`name`, `type`, `content`) values(?,?,?)', [name, type, content], function (err, result, filed) {
        if (err) {
            console.log("mysql==>" + err);
            result = {};
            result["status"] = "false";
            callback(err, result);
        } else {
            //console.log(query.sql);
            //console.log(result);
            //释放资源
            if (i >= picJson['number']) {
                myresult['number'] += 1;
                myresult['ids'].push(result.insertId);
                myresult['status'] = 'true';
                tempCont.release();
                callback(err, myresult);
            } else {
                myresult['number'] += 1;
                myresult['ids'].push(result.insertId);
                diguiForInsert(tempCont, i+1, myresult, picJson, callback)

            }
        }
    })
}