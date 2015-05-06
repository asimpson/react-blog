var React = require('react');
var rest = require("rest");
var isEmpty = require("lodash/lang/isEmpty");
var forEach = require('lodash/collection/forEach');
var moment = require('moment');
var env = require("../env");

Menu = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var self = this;
    var url = encodeURI(env.API+"/wp-json/posts?type=notes");

    var fetchNotes = rest(url).then(function(response) {
      var notes = JSON.parse(response.entity);
      self.setState({notes: notes});
    });
  },
  render: function () {
    var notes = {};

    if (!isEmpty(this.state.notes)) {
      forEach(this.state.notes, function(note, i) {
        var content = note['content'];
        var date = moment(note['date']).fromNow();
        var tweet = encodeURI("http://twitter.com/a_simpson/status/"+note['tweet_id']);

        //http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
        notes['notes-' + i] = (
          <li className="note">
            <div className="note-date">
              <a className="note-permalink" href={tweet}>
                {date}
              </a>
            </div>
            <div className="note-content" dangerouslySetInnerHTML={{ __html: content}} />
          </li>
        );
      });
    }

    return (
      <div className="menu">
        <ul className="note-container pl-max-width">
          {notes}
        </ul>
      </div>
    );
  }
});

module.exports = Menu;

