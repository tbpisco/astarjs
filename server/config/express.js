var express = require('express')
    ,app = express()
    ,path =  require('path')
    ,bodyParser = require('body-parser')
    ,cors = require('cors')
    ,compression = require('compression');

app.use(compression());
app.use(cors());
    
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: "../client" }); 
});
    
app.use(express.static('../client')); 

module.exports = app;