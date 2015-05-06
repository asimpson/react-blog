var Router = require('react-router');
var rest = require("rest");
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var React = require('react');

PostPagination = React.createClass({

  render: function() {
    var total = parseInt(this.props.data.total, 10);
    var currentNumber = parseInt(this.props.data.current, 10);
    var nextNumber = currentNumber+1;
    var prevNumber = currentNumber-1;
    var nextSlug = encodeURI( "/page/" +  nextNumber );
    var prevSlug = encodeURI( "/page/" + prevNumber );
    var pagesLeft = currentNumber+"/"+total;

    if (currentNumber < total) {
      if (currentNumber === 1) {
        var nextLink = <Link to={nextSlug} className="tx-no-underline full-width pd_all">{'Next \u3009'}</Link>;
      } else {
        var nextLink = <Link to={nextSlug} className="tx-no-underline pd_all">{'Next \u3009'}</Link>;
      }
    } else {
      var nextLink = null;
    }

    if (currentNumber === 1) {
      var prevLink = null;
    } else {
      if (currentNumber === total) {
        var prevLink = <Link to={prevSlug} className="tx-no-underline full-width pd_all">{'\u3008 Prev'}</Link>;
      }else {
        var prevLink = <Link to={prevSlug} className="tx-no-underline pd_all">{'\u3008 Prev'}</Link>;
      }
    }

    return (
    <div className="pagination-wrapper tx-center"> 
      {prevLink}
      <span>{pagesLeft}</span>
      {nextLink}
    </div>
    );
  }
});

module.exports = PostPagination;
