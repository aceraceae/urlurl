module.exports ={
    welcome(prepend) {
        return `Welcome, this is URL Shortener Microservice \n
To create new shortened url:\n
\t${prepend}new/https://www.freecodecamp.com/challenges/url-shortener-microservice\n
\t${prepend}new/https://github.com/aceraceae/urlurl\n
Example output:\n
\t{"longUrl":"https://github.com/aceraceae/urlurl","shortUrl":"${prepend}Yhhr8XS"}\n
So now you just need to copy shortened link, paste in to the address bar in your browser, hit enter - et voila!\n
It will redirect you to the original link.\n
Note:
\t You should give vaild url, that means - with protocol specified ("http://" or "https://").`;
    },

  error(type) {
      const messages = ["Link doesn't exist", "Invalid URL"];
      return {"error": messages[type]};
  }

}
