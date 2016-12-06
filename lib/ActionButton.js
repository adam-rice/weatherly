const React = require('react');

class ActionButton extends React.Component {
  render() {
    return (
      <div id="searchBtn">
      <button className="ActionButton">
        <span>{this.props.text}</span>
      </button>
      </div>
    );
  }
}

module.exports = ActionButton;
