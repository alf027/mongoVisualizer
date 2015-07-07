var routes = require('i40')();
var fs = require('fs');
var view = require('./view');
var mime = require('mime');
var qs = require('qs');


routes.addRoute('/', function (req, res, url) {
  res.setHeader('Content-Type', 'text/html');
  if (req.method === 'GET') {
    var template = view.render('home');
    res.end(template);
  }
});

routes.addRoute('*', function (req, res, url) {
  res.setHeader('Content-Type', mime.lookup(req.url));
  fs.readFile('.' + req.url, function (err, data) {
    if (err) throw err;
    res.end(data);
  })
});

module.exports = routes;