'use strict';
var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var handleDb = require('./db-handler.js');
var checkUrl = require('./check-url.js');

app.use(express.static(path.resolve(__dirname)));

MongoClient.connect('mongodb://localhost:27017/urls', (err, db) => {
app.get('/', (req,res) => {
    res.writeHead(200, {"Content-Type": "text/json"});

    res.end(`Hello world`);
});

app.get('/:url', (req, res) => {
    //get url from db;
    const url = req.params.url;
    //handleDb.getUrl(url);
    console.log(url);
    res.end(`Get link`);
});


app.get('/new/:url', (req, res) => {
    //post new url to db;
    const url = req.params.url;
    var recs = handleDb.postUrl(url);
    console.log(url);
    res.end(`Create new`);
});

});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
