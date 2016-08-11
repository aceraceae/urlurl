'use strict';
const randomstring = require('randomstring');

module.exports = {
    records: [],
    postUrl(url, host, secure=false) {
        const newUrl = link(url, host, secure);
        this.records.push(newUrl);
        return {"longUrl": newUrl.longUrl, "shortUrl": newUrl.shortUrl};
    },
    getUrl(url) {
       for(let rec of this.records) {
           console.log(rec);
           if(rec.random === url) {
               console.log(rec);
               return rec.longUrl;
           }
       }
    }
};

function link(url, host, secure) {
    const longUrl = url;
    const random = randomstring.generate(7);
    const protocol = secure ? "https" : "http";
    const shortUrl = `${protocol}://${host}/${random}`;
    return { longUrl, shortUrl, random, host, protocol};
}
