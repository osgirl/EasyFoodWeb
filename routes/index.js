
/*
 * GET home page.
 */
var mysql = require('../db_utils/mysql-pooling');



exports.index = function(req, res){
    var SELECTSQL="select * from test"
  var rows = mysql.pool(SELECTSQL, function (err, doc) {
    res.json({data: doc});
  });

  //  res.render('indexs', { title: 'Express' });
};