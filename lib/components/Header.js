const React = require('react');  
const ActionButton = require('./ActionButton');
const SearchInput = require('./searchInput');


const Header = React.createClass({
  render: function () {
    return (
      <div>
        <h1 id="logo">weatherly</h1>
        <SearchInput placeholder="Search" />
        <ActionButton text="Get Weather" />
      </div>
    )
  }
});

module.exports = Header;
