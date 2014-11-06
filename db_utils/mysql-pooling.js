/**
 * Created with JetBrains WebStorm.
 * User: chenyingxi
 * Date: 14-11-3
 * Time: 下午5:19
 * To change this template use File | Settings | File Templates.
 */

var mysql = require('mysql');


var pool = mysql.createPool({
  host: 'rdsaaibfyaaibfy.mysql.rds.aliyuncs.com',
  user: 'redmine',
  password: 'redmine1234',
  database: 'rl6u490qba4r8717',
  port: 3306
});


exports.select = function (selectSQL, callback) {
  pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);
    conn.query(selectSQL,function(err,rows){
      if (err) console.log(err);
      console.log("SELECT ==> ");
        callback(err, rows);
      conn.release();
    });
  });
}
