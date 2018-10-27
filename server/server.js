var http = require('http')
    ,app = require('./config/express');

http.createServer(app).listen((process.env.PORT || 8084), function() {
    console.log('Server running on port: ' + this.address().port);
});

