var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var React = require('react');
var Header = require('./Header.jsx');
var Menu = require('./Menu.jsx');

App = React.createClass({
  componentDidMount: function() {
    if (typeof(window._gauges) === 'undefined') {
      var _gauges = _gauges || [];
      (function() {
        var t   = document.createElement('script');
        t.type  = 'text/javascript';
        t.async = true;
        t.id    = 'gauges-tracker';
        t.setAttribute('data-site-id', '5542e2715dd05315e3003039');
        t.setAttribute('data-track-path', 'http://track.gaug.es/track.gif');
        t.src = 'https://track.gaug.es/track.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
      })();
      _gauges.push(['track']);
    }else {
      _gauges.push(['track']);
    }
  },
  componentWillUpdate: function() {
    var logo = document.querySelector('.logo');
    logo.classList.add("animating");
  },
  componentDidUpdate: function() {
    _gauges.push(['track']);

    window.setTimeout(function(){
      var logo = document.querySelector('.logo');
      logo.classList.remove("animating");
    }, 300);
  },
  toggleMenu: function() {
    var app = document.querySelector('.app');
    app.classList.toggle("menu-open");
    document.body.classList.toggle("no-scroll");
  },
  render: function () {
    return (
      <div className="app">
        <Header onLogoClick={this.toggleMenu}/>
        <Menu />
        <RouteHandler data={this.props.data}/>
      </div>
    );
  }
});

module.exports = App;
