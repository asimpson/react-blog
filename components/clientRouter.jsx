var when = require("when");
var resolveHash = require('when/keys').all;
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var resolveHash = require('when/keys').all;
var routeObj = require('./routeObj.jsx');
var App = require('./App.jsx');

router = function() {
  return Router.run(routeObj, Router.HistoryLocation, function (Handler, state) {
    var container = document.getElementById('app');

    if (firstRun) {
      firstRun = false;
      var data = JSON.parse(document.getElementById("payload").innerHTML);
      React.render(<Handler data={data}/>, container);
    } else {
      var promises = state.routes.filter(function (route) {
        return route.handler.fetchData;
      }).reduce(function (promises, route) {
        //promises is empty, route is iterator
        // reduce to a hash of `key:promise`
        promises[route.name] = route.handler.fetchData(state.params);
        return promises;
      }, {});

      resolveHash(promises).then(function (data) {
        React.render(<Handler data={data}/>, container);
      });
    }
  });
};

firstRun = true;
router();

module.exports = router;
