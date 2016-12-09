import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery')

class Main extends React.Component {
  constructor() {
      super();
      this.state = {
        location: '',
        weather: null,
      }
  }

  updateLocation(e) {
    const searchValue = e.currentTarget.value;
    this.setState({ location: searchValue });
  }

  findWeather(e) {
    $.get(this.props.source + this.state.location, (results) => {
      this.setState({ weather: results }, localStorage.setItem('location', this.state.location))
    });
    this.setState({ location: '' });
  }

  render() {
    return(
      <div className='WeatherReport'>
        <section className=''>
          <input
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
            Locate
          </button>
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
