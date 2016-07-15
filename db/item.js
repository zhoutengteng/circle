/**
 * Created by zhoutengteng on 16/6/26.
 */

var connection = require('../config/dbconfig.js');

module.exports = {
    insert: function (theme, content, author, buildTime, picList, fileList, callback) {
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
                if (!picList) {
                    picList = "1";
                }
                var query = tempCont.query('insert into  items_tb(`theme`,  `content`, `author`, `buildTime`, `pics`, `files`) values(?,?,?,?,?,?)', [theme, content, author, buildTime, picList, fileList], function (err, result, filed) {
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
    update: function (theme, content, good, bad, goodfrom, badfrom, pics, files, itemId, callback) {
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
                var query = tempCont.query('update  items_tb set `theme` = ?,  `content` = ?, `good` = ?, `bad` = ?, `goodfrom` = ?, `badfrom` = ?, `pics` = ?, `files` = ? where id = ?'  , [theme, content, good, bad, goodfrom, badfrom, pics, files, itemId], function (err, result, filed) {
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
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    },
    updateBylittle: function (theme, content, buildTime, pics, files, itemId, callback) {
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
                var query = tempCont.query('update  items_tb set `theme` = ?,  `content` = ?, `buildTime` = ?,  `pics` = ?, `files` = ?  where id = ?'  , [theme, content, buildTime, pics, files, itemId], function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        //console.log(result);
                        myresult["status"] = "true";
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    },
    updateReadByid: function (itemId, callback) {
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
                var query = tempCont.query('update  items_tb set `readNum` = `readNum` + 1  where id = ?'  , itemId, function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        //console.log(query.sql);
                        //console.log(result);
                        myresult["status"] = "true";
                        //释放资源
                        tempCont.release();
                        callback(err, myresult);
                    }
                })
            }
        });
    },
    updateCommentByid: function (itemId, commentIdList, callback) {
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
                var query = tempCont.query('update  items_tb set `issues` = ?  where id = ?'  , [commentIdList, itemId], function (err, result, filed) {
                    myresult = {};
                    if (err) {
                        result = {};
                        console.log(err);
                        result["status"] = "false";
                        callback(err, result);
                    } else {
                        console.log(query.sql);
                        console.log(result);
                        myresult["status"] = "true";
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
                var queryStatement = 'select * from items_tb  where';
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
                        myresult["item"] = {};
                        for (var i = 0; i < result.length; i++) {
                            myresult["number"] += 1;
                            myresult["item"][i] = result[i];
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