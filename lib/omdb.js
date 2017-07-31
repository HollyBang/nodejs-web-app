const http = require('http');

function get(title, done) {
//Tim Burton's Corpse Bride
  const req = http.get(`http://api.themoviedb.org/3/search/movie?api_key=36c05c818c21e9750fea38007ac278c0&query=${title}&language=ru`, res => {
    if (res.statusCode !== 200) {
      done(new Error(`Error: ${res.statusMessage} (${res.statuCode})`));
      res.resume();
      return;
    }
    res.setEncoding('utf-8');
    let body = '';
    res.on('data', (data) =>{ body += data;});

    res.on('end', () => {
      let result;

     try {
        result = JSON.parse(body);
      } catch (error) {
        done(error);
      }
      if (result.results.length === 0) return done(new Error('Film not found'));

      done(null, result);
    });
  });

  req.on('error', error => done(error));
}

module.exports = {
  get
};