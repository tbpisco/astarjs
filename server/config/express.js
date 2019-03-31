var express = require('express')
    ,app = express()
    ,path =  require('path')
    ,bodyParser = require('body-parser')
    ,cors = require('cors')
    ,compression = require('compression');

app.use(compression());
app.use(cors());
    
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: "../client/examples" }); 
});
    
app.use(express.static('../client/examples')); 

module.exports = app;