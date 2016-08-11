function matchUrl(req,res,next) {
    const match = /^(\/new\/)/;
    if(match.test(req.url)) {
        req.url = `/new/${encodeURIComponent(req.url.slice(4))}`;
    }
  next();
}

module.exports = matchUrl;
