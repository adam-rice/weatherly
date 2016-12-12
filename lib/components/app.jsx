import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

class Main extends React.Component {
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

const WeatherCards = (props) => {
  let { weather } = (props);
  if(!weather) {
    return (
      <section>
        <div className="welcome">welcome to Weatherly!</div>
        <div className="welcome">Let us help you plan your day.</div>
      </section>
    );
  }
  if (weather.length === 0) {
    return (
      <section>
        <h3 className="invalid" tabIndex="0">Valid Locations:</h3>
        <ul>
          <li className="invalid" tabIndex="0">Denver</li>
          <li className="invalid" tabIndex="0">Castle Rock</li>
          <li className="invalid" tabIndex="0">San Diego</li>
          <li className="invalid" tabIndex="0">San Francisco</li>
        </ul>
      </section>
    );
  }
  return (
    <div className='weather-card'>
      {weather.map((card) =>
        <div key={card.date}>
        <Weather {...card} />
      </div>)}
    </div>
  )
};

const Weather = (props) => {
  let { location, date, weatherType, temp } = props
  let chance = Math.floor(weatherType.chance*100);
  return(
    <div>
      <article className={measureWeather(temp)}>
        <h5 className="date" tabIndex="0">{date}</h5>
        <h5 className="high" tabIndex="0">The high will be {temp.high}&#176;</h5>
        <h5 tabIndex="0">The low will be {temp.low}&#176;</h5>
        <p className={transformWeatherType(weatherType.type)} alt="weather type image"></p>
        <h5 tabIndex="0">Likelihood of {transformWeatherType(weatherType.type)} is {chance}%</h5>
        <footer><p className={transformScale(weatherType.scale)} tabIndex='0'>Chance of Severe Weather</p></footer>
      </article>
    </div>
  )
};

function measureWeather(temp) {
  let average = (temp.high+temp.low)/2
  if (average > 75) {
    return 'hot';
  }
  if (average <= 75 && average >= 51) {
    return 'warm';
  }
  if (average <= 50 && average >= 26) {
    return 'cool';
  }
  if (average <= 25) {
    return 'cold';
  }
}

function transformWeatherType(type) {
  if (type === 'thunder storms') {
    return 'thunderstorms'
  } else if (type === 'cloudy') {
    return 'clouds'
  }  else if (type === 'sunny') {
    return 'clear'
  } else if (type === 'windy') {
    return 'wind'
  } else if (type === 'foggy') {
    return 'fog'
  } else { return type }
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

function transformScale(number) {
  if (number === 3) {
    return 'severe'
  } else {return 'not-severe'}
}

ReactDOM.render(<Main source='https://weatherly-api.herokuapp.com/api/weather/'/>, document.getElementById('application'));
