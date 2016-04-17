var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    path = require('path'),
    fs = require('fs'),
    app = express();

// tell your app to use the modules
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/app/views/app.html'));
});

app.listen(3000, "0.0.0.0");