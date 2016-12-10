import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

// i.replace(/\-/g,' ')...

class Main extends React.Component {
  constructor() {
      super();
      this.state = {
        location: '',
        weather: null,
      };
  }

  updateLocation(e) {
    const searchValue = e.target.value;
    this.setState({ location: searchValue });
  }

  persistLastLocation() {
    localStorage.setItem('location', this.state.location);
  }

  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' }, () => this.findWeather());
  }

  findWeather(e) {
    if (this.state.location) {
      $.get(this.props.source + this.state.location).then(weatherInfo => {
          this.setState({weather: weatherInfo.slice(0, 7)});
        });
      }
    this.persistLastLocation();
  }

  render() {
    return(
      <div className='WeatherReport'>
        <div>
          <h1 id="logo">weatherly</h1>
        </div>
        <section>
          <input
            className="searchInput"
            type='text'
            placeholder='Search'
            onChange={ (e) => {
              this.updateLocation(e);
            }} />
          <button
            className='search'
            onClick={ (e) => {
              this.findWeather(e);
            }}>
            Get Weather
          </button>
          <h2>{this.state.location}</h2>
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
      <div id="welcome">Welcome to Weatherly! Let us help you plan your day.</div>
    );
  }
  if (weather.length === 0) {
    return (
      <section>
        <h3>Valid Locations:</h3>
        <ul>
          <li>Denver</li>
          <li>Castle Rock</li>
          <li>San Diego</li>
          <li>San Fransico</li>
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
      <article className={weatherType.type}>
        <h5>{date}</h5>
        <h5>The high will be {temp.high}&#176;</h5>
        <h5>The low will be {temp.low}&#176;</h5>
        <h6 className={thing(weatherType.type)}></h6>
        <h5>Likelihood of {thing(weatherType.type)} is {chance}%</h5>
      </article>
    </div>
  )
}

function thing(x) {
  if (x === 'thunder storms') {
    return 'thunderstorms'
  } else { return x }
}

ReactDOM.render(<Main source='https://weatherly-api.herokuapp.com/api/weather/'/>, document.getElementById('application'));
