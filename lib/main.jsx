const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
var Header = require('./components/Header');
var Body = require('./components/Body');


// $.get('http://weatherly-api.herokuapp.com/api/weather').then(function(data) {
//   data.forEach( function(city) {
//     console.log(city.location, city.date);
//   });
// });

class Weatherly extends React.Component {
  render() {
    return (
      <section id="header">
        <Header />
        <Body />
      </section>
    );
  }
}
