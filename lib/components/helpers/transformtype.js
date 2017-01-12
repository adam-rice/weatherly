function transformWeatherType(props) {
  return weatherType[props];
}

const weatherType = {
  storms: 'thunderstorms',
  cloudy: 'clouds',
  sunny: 'clear',
  windy: 'wind',
  foggy: 'fog',
  rain: 'rain',
  snow: 'snow'
}

export default transformWeatherType;
