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
                var query = tempCont.query('select * from files_tb where `id` = ? ', id,  function (err, result, filed) {
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
                var query = tempCont.query('insert into  files_tb(`type`, `content`) values(?,?)', [type, content], function (err, result, filed) {
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
    }
};