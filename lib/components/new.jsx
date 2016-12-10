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
            className="searchInput"
            type='text'
            placeholder='Search'
            onChange={ (e) => {
              this.handleChange(e);
            }} />
          <button
            onClick={ (e) => {
              this.handleClick(e);
            }}>
            Get Weather
          </button>
          <h2 tabIndex="0">{this.state.location}</h2>
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
        <div className="welcome">Welcome to Weatherly!</div>
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
          <li className="invalid" tabIndex="0">San Fransico</li>
        </ul>
      </section>
    );
  }
  return (
    <div className='Weather-Card'>
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

ReactDOM.render(<Main source='https://weatherly-api.herokuapp.com/api/weather/'/>, document.getElementById('application'));
