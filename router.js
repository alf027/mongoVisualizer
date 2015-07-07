var routes = require('i40')();
var fs = require('fs');
var view = require('./view');
var mime = require('mime');
var qs = require('qs');
var urlParse = require('url');


routes.addRoute('/', function (req, res, url) {
  res.setHeader('Content-Type', 'text/html');
  if (req.method === 'GET') {
    var template = view.render('home');
    res.end(template);
  }
});

routes.addRoute('/index', function(req, res, url) {
  res.setHeader('Content-Type', 'text/html');
  if (req.method === 'GET') {
    var query = qs.parse(urlParse.parse(req.url)).query;
    var dbName = query.match(/dbName=([^&]*)/)[1];
    var collectionName = query.match(/collectionName=([^&]*)/)[1];
    var db = require('monk')('localhost/' + dbName);
    var collection = db.get(collectionName);
    collection.find({}, function(err, data) {
      if (err) throw err;
      var obj = {};
      var arrObj = [];
      data.forEach(function(el) {
        var keyNames = Object.keys(el);
        for (var i in keyNames) {
          obj.prop = keyNames[i];
          obj.val = el[keyNames[i]];
          arrObj.push(obj);
        }
      });
      console.log(arrObj);
      //var template = view.render('index', data);

    });
    res.end();
  }
});

routes.addRoute('/public/*', function (req, res, url) {
  res.setHeader('Content-Type', mime.lookup(req.url));
  fs.readFile('.' + req.url, function (err, data) {
    if (err) throw err;
    res.end(data);
  })
});

module.exports = routes;