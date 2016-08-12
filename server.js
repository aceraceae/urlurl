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
const mid = require('./middlewares.js');
const message = require('./messages.js');

// apply middlewares
app.use(express.static(path.resolve(__dirname)));
app.use(mid.favicon);
app.use(mid.matchUrl);


MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
    if(err) {
        console.error(err);
    }
    const col = db.collection('urls');

    app.get('/', (req,res) => {
        res.writeHead(200, {"Content-Type": "text/json"});
        const prepend = `${req.secure?"https":"http"}://${req.headers.host}/`;
        res.end(message.welcome(prepend));
    });

    app.get('/:short', (req, res) => {

        const queryUrl = req.params.short;

        col.createIndex('random', { w:1, background: true, sparse: true, unique: true }, (err, idx) => {

             if(err) { console.log(err); }
            //get url from db;
             col.find({"random":queryUrl}).toArray((err, docs) => {
                   if(err) {
                     console.log(err);
                 }

                 if(docs[0]) {
                     res.redirect(docs[0].longUrl);
                 } else {
                     res.json(message.error(0));
                 }


              });
        });

    });

    app.get('/new/:long', (req, res) => {
        const queryUrl = req.params.long.slice(1);
        if(validUrl.isUri(queryUrl)) {
                //post new url to db;
            col.insertOne(handleDb.postUrl(queryUrl, req.headers.host, req.secure), (err, result) => {

                if(err) { console.error(err); }

                const link = result.ops[0];
                res.json({"longUrl": link.longUrl, "shortUrl": link.shortUrl});
            });

        } else {
            res.json(message.error(1));
        }
    });

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Node.js listening on port ' + port + '...');
});
