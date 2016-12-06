const React = require('react');
const ActionButton = require('./ActionButton');

const Header = React.createClass({
  render: function () {
    return (
      <div>
        <h1 id="logo">weatherly</h1>
        <input placeholder="Search"></input>
        <ActionButton text="Get Weather" />
      </div>
    )
  }
});

module.exports = Header;
