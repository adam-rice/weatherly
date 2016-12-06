const React = require('react');

const Header = React.createClass({
  render: function () {
    return (
      <div>
        <h1 id="logo">weatherly</h1>
        <input placeholder="Search"></input>
        <button>Get Weather</button>
      </div>
    )
  }
});

module.exports = Header;
