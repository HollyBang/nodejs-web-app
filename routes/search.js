const url = require('url');


const omdb = require('../lib/omdb');
const render = require('../lib/render');


function search(req, res) {
  const parseUrl = url.parse(req.url, true); // if true then we get object, without -> String
  const title = parseUrl.query.title;


  omdb.get(title, (error, movie) => {
    if (error) {
      return render('error.html', {error: error.message}, (error, html) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      });
    };
    render('movie.html', movie.results[0], (error, html) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end(error.message);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
    });
  });

}

module.exports = search;