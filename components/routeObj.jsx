var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var titleList = require('./titleList.jsx');
var fullPost = require('./fullPost.jsx');
var App = require('./App.jsx');

routeObj = (
  <Route name="app" path="/" handler={App}>
    <Route name="singlePost" path="/writing/:slug" handler={fullPost}/>
    <Route name="archivePage" path="/page/:number" handler={titleList}/>
    <DefaultRoute name="mainPage" handler={titleList}/>
  </Route>
);

module.exports = routeObj;
