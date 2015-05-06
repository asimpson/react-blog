var Router = require('react-router');
var rest = require("rest");
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var React = require('react');
var PostPagination = require('./PostPagination.jsx');
var TitleExcerpt = require('./TitleExcerpt.jsx');
var map = require("lodash/collection/map");
var isEmpty = require("lodash/lang/isEmpty");
var env = require("../env");

titleList = React.createClass({
  componentDidMount: function() {
    document.title = "adamsimpson.net";
    var meta = document.querySelectorAll('meta[name=description]');
    meta[0].setAttribute("content", "The design and development log of Adam Simpson.");
  },
  statics: {
    willTransitionTo: function (transition, params) {
      if (params.number === '1' && typeof window != 'undefined') {
        transition.redirect('/');
      }
    },
    fetchData: function(pageNumber) {
      var isArchive = isEmpty(pageNumber) ? false : true;
      var url = encodeURI(isArchive ? env.API+"/wp-json/posts?page="+pageNumber.number : env.API+'/wp-json/posts');

      var fetchPosts = rest(url).then(function(response) {
        var postInfo = {
          posts: JSON.parse(response.entity),
          total: response.headers['X-Wp-Totalpages'],
          current: isArchive ? pageNumber.number : "1"
        };
        return postInfo;
      });
      return fetchPosts;
    }
  },  
  render: function() {
    var posts = map(this.props.data, 'posts')[0];
    var current = map(this.props.data, 'current')[0];
    var total = map(this.props.data, 'total')[0];
    var pageInfo = {
      current: current,
      total: total
    };

    return (
    <div>
      <TitleExcerpt data={posts} />
      <PostPagination data={pageInfo} />
    </div>
    );
  }
});

module.exports = titleList;
