/**
 * Module dependencies.
 */

var express = require('express');

var ejs = require('ejs');
var http = require('http');
var path = require('path');
var routes = require('./routes');

var app = express()

dbPool = require('./core/db');
db = undefined;

dbPool.getConn(function (dbConn) {
    db = dbConn;
    console.log("db conn success");

// all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.engine("html", ejs.__express);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

//添加路由
    routes(app);

    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });

});

