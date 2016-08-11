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


/*

// Create a collection we want to drop later

  // Insert a bunch of documents for the index
  collection.insertMany([{a:1}, {a:2}, {a:3}, {a:4}], {w:1}, function(err, result) {
    test.equal(null, err);

    // Create an index on the a field
    collection.createIndex('a', {w:1}, function(err, indexName) {
      test.equal("a_1", indexName);

      // Peform a query, with explain to show we hit the query
      collection.find({a:2}).explain(function(err, explanation) {
        test.equal(null, err);
        test.ok(explanation != null);

        db.close();
      });
    });
  });
});
*/

MongoClient.connect('mongodb://localhost:27017/urls', (err, db) => {
    if(err) {
        console.error(err);
    }
    const collection = db.collection('urls');

    app.get('/', (req,res) => {
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(`Welcome`);
    });

    app.get('/:short', (req, res) => {
        //get url from db;
        const queryUrl = req.params.short;
        if(true) {
            res.redirect(handleDb.getUrl(queryUrl));
        } else {
            res.end(`Link doesn't exist`);
        }
    });

    app.get('/new/:long', (req, res) => {
        const queryUrl = req.params.long.slice(1);
        //post new url to db;
        if(validUrl.isUri(queryUrl)) {
           /*
            collection.insertOne(handleDb.postUrl(queryUrl, req.headers.host, req.secure), (err, result) => {
                if(err) { console.error(err); }
                console.log(result);

                res.json(`Hello`);
            });
            */
        } else {
            res.end(`Invalid URL`);
        }
    });

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Node.js listening on port ' + port + '...');
});
