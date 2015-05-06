var Router = require('react-router');
var rest = require("rest");
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var React = require('react');
var he = require('he');
var moment = require('moment');
var map = require("lodash/collection/map");
var env = require("../env");

fullPost = React.createClass({
  componentDidMount: function() {
    if ( typeof Prism !== 'undefined' ) {
      Prism.highlightAll();
    }
    fullPost.updateMetaAndTitle(this.props.data);
    fullPost.checkForTweets();
  },
  statics: {
    updateMetaAndTitle: function(data) {
      document.title = data.singlePost.title;
      var meta = document.querySelectorAll('meta[name=description]');
      meta[0].setAttribute("content", data.singlePost.desc);
    },
    checkForTweets: function() {
      var tweet = document.querySelectorAll('.twitter-tweet');

      if ( typeof twttr !== 'undefined' && typeof tweet !== 'undefined' ) {
        twttr.widgets.load();
      }
    },
    fetchData: function(postSlug) {
      var slug = encodeURIComponent(postSlug['slug']);

      var fetchPost = rest(env.API+'/wp-json/posts?filter[name]='+slug).then(function(response) {
        var post = JSON.parse(response.entity)[0];
        var excerpt = post.excerpt.replace(/<(?:.|\n)*?>/gm, '');
        var trimmedExcerpt = String.prototype.trim ? excerpt.trim() : excerpt;
        var postObj = {
          content: post.content,
          title: he.decode(post.title, true),
          date: post.date,
          desc: he.decode(trimmedExcerpt, true)
        };

        return postObj;
      });

      return fetchPost;
    }
  },  
  render: function() {
    var post = map(this.props.data, 'content')[0];
    var title = map(this.props.data, 'title')[0];
    var date = map(this.props.data, 'date')[0];
    var formattedDate = moment(date).format("MMM Do[,] YYYY");

    return (
    <article className="h-entry pl-max-width"> 
      <div className="sp_top">
        <h1 className="p-name tx-title sp_none">{title}</h1>
        <div className="post-date">
          <Link to='app'>Home</Link> | 
          <time className="dt-published" dateTime={date}>{formattedDate}</time>
        </div>
        <div className="e-content" dangerouslySetInnerHTML={{ __html: post }} />
      </div>
    </article>
    );
  }
});

module.exports = fullPost;
