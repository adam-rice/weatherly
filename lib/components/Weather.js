import React from 'react';
import measureWeather from './helpers/measureweather';
import transformScale from './helpers/transformscale';
import transformWeatherType from './helpers/transformtype';


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

export default Weather;
