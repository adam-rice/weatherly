import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');
import WeatherCards from './WeatherCards';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weather: null,
    };
  }

  handleChange(e) {
    const searchValue = e.target.value;
    this.setState({ location: searchValue });
  }

  persistLastLocation() {
    localStorage.setItem('location', this.state.location);
  }

  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' }, () => this.handleClick());
  }

  handleClick() {
    let rawInput = this.state.location;
    let userInput = rawInput.replace(/\s+/g, '-').toLowerCase();
    if (userInput) {
      $.get(this.props.source + fixCity(userInput)).then(weatherInfo => {
          this.setState({weather: weatherInfo.slice(0, 7)});
        });
      }
    this.persistLastLocation();
    this.clearSearchField();
  }

  clearSearchField() {
    document.querySelector('.search-input').value = '';
  }

  render() {
    return(
      <div className='WeatherReport'>
        <h1 id="logo"
          tabIndex="0"
          aria-label="Welcome to Weatherly! Let us help you plan your day.">
          weatherly</h1>
        <section>
          <input
            aria-label="search-field, enter a city"
            className="search-input"
            type='text'
            placeholder='enter a location'
            onChange={ (e) => {
              this.handleChange(e);
            }} />
          <button
            onClick={ (e) => {
              this.handleClick(e);
            }}>
            Get Weather
          </button>
          <h2 tabIndex="0">{locationHeaderCheck(this.state.location)}</h2>
          <WeatherCards weather={this.state.weather} />
        </section>
      </div>
    )
  }
}

function fixCity(city) {
  if (city === 'san-francisco') {
    return 'san-fransico'
  } else {return city}
}

function locationHeaderCheck(location) {
  if (location === '') {
    return 'Hello,'
  } else {
    document.querySelector('h2').style.textDecoration = "underline";
    return location
  }
}
