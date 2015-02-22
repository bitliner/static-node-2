var express = require('express');
var app = express();
var path = require('path');

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
app.use(express.static(path.join(__dirname, 'dist')));


var HTTP_PORT;

HTTP_PORT = process.env.PORT || 9001;

app.listen(HTTP_PORT, function() {
    console.log('Listening on port ' + HTTP_PORT);
});