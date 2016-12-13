import React from 'react';
import Weather from './Weather'

const WeatherCards = (props) => {
  let { weather } = (props);
  if (!weather) {
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
  );
};

export default WeatherCards;
