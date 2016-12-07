require('../CSS/reset.scss');
require('../CSS/styles.scss');
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
var Header = require('./components/Header');


$.get('http://weatherly-api.herokuapp.com/api/weather').then(function(data) {
  data.forEach( function(city) {
    console.log(city.location, city.date);
  });
});

class Body extends React.Component {
  render() {
    return (
      <section id="header">
        <Header />
      </section>
    )
  }
}

ReactDOM.render(<Body />, document.getElementById('application'));
