module.exports = {
    records: [],
    postUrl(url) {
        this.records.push(url);
        return this.records;
    },
    getUrl(url) {
        return `Hejaho${url}hejaho`;
    }
}
