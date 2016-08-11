'use strict';
const randomstring = require('randomstring');

module.exports = {
    postUrl(url, host, secure=false) {

        const longUrl = url;
        const random = randomstring.generate(7);
        const protocol = secure ? "https" : "http";
        const shortUrl = `${protocol}://${host}/${random}`;

        return { longUrl, shortUrl, random, host, protocol};
    }
};
