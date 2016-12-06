require('../CSS/reset.scss');
require('../CSS/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
var Header = require('./Header');
var Search = require('./Search');


$.get('http://weatherly-api.herokuapp.com/api/weather').then(function(data) {
  console.log(data);
  // data.forEach(function(idea) {
  //   $('#all-ideas').append('<li>'+idea.name+'|||'+idea.body+'</li>');
  // });
});

const Body = React.createClass({
  render: function () {
    return (
      <div>
      <section id="logo">
        <Header />
      </section>
        <Search />
      </div>
    );
  }
});

ReactDOM.render(<Body />, document.getElementById('application'));
