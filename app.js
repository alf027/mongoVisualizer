'use strict';

var http = require('http');
var url = require('url');
var router = require('./router');

http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'image/x-icon'
    });
    res.end();
  }
  var path = url.parse(req.url).pathname;
  var currentRoute = router.match(path);
  if (currentRoute) {
    currentRoute.fn(req, res, currentRoute);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end();
  }
}).listen(3400, function (err) {
  if (err) throw err;
  console.log('Server is running on port 3400');
});

