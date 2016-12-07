const React = require('react');

class SearchInput extends React.Component {
  render() {
    return (
      <div id="searchInput">
        <input className="searchInput" placeholder={this.props.placeholder}>
        </input>
      </div>
    );
  }
}

module.exports = SearchInput;
