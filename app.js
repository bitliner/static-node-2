var express = require('express');
var cluster = require('express-cluster');
var compression=require('compression');


cluster(function(worker) {



    var app = express();
    var path = require('path');

    var oneDay = 86400000;

    app.use(require('express-bunyan-logger')({
        name: 'logger',
        streams: [{
            level: 'info',
            stream  : process.stdout
        }, {
            level: 'info',
            path: path.resolve(process.cwd(), 'logs/log'),
            type: 'file'
        }]
    }));
    
    app.use(compression({ threshold: 0 })); 
    app.use(express.static(path.join(__dirname, 'dist'),{maxAge:oneDay}));
    


    var HTTP_PORT;

    HTTP_PORT = process.env.PORT || 80;

    app.listen(HTTP_PORT, function() {
        console.log('Listening on port ' + HTTP_PORT);
    });



}, {});


