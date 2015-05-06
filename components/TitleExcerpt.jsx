var Router = require('react-router');
var rest = require("rest");
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var React = require('react');
var moment = require('moment');
var _ = require('lodash/collection/forEach');

TitleExcerpt = React.createClass({
  render: function() {
    var titleObj = {}

    _(this.props.data).forEach(function(post, n) {
      var title = post['title'];
      var date = moment(post['date']).fromNow();
      var slug = encodeURI("/writing/" + post['slug']);

      titleObj['post-' + n] = (
        <li className="post-title sp_lg post-list">
          <Link to={slug} 
          dangerouslySetInnerHTML={{ __html: title }} className="tx-title block sp_none tx-no-underline"/>
          <div className="post-date">posted {date}</div>
        </li>
      );
    });

    return (
    <ul className="pl-max-width title-wrapper sp_top">
      {titleObj}
    </ul>
    );
  }
});

module.exports = TitleExcerpt;
