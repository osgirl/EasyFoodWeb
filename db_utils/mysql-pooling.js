/**
 * Created with JetBrains WebStorm.
 * User: chenyingxi
 * Date: 14-11-3
 * Time: 下午5:19
 * To change this template use File | Settings | File Templates.
 */

var mysql = require('mysql');


var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'cm',
  port: 3306
});


exports.pool = function (selectSQL ) {
  pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);
    conn.query(selectSQL,function(err,rows){
      if (err) console.log(err);
      console.log("SELECT ==> ");
      for (var i in rows) {
        console.log(rows[i]);
      }
      conn.release();

    });
  });
}

//module.exports.pool = pool;