'use strict';
const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const validUrl = require('valid-url');

// db cilent
const MongoClient = require('mongodb').MongoClient;

// custom modules
const handleDb = require('./db-handler.js');
const matchUrl = require('./middlewares.js');

// apply middlewares
app.use(express.static(path.resolve(__dirname)));
app.use(matchUrl);


MongoClient.connect('mongodb://localhost:27017/urls', (err, db) => {
    if(err) {
        console.error(err);
    }
    const col = db.collection('urls');

    app.get('/', (req,res) => {
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(`Welcome`);
    });

    app.get('/:short', (req, res) => {
        //get url from db;
        const queryUrl = req.params.short;
        const opts = { w:1, background: true, sparse: true, unique: true };
        col.createIndex('random', opts, (err, idx) => {

             if(err) { console.log(err); }

             col.find({"random":queryUrl}).toArray((err, docs) => {
                   if(err) {
                     console.log(err);
                     res.end(`Link doesn't exist`);
                 }
                 console.log(docs);
                 res.redirect(docs[0].longUrl);
              });
        });

    });

    app.get('/new/:long', (req, res) => {
        const queryUrl = req.params.long.slice(1);
        //post new url to db;
        if(validUrl.isUri(queryUrl)) {
            col.insertOne(handleDb.postUrl(queryUrl, req.headers.host, req.secure), (err, result) => {
                if(err) { console.error(err); }
                const link = result.ops[0];
                res.json({"longUrl": link.longUrl, "shortUrl": link.shortUrl});
            });

        } else {
            res.end(`Invalid URL`);
        }
    });

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Node.js listening on port ' + port + '...');
});
