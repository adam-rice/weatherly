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

export default transformWeatherType;
