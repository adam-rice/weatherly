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

  updateLocation(e) {
    const searchValue = e.target.value;
    this.setState({ location: searchValue });
  }

  persistLastLocation() {
    localStorage.setItem('location', this.state.location);
  }

  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' }, () => this.findWeather())
  }

  findWeather(e) {
    // if (this.state.location) {
      $.get(this.props.source + this.state.location).then(weatherInfo => {
          this.setState({weather: weatherInfo.slice(0, 7)});
        });
      // }
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
          {/* <section id="body">
            <article id="today"></article>
            <article id="todaySummary"></article>
            <section id="week">
              <article id="dayOne" className="notToday"></article>
              <article id="dayTwo" className="notToday"></article>
              <article id="dayThree" className="notToday"></article>
              <article id="dayFour" className="notToday"></article>
              <article id="dayFive" className="notToday"></article>
              <article id="daySix" className="notToday"></article>
              <article id="daySeven" className="notToday"></article>
            </section>
           </section> */}
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
      <div>Please Enter a Location</div>
    );
  }
  if (weather.length === 0) {
    return (
      <div>
        <h3>Valid Locations:</h3>
        <ul>
          <li>Denver</li>
          <li>Castle-Rock</li>
          <li>San-Diego</li>
          <li>San-Francisco</li>
        </ul>
      </div>
    );
  }
  return (
    <div className='Weather-Card'>
      {weather.map((card) => <div key={card.date}>
        <Weather {...card} />
      </div>)}
    </div>
  )
};

const Weather = (props) => {
  let { location, date, temp } = props

  return(
    <div>
      <article>
        {location}
        {date}
      </article>
    </div>
  )
}

ReactDOM.render(<Main source='https://weatherly-api.herokuapp.com/api/weather/'/>, document.getElementById('application'));
