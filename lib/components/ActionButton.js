const React = require('react');

class ActionButton extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
    };
  }

  displayWeather() {
    return searchInput.value();
  }

  render() {
    return (
      <div id="searchBtn">
        <button
          className="ActionButton"
          onClick={ () => {
            console.log("Whoa");
            this.displayWeather()
          }}>
          <span>{this.props.text}</span>
        </button>
      </div>
    );
  }
}

module.exports = ActionButton;
