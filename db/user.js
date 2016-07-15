/**
 * Created by zhoutengteng on 16/6/26.
 */

var connection = require('../config/dbconfig.js');

module.exports = {
    selectByid: function (personId, callback) {
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
                var query = tempCont.query('select * from users_tb  where `id` =  ?', parseInt(personId), function (err, result, filed) {
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
                            myresult['username'] = result[0]['username'];
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
    selectByUsername: function (username, callback) {
        connection.getConnection(function (error, tempCont) {
            if (error) {
                tempCont.release();
                console.log('Connection Error');
            } else {
                console.log('Connected');
                //相当于转译了connection.escape(id)
                var query = tempCont.query('select * from users_tb  where username = ?', username, function (err, result, filed) {
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
                            myresult['username'] = result[0]['username'];
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
    selectAll: function () {
        connection.getConnection(function (error, tempCont) {
            if (error) {
                tempCont.release();
                console.log('Connection Error');
            } else {
                console.log('Connected');
                //相当于转译了connection.escape(id)
                var query = tempCont.query('select * from users_tb  where ', function (err, result, filed) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //console.error(result[0]);
                    console.log(query.sql);
                    //释放资源
                    tempCont.release();
                    //res.json(result);
                })
            }
        });
    },
    exist: function(account, password, callback) {
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
                var query = tempCont.query('select id, username from users_tb where `username` = ? and  `password` = ?', [account, password], function (err, result, filed) {
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
                            myresult['username'] = result[0]['username'];
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
    selectByAccount: function(account, callback) {
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
                var query = tempCont.query('select * from users_tb where `username` = ?' , account, function (err, result, filed) {
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
                            myresult['username'] = result[0]['username'];
                            myresult['password'] = result[0]['password'];
                            myresult['mail'] = result[0]['mail'];
                            myresult['tel'] = result[0]['tel'];
                            myresult['sex'] = result[0]['sex'];
                            myresult['item'] = result[0]['item'];
                        } else {
                            myresult['status'] = 'false';
                        }
                        //console.log(result);
                        tempCont.release();
                        callback(err, myresult);
                    }
                });
            }
        });
    },
    insert: function (username, sex, password, mail, tel, callback) {
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
                //添加默认图片一
                var query = tempCont.query('insert into  users_tb(`username`, `sex`, `password`, `mail`, `tel`) values(?,?,?,?,?)', [username, sex, password, mail, tel], function (err, result, filed) {
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
    updateItem: function(userId, item, callback) {
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
                var query = tempCont.query('update  `users_tb` set item =  ?  where `id` = ?' , [item, userId], function (err, result, filed) {
                    if (err) {
                        console.log("mysql==>" + err);
                        result = {};
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        myresult = {};
                        if (result.affectedRows > 0) {
                            myresult['status'] = "true";
                            //myresult['id'] = result[0]['id'];
                            //myresult['username'] = result[0]['username'];
                            //myresult['password'] = result[0]['password'];
                            //myresult['mail'] = result[0]['mail'];
                            //myresult['tel'] = result[0]['tel'];
                            //myresult['sex'] = result[0]['sex'];
                            //myresult['item'] = result[0]['item'];
                        } else {
                            myresult['status'] = 'false';
                        }
                        console.log(result);
                        tempCont.release();
                        callback(err, myresult);
                    }
                });
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
                var queryStatement = 'select * from users_tb  where';
                for (var i = 0; i <  idList.length; i++) {
                    if (i != idList.length - 1) {
                        queryStatement += ' id = ? or '
                    } else {
                        queryStatement += ' id = ?'
                    }
                }
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
                        myresult["user"] = {};
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["user"][i] = result[i];
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