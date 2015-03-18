var express = require('express');
var cluster = require('express-cluster');
var compression = require('compression');


cluster(function(worker) {



    var app = express();
    var path = require('path');

    var oneDay = 86400000;

    app.use(require('express-bunyan-logger')({
        name: 'logger',
        streams: [{
            level: 'info',
            stream: process.stdout
        }, {
            level: 'info',
            path: path.resolve(process.cwd(), 'logs/log'),
            type: 'file'
        }]
    }));

    app.use(compression({
        threshold: 0
    }));
    app.use(express.static(path.join(__dirname, 'dist'), {
        maxAge: oneDay
    }));

    app.use(function(req, res, next) {
        //    res.header('Access-Control-Allow-Origin', 'http://stats.wonderflow.co');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        if ('OPTIONS' == req.method && req.host.indexOf('wonderflow') >= 0) {
            return res.send(200);
        }
        return next();
    });



    var HTTP_PORT;

    HTTP_PORT = process.env.PORT || 80;

    app.listen(HTTP_PORT, function() {
        console.log('Listening on port ' + HTTP_PORT);
    });



}, {});