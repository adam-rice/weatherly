import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery')

class Main extends React.Component {
  constructor() {
      super();
      this.state = {
        location: '',
        weather: [],
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
        </section>
      </div>
    )
  }
}

ReactDOM.render(<Main source='https://weatherly-api.herokuapp.com/api/weather/'/>, document.getElementById('application'));
