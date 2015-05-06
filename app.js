var app, express, logger, JSX, routes, compression;
logger = require("morgan");
express = require('express');
compression = require('compression');
app = express();
JSX = require('node-jsx').install();
routes = require('./components/routes.jsx');

app.use(compression());

app.use('/public', express.static(__dirname + '/public'));

var options = {
  root: __dirname
};

function faviconServer (req) {
  var ext = req.url.split('.')[1];
  if (ext === 'png') {
    return req.url.split('/')[1];
  }
}

app.get('/robots.txt', function (req, res) {
  res.sendFile("robots.txt", options);
});

app.get('/favicon-*.png', function (req, res) {
  res.sendFile(faviconServer(req), options);
});

app.get('/apple-touch-*', function (req, res) {
  res.sendFile(faviconServer(req), options);
});

app.get('/android-*', function (req, res) {
  res.sendFile(faviconServer(req), options);
});

app.get('/mstile-*', function (req, res) {
  res.sendFile(faviconServer(req), options);
});

app.get('/manifest.json', function (req, res) {
  res.sendFile("manifest.json", options);
});

app.get('/browserconfig.xml', function (req, res) {
  res.sendFile("browserconfig.xml", options);
});

app.get('/rss.xml', function (req, res) {
  res.sendFile("rss.xml", options);
});

app.get('/feed.xml', function (req, res) {
  res.redirect(301, '/rss.xml');
});

app.get('/sitemap.xml', function (req, res) {
  res.sendFile("sitemap.xml", options);
});

app.use(logger("dev"));

app.use(routes());

module.exports = app;
