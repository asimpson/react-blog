var when = require("when");
var cons = require('consolidate');
var express = require('express');
var app = express();
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var resolveHash = require('when/keys').all;
var routeObj = require('./routeObj.jsx');

routes = function() {
  return function(req, res) {
    Router.run(routeObj, req.path, function (Handler, state) {
      
      var promises = state.routes.filter(function (route) {
        return route.handler.fetchData;
      }).reduce(function (promises, route) {
        //promises is empty, route is iterator
        // reduce to a hash of `key:promise`
        promises[route.name] = route.handler.fetchData(state.params);
        return promises;
      }, {});

      resolveHash(promises).then(function (data) {
        if (data.writing) {
          var title = data.writing.post.title ? 'adamsimpson.net' : data.writing.title;
          var desc = data.writing.post.desc ? 'The design and development log of Adam Simpson.' : data.writing.desc;
        } else {
          var title = 'adamsimpson.net';
          var desc = 'The design and development log of Adam Simpson.';
        }
        var JSONPayload = JSON.stringify(data);
        var markup = React.renderToString(<Handler data={data}/>);

        cons.handlebars('server/app.hbs', { content: markup, payload: JSONPayload, pageTitle: title, metaDesc: desc }, function(err, html){
          if (err) throw err;
          res.send(html);
        });
      });
    });
  };
};

module.exports = routes;
