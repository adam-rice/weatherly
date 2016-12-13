import React from 'react';

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

function transformScale(number) {
  if (number === 3) {
    return 'severe'
  } else {return 'not-severe'}
}

export default Weather;
